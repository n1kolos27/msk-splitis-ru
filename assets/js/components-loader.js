/* ============================================
   Components Loader
   Загрузка компонентов header, footer, breadcrumbs
   ============================================ */

(function() {
  'use strict';

  /**
   * Загружает компонент и вставляет его в указанный элемент
   * @param {string} componentName - Имя компонента (header, footer, breadcrumbs)
   * @param {HTMLElement} targetElement - Целевой элемент для вставки
   * @param {Object} options - Дополнительные опции (например, активная страница для навигации)
   */
  async function loadComponent(componentName, targetElement, options = {}) {
    if (!targetElement) {
      console.warn(`Target element not found for component: ${componentName}`);
      return;
    }

    try {
      const response = await fetch(`components/${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }
      
      let html = await response.text();
      
      // Применяем опции (например, устанавливаем активную ссылку в навигации)
      if (options.activePage) {
        html = setActiveNavLink(html, options.activePage);
      }
      
      // Вставляем HTML
      targetElement.innerHTML = html;
      
      // Инициализируем компонент после загрузки
      initializeComponent(componentName, targetElement);
      
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
      // Fallback: показываем сообщение об ошибке
      targetElement.innerHTML = `<!-- Component ${componentName} failed to load -->`;
    }
  }

  /**
   * Устанавливает активную ссылку в навигации
   * @param {string} html - HTML код компонента
   * @param {string} activePage - URL активной страницы
   * @returns {string} - Обновленный HTML
   */
  function setActiveNavLink(html, activePage) {
    // Создаем временный элемент для парсинга
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Находим все ссылки навигации
    const navLinks = tempDiv.querySelectorAll('.header__nav-link, .mobile-menu__nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Проверяем, соответствует ли ссылка текущей странице
      if (href === activePage || (activePage !== '/' && href === activePage)) {
        link.classList.add('header__nav-link--active');
      }
    });
    
    return tempDiv.innerHTML;
  }

  /**
   * Инициализирует компонент после загрузки
   * @param {string} componentName - Имя компонента
   * @param {HTMLElement} element - Элемент компонента
   */
  function initializeComponent(componentName, element) {
    switch(componentName) {
      case 'header':
        // Инициализация мобильного меню (если скрипт еще не загружен)
        if (typeof window.initMobileMenu === 'function') {
          window.initMobileMenu();
        }
        break;
      case 'footer':
        // Инициализация футера (если нужно)
        break;
      case 'breadcrumbs':
        // Инициализация breadcrumbs (если нужно)
        break;
    }
  }

  /**
   * Загружает компонент по ID плейсхолдера
   * @param {string} placeholderId - ID плейсхолдера
   * @param {string} componentPath - Путь к компоненту
   */
  async function loadComponentById(placeholderId, componentPath) {
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
      try {
        const response = await fetch(componentPath);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        placeholder.innerHTML = html;
      } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
      }
    }
  }

  /**
   * Загружает все компоненты на странице
   */
  function loadAllComponents() {
    // Определяем текущую страницу для активной ссылки
    const currentPage = window.location.pathname;
    
    // Загружаем header (поддержка обоих методов)
    const headerContainer = document.querySelector('[data-component="header"]') || document.getElementById('header-placeholder');
    if (headerContainer) {
      if (headerContainer.id === 'header-placeholder') {
        loadComponentById('header-placeholder', '/components/header.html');
      } else {
        loadComponent('header', headerContainer, { activePage: currentPage });
      }
    }

    // Загружаем footer (поддержка обоих методов)
    const footerContainer = document.querySelector('[data-component="footer"]') || document.getElementById('footer-placeholder');
    if (footerContainer) {
      if (footerContainer.id === 'footer-placeholder') {
        loadComponentById('footer-placeholder', '/components/footer.html');
      } else {
        loadComponent('footer', footerContainer);
      }
    }

    // Загружаем breadcrumbs (поддержка обоих методов)
    const breadcrumbsContainer = document.querySelector('[data-component="breadcrumbs"]') || document.getElementById('breadcrumbs-placeholder');
    if (breadcrumbsContainer) {
      if (breadcrumbsContainer.id === 'breadcrumbs-placeholder') {
        loadComponentById('breadcrumbs-placeholder', '/components/breadcrumbs.html');
      } else {
        loadComponent('breadcrumbs', breadcrumbsContainer);
      }
    }
  }

  // Загружаем компоненты когда DOM готов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
  } else {
    loadAllComponents();
  }

  // Экспортируем функцию для ручной загрузки компонентов
  window.loadComponent = loadComponent;

})();

