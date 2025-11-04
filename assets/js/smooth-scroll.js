// Smooth Scroll
(function() {
  // Check if browser supports smooth scroll
  if ('scrollBehavior' in document.documentElement.style) {
    return; // Native smooth scroll is supported
  }
  
  // Polyfill for browsers without native smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

