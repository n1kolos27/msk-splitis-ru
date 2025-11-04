/* ============================================
   Reveal on Scroll Animation
   ============================================ */

(function() {
  'use strict';

  // Check if element is in viewport
  function isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementHeight = rect.bottom - rect.top;
    
    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    );
  }

  // Reveal element
  function revealElement(element) {
    if (!element.classList.contains('revealed')) {
      element.classList.add('revealed');
      
      // Dispatch custom event
      const event = new CustomEvent('revealed', {
        detail: { element }
      });
      element.dispatchEvent(event);
    }
  }

  // Check all reveal elements
  function checkReveals() {
    const revealElements = document.querySelectorAll('.reveal:not(.revealed)');
    
    revealElements.forEach(element => {
      if (isInViewport(element)) {
        revealElement(element);
      }
    });
  }

  // Initialize reveal on scroll
  function initRevealOnScroll() {
    // Check on load
    checkReveals();
    
    // Check on scroll (with throttle)
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkReveals();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Check on resize
    window.addEventListener('resize', checkReveals);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRevealOnScroll);
  } else {
    initRevealOnScroll();
  }
})();

