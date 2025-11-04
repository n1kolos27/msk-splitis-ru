/* ============================================
   Mobile Menu Enhancement
   ============================================ */

(function() {
  'use strict';

  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__nav-link, .mobile-menu__phone, .mobile-menu__social-link, .mobile-menu__contact-link') : [];

  // Fix SVG icon sizes (prevent giant icons issue)
  function fixIconSizes() {
    const socialIcons = document.querySelectorAll('.mobile-menu__social-icon, .mobile-menu__social-link svg');
    const contactIcons = document.querySelectorAll('.mobile-menu__contact-icon, .mobile-menu__contact-link svg');
    
    socialIcons.forEach(icon => {
      icon.setAttribute('width', '24');
      icon.setAttribute('height', '24');
      icon.style.setProperty('width', '24px', 'important');
      icon.style.setProperty('height', '24px', 'important');
      icon.style.setProperty('max-width', '24px', 'important');
      icon.style.setProperty('max-height', '24px', 'important');
      icon.style.setProperty('min-width', '24px', 'important');
      icon.style.setProperty('min-height', '24px', 'important');
      icon.style.setProperty('display', 'block', 'important');
      icon.style.setProperty('flex-shrink', '0', 'important');
    });
    
    contactIcons.forEach(icon => {
      icon.setAttribute('width', '20');
      icon.setAttribute('height', '20');
      icon.style.setProperty('width', '20px', 'important');
      icon.style.setProperty('height', '20px', 'important');
      icon.style.setProperty('max-width', '20px', 'important');
      icon.style.setProperty('max-height', '20px', 'important');
      icon.style.setProperty('min-width', '20px', 'important');
      icon.style.setProperty('min-height', '20px', 'important');
      icon.style.setProperty('display', 'block', 'important');
      icon.style.setProperty('flex-shrink', '0', 'important');
    });
  }

  // Open menu
  function openMenu() {
    if (!mobileMenu || !menuToggle) return;
    
    mobileMenu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
    
    // Fix icon sizes when menu opens
    setTimeout(fixIconSizes, 0);
    
    // Focus management
    menuClose?.focus();
    
    // Prevent background scroll
    document.addEventListener('touchmove', preventScroll, { passive: false });
  }

  // Close menu
  function closeMenu() {
    if (!mobileMenu || !menuToggle) return;
    
    mobileMenu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Return focus to toggle button
    menuToggle.focus();
    
    // Remove scroll prevention
    document.removeEventListener('touchmove', preventScroll);
  }

  // Prevent scroll on background
  function preventScroll(e) {
    if (!mobileMenu?.classList.contains('mobile-menu--open')) return;
    if (mobileMenu.contains(e.target)) return;
    e.preventDefault();
  }

  // Toggle menu
  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileMenu.classList.contains('mobile-menu--open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Keyboard support for toggle
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (mobileMenu.classList.contains('mobile-menu--open')) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    });
  }

  // Close button
  if (menuClose) {
    menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });

    menuClose.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeMenu();
      }
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  }

  // Close menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
  }

  // Close menu when clicking on links
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Small delay for better UX
      setTimeout(closeMenu, 150);
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('mobile-menu--open')) {
      closeMenu();
    }
  });

  // Trap focus within menu when open
  if (mobileMenu) {
    const focusableElements = mobileMenu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    mobileMenu.addEventListener('keydown', (e) => {
      if (!mobileMenu.classList.contains('mobile-menu--open')) return;

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    });
  }

  // Initialize aria-expanded
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  // Initialize icon sizes on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixIconSizes);
  } else {
    fixIconSizes();
  }
})();

