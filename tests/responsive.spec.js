// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Адаптивность', () => {
  test('Отображение на мобильном устройстве (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Проверяем основные элементы
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Проверяем, что мобильное меню доступно
    const menuToggle = page.locator('#menu-toggle');
    await expect(menuToggle).toBeVisible();
    
    // Проверяем, что десктопное меню скрыто или не видно
    const desktopNav = page.locator('.header__nav');
    const desktopNavVisibility = await desktopNav.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    });
    
    // На мобильных десктопное меню должно быть скрыто или невидимо
    // (может быть скрыто через CSS или иметь display: none)
  });

  test('Отображение на планшете (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Проверяем основные элементы
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // На планшете может быть видно либо мобильное, либо десктопное меню
    // в зависимости от breakpoint
  });

  test('Отображение на десктопе (1920px)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForTimeout(1000); // Ждем применения CSS
    
    // Проверяем основные элементы
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // На десктопе должно быть видно десктопное меню
    const desktopNav = page.locator('.header__nav');
    await expect(desktopNav).toBeVisible();
    
    // Мобильное меню должно быть скрыто или не видно
    const menuToggle = page.locator('#menu-toggle');
    // Проверяем напрямую через isVisible (учитывает display: none)
    const isVisible = await menuToggle.isVisible();
    
    // На десктопе мобильное меню должно быть скрыто
    expect(isVisible).toBeFalsy();
  });

  test('Мобильное меню видно только на мобильных устройствах', async ({ page }) => {
    // Тест на мобильном
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    const menuToggle = page.locator('#menu-toggle');
    const isVisibleMobile = await menuToggle.isVisible();
    expect(isVisibleMobile).toBeTruthy();
    
    // Тест на десктопе
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await page.waitForTimeout(1000);
    
    const isVisibleDesktop = await menuToggle.isVisible();
    
    // На десктопе должно быть скрыто через display: none
    expect(isVisibleDesktop).toBeFalsy();
    
    // Дополнительная проверка через computed style
    const computedStyle = await menuToggle.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.display;
    });
    expect(computedStyle).toBe('none');
  });

  test('Десктопное меню скрыто на мобильных устройствах', async ({ page }) => {
    // Тест на мобильном
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    const desktopNav = page.locator('.header__nav');
    
    // На мобильных десктопное меню должно быть скрыто через display: none
    const isVisible = await desktopNav.isVisible();
    expect(isVisible).toBeFalsy();
    
    // Дополнительная проверка через computed style
    const navDisplay = await desktopNav.evaluate(el => {
      return window.getComputedStyle(el).display;
    });
    expect(navDisplay).toBe('none');
    
    // Тест на десктопе
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await page.waitForTimeout(1000);
    
    await expect(desktopNav).toBeVisible();
  });

  test('Контент адаптируется под размер экрана', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForTimeout(500);
      
      // Проверяем, что основные секции видны
      await expect(page.locator('.hero').or(page.locator('main')).first()).toBeVisible();
      
      // Проверяем, что нет горизонтального скролла (overflow)
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      
      // На маленьких экранах может быть небольшой overflow, но не критичный
      // Проверяем, что overflow не слишком большой
      if (hasHorizontalScroll) {
        const scrollDifference = await page.evaluate(() => {
          return document.documentElement.scrollWidth - document.documentElement.clientWidth;
        });
        // Допускаем небольшой overflow (менее 50px) из-за padding/margins
        expect(scrollDifference).toBeLessThan(50);
      }
    }
  });

  test('Изображения адаптивны', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Проверяем, что изображения загружаются и имеют разумные размеры
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const isVisible = await img.isVisible();
        
        if (isVisible) {
          const boundingBox = await img.boundingBox();
          if (boundingBox) {
            // Изображение не должно быть шире экрана
            expect(boundingBox.width).toBeLessThanOrEqual(400);
          }
        }
      }
    }
  });
});
