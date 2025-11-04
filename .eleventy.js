// 11ty (Eleventy) Configuration
// Конфигурация для миграции проекта на 11ty

let htmlmin;
try {
  htmlmin = require("html-minifier");
} catch (e) {
  // html-minifier не установлен, минификация будет пропущена
  console.warn("html-minifier не установлен. Установите: npm install --save-dev html-minifier");
}

// Оптимизация изображений
let Image;
try {
  Image = require("@11ty/eleventy-img");
} catch (e) {
  console.warn("@11ty/eleventy-img не установлен. Оптимизация изображений будет пропущена.");
}

module.exports = function(eleventyConfig) {
  // Структура папок
  // В 11ty 3.x layouts ищутся относительно includes директории
  // Для работы с src/_includes нужно переместить includes в корень или использовать другой подход
  eleventyConfig.dir = {
    input: "src/pages",
    output: "_site",
    includes: "../_includes", // Относительно input (src/pages), поэтому ../_includes = src/_includes
    data: "../_data" // Относительно input (src/pages), поэтому ../_data = src/_data
  };
  
  // Загружаем данные из JSON файлов через addGlobalData для глобальной доступности
  const fs = require('fs');
  const path = require('path');
  
  try {
    const siteDataPath = path.join(process.cwd(), 'src', '_data', 'site.json');
    const contactsDataPath = path.join(process.cwd(), 'src', '_data', 'contacts.json');
    const navigationDataPath = path.join(process.cwd(), 'src', '_data', 'navigation.json');
    
    if (fs.existsSync(siteDataPath)) {
      const siteData = JSON.parse(fs.readFileSync(siteDataPath, 'utf8'));
      eleventyConfig.addGlobalData('site', siteData);
    }
    
    if (fs.existsSync(contactsDataPath)) {
      const contactsData = JSON.parse(fs.readFileSync(contactsDataPath, 'utf8'));
      eleventyConfig.addGlobalData('contacts', contactsData);
    }
    
    if (fs.existsSync(navigationDataPath)) {
      const navigationData = JSON.parse(fs.readFileSync(navigationDataPath, 'utf8'));
      eleventyConfig.addGlobalData('navigation', navigationData);
    }
  } catch (error) {
    console.warn('Error loading global data:', error.message);
  }
  
  // Копируем файлы из src/_includes в _includes для использования в layouts
  // Это делается через addPassthroughCopy или вручную

  // Добавляем поддержку файлов без front matter
  eleventyConfig.setDataFileSuffixes([".json", ".11tydata"]);

  // Добавляем папки для отслеживания изменений
  eleventyConfig.addWatchTarget("src/_includes");
  eleventyConfig.addWatchTarget("src/_layouts");
  eleventyConfig.addWatchTarget("src/_data");
  eleventyConfig.addWatchTarget("assets");

  // Копирование статических файлов
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("schemas");
  eleventyConfig.addPassthroughCopy("components");
  
  // Копирование из src/pages в корень _site (если есть)
  eleventyConfig.addPassthroughCopy({
    "src/pages/assets": "assets"
  });
  
  // Копирование favicon если он в корне
  eleventyConfig.addPassthroughCopy("favicon.ico");

  // Минификация HTML
  if (htmlmin) {
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        });
        return minified;
      }
      return content;
    });
  }

  // Фильтры для форматирования
  eleventyConfig.addFilter("formatPhone", function(phone) {
    if (!phone) return "";
    return phone.replace(/\D/g, "");
  });

  // Фильтр для форматирования даты
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    return d.toLocaleDateString("ru-RU", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  });

  // Фильтр для URL
  eleventyConfig.addFilter("absoluteUrl", function(url) {
    return `https://msk.splitis.ru${url}`;
  });

  // Фильтр для URL encoding
  eleventyConfig.addFilter("urlencode", function(str) {
    return encodeURIComponent(str);
  });

  // Фильтр для проверки массива
  eleventyConfig.addFilter("isArray", function(value) {
    return Array.isArray(value);
  });

  // Фильтр для JSON парсинга (если schema строка)
  eleventyConfig.addFilter("parseJson", function(str) {
    if (!str) return null;
    if (typeof str === 'object' && !Array.isArray(str)) return str; // Уже объект
    if (Array.isArray(str)) return str; // Уже массив
    if (typeof str !== 'string') return str;
    try {
      // Обрабатываем многострочные строки из YAML
      // Убираем начальные пробелы и символы |
      const cleaned = str.trim()
        .split('\n')
        .map(line => {
          // Убираем символы | и лишние пробелы в начале
          const trimmed = line.replace(/^\s*\|\s*/, '').trim();
          return trimmed;
        })
        .filter(line => line.length > 0 && !line.match(/^\s*$/))
        .join('\n');
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (e) {
      console.warn('parseJson error:', e.message, 'Input:', str.substring(0, 100));
      // Если не удалось распарсить, возвращаем как есть
      return str;
    }
  });

  // Фильтр для JSON stringify
  eleventyConfig.addFilter("stringify", function(obj) {
    return JSON.stringify(obj, null, 2);
  });

  // Фильтр для автоматической генерации Schema.org разметки
  eleventyConfig.addFilter("generateSchema", function(page) {
    const baseUrl = 'https://msk.splitis.ru';
    
    // Базовый WebPage schema
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": page.title || page.data?.title || "Кондиционеры в Москве",
      "description": page.description || page.data?.description || "",
      "url": baseUrl + (page.url || '/'),
      "inLanguage": "ru-RU"
    };

    // Если есть организация, добавляем Organization schema
    if (page.data?.site) {
      const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": page.data.site.name || "ИП Лагуто Иван Иванович",
        "url": baseUrl,
        "logo": baseUrl + "/assets/images/logo.svg",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+7-499-757-57-19",
          "contactType": "customer service",
          "areaServed": "RU",
          "availableLanguage": "Russian"
        }
      };
      
      return [organizationSchema, webPageSchema];
    }

    return webPageSchema;
  });

  // Оптимизация изображений
  if (Image) {
    eleventyConfig.addShortcode("image", async function(src, alt, widths = [400, 800, 1200], formats = ["webp", "jpeg"]) {
      if (!src) return "";
      
      // Путь к исходному изображению
      const imagePath = `./assets/images/${src}`;
      
      try {
        let metadata = await Image(imagePath, {
          widths: widths,
          formats: formats,
          outputDir: "./_site/assets/images/optimized/",
          urlPath: "/assets/images/optimized/",
          sharpOptions: {
            quality: 85
          }
        });

        let imageAttributes = {
          alt: alt || "",
          loading: "lazy",
          decoding: "async",
        };

        // Генерируем HTML для изображения
        const picture = Image.generateHTML(metadata, imageAttributes);
        return picture;
      } catch (error) {
        console.warn(`Ошибка при оптимизации изображения ${src}:`, error.message);
        // Возвращаем fallback
        return `<img src="/assets/images/${src}" alt="${alt || ''}" loading="lazy">`;
      }
    });
  }

  // Автоматическая генерация sitemap.xml
  eleventyConfig.on('eleventy.after', async () => {
    const fs = require('fs');
    const path = require('path');
    
    try {
      // Получаем все страницы из коллекции
      const pages = eleventyConfig.getCollections().getAll ? 
        eleventyConfig.getCollections().getAll() : [];
      
      const baseUrl = 'https://msk.splitis.ru';
      const sitemapPath = path.join(process.cwd(), '_site', 'sitemap.xml');
      
      let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      
      // Собираем все HTML страницы из _site
      const siteDir = path.join(process.cwd(), '_site');
      const walkDir = (dir, filelist = []) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filepath = path.join(dir, file);
          if (fs.statSync(filepath).isDirectory()) {
            filelist = walkDir(filepath, filelist);
          } else if (file.endsWith('.html') && file !== 'index.html') {
            const relativePath = path.relative(siteDir, filepath).replace(/\\/g, '/');
            filelist.push('/' + relativePath);
          } else if (file === 'index.html') {
            const relativePath = path.relative(siteDir, dir).replace(/\\/g, '/');
            if (relativePath === '.') {
              filelist.push('/');
            } else {
              filelist.push('/' + relativePath + '/');
            }
          }
        });
        return filelist;
      };
      
      const urls = walkDir(siteDir);
      const today = new Date().toISOString().split('T')[0];
      
      // Добавляем главную страницу
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/</loc>\n`;
      sitemap += `    <lastmod>${today}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>1.0</priority>\n`;
      sitemap += `  </url>\n`;
      
      // Добавляем остальные страницы
      urls.forEach(url => {
        if (url === '/') return; // Главная уже добавлена
        
        let priority = '0.8';
        let changefreq = 'monthly';
        
        // Определяем приоритет и частоту обновления
        if (url.includes('/blog/')) {
          priority = '0.7';
          changefreq = 'monthly';
        } else if (url.includes('/katalog/') || url.includes('/uslugi/')) {
          priority = '0.9';
          changefreq = 'weekly';
        } else if (url.includes('/brands/')) {
          priority = '0.8';
          changefreq = 'monthly';
        }
        
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${baseUrl}${url.replace(/\/index\.html$/, '/')}</loc>\n`;
        sitemap += `    <lastmod>${today}</lastmod>\n`;
        sitemap += `    <changefreq>${changefreq}</changefreq>\n`;
        sitemap += `    <priority>${priority}</priority>\n`;
        sitemap += `  </url>\n`;
      });
      
      sitemap += '</urlset>';
      
      // Сохраняем sitemap
      fs.writeFileSync(sitemapPath, sitemap, 'utf8');
      console.log('✅ Sitemap.xml сгенерирован автоматически');
    } catch (error) {
      console.warn('Ошибка при генерации sitemap:', error.message);
    }
  });

  return {
    // Используем Nunjucks как основной шаблонизатор
    templateFormats: ["html", "njk", "liquid", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};

