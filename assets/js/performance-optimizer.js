/* ============================================
   Performance Optimizer
   Оптимизация производительности страницы
   ============================================ */

(function() {
  'use strict';

  /**
   * Debounce функция для оптимизации событий
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
   * Throttle функция для ограничения частоты вызовов
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Оптимизирует обработчики событий scroll
   */
  function optimizeScrollHandlers() {
    const scrollHandlers = [];
    
    // Находим все обработчики scroll
    document.querySelectorAll('[data-scroll-handler]').forEach(element => {
      const handlerName = element.getAttribute('data-scroll-handler');
      if (window[handlerName]) {
        scrollHandlers.push({
          element,
          handler: window[handlerName]
        });
      }
    });

    // Объединяем все обработчики scroll в один оптимизированный
    const optimizedScrollHandler = throttle(() => {
      scrollHandlers.forEach(({ element, handler }) => {
        handler(element);
      });
    }, 16); // ~60fps

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
  }

  /**
   * Оптимизирует обработчики событий resize
   */
  function optimizeResizeHandlers() {
    const resizeHandlers = [];
    
    // Находим все обработчики resize
    document.querySelectorAll('[data-resize-handler]').forEach(element => {
      const handlerName = element.getAttribute('data-resize-handler');
      if (window[handlerName]) {
        resizeHandlers.push({
          element,
          handler: window[handlerName]
        });
      }
    });

    // Объединяем все обработчики resize в один оптимизированный
    const optimizedResizeHandler = debounce(() => {
      resizeHandlers.forEach(({ element, handler }) => {
        handler(element);
      });
    }, 250);

    window.addEventListener('resize', optimizedResizeHandler, { passive: true });
  }

  /**
   * Предзагружает критичные ресурсы
   */
  function preloadCriticalResources() {
    // Предзагрузка шрифтов
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'style';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);

    // Предзагрузка критичных CSS
    const criticalCSS = document.createElement('link');
    criticalCSS.rel = 'preload';
    criticalCSS.as = 'style';
    criticalCSS.href = 'assets/css/main.css';
    document.head.appendChild(criticalCSS);
  }

  /**
   * Откладывает загрузку некритичных скриптов
   */
  function deferNonCriticalScripts() {
    // Скрипты с атрибутом data-defer загружаются после полной загрузки страницы
    document.querySelectorAll('script[data-defer]').forEach(script => {
      const newScript = document.createElement('script');
      newScript.src = script.src;
      newScript.defer = true;
      script.parentNode.insertBefore(newScript, script);
      script.remove();
    });
  }

  /**
   * Инициализирует все оптимизации
   */
  function init() {
    optimizeScrollHandlers();
    optimizeResizeHandlers();
    preloadCriticalResources();
    deferNonCriticalScripts();
  }

  // Инициализация
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Экспорт утилит
  window.PerformanceOptimizer = {
    debounce,
    throttle,
    optimizeScrollHandlers,
    optimizeResizeHandlers
  };

})();

