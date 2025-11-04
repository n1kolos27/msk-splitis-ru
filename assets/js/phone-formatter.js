/**
 * Phone Formatter - Автоматическое форматирование телефонных номеров при вводе
 */

(function() {
  'use strict';

  // Функция форматирования телефона в формат +7 (999) 123-45-67
  function formatPhone(value) {
    // Удаляем все нецифровые символы кроме +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Если начинается с 8, заменяем на +7
    if (cleaned.startsWith('8')) {
      cleaned = '+7' + cleaned.substring(1);
    }
    // Если начинается с 7, добавляем +
    else if (cleaned.startsWith('7') && !cleaned.startsWith('+7')) {
      cleaned = '+7' + cleaned.substring(1);
    }
    // Если начинается с цифры, добавляем +7
    else if (/^\d/.test(cleaned) && !cleaned.startsWith('+')) {
      cleaned = '+7' + cleaned;
    }
    // Если не начинается с +7, добавляем
    else if (!cleaned.startsWith('+7')) {
      cleaned = '+7' + cleaned;
    }
    
    // Ограничиваем длину (11 цифр после +7)
    cleaned = cleaned.substring(0, 12); // +7 + 10 цифр
    
    // Форматируем: +7 (999) 123-45-67
    if (cleaned.length > 2) {
      const digits = cleaned.substring(2); // Цифры после +7
      let formatted = '+7';
      
      if (digits.length > 0) {
        formatted += ' (' + digits.substring(0, 3);
      }
      if (digits.length > 3) {
        formatted += ') ' + digits.substring(3, 6);
      }
      if (digits.length > 6) {
        formatted += '-' + digits.substring(6, 8);
      }
      if (digits.length > 8) {
        formatted += '-' + digits.substring(8, 10);
      }
      
      return formatted;
    }
    
    return cleaned;
  }

  // Инициализация форматирования телефонов
  function init() {
    const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
    
    phoneInputs.forEach(input => {
      // Форматирование при вводе
      input.addEventListener('input', function(e) {
        const cursorPosition = this.selectionStart;
        const oldValue = this.value;
        const newValue = formatPhone(this.value);
        
        this.value = newValue;
        
        // Восстанавливаем позицию курсора
        const diff = newValue.length - oldValue.length;
        const newPosition = cursorPosition + diff;
        this.setSelectionRange(newPosition, newPosition);
      });
      
      // Форматирование при вставке
      input.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const formatted = formatPhone(pastedText);
        this.value = formatted;
      });
      
      // Форматирование при потере фокуса (если поле не пустое)
      input.addEventListener('blur', function() {
        if (this.value.trim() && !this.value.startsWith('+7')) {
          this.value = formatPhone(this.value);
        }
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

