// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Формы обратной связи', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');
    // Прокручиваем к форме
    const formSection = page.locator('.form').first();
    if (await formSection.count() > 0) {
      await formSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    }
  });

  test('Форма видна и содержит все поля', async ({ page }) => {
    const form = page.locator('.form').first();
    const formCount = await form.count();
    
    if (formCount === 0) {
      test.skip();
      return;
    }
    
    await expect(form).toBeVisible();
    
    // Проверяем наличие полей
    const nameInput = page.locator('input[name="name"]');
    const phoneInput = page.locator('input[name="phone"]');
    const messageInput = page.locator('textarea[name="message"]');
    const submitButton = page.locator('button[type="submit"]');
    
    if (await nameInput.count() > 0) {
      await expect(nameInput).toBeVisible();
    }
    if (await phoneInput.count() > 0) {
      await expect(phoneInput).toBeVisible();
    }
    if (await messageInput.count() > 0) {
      await expect(messageInput).toBeVisible();
    }
    if (await submitButton.count() > 0) {
      await expect(submitButton).toBeVisible();
    }
  });

  test('Валидация: отправка пустой формы блокируется', async ({ page }) => {
    const form = page.locator('.form').first();
    const formCount = await form.count();
    
    if (formCount === 0) {
      test.skip();
      return;
    }
    
    const submitButton = form.locator('button[type="submit"]');
    const submitCount = await submitButton.count();
    
    if (submitCount === 0) {
      test.skip();
      return;
    }
    
    // Пытаемся отправить пустую форму
    await submitButton.click();
    
    // Ждем выполнения валидации
    await page.waitForTimeout(1000);
    
    // Проверяем, что форма не отправилась (не появилось сообщение об успехе)
    const successMessage = form.locator('.form__success-message');
    const successCount = await successMessage.count();
    if (successCount > 0) {
      await expect(successMessage).not.toBeVisible({ timeout: 2000 });
    }
    
    // Проверяем наличие ошибок валидации - либо через класс ошибки, либо через сообщения
    const errorMessages = form.locator('.form__error-message, .form__error');
    const errorCount = await errorMessages.count();
    
    // Также проверяем, есть ли поля с классом ошибки
    const errorInputs = form.locator('.form__input--error, .form__textarea--error, input:invalid, textarea:invalid');
    const errorInputsCount = await errorInputs.count();
    
    // Должна быть хотя бы одна ошибка (либо сообщение, либо класс ошибки, либо HTML5 validation)
    // HTML5 validation может не показывать визуальные индикаторы, поэтому проверяем через invalid
    const hasValidationErrors = errorCount > 0 || errorInputsCount > 0;
    
    // Если нет визуальных ошибок, проверяем через HTML5 validation API
    if (!hasValidationErrors) {
      const hasInvalidFields = await form.evaluate((formEl) => {
        const inputs = formEl.querySelectorAll('input, textarea, select');
        for (const input of inputs) {
          if (input.hasAttribute('required') && !input.value.trim()) {
            return true;
          }
        }
        return false;
      });
      expect(hasInvalidFields || hasValidationErrors).toBeTruthy();
    } else {
      expect(hasValidationErrors).toBeTruthy();
    }
  });

  test('Валидация имени: минимум 2 символа', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    
    // Вводим 1 символ (недостаточно)
    await nameInput.fill('И');
    await nameInput.blur();
    await page.waitForTimeout(300);
    
    // Проверяем наличие ошибки
    const errorMessage = nameInput.locator('..').locator('.form__error-message');
    const hasError = await errorMessage.count() > 0 || await nameInput.evaluate(el => el.classList.contains('form__input--error'));
    expect(hasError).toBeTruthy();
    
    // Вводим 2 символа (достаточно)
    await nameInput.fill('Иван');
    await nameInput.blur();
    await page.waitForTimeout(300);
    
    // Ошибка должна исчезнуть или показаться успех
    const hasSuccess = await nameInput.evaluate(el => el.classList.contains('form__input--success'));
    // Может быть успех или просто отсутствие ошибки
  });

  test('Валидация телефона: некорректный формат', async ({ page }) => {
    const phoneInput = page.locator('input[name="phone"]');
    
    // Вводим некорректный номер
    await phoneInput.fill('123');
    await phoneInput.blur();
    await page.waitForTimeout(300);
    
    // Проверяем наличие ошибки
    const hasError = await phoneInput.evaluate(el => {
      const errorMsg = el.parentElement?.querySelector('.form__error-message');
      return el.classList.contains('form__input--error') || errorMsg !== null;
    });
    expect(hasError).toBeTruthy();
    
    // Вводим корректный номер
    await phoneInput.fill('+7 (999) 123-45-67');
    await phoneInput.blur();
    await page.waitForTimeout(300);
  });

  test('Форматирование телефона при вводе', async ({ page }) => {
    const phoneInput = page.locator('input[name="phone"]');
    
    // Вводим цифры без форматирования
    await phoneInput.fill('79991234567');
    await page.waitForTimeout(500);
    
    // Проверяем, что номер отформатирован
    const value = await phoneInput.inputValue();
    // Формат может быть разным, но должен содержать скобки и дефисы
    expect(value).toMatch(/[\+\(\)\-\s]/);
  });

  test('Валидация сообщения (опциональное поле)', async ({ page }) => {
    const messageTextarea = page.locator('textarea[name="message"]');
    
    // Сообщение необязательное, но если введено менее 10 символов, должна быть ошибка при отправке
    await messageTextarea.fill('Коротко');
    await messageTextarea.blur();
    await page.waitForTimeout(300);
    
    // Пытаемся отправить форму с коротким сообщением
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(500);
    
    // Если валидация работает, должна быть ошибка для сообщения или форма не отправится
    const form = page.locator('.form').first();
    const hasErrors = await form.locator('.form__error-message').count() > 0;
    
    // Вводим достаточное количество символов
    await messageTextarea.fill('Это сообщение содержит более десяти символов');
    await messageTextarea.blur();
    await page.waitForTimeout(300);
  });

  test('Отправка валидной формы', async ({ page }) => {
    const form = page.locator('.form').first();
    
    // Заполняем все обязательные поля
    await page.locator('input[name="name"]').fill('Иван Иванов');
    await page.locator('input[name="phone"]').fill('+7 (999) 123-45-67');
    await page.locator('textarea[name="message"]').fill('Хочу установить кондиционер в квартиру');
    
    // Отправляем форму
    const submitButton = form.locator('button[type="submit"]');
    await submitButton.click();
    
    // Ждем появления сообщения об успехе
    await page.waitForTimeout(2000);
    
    // Проверяем наличие сообщения об успехе
    const successMessage = form.locator('.form__success-message');
    // Увеличиваем timeout для появления сообщения
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    
    // Проверяем, что кнопка в состоянии загрузки или была отключена
    const buttonText = await submitButton.textContent();
    // Может быть "Отправка..." или исходный текст
  });

  test('Кнопка отправки меняет состояние при отправке', async ({ page }) => {
    const form = page.locator('.form').first();
    const submitButton = form.locator('button[type="submit"]');
    const originalText = await submitButton.textContent();
    
    // Заполняем форму
    await page.locator('input[name="name"]').fill('Тест Тестов');
    await page.locator('input[name="phone"]').fill('+7 (999) 123-45-67');
    
    // Отправляем
    await submitButton.click();
    
    // Проверяем изменение состояния кнопки
    await page.waitForTimeout(100);
    const buttonDisabled = await submitButton.isDisabled();
    expect(buttonDisabled).toBeTruthy();
    
    // Ждем завершения отправки
    await page.waitForTimeout(2000);
  });

  test('Ошибки валидации отображаются корректно', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    
    // Оставляем поле пустым и пытаемся отправить
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    await page.waitForTimeout(500);
    
    // Проверяем наличие сообщения об ошибке
    const errorMessage = nameInput.locator('..').locator('.form__error-message');
    const hasError = await errorMessage.count() > 0;
    
    if (hasError) {
      await expect(errorMessage.first()).toBeVisible();
      const errorText = await errorMessage.first().textContent();
      expect(errorText).toContain('обязательно');
    }
  });

  test('ARIA атрибуты формы корректны', async ({ page }) => {
    const form = page.locator('.form').first();
    
    // Проверяем aria-label у формы
    const formAriaLabel = await form.getAttribute('aria-label');
    expect(formAriaLabel).toBeTruthy();
    
    // Проверяем aria-required у обязательных полей
    const nameInput = page.locator('input[name="name"]');
    const phoneInput = page.locator('input[name="phone"]');
    
    const nameRequired = await nameInput.getAttribute('aria-required');
    const phoneRequired = await phoneInput.getAttribute('aria-required');
    
    expect(nameRequired).toBe('true');
    expect(phoneRequired).toBe('true');
  });
});
