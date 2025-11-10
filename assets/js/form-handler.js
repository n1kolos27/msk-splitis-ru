/**
 * Form Handler - Обработчик форм обратной связи
 * Добавляет валидацию и обработку отправки форм
 */

(function() {
  'use strict';

  // Функция валидации телефона
  function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Функция валидации имени
  function validateName(name) {
    return name.trim().length >= 2 && name.trim().length <= 100;
  }

  // Функция показа ошибки
  function showError(input, message) {
    const formGroup = input.closest('.form__group');
    if (!formGroup) return;

    // Удаляем существующие ошибки
    const existingError = formGroup.querySelector('.form__error, .form__error-message');
    if (existingError) {
      existingError.remove();
    }

    // Добавляем класс ошибки
    formGroup.classList.add('form__group--error');
    input.classList.add('form__input--error');
    
    // Создаем элемент ошибки
    const errorElement = document.createElement('span');
    errorElement.className = 'form__error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    formGroup.appendChild(errorElement);

    // Устанавливаем aria-invalid
    input.setAttribute('aria-invalid', 'true');
    
    // Фокусируемся на поле с ошибкой
    input.focus();
  }

  // Функция удаления ошибки
  function clearError(input) {
    const formGroup = input.closest('.form__group');
    if (!formGroup) return;

    formGroup.classList.remove('form__group--error');
    input.classList.remove('form__input--error');
    const errorElement = formGroup.querySelector('.form__error, .form__error-message');
    if (errorElement) {
      errorElement.remove();
    }
    input.removeAttribute('aria-invalid');
  }

  // Функция показа успеха
  function showSuccess(form) {
    // Удаляем все ошибки
    const errors = form.querySelectorAll('.form__error, .form__error-message');
    errors.forEach(error => error.remove());
    
    const errorGroups = form.querySelectorAll('.form__group--error');
    errorGroups.forEach(group => group.classList.remove('form__group--error'));
    
    const errorInputs = form.querySelectorAll('.form__input--error');
    errorInputs.forEach(input => input.classList.remove('form__input--error'));

    // Добавляем класс успеха
    form.classList.add('form--success');
    
    // Показываем сообщение об успехе
    let successMessage = form.querySelector('.form__success-message');
    if (!successMessage) {
      successMessage = document.createElement('div');
      successMessage.className = 'form__success-message';
      successMessage.innerHTML = `
        <svg class="icon icon--lg icon--success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <div>
          <strong>Спасибо!</strong>
          <p>Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</p>
        </div>
      `;
      successMessage.setAttribute('role', 'status');
      successMessage.setAttribute('aria-live', 'polite');
      form.insertBefore(successMessage, form.firstChild);
    } else {
      successMessage.style.display = 'block';
    }

    // Сбрасываем форму
    form.reset();

    // Прокручиваем к сообщению
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Убираем класс успеха через 5 секунд
    setTimeout(() => {
      form.classList.remove('form--success');
      if (successMessage) {
        successMessage.style.display = 'none';
      }
    }, 5000);
  }

  // Функция обработки отправки формы
  function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const message = formData.get('message') || '';

    let isValid = true;

    // Валидация имени
    const nameInput = form.querySelector('[name="name"]');
    if (!validateName(name)) {
      showError(nameInput, 'Введите корректное имя (от 2 до 100 символов)');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Валидация телефона
    const phoneInput = form.querySelector('[name="phone"]');
    if (!validatePhone(phone)) {
      showError(phoneInput, 'Введите корректный номер телефона');
      isValid = false;
    } else {
      clearError(phoneInput);
    }

    if (!isValid) {
      return;
    }

    // Отключаем кнопку отправки
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.classList.add('btn--loading');
    submitButton.textContent = 'Отправка...';

    // Получаем email из формы (если есть)
    const email = formData.get('email') || '';

    // Отправка данных на сервер
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        email: email,
        message: message
      })
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.error || 'Ошибка при отправке формы');
        });
      }
      return response.json();
    })
    .then(data => {
      // Успешная отправка
      showSuccess(form);
      
      // Отслеживание отправки формы в аналитике (если доступно)
      // Получаем ID Яндекс.Метрики из data-атрибута body
      const yandexMetrikaId = document.body.getAttribute('data-yandex-metrika-id');
      if (typeof ym !== 'undefined' && yandexMetrikaId) {
        try {
          ym(parseInt(yandexMetrikaId, 10), 'reachGoal', 'form_submit');
        } catch (e) {
          console.warn('Ошибка отправки цели в Яндекс.Метрику:', e);
        }
      }
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'form',
          'event_label': 'contact_form'
        });
      }
    })
    .catch(error => {
      console.error('Ошибка отправки формы:', error);
      
      // Показываем ошибку пользователю
      const errorMessage = document.createElement('div');
      errorMessage.className = 'form__error-message';
      errorMessage.style.cssText = 'margin-top: 1rem; padding: 1rem; background: #fee; border: 1px solid #fcc; border-radius: 4px; color: #c33;';
      errorMessage.innerHTML = `
        <strong>Ошибка отправки:</strong><br>
        ${error.message || 'Произошла ошибка при отправке формы. Попробуйте позже или свяжитесь с нами по телефону.'}
      `;
      form.insertBefore(errorMessage, form.firstChild);
      
      // Удаляем сообщение об ошибке через 10 секунд
      setTimeout(() => {
        errorMessage.remove();
      }, 10000);
    })
    .finally(() => {
      // Восстанавливаем кнопку
      submitButton.disabled = false;
      submitButton.classList.remove('btn--loading');
      submitButton.textContent = originalText;
    });
  }

  // Инициализация при загрузке DOM
  function init() {
    const forms = document.querySelectorAll('form[aria-label="Форма обратной связи"], form.form');
    
    forms.forEach(form => {
      // Добавляем обработчик отправки
      form.addEventListener('submit', handleSubmit);

      // Валидация при потере фокуса
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          if (this.value.trim()) {
            if (this.type === 'tel' && !validatePhone(this.value)) {
              showError(this, 'Введите корректный номер телефона');
            } else if (this.name === 'name' && !validateName(this.value)) {
              showError(this, 'Введите корректное имя (от 2 до 100 символов)');
            } else {
              clearError(this);
            }
          } else if (this.hasAttribute('required') || this.getAttribute('aria-required') === 'true') {
            // Для обязательных полей показываем ошибку если пусто
            showError(this, 'Это поле обязательно для заполнения');
          }
        });

        // Очистка ошибки при вводе
        input.addEventListener('input', function() {
          if (this.getAttribute('aria-invalid') === 'true' || this.classList.contains('form__input--error')) {
            clearError(this);
          }
        });
      });
    });
  }

  // Запуск при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

