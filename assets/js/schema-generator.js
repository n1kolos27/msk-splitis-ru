/* ============================================
   Schema.org Generator
   Генерация Schema.org JSON-LD разметки
   ============================================ */

(function() {
  'use strict';

  /**
   * Базовые данные организации
   */
  const ORGANIZATION_DATA = {
    name: 'ИП Лагуто Иван Иванович',
    legalName: 'ИП Лагуто Иван Иванович',
    url: 'https://msk.splitis.ru',
    logo: 'https://msk.splitis.ru/assets/images/logo.svg',
    foundingDate: '2010',
    email: 'info@msk.splitis.ru',
    address: {
      streetAddress: 'ул. Веры Волошиной, д. 19/16, офис 229',
      addressLocality: 'Мытищи',
      addressRegion: 'Московская область',
      postalCode: '141000',
      addressCountry: 'RU'
    },
    contactPoint: [
      {
        telephone: '+7-499-757-57-19',
        contactType: 'customer service',
        areaServed: 'RU',
        availableLanguage: 'Russian'
      },
      {
        telephone: '+7-903-236-60-50',
        contactType: 'customer service',
        areaServed: 'RU',
        availableLanguage: 'Russian'
      }
    ],
    sameAs: [
      'https://t.me/msk_splitis_ru',
      'https://wa.me/79032366050'
    ]
  };

  /**
   * Генерирует Organization Schema.org
   * @returns {Object} Organization schema
   */
  function generateOrganization() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ORGANIZATION_DATA.name,
      legalName: ORGANIZATION_DATA.legalName,
      url: ORGANIZATION_DATA.url,
      logo: ORGANIZATION_DATA.logo,
      foundingDate: ORGANIZATION_DATA.foundingDate,
      contactPoint: ORGANIZATION_DATA.contactPoint,
      email: ORGANIZATION_DATA.email,
      address: {
        '@type': 'PostalAddress',
        ...ORGANIZATION_DATA.address
      },
      sameAs: ORGANIZATION_DATA.sameAs
    };
  }

  /**
   * Генерирует LocalBusiness Schema.org
   * @param {Object} options - Дополнительные опции
   * @returns {Object} LocalBusiness schema
   */
  function generateLocalBusiness(options = {}) {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: options.name || 'Кондиционеры с установкой в Москве',
      alternateName: options.alternateName || 'msk.splitis.ru',
      image: options.image || 'https://msk.splitis.ru/assets/images/og-image.jpg',
      description: options.description || 'Продажа, установка и обслуживание кондиционеров в Москве и Московской области. Официальная гарантия до 5 лет, опыт работы 14 лет, более 3850 выполненных установок.',
      telephone: ORGANIZATION_DATA.contactPoint.map(cp => cp.telephone),
      email: ORGANIZATION_DATA.email,
      address: {
        '@type': 'PostalAddress',
        ...ORGANIZATION_DATA.address
      },
      geo: options.geo || {
        '@type': 'GeoCoordinates',
        latitude: 55.9116,
        longitude: 37.7308
      },
      url: ORGANIZATION_DATA.url,
      priceRange: options.priceRange || '$$',
      openingHoursSpecification: options.openingHours || [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00'
      }],
      aggregateRating: options.rating || {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1'
      },
      areaServed: options.areaServed || [
        { '@type': 'City', name: 'Москва' },
        { '@type': 'City', name: 'Мытищи' },
        { '@type': 'State', name: 'Московская область' }
      ],
      serviceArea: options.serviceArea || {
        '@type': 'City',
        name: ['Москва', 'Мытищи', 'Московская область']
      }
    };
  }

  /**
   * Генерирует Service Schema.org
   * @param {Object} options - Опции услуги
   * @returns {Object} Service schema
   */
  function generateService(options) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: options.serviceType || 'Услуга',
      name: options.name || 'Услуга',
      description: options.description || '',
      provider: {
        '@type': 'Organization',
        name: ORGANIZATION_DATA.name,
        url: ORGANIZATION_DATA.url,
        logo: ORGANIZATION_DATA.logo
      },
      areaServed: options.areaServed || [
        { '@type': 'City', name: 'Москва' },
        { '@type': 'State', name: 'Московская область' }
      ],
      offers: options.offers || {
        '@type': 'Offer',
        priceCurrency: 'RUB',
        price: '0',
        availability: 'https://schema.org/InStock'
      }
    };
  }

  /**
   * Генерирует Product Schema.org
   * @param {Object} options - Опции товара
   * @returns {Object} Product schema
   */
  function generateProduct(options) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: options.name || 'Товар',
      description: options.description || '',
      image: options.image || 'https://msk.splitis.ru/assets/images/products/product.jpg',
      sku: options.sku || '',
      brand: options.brand ? {
        '@type': 'Brand',
        name: options.brand
      } : undefined,
      offers: options.offers || {
        '@type': 'Offer',
        url: options.url || ORGANIZATION_DATA.url,
        priceCurrency: 'RUB',
        price: '0',
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: ORGANIZATION_DATA.name
        }
      },
      aggregateRating: options.rating || {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '0',
        bestRating: '5',
        worstRating: '1'
      },
      additionalProperty: options.properties || []
    };
  }

  /**
   * Генерирует Article Schema.org
   * @param {Object} options - Опции статьи
   * @returns {Object} Article schema
   */
  function generateArticle(options) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: options.headline || 'Статья',
      description: options.description || '',
      image: options.image || 'https://msk.splitis.ru/assets/images/og-image.jpg',
      datePublished: options.datePublished || new Date().toISOString(),
      dateModified: options.dateModified || new Date().toISOString(),
      author: {
        '@type': 'Organization',
        name: ORGANIZATION_DATA.name,
        url: ORGANIZATION_DATA.url
      },
      publisher: {
        '@type': 'Organization',
        name: ORGANIZATION_DATA.name,
        url: ORGANIZATION_DATA.url,
        logo: {
          '@type': 'ImageObject',
          url: ORGANIZATION_DATA.logo
        }
      },
      articleSection: options.section || 'Блог'
    };
  }

  /**
   * Генерирует WebSite Schema.org
   * @param {Object} options - Опции
   * @returns {Object} WebSite schema
   */
  function generateWebSite(options = {}) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: options.name || 'msk.splitis.ru',
      url: ORGANIZATION_DATA.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${ORGANIZATION_DATA.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    };
  }

  /**
   * Генерирует BreadcrumbList Schema.org
   * @param {Array} items - Массив элементов breadcrumbs
   * @returns {Object} BreadcrumbList schema
   */
  function generateBreadcrumbList(items) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  /**
   * Генерирует FAQPage Schema.org
   * @param {Array} faqs - Массив вопросов-ответов
   * @returns {Object} FAQPage schema
   */
  function generateFAQPage(faqs) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  /**
   * Вставляет Schema.org разметку в документ
   * @param {Object} schema - Schema объект
   * @param {string} id - ID для скрипта (опционально)
   */
  function insertSchema(schema, id = null) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    if (id) {
      script.id = id;
    }
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  }

  // Экспорт функций
  window.SchemaGenerator = {
    generateOrganization,
    generateLocalBusiness,
    generateService,
    generateProduct,
    generateArticle,
    generateWebSite,
    generateBreadcrumbList,
    generateFAQPage,
    insertSchema,
    ORGANIZATION_DATA
  };

})();

