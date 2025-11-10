// Smooth Scroll
(function() {
  'use strict';
  
  // Функция для плавной прокрутки с учетом фиксированного header
  function smoothScrollTo(target, offset = 80) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
      top: Math.max(0, targetPosition), // Не даем прокрутиться выше начала страницы
      behavior: 'smooth'
    });
  }
  
  // Обработчик кликов по якорным ссылкам
  function handleAnchorClick(e) {
    const href = this.getAttribute('href');
    
    // Пропускаем пустые ссылки и ссылки не начинающиеся с #
    if (!href || href === '#' || !href.startsWith('#')) {
      return;
    }
    
    // Ищем целевой элемент
    const targetId = href.substring(1);
    if (!targetId) return; // Если только # без ID
    
    const target = document.getElementById(targetId) || document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      e.stopPropagation();
      
      // Используем нативный smooth scroll если доступен, иначе полифилл
      if ('scrollBehavior' in document.documentElement.style) {
        smoothScrollTo(target);
      } else {
        // Полифилл для старых браузеров
        const startPosition = window.pageYOffset;
        const targetPosition = target.getBoundingClientRect().top + startPosition - 80;
        const distance = targetPosition - startPosition;
        const duration = 600;
        let start = null;
        
        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, Math.max(0, run));
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function easeInOutQuad(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
      }
      
      // Обновляем URL без перезагрузки страницы
      if (history.pushState) {
        history.pushState(null, null, href);
      }
      
      return false;
    }
  }
  
  // Инициализация при загрузке DOM
  function init() {
    // Добавляем обработчики ко всем якорным ссылкам
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
  }
  
  // Запускаем сразу если DOM уже загружен
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Обработка якорных ссылок при динамической загрузке контента (делегирование событий)
  document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      handleAnchorClick.call(anchor, e);
    }
  }, true); // Используем capture phase для более раннего перехвата
})();

