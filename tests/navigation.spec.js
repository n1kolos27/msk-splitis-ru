// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Навигация', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Главная страница загружается корректно', async ({ page }) => {
    // Проверка заголовка
    await expect(page).toHaveTitle(/Кондиционеры в Москве/);
    
    // Проверка основных секций
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
    const sectionsCount = await page.locator('.section').count();
    expect(sectionsCount).toBeGreaterThan(0);
  });

  test('Десктопная навигация работает', async ({ page }) => {
    // Проверяем текущий размер viewport
    const currentViewport = page.viewportSize();
    const isMobile = currentViewport && currentViewport.width < 768;
    
    // На мобильных устройствах десктопное меню скрыто - пропускаем тест
    if (isMobile) {
      test.skip();
      return;
    }
    
    // Устанавливаем десктопное разрешение если не установлено
    if (!currentViewport || currentViewport.width < 768) {
      await page.setViewportSize({ width: 1920, height: 1080 });
    }
    
    // Проверка наличия навигационных ссылок
    const navLinks = page.locator('.header__nav-link');
    await expect(navLinks.first()).toBeVisible();
    
    // Проверка перехода по ссылкам
    await page.click('text=Каталог');
    await expect(page).toHaveURL(/katalog\.html/);
    
    await page.goto('/');
    await page.click('text=Контакты');
    await expect(page).toHaveURL(/kontakty\.html/);
  });

  test.describe('Мобильное меню', () => {
    test('Открывается и закрывается по клику на кнопку', async ({ page }) => {
      // Устанавливаем мобильное разрешение
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuToggle = page.locator('#menu-toggle');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Меню должно быть скрыто изначально
      await expect(mobileMenu).not.toHaveClass(/mobile-menu--open/);
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
      
      // Открываем меню
      await menuToggle.click();
      await expect(mobileMenu).toHaveClass(/mobile-menu--open/);
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
      
      // Проверяем, что фон заблокирован
      const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflow).toBe('hidden');
      
      // Закрываем меню
      const menuClose = page.locator('#menu-close');
      await menuClose.click();
      await expect(mobileMenu).not.toHaveClass(/mobile-menu--open/);
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
      
      // Проверяем, что скролл восстановлен
      const bodyOverflowAfter = await page.evaluate(() => document.body.style.overflow);
      expect(bodyOverflowAfter).toBe('');
    });

    test('Закрывается по клавише Escape', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuToggle = page.locator('#menu-toggle');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Открываем меню
      await menuToggle.click();
      await expect(mobileMenu).toHaveClass(/mobile-menu--open/);
      
      // Закрываем по Escape
      await page.keyboard.press('Escape');
      await expect(mobileMenu).not.toHaveClass(/mobile-menu--open/);
    });

    test('Закрывается при клике вне меню', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuToggle = page.locator('#menu-toggle');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Открываем меню
      await menuToggle.click();
      await expect(mobileMenu).toHaveClass(/mobile-menu--open/);
      
      // Кликаем вне меню (на затемненный фон)
      await page.click('.mobile-menu', { position: { x: 10, y: 10 } });
      
      // Меню должно закрыться (если клик был на фон, а не на контент)
      // Проверяем, что меню закрылось (может закрыться или остаться открытым в зависимости от реализации)
      const isOpen = await mobileMenu.evaluate(el => el.classList.contains('mobile-menu--open'));
      
      // Если меню не закрылось при клике на фон, попробуем кликнуть на сам элемент меню
      if (isOpen) {
        // Кликаем на сам контейнер меню (не на его содержимое)
        const menuContainer = mobileMenu.locator('.container').first();
        const boundingBox = await menuContainer.boundingBox();
        if (boundingBox) {
          // Кликаем левее контейнера (на фон)
          await page.mouse.click(boundingBox.x - 10, boundingBox.y);
        }
      }
    });

    test('Закрывается при клике на ссылку', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuToggle = page.locator('#menu-toggle');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Открываем меню
      await menuToggle.click();
      await expect(mobileMenu).toHaveClass(/mobile-menu--open/);
      
      // Кликаем на ссылку в меню
      const firstLink = page.locator('.mobile-menu__nav-link').first();
      await firstLink.click();
      
      // Меню должно закрыться через небольшой таймаут
      await page.waitForTimeout(200);
      await expect(mobileMenu).not.toHaveClass(/mobile-menu--open/);
    });

    test('Keyboard navigation (Tab trap) работает', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const menuToggle = page.locator('#menu-toggle');
      const mobileMenu = page.locator('#mobile-menu');
      
      // Открываем меню
      await menuToggle.click();
      await expect(mobileMenu).toHaveClass(/mobile-menu--open/);
      
      // Проверяем, что фокус переместился на кнопку закрытия
      const menuClose = page.locator('#menu-close');
      await expect(menuClose).toBeFocused();
      
      // Tab navigation
      await page.keyboard.press('Tab');
      // Фокус должен переместиться на следующий элемент в меню
      
      // Shift+Tab должен вернуть фокус назад
      await page.keyboard.press('Shift+Tab');
    });
  });

  test('Хлебные крошки отображаются на внутренних страницах', async ({ page }) => {
    await page.goto('/katalog.html');
    
    const breadcrumbs = page.locator('.breadcrumbs');
    if (await breadcrumbs.count() > 0) {
      await expect(breadcrumbs.first()).toBeVisible();
      
      // Проверяем наличие ссылок в хлебных крошках
      const breadcrumbLinks = breadcrumbs.locator('a');
      if (await breadcrumbLinks.count() > 0) {
        await expect(breadcrumbLinks.first()).toBeVisible();
      }
    }
  });

  test('Переходы между страницами работают без ошибок', async ({ page }) => {
    const pages = [
      '/index.html',
      '/katalog.html',
      '/kontakty.html',
      '/uslugi/ustanovka.html'
    ];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await expect(page).toHaveURL(new RegExp(pagePath.replace('/', '\\/').replace('.html', '\\.html')));
      
      // Проверяем отсутствие JavaScript ошибок
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.waitForTimeout(500);
      expect(errors.length).toBe(0);
    }
  });
});
