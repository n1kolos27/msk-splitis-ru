/* ============================================
   SEO Schema.org Helper
   ============================================ */

(function() {
  'use strict';

  /**
   * Creates Product schema for a product card
   */
  function createProductSchema(productData) {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productData.name,
      "description": productData.description || "",
      "image": productData.image || "",
      "sku": productData.sku || "",
      "brand": {
        "@type": "Brand",
        "name": productData.brand || ""
      },
      "offers": {
        "@type": "Offer",
        "url": productData.url || window.location.href,
        "priceCurrency": "RUB",
        "price": productData.price || "0",
        "priceValidUntil": productData.priceValidUntil || "2025-12-31",
        "availability": productData.availability || "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "ИП Лагуто Иван Иванович"
        }
      },
      "aggregateRating": productData.rating ? {
        "@type": "AggregateRating",
        "ratingValue": productData.rating.value || "0",
        "reviewCount": productData.rating.count || "0",
        "bestRating": "5",
        "worstRating": "1"
      } : undefined
    };
  }

  /**
   * Creates BreadcrumbList schema
   */
  function createBreadcrumbSchema(items) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  }

  /**
   * Creates FAQPage schema
   */
  function createFAQSchema(questions) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
  }

  /**
   * Adds schema to page
   */
  function addSchema(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  /**
   * Auto-generate breadcrumbs from breadcrumbs component
   */
  function autoGenerateBreadcrumbs() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;

    const items = [];
    const links = breadcrumbs.querySelectorAll('a');
    
    links.forEach(link => {
      items.push({
        name: link.textContent.trim(),
        url: link.href
      });
    });

    // Add current page if it's not a link
    const current = breadcrumbs.querySelector('.breadcrumbs__item--current');
    if (current) {
      items.push({
        name: current.textContent.trim(),
        url: window.location.href
      });
    }

    if (items.length > 0) {
      const schema = createBreadcrumbSchema(items);
      addSchema(schema);
    }
  }

  /**
   * Auto-generate FAQ schema from FAQ component
   */
  function autoGenerateFAQ() {
    const faqItems = document.querySelectorAll('.faq__item');
    if (faqItems.length === 0) return;

    const questions = [];
    faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      
      if (question && answer) {
        questions.push({
          question: question.textContent.trim(),
          answer: answer.textContent.trim()
        });
      }
    });

    if (questions.length > 0) {
      const schema = createFAQSchema(questions);
      addSchema(schema);
    }
  }

  /**
   * Initialize SEO schemas
   */
  function initSEO() {
    autoGenerateBreadcrumbs();
    autoGenerateFAQ();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSEO);
  } else {
    initSEO();
  }

  // Export functions for manual use
  window.SEOSchema = {
    createProductSchema,
    createBreadcrumbSchema,
    createFAQSchema,
    addSchema
  };
})();

