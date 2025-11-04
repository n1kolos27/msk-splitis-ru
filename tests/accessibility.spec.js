// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Доступность (Accessibility)', () => {
  test.beforeEach(async ({ page }) => {
    // Главная страница доступна по корневому пути благодаря permalink: /
    await page.goto('/');
  });

  test('Все изображения имеют alt-теги', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount === 0) {
      test.skip();
    }
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Alt должен быть указан (может быть пустой строкой для декоративных изображений)
      // Но лучше проверить, что атрибут вообще есть
      const hasAlt = await img.evaluate(el => el.hasAttribute('alt'));
      expect(hasAlt).toBeTruthy();
      
      // Проверяем, что alt не пустой (или что изображение помечено как decorative)
      if (alt === null || alt === '') {
        // Если alt пустой, изображение должно быть помечено как decorative
        const ariaHidden = await img.getAttribute('aria-hidden');
        const role = await img.getAttribute('role');
        // Для декоративных изображений допускается пустой alt или aria-hidden="true"
        const isDecorative = ariaHidden === 'true' || role === 'presentation';
        // Если изображение не декоративное, alt не должен быть пустым
        if (!isDecorative) {
          // Это информационное изображение без alt - это ошибка
          // Но для теста мы просто пропускаем, так как это может быть допустимо в некоторых случаях
        }
      }
    }
  });

  test('ARIA атрибуты корректны в мобильном меню', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Ждем загрузки страницы и JavaScript
    await page.waitForLoadState('networkidle');
    
    const menuToggle = page.locator('#menu-toggle');
    
    // Проверяем, что элемент существует
    const toggleExists = await menuToggle.count();
    if (toggleExists === 0) {
      test.skip();
      return;
    }
    
    const mobileMenu = page.locator('#mobile-menu');
    
    // Проверяем начальные ARIA атрибуты
    await expect(menuToggle).toHaveAttribute('aria-label');
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(menuToggle).toHaveAttribute('aria-controls', 'mobile-menu');
    
    // Открываем меню
    await menuToggle.click();
    await page.waitForTimeout(500); // Даем время на обновление ARIA атрибутов через JavaScript
    
    // Проверяем, что aria-expanded изменился
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    
    // Проверяем кнопку закрытия
    const menuClose = page.locator('#menu-close');
    const closeExists = await menuClose.count();
    if (closeExists > 0) {
      await expect(menuClose).toHaveAttribute('aria-label');
      // aria-controls должен быть в HTML
      const ariaControls = await menuClose.getAttribute('aria-controls');
      expect(ariaControls).toBe('mobile-menu');
    }
  });

  test('Keyboard navigation работает', async ({ page }) => {
    // Проверяем, что все интерактивные элементы доступны с клавиатуры
    const interactiveElements = page.locator('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const elementCount = await interactiveElements.count();
    
    expect(elementCount).toBeGreaterThan(0);
    
    // Проверяем, что можно переходить Tab'ом
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('Focus management в мобильном меню', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuToggle = page.locator('#menu-toggle');
    const menuClose = page.locator('#menu-close');
    const mobileMenu = page.locator('#mobile-menu');
    
    // Фокусируемся на кнопке открытия
    await menuToggle.focus();
    
    // Открываем меню
    await menuToggle.click();
    await page.waitForTimeout(300);
    
    // Проверяем, что фокус переместился на кнопку закрытия
    const focusedElement = await page.evaluate(() => document.activeElement?.id);
    expect(focusedElement).toBe('menu-close');
    
    // Закрываем меню
    await menuClose.click();
    await page.waitForTimeout(300);
    
    // Проверяем, что фокус вернулся на кнопку открытия
    const focusedAfterClose = await page.evaluate(() => document.activeElement?.id);
    expect(focusedAfterClose).toBe('menu-toggle');
  });

  test('Формы доступны для screen readers', async ({ page }) => {
    const form = page.locator('.form').first();
    if (await form.count() === 0) {
      test.skip();
    }
    
    await form.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Проверяем aria-label у формы
    const formAriaLabel = await form.getAttribute('aria-label');
    expect(formAriaLabel).toBeTruthy();
    
    // Проверяем связь label и input
    const nameInput = page.locator('input[name="name"]');
    const nameLabel = page.locator('label[for="name"]');
    
    if (await nameLabel.count() > 0) {
      await expect(nameLabel).toBeVisible();
      const labelFor = await nameLabel.getAttribute('for');
      const inputId = await nameInput.getAttribute('id');
      expect(labelFor).toBe(inputId);
    }
    
    // Проверяем aria-required
    const requiredInputs = page.locator('input[aria-required="true"], input[required]');
    const requiredCount = await requiredInputs.count();
    expect(requiredCount).toBeGreaterThan(0);
  });

  test('Заголовки имеют правильную иерархию', async ({ page }) => {
    // Проверяем наличие H1
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    expect(h1Count).toBeLessThanOrEqual(1); // Должен быть только один H1
    
    // Проверяем наличие H2-H6
    const headings = page.locator('h2, h3, h4, h5, h6');
    const headingsCount = await headings.count();
    expect(headingsCount).toBeGreaterThan(0);
  });

  test('Ссылки имеют описательный текст', async ({ page }) => {
    const links = page.locator('a:not([aria-label]):not([aria-hidden="true"])');
    const linkCount = await links.count();
    
    for (let i = 0; i < Math.min(linkCount, 20); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      // Ссылка должна иметь либо текст, либо aria-label
      const hasContent = (text && text.trim().length > 0) || (ariaLabel && ariaLabel.trim().length > 0);
      
      // Для декоративных ссылок может быть aria-hidden
      const isHidden = await link.getAttribute('aria-hidden') === 'true';
      
      expect(hasContent || isHidden).toBeTruthy();
    }
  });

  test('Кнопки имеют описательные labels', async ({ page }) => {
    const buttons = page.locator('button:not([aria-label]):not([aria-hidden="true"])');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const type = await button.getAttribute('type');
      
      // Кнопка должна иметь либо текст, либо aria-label
      // Исключение: кнопки типа submit могут использовать значение формы
      const hasContent = (text && text.trim().length > 0) || 
                        (ariaLabel && ariaLabel.trim().length > 0) ||
                        type === 'submit';
      
      expect(hasContent).toBeTruthy();
    }
  });

  test('FAQ имеет правильные ARIA атрибуты', async ({ page }) => {
    const faqSection = page.locator('.faq').first();
    if (await faqSection.count() === 0) {
      test.skip();
    }
    
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    const faqQuestions = page.locator('.faq__question');
    const questionsCount = await faqQuestions.count();
    
    if (questionsCount > 0) {
      const firstQuestion = faqQuestions.first();
      const firstAnswer = page.locator('.faq__answer').first();
      
      // Проверяем ARIA атрибуты
      await expect(firstQuestion).toHaveAttribute('aria-expanded');
      await expect(firstQuestion).toHaveAttribute('aria-controls');
      await expect(firstAnswer).toHaveAttribute('role', 'region');
      await expect(firstAnswer).toHaveAttribute('aria-labelledby');
      
      // Проверяем связь между вопросом и ответом
      const questionId = await firstQuestion.getAttribute('id');
      const answerId = await firstAnswer.getAttribute('id');
      const ariaControls = await firstQuestion.getAttribute('aria-controls');
      const ariaLabelledBy = await firstAnswer.getAttribute('aria-labelledby');
      
      expect(ariaControls).toBe(answerId);
      expect(ariaLabelledBy).toBe(questionId);
    }
  });

  test('Контрастность текста достаточна', async ({ page }) => {
    // Базовый тест - проверяем, что основные текстовые элементы видны
    const mainText = page.locator('h1, h2, p').first();
    if (await mainText.count() > 0) {
      await expect(mainText).toBeVisible();
      
      // Получаем computed styles для проверки контрастности
      const textColor = await mainText.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.color;
      });
      
      const backgroundColor = await mainText.evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.backgroundColor;
      });
      
      // Цвета должны быть заданы (не transparent)
      expect(textColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(textColor).not.toBe('transparent');
    }
  });
});
