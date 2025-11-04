// Theme Switcher
(function() {
  const themeButtons = document.querySelectorAll('[data-theme]');
  
  themeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const theme = this.getAttribute('data-theme');
      const currentUrl = window.location.href.split('#')[0];
      window.location.href = currentUrl + '#' + theme;
    });
  });
})();

