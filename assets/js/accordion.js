/* ============================================
   FAQ Accordion Enhancement
   ============================================ */

(function() {
  'use strict';

  const faqItems = document.querySelectorAll('.faq__item');
  
  faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    
    if (!question || !answer) return;

    // Initialize ARIA attributes
    const questionId = question.id || `faq-question-${index + 1}`;
    const answerId = answer.id || `faq-answer-${index + 1}`;
    
    if (!question.id) question.id = questionId;
    if (!answer.id) answer.id = answerId;
    
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('aria-controls', answerId);
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', questionId);

    // Toggle function
    function toggleItem() {
      const isOpen = item.classList.contains('faq__item--open');
      
      // Close all items (optional - can be changed to allow multiple open)
      faqItems.forEach(otherItem => {
        const otherQuestion = otherItem.querySelector('.faq__question');
        const otherAnswer = otherItem.querySelector('.faq__answer');
        otherItem.classList.remove('faq__item--open');
        if (otherQuestion) {
          otherQuestion.setAttribute('aria-expanded', 'false');
        }
        if (otherAnswer) {
          otherAnswer.setAttribute('aria-hidden', 'true');
        }
      });
      
      // Open clicked item if it wasn't open
      if (!isOpen) {
        item.classList.add('faq__item--open');
        question.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
        
        // Smooth scroll into view if needed
        setTimeout(() => {
          question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
      }
    }

    // Click handler
    question.addEventListener('click', (e) => {
      e.preventDefault();
      toggleItem();
    });

    // Keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem();
      }
      // Arrow key navigation (optional)
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextItem = faqItems[index + 1];
        if (nextItem) {
          nextItem.querySelector('.faq__question')?.focus();
        }
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevItem = faqItems[index - 1];
        if (prevItem) {
          prevItem.querySelector('.faq__question')?.focus();
        }
      }
    });

    // Initialize aria-hidden
    answer.setAttribute('aria-hidden', 'true');
  });
})();

