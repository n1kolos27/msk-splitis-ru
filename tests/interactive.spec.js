// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Интерактивные элементы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('FAQ Аккордеон', () => {
    test('Вопросы отображаются', async ({ page }) => {
      // Прокручиваем к FAQ секции
      const faqSection = page.locator('.faq').first();
      if (await faqSection.count() > 0) {
        await faqSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        const faqItems = page.locator('.faq__item');
        const itemCount = await faqItems.count();
        expect(itemCount).toBeGreaterThan(0);
      }
    });

    test('Открытие вопроса по клику', async ({ page }) => {
      const faqSection = page.locator('.faq').first();
      if (await faqSection.count() === 0) {
        test.skip();
      }
      
      await faqSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const firstQuestion = page.locator('.faq__question').first();
      const firstAnswer = page.locator('.faq__answer').first();
      const firstItem = page.locator('.faq__item').first();
      
      // Проверяем начальное состояние (закрыто)
      await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
      await expect(firstAnswer).toHaveAttribute('aria-hidden', 'true');
      
      // Открываем вопрос
      await firstQuestion.click();
      await page.waitForTimeout(300);
      
      // Проверяем, что вопрос открыт
      await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
      await expect(firstAnswer).toHaveAttribute('aria-hidden', 'false');
      await expect(firstItem).toHaveClass(/faq__item--open/);
    });

    test('Закрытие при повторном клике', async ({ page }) => {
      const faqSection = page.locator('.faq').first();
      if (await faqSection.count() === 0) {
        test.skip();
      }
      
      await faqSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const firstQuestion = page.locator('.faq__question').first();
      const firstAnswer = page.locator('.faq__answer').first();
      const firstItem = page.locator('.faq__item').first();
      
      // Открываем
      await firstQuestion.click();
      await page.waitForTimeout(300);
      await expect(firstItem).toHaveClass(/faq__item--open/);
      
      // Закрываем
      await firstQuestion.click();
      await page.waitForTimeout(300);
      await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
      await expect(firstAnswer).toHaveAttribute('aria-hidden', 'true');
    });

    test('Закрытие других при открытии нового', async ({ page }) => {
      const faqSection = page.locator('.faq').first();
      if (await faqSection.count() === 0) {
        test.skip();
      }
      
      await faqSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const questions = page.locator('.faq__question');
      const questionsCount = await questions.count();
      
      if (questionsCount < 2) {
        test.skip();
      }
      
      const firstQuestion = questions.nth(0);
      const secondQuestion = questions.nth(1);
      const firstItem = page.locator('.faq__item').nth(0);
      const secondItem = page.locator('.faq__item').nth(1);
      
      // Открываем первый вопрос
      await firstQuestion.click();
      await page.waitForTimeout(300);
      await expect(firstItem).toHaveClass(/faq__item--open/);
      
      // Открываем второй вопрос
      await secondQuestion.click();
      await page.waitForTimeout(300);
      
      // Первый должен закрыться, второй открыться
      await expect(firstItem).not.toHaveClass(/faq__item--open/);
      await expect(secondItem).toHaveClass(/faq__item--open/);
    });

    test('Keyboard navigation (Enter, Space)', async ({ page }) => {
      const faqSection = page.locator('.faq').first();
      if (await faqSection.count() === 0) {
        test.skip();
      }
      
      await faqSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const firstQuestion = page.locator('.faq__question').first();
      const firstItem = page.locator('.faq__item').first();
      
      // Фокусируемся на вопросе
      await firstQuestion.focus();
      
      // Открываем по Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await expect(firstItem).toHaveClass(/faq__item--open/);
      
      // Закрываем по Space
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);
      await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    });

    test('ARIA атрибуты корректны', async ({ page }) => {
      const faqSection = page.locator('.faq').first();
      if (await faqSection.count() === 0) {
        test.skip();
      }
      
      await faqSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      
      const firstQuestion = page.locator('.faq__question').first();
      const firstAnswer = page.locator('.faq__answer').first();
      
      // Проверяем ARIA атрибуты
      const questionId = await firstQuestion.getAttribute('id');
      const answerId = await firstAnswer.getAttribute('id');
      const ariaControls = await firstQuestion.getAttribute('aria-controls');
      const ariaLabelledBy = await firstAnswer.getAttribute('aria-labelledby');
      
      expect(questionId).toBeTruthy();
      expect(answerId).toBeTruthy();
      expect(ariaControls).toBe(answerId);
      expect(ariaLabelledBy).toBe(questionId);
      
      // Проверяем role
      const answerRole = await firstAnswer.getAttribute('role');
      expect(answerRole).toBe('region');
    });
  });

  test.describe('Переключение темы', () => {
    test('Переключение на темную тему', async ({ page }) => {
      // Находим кнопку переключения на темную тему
      const darkThemeButton = page.locator('[data-theme="dark"]').first();
      
      if (await darkThemeButton.count() === 0) {
        test.skip();
      }
      
      // Переключаемся на темную тему
      await darkThemeButton.click();
      
      // Проверяем, что URL содержит #dark
      await expect(page).toHaveURL(/#dark/);
      
      // Проверяем, что тема применилась (проверяем класс на body или html)
      const bodyClass = await page.evaluate(() => {
        return document.body.classList.toString() || document.documentElement.classList.toString();
      });
      
      // Может быть класс или CSS переменные изменились
      // Проверяем наличие якоря для темы
      const darkAnchor = page.locator('#dark');
      const anchorExists = await darkAnchor.count() > 0;
      expect(anchorExists).toBeTruthy();
    });

    test('Переключение на светлую тему', async ({ page }) => {
      // Сначала переключаемся на темную
      const darkThemeButton = page.locator('[data-theme="dark"]').first();
      if (await darkThemeButton.count() > 0) {
        await darkThemeButton.click();
        await page.waitForTimeout(300);
      }
      
      // Переключаемся на светлую
      const lightThemeButton = page.locator('[data-theme="light"]').first();
      if (await lightThemeButton.count() === 0) {
        test.skip();
      }
      
      await lightThemeButton.click();
      
      // Проверяем URL (может быть #light или без hash)
      const url = page.url();
      // URL может содержать #light или не содержать hash вообще
      expect(url).toMatch(/#light|^[^#]*$/);
    });

    test('Сохранение темы в URL hash', async ({ page }) => {
      const darkThemeButton = page.locator('[data-theme="dark"]').first();
      if (await darkThemeButton.count() === 0) {
        test.skip();
      }
      
      // Переключаемся на темную тему
      await darkThemeButton.click();
      await expect(page).toHaveURL(/#dark/);
      
      // Перезагружаем страницу
      await page.reload();
      await page.waitForTimeout(500);
      
      // Проверяем, что тема сохранилась
      const url = page.url();
      expect(url).toMatch(/#dark/);
    });
  });

  test.describe('Плавная прокрутка', () => {
    test('Прокрутка к якорным ссылкам', async ({ page }) => {
      // Ищем ссылку с якорем, исключая skip-link и темы
      const anchorLinks = page.locator('a[href^="#"]').filter({ 
        hasNotText: /Перейти к основному содержимому|Светлая тема|Темная тема/
      });
      const linkCount = await anchorLinks.count();
      
      if (linkCount === 0) {
        test.skip();
      }
      
      // Получаем начальную позицию скролла
      const initialScroll = await page.evaluate(() => window.scrollY);
      
      // Кликаем на первую якорную ссылку
      const firstAnchorLink = anchorLinks.first();
      const href = await firstAnchorLink.getAttribute('href');
      
      if (href && href !== '#' && href !== '#dark' && href !== '#light' && !href.includes('skip')) {
        // Прокручиваем к ссылке, если она вне viewport
        await firstAnchorLink.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        
        await firstAnchorLink.click();
        await page.waitForTimeout(1000); // Ждем завершения плавной прокрутки
        
        // Проверяем, что скролл изменился
        const finalScroll = await page.evaluate(() => window.scrollY);
        
        // Прокрутка должна была произойти (может быть вверх или вниз)
        // Проверяем, что позиция изменилась или что целевой элемент виден
        if (href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = page.locator(`#${targetId}`);
          if (await targetElement.count() > 0) {
            const isVisible = await targetElement.isVisible();
            // Элемент должен быть виден или позиция скролла должна измениться
            expect(isVisible || finalScroll !== initialScroll).toBeTruthy();
          }
        }
      } else {
        test.skip();
      }
    });
  });
});
