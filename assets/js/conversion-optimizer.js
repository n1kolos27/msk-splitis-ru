/* ============================================
   Conversion Optimizer
   Улучшение конверсии: отслеживание, оптимизация CTA
   ============================================ */

(function() {
  'use strict';

  /**
   * Отслеживает клики по CTA кнопкам
   */
  function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.btn--primary, .cta__button, .floating-cta__button, [data-cta="true"]');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ctaText = button.textContent.trim();
        const ctaType = button.getAttribute('data-cta-type') || 'button';
        const ctaLocation = button.closest('section')?.className || 'unknown';
        
        // Отслеживание события (можно интегрировать с аналитикой)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'cta_click', {
            'cta_text': ctaText,
            'cta_type': ctaType,
            'cta_location': ctaLocation
          });
        }

        // Сохранение в localStorage для анализа
        const ctaData = {
          text: ctaText,
          type: ctaType,
          location: ctaLocation,
          timestamp: new Date().toISOString()
        };
        
        const existingData = JSON.parse(localStorage.getItem('cta_clicks') || '[]');
        existingData.push(ctaData);
        localStorage.setItem('cta_clicks', JSON.stringify(existingData.slice(-50))); // Храним последние 50 кликов
      });
    });
  }

  /**
   * Оптимизирует видимость CTA кнопок при скролле
   */
  function optimizeCTAVisibility() {
    const floatingCTA = document.querySelector('.floating-cta');
    if (!floatingCTA) return;

    let lastScrollTop = 0;
    const scrollThreshold = 300;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Показываем floating CTA после прокрутки вниз
      if (scrollTop > scrollThreshold && scrollTop > lastScrollTop) {
        floatingCTA.classList.add('floating-cta--visible');
      } else if (scrollTop < scrollThreshold || scrollTop < lastScrollTop) {
        floatingCTA.classList.remove('floating-cta--visible');
      }
      
      lastScrollTop = scrollTop;
    }, { passive: true });
  }

  /**
   * Улучшает формы для увеличения конверсии
   */
  function optimizeForms() {
    const forms = document.querySelectorAll('.form');
    
    forms.forEach(form => {
      // Автозаполнение из localStorage
      const formInputs = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');
      
      formInputs.forEach(input => {
        const fieldName = input.name || input.id;
        const savedValue = localStorage.getItem(`form_${fieldName}`);
        
        if (savedValue && !input.value) {
          input.value = savedValue;
        }
        
        // Сохранение при вводе
        input.addEventListener('input', debounce(() => {
          if (input.value) {
            localStorage.setItem(`form_${fieldName}`, input.value);
          }
        }, 500));
      });

      // Улучшенная отправка формы
      form.addEventListener('submit', (e) => {
        // Не предотвращаем отправку, но добавляем отслеживание
        const formData = new FormData(form);
        const formType = form.getAttribute('data-form-type') || 'contact';
        
        // Отслеживание отправки формы
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            'form_type': formType,
            'form_location': window.location.pathname
          });
        }
      });
    });
  }

  /**
   * Оптимизирует время загрузки страницы для улучшения конверсии
   */
  function optimizePageLoad() {
    // Показываем контент как можно быстрее
    document.body.classList.add('loaded');
    
    // Предзагрузка следующих вероятных страниц
    const mainLinks = document.querySelectorAll('.header__nav-link, .footer__nav-link');
    mainLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
        }
      }, { once: true });
    });
  }

  /**
   * Debounce helper
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Инициализация всех оптимизаций конверсии
   */
  function init() {
    trackCTAClicks();
    optimizeCTAVisibility();
    optimizeForms();
    optimizePageLoad();
  }

  // Инициализация
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Экспорт для использования в других скриптах
  window.ConversionOptimizer = {
    trackCTAClicks,
    optimizeCTAVisibility,
    optimizeForms
  };

})();

