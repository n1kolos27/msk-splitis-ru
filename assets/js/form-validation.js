/* ============================================
   Enhanced Form Validation
   ============================================ */

(function() {
  'use strict';

  // Validation patterns
  const patterns = {
    phone: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[а-яА-ЯёЁa-zA-Z\s-]{2,50}$/,
    message: /^.{10,500}$/
  };

  // Validation messages
  const messages = {
    required: 'Это поле обязательно для заполнения',
    phone: 'Введите корректный номер телефона',
    email: 'Введите корректный email адрес',
    name: 'Имя должно содержать от 2 до 50 символов',
    message: 'Сообщение должно содержать от 10 до 500 символов',
    minLength: (min) => `Минимум ${min} символов`,
    maxLength: (max) => `Максимум ${max} символов`
  };

  // Add validation to form inputs
  function initFormValidation() {
    const forms = document.querySelectorAll('.form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('form__input--error')) {
            validateField(input);
          }
        });
      });

      // Form submission validation
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields on submit
        let isValid = true;
        inputs.forEach(input => {
          // Force validation even if field hasn't been touched
          if (!validateField(input)) {
            isValid = false;
          }
        });

        if (isValid) {
          handleFormSubmit(form);
        } else {
          // Scroll to first error
          const firstError = form.querySelector('.form__input--error, .form__textarea--error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
          }
        }
      });
    });
  }

  // Validate individual field
  function validateField(field) {
    const value = field.value.trim();
    const type = field.type || field.tagName.toLowerCase();
    
    // Проверяем, является ли поле обязательным
    const hasRequiredAttr = field.hasAttribute('required');
    const ariaRequired = field.getAttribute('aria-required') === 'true';
    
    // Ищем label через for атрибут
    let label = null;
    if (field.id) {
      label = field.closest('.form__group')?.querySelector('label[for="' + field.id + '"]');
    }
    // Если не нашли через for, ищем первый label в группе
    if (!label) {
      label = field.closest('.form__group')?.querySelector('label');
    }
    const hasRequiredClass = label && label.classList.contains('form__label--required');
    const isRequired = hasRequiredAttr || hasRequiredClass || ariaRequired;
    
    // Remove previous error state
    clearFieldError(field);

    // Required validation - проверяем всегда, даже если поле не было touched
    if (isRequired && !value) {
      showFieldError(field, messages.required);
      return false;
    }

    // Type-specific validation
    if (value) {
      let isValid = true;
      let errorMessage = '';

      switch (type) {
        case 'tel':
        case 'phone':
          // Remove all formatting characters for validation
          const phoneValue = value.replace(/[\s\-\(\)\+]/g, '');
          if (!patterns.phone.test(phoneValue) || phoneValue.length < 10) {
            isValid = false;
            errorMessage = messages.phone;
          }
          break;
        
        case 'email':
          if (!patterns.email.test(value)) {
            isValid = false;
            errorMessage = messages.email;
          }
          break;
        
        case 'text':
          if (field.name === 'name' && !patterns.name.test(value)) {
            isValid = false;
            errorMessage = messages.name;
          }
          break;
        
        case 'textarea':
          if (field.name === 'message' && !patterns.message.test(value)) {
            isValid = false;
            errorMessage = messages.message;
          }
          break;
      }

      // Length validation
      if (isValid && field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (value.length < minLength) {
          isValid = false;
          errorMessage = messages.minLength(minLength);
        }
      }

      if (isValid && field.hasAttribute('maxlength')) {
        const maxLength = parseInt(field.getAttribute('maxlength'));
        if (value.length > maxLength) {
          isValid = false;
          errorMessage = messages.maxLength(maxLength);
        }
      }

      if (!isValid) {
        showFieldError(field, errorMessage);
        return false;
      }
    }

    // Show success state
    showFieldSuccess(field);
    return true;
  }

  // Show field error
  function showFieldError(field, message) {
    field.classList.add('form__input--error');
    field.setAttribute('aria-invalid', 'true');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.form__error-message');
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'form__error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    
    field.parentElement.appendChild(errorElement);
    
    // Update form group
    field.closest('.form__group')?.classList.add('form__group--error');
  }

  // Clear field error
  function clearFieldError(field) {
    field.classList.remove('form__input--error');
    field.removeAttribute('aria-invalid');
    
    const errorElement = field.parentElement.querySelector('.form__error-message');
    if (errorElement) {
      errorElement.remove();
    }
    
    field.closest('.form__group')?.classList.remove('form__group--error');
  }

  // Show field success
  function showFieldSuccess(field) {
    field.classList.add('form__input--success');
    field.setAttribute('aria-invalid', 'false');
    
    // Remove error classes
    field.classList.remove('form__input--error');
    field.closest('.form__group')?.classList.remove('form__group--error');
  }

  // Handle form submission
  function handleFormSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.classList.add('btn--loading');
    submitButton.textContent = 'Отправка...';

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      showFormSuccess(form);
      
      // Reset button
      submitButton.disabled = false;
      submitButton.classList.remove('btn--loading');
      submitButton.textContent = originalText;
    }, 1500);
  }

  // Show form success message
  function showFormSuccess(form) {
    form.classList.add('form--success');
    
    const successMessage = document.createElement('div');
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
    
    // Reset form after delay
    setTimeout(() => {
      form.reset();
      form.classList.remove('form--success');
      successMessage.remove();
    }, 5000);
  }

  // Format phone number
  function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 1) {
        value = '+' + value;
      } else if (value.length <= 4) {
        value = '+' + value;
      } else if (value.length <= 7) {
        value = '+' + value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4);
      } else if (value.length <= 9) {
        value = '+' + value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7);
      } else {
        value = '+' + value.slice(0, 1) + ' (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
      }
    }
    
    input.value = value;
  }

  // Initialize phone formatting
  function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
    phoneInputs.forEach(input => {
      input.addEventListener('input', () => formatPhoneNumber(input));
      input.setAttribute('placeholder', '+7 (999) 123-45-67');
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initFormValidation();
      initPhoneFormatting();
    });
  } else {
    initFormValidation();
    initPhoneFormatting();
  }
})();

