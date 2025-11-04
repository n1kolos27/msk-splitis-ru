/* ============================================
   Image Optimizer
   Lazy loading, WebP поддержка, оптимизация
   ============================================ */

(function() {
  'use strict';

  /**
   * Проверяет поддержку WebP
   */
  function supportsWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Заменяет расширение изображения на WebP если поддерживается
   */
  async function optimizeImages() {
    const supportsWebPFormat = await supportsWebP();
    const images = document.querySelectorAll('img[data-src], img[src]');

    images.forEach(img => {
      // Lazy loading для изображений без data-src (кроме hero секций)
      const isHeroImage = img.closest('.hero') !== null;
      if (img.src && !img.hasAttribute('loading') && !img.hasAttribute('data-src') && !isHeroImage) {
        img.setAttribute('loading', 'lazy');
      }

      // Замена на WebP если поддерживается
      if (supportsWebPFormat && img.src) {
        const src = img.getAttribute('data-src') || img.src;
        if (src && !src.includes('.webp') && (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png'))) {
          const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          // Проверяем существование WebP версии через fetch
          fetch(webpSrc, { method: 'HEAD' })
            .then(response => {
              if (response.ok) {
                img.setAttribute('data-webp', webpSrc);
              }
            })
            .catch(() => {
              // WebP версия не найдена, используем оригинал
            });
        }
      }
    });

    // Инициализация Intersection Observer для lazy loading
    initLazyLoading();
  }

  /**
   * Инициализирует lazy loading для изображений
   */
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Загружаем WebP если доступен
            if (img.hasAttribute('data-webp')) {
              const webpImg = new Image();
              webpImg.onload = () => {
                img.src = img.getAttribute('data-webp');
                img.removeAttribute('data-webp');
              };
              webpImg.onerror = () => {
                // Fallback на оригинальное изображение
                img.removeAttribute('data-webp');
              };
              webpImg.src = img.getAttribute('data-webp');
            } else if (img.hasAttribute('data-src')) {
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
            }
            
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      document.querySelectorAll('img[data-src], img[data-webp]').forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback для старых браузеров
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.getAttribute('data-src');
      });
    }
  }

  /**
   * Оптимизирует загрузку критических изображений
   */
  function optimizeCriticalImages() {
    // Предзагрузка hero изображений
    const heroImages = document.querySelectorAll('.hero img[src], .hero img[data-src]');
    heroImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.getAttribute('data-src') || img.src;
      document.head.appendChild(link);
    });
  }

  // Инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImages();
      optimizeCriticalImages();
    });
  } else {
    optimizeImages();
    optimizeCriticalImages();
  }

  // Экспорт функций
  window.ImageOptimizer = {
    optimizeImages,
    supportsWebP,
    initLazyLoading
  };

})();

