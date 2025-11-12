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

// Минификация CSS
let postcss, cssnano;
try {
  postcss = require("postcss");
  cssnano = require("cssnano");
} catch (e) {
  console.warn("postcss/cssnano не установлены. Минификация CSS будет пропущена.");
}

// Минификация JavaScript
let terser;
try {
  terser = require("terser");
} catch (e) {
  console.warn("terser не установлен. Минификация JavaScript будет пропущена.");
}

module.exports = function(eleventyConfig) {
  // Определяем режим production (по умолчанию true для сборки)
  const isProduction = process.env.NODE_ENV === 'production' || process.env.ELEVENTY_ENV === 'production' || true;
  
  // Структура папок
  // В 11ty 3.x layouts ищутся относительно includes директории
  // Для работы с src/_includes нужно переместить includes в корень или использовать другой подход
  eleventyConfig.dir = {
    input: "src/pages",
    output: "_site",
    includes: "../_includes", // Относительно input (src/pages), поэтому ../_includes = src/_includes
    data: "../_data" // Относительно input (src/pages), поэтому ../_data = src/_data
  };
  
  // Добавляем глобальную переменную для определения production режима
  eleventyConfig.addGlobalData("isProduction", isProduction);
  
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

  // Исключаем служебные директории из сборки
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("**/docs/**");
  eleventyConfig.ignores.add("components/**");
  eleventyConfig.ignores.add("**/components/**");
  eleventyConfig.ignores.add("test-results/**");
  eleventyConfig.ignores.add("playwright-report/**");

  // Добавляем папки для отслеживания изменений
  eleventyConfig.addWatchTarget("src/_includes");
  eleventyConfig.addWatchTarget("src/_layouts");
  eleventyConfig.addWatchTarget("src/_data");
  eleventyConfig.addWatchTarget("assets");

  // Копирование статических файлов
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  // sitemap.xml генерируется автоматически, не копируем старый
  eleventyConfig.addPassthroughCopy("schemas");
  // components/ не копируем - это дубликаты, используются _includes/
  
  // Копирование файлов для production (безопасность и конфигурация)
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addPassthroughCopy(".well-known");
  
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

  // Фильтр для автоматического использования минифицированных файлов в production
  eleventyConfig.addFilter("assetPath", function(path) {
    if (!path) return path;
    
    // Если не production или файл уже имеет .min, возвращаем как есть
    if (!isProduction || path.includes('.min.')) {
      return path;
    }
    
    // Определяем расширение файла
    const cssMatch = path.match(/\.css$/);
    const jsMatch = path.match(/\.js$/);
    
    if (cssMatch) {
      return path.replace('.css', '.min.css');
    } else if (jsMatch) {
      return path.replace('.js', '.min.js');
    }
    
    return path;
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
  // Временно отключено из-за проблем с парсером Nunjucks
  // TODO: Доработать shortcode для корректной работы
  /*
  if (Image) {
    eleventyConfig.addShortcode("image", async function(src, alt = "", widths = [400, 800, 1200], formats = ["webp", "jpeg"]) {
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
  */

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
      
      // Список директорий, которые нужно исключить из sitemap
      const excludedDirs = ['components', 'docs', 'schemas', 'assets', '_includes', 'test-results', 'playwright-report'];
      
      // Функция проверки, нужно ли исключить путь
      const shouldExclude = (relativePath) => {
        if (!relativePath || relativePath === '.') return false;
        
        const pathParts = relativePath.split('/').filter(p => p);
        const fullPath = '/' + relativePath;
        
        // Проверяем, содержит ли путь любую из исключенных директорий
        if (pathParts.some(part => excludedDirs.includes(part))) {
          return true;
        }
        
        // Проверяем, начинается ли путь с исключенных путей
        if (fullPath.startsWith('/assets/') || 
            fullPath.startsWith('/components/') || 
            fullPath.startsWith('/docs/') || 
            fullPath.startsWith('/schemas/')) {
          return true;
        }
        
        return false;
      };
      
      const walkDir = (dir, filelist = []) => {
        // Проверяем существование директории
        if (!fs.existsSync(dir)) {
          return filelist;
        }
        
        try {
          const files = fs.readdirSync(dir);
          files.forEach(file => {
            const filepath = path.join(dir, file);
            
            // КРИТИЧНО: Сначала проверяем расширение файла
            // Если это не HTML и не директория - пропускаем БЕЗ ЛЮБЫХ ПРОВЕРОК
            const isHtmlFile = file.endsWith('.html');
            
            // Для не-HTML файлов проверяем только, является ли это директорией
            // Но делаем это ТОЛЬКО если файл может быть директорией (нет расширения или известное расширение директории)
            if (!isHtmlFile) {
              // Пытаемся проверить, является ли это директорией, но БЕЗОПАСНО
              let isDirectory = false;
              try {
                // Проверяем существование перед lstatSync
                if (fs.existsSync(filepath)) {
                  const stat = fs.lstatSync(filepath);
                  isDirectory = stat.isDirectory();
                } else {
                  // Файл не существует - пропускаем
                  return;
                }
              } catch (e) {
                // Если не можем проверить - пропускаем элемент полностью (это не HTML, нам не нужно)
                return;
              }
              
              // Если это директория - обрабатываем рекурсивно
              if (isDirectory) {
                const dirName = path.basename(filepath);
                if (excludedDirs.includes(dirName)) {
                  return; // Пропускаем исключенные директории
                }
                const dirRelativePath = path.relative(siteDir, filepath).replace(/\\/g, '/');
                if (!shouldExclude(dirRelativePath)) {
                  filelist = walkDir(filepath, filelist);
                }
              }
              // Если это не директория и не HTML - пропускаем полностью
              return;
            }
            
            // Дальше обрабатываем только HTML файлы
            
            // Обрабатываем только HTML файлы
            const relativePath = path.relative(siteDir, filepath).replace(/\\/g, '/');
            
            try {
              // Проверяем существование только для HTML файлов
              if (!fs.existsSync(filepath)) {
                return; // Пропускаем несуществующие HTML файлы
              }
              
              // Это HTML файл
              if (file === 'index.html') {
                const relativePath = path.relative(siteDir, dir).replace(/\\/g, '/');
                
                // Пропускаем index.html в исключенных директориях
                if (relativePath === '.') {
                  filelist.push('/');
                } else if (!shouldExclude(relativePath)) {
                  // Нормализуем путь: убираем двойные слеши, добавляем один слеш в начале и конце
                  let normalizedPath = relativePath.replace(/\/+/g, '/');
                  if (!normalizedPath.startsWith('/')) {
                    normalizedPath = '/' + normalizedPath;
                  }
                  if (!normalizedPath.endsWith('/')) {
                    normalizedPath = normalizedPath + '/';
                  }
                  filelist.push(normalizedPath);
                }
              } else {
                // Проверяем, что путь не исключен
                if (!shouldExclude(relativePath)) {
                  // Нормализуем путь: убираем двойные слеши, добавляем один слеш в начале
                  let normalizedPath = relativePath.replace(/\/+/g, '/');
                  if (!normalizedPath.startsWith('/')) {
                    normalizedPath = '/' + normalizedPath;
                  }
                  filelist.push(normalizedPath);
                }
              }
            } catch (statError) {
              // Игнорируем ошибки для HTML файлов (но выводим предупреждение)
              console.warn(`Warning: Could not process HTML file ${filepath}:`, statError.message);
              return;
            }
          });
        } catch (readError) {
          // Игнорируем ошибки readdirSync
          console.warn(`Warning: Could not read directory ${dir}:`, readError.message);
        }
        
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
      
      // Добавляем остальные страницы (убираем дубликаты и нормализуем)
      const normalizedUrls = urls
        .map(url => {
          // Нормализуем URL: убираем множественные слеши
          let normalized = url.replace(/\/+/g, '/');
          
          // Убираем завершающий слеш для обычных файлов (не index.html директорий)
          if (normalized.endsWith('/') && normalized !== '/' && !normalized.match(/\/[^\/]+\/$/)) {
            normalized = normalized.slice(0, -1);
          }
          
          // Убеждаемся, что начинается с одного слеша
          if (!normalized.startsWith('/')) {
            normalized = '/' + normalized;
          }
          
          return normalized;
        })
        .filter(url => {
          // Фильтруем пустые, двойные слеши и главную страницу
          return url && url !== '' && url !== '/' && url !== '//';
        });
      
      const uniqueUrls = [...new Set(normalizedUrls)]; // Убираем дубликаты
      
      uniqueUrls.forEach(url => {
        // Дополнительная проверка - пропускаем главную страницу, пустые URL и двойные слеши
        if (!url || url === '' || url === '/' || url === '//' || url.match(/^\/+$/)) {
          return;
        }
        
        // Исключаем служебные страницы (404)
        if (url.includes('404') || url.includes('404.html')) {
          return;
        }
        
        // Финальная нормализация URL
        let finalUrl = url
          .replace(/\/index\.html$/, '') // Убираем /index.html в конце
          .replace(/\/+/g, '/') // Убираем множественные слеши
          .replace(/^\/+/, '/') // Убеждаемся, что начинается с одного слеша
          .replace(/\/+$/, (match, offset, string) => {
            // Убираем завершающий слеш, кроме главной страницы
            return string === '/' ? '/' : '';
          });
        
        // Финальная проверка - не должно быть двойных слешей или пустых URL
        if (!finalUrl || finalUrl === '' || finalUrl === '//' || finalUrl.match(/^\/+$/)) {
          return;
        }
        
        let priority = '0.8';
        let changefreq = 'monthly';
        
        // Определяем приоритет и частоту обновления
        if (finalUrl.includes('/blog/')) {
          priority = '0.7';
          changefreq = 'monthly';
        } else if (finalUrl.includes('/katalog/') || finalUrl.includes('/uslugi/')) {
          priority = '0.9';
          changefreq = 'weekly';
        } else if (finalUrl.includes('/brands/')) {
          priority = '0.8';
          changefreq = 'monthly';
        }
        
        // Финальная проверка перед добавлением в sitemap
        // Убеждаемся, что нет двойных слешей между baseUrl и finalUrl
        let fullUrl = baseUrl;
        if (finalUrl.startsWith('/')) {
          fullUrl += finalUrl;
        } else {
          fullUrl += '/' + finalUrl;
        }
        
        // Финальная нормализация - убираем любые двойные слеши
        fullUrl = fullUrl.replace(/([^:]\/)\/+/g, '$1');
        
        // Проверяем, что URL не заканчивается на двойной слеш
        if (fullUrl.endsWith('//')) {
          fullUrl = fullUrl.slice(0, -1);
        }
        
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${fullUrl}</loc>\n`;
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
    
    // Минификация CSS файлов
    if (postcss && cssnano) {
      try {
        const assetsDir = path.join(process.cwd(), '_site', 'assets');
        const cssDir = path.join(assetsDir, 'css');
        
        if (fs.existsSync(cssDir)) {
          const minifyCSS = async (filePath) => {
            try {
              const cssContent = fs.readFileSync(filePath, 'utf8');
              const result = await postcss([cssnano({
                preset: ['default', {
                  discardComments: { removeAll: true },
                }]
              })]).process(cssContent, { from: filePath });
              
              const minifiedPath = filePath.replace('.css', '.min.css');
              fs.writeFileSync(minifiedPath, result.css, 'utf8');
              return true;
            } catch (error) {
              console.warn(`Ошибка при минификации CSS ${filePath}:`, error.message);
              return false;
            }
          };
          
          const walkAndMinifyCSS = async (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
              const filePath = path.join(dir, file);
              const stat = fs.statSync(filePath);
              
              if (stat.isDirectory()) {
                await walkAndMinifyCSS(filePath);
              } else if (file.endsWith('.css') && !file.endsWith('.min.css')) {
                await minifyCSS(filePath);
              }
            }
          };
          
          await walkAndMinifyCSS(cssDir);
          console.log('✅ CSS файлы минифицированы');
        }
      } catch (error) {
        console.warn('Ошибка при минификации CSS:', error.message);
      }
    }
    
    // Минификация JavaScript файлов
    if (terser) {
      try {
        const assetsDir = path.join(process.cwd(), '_site', 'assets');
        const jsDir = path.join(assetsDir, 'js');
        
        if (fs.existsSync(jsDir)) {
          const minifyJS = async (filePath) => {
            try {
              const jsContent = fs.readFileSync(filePath, 'utf8');
              const result = await terser.minify(jsContent, {
                compress: {
                  drop_console: false, // Сохраняем console для отладки
                  passes: 2
                },
                format: {
                  comments: false
                }
              });
              
              if (result.error) {
                throw result.error;
              }
              
              const minifiedPath = filePath.replace('.js', '.min.js');
              fs.writeFileSync(minifiedPath, result.code, 'utf8');
              return true;
            } catch (error) {
              console.warn(`Ошибка при минификации JS ${filePath}:`, error.message);
              return false;
            }
          };
          
          const walkAndMinifyJS = async (dir) => {
            const files = fs.readdirSync(dir);
            for (const file of files) {
              const filePath = path.join(dir, file);
              const stat = fs.statSync(filePath);
              
              if (stat.isDirectory()) {
                await walkAndMinifyJS(filePath);
              } else if (file.endsWith('.js') && !file.endsWith('.min.js')) {
                await minifyJS(filePath);
              }
            }
          };
          
          await walkAndMinifyJS(jsDir);
          console.log('✅ JavaScript файлы минифицированы');
        }
      } catch (error) {
        console.warn('Ошибка при минификации JavaScript:', error.message);
      }
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

