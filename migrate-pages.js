const fs = require('fs');
const path = require('path');

// Функция для извлечения метаданных из HTML
function extractMetadata(html) {
  const metadata = {};
  
  // Title
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  if (titleMatch) {
    metadata.title = titleMatch[1].trim();
  }
  
  // Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (descMatch) {
    metadata.description = descMatch[1].trim();
  }
  
  // Keywords
  const keywordsMatch = html.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["']/i);
  if (keywordsMatch) {
    metadata.keywords = keywordsMatch[1].trim();
  }
  
  // OG Title
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
  if (ogTitleMatch) {
    metadata.ogTitle = ogTitleMatch[1].trim();
  }
  
  // OG Description
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
  if (ogDescMatch) {
    metadata.ogDescription = ogDescMatch[1].trim();
  }
  
  // OG Image
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  if (ogImageMatch) {
    metadata.ogImage = ogImageMatch[1].replace('https://msk.splitis.ru', '').trim();
  }
  
  // Canonical
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  if (canonicalMatch) {
    metadata.canonical = canonicalMatch[1].replace('https://msk.splitis.ru', '').trim();
  }
  
  return metadata;
}

// Функция для извлечения Schema.org JSON-LD
function extractSchema(html) {
  const schemas = [];
  const schemaRegex = /<script\s+type=["']application\/ld\+json["']>(.*?)<\/script>/gis;
  let match;
  
  while ((match = schemaRegex.exec(html)) !== null) {
    try {
      const schema = JSON.parse(match[1].trim());
      schemas.push(schema);
    } catch (e) {
      console.warn('Failed to parse schema:', e.message);
    }
  }
  
  return schemas.length > 0 ? schemas : null;
}

// Функция для извлечения контента из <main>
function extractContent(html) {
  // Удаляем header и footer
  html = html.replace(/<!-- Header Placeholder -->[\s\S]*?<!-- Old header[^]*?<\/header>/gi, '');
  html = html.replace(/<!-- Footer Placeholder -->[\s\S]*?<!-- Old footer[^]*?<\/footer>/gi, '');
  html = html.replace(/<!-- Mobile Menu -->[\s\S]*?<\/div>\s*<\/div>/gi, '');
  html = html.replace(/<!-- Theme anchors -->[\s\S]*?<\/span>/gi, '');
  
  // Извлекаем контент из <main>
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    let content = mainMatch[1].trim();
    
    // Удаляем breadcrumbs placeholder
    content = content.replace(/<!-- Breadcrumbs Placeholder -->[\s\S]*?<div[^>]*id=["']breadcrumbs-placeholder["'][^>]*>[\s\S]*?<\/div>/gi, '');
    content = content.replace(/<div[^>]*id=["']breadcrumbs-placeholder["'][^>]*>[\s\S]*?<\/div>/gi, '');
    
    // Конвертируем пути к assets
    content = content.replace(/src=["']assets\//g, 'src="/assets/');
    content = content.replace(/href=["']assets\//g, 'href="/assets/');
    content = content.replace(/srcset=["']assets\//g, 'srcset="/assets/');
    
    return content;
  }
  
  return '';
}

// Функция для создания front matter
function createFrontMatter(metadata, schemas) {
  const frontMatter = {
    layout: 'page.html',
  };
  
  if (metadata.title) {
    frontMatter.title = metadata.title;
  }
  
  if (metadata.description) {
    frontMatter.description = metadata.description;
  }
  
  if (metadata.keywords) {
    frontMatter.keywords = metadata.keywords;
  }
  
  if (metadata.ogImage) {
    frontMatter.ogImage = metadata.ogImage;
  }
  
  if (schemas && schemas.length > 0) {
    // Если несколько схем, объединяем в массив JSON
    if (schemas.length === 1) {
      frontMatter.schema = JSON.stringify(schemas[0], null, 2);
    } else {
      frontMatter.schema = JSON.stringify(schemas, null, 2);
    }
  }
  
  // Форматируем front matter
  let fm = '---\n';
  for (const [key, value] of Object.entries(frontMatter)) {
    if (key === 'schema') {
      fm += `${key}: |\n`;
      const lines = value.split('\n');
      for (const line of lines) {
        fm += `  ${line}\n`;
      }
    } else {
      fm += `${key}: ${JSON.stringify(value)}\n`;
    }
  }
  fm += '---\n';
  
  return fm;
}

// Функция для миграции одного файла
function migrateFile(sourcePath, targetPath) {
  try {
    const html = fs.readFileSync(sourcePath, 'utf-8');
    
    const metadata = extractMetadata(html);
    const schemas = extractSchema(html);
    const content = extractContent(html);
    
    const frontMatter = createFrontMatter(metadata, schemas);
    
    const newContent = frontMatter + '\n' + content;
    
    // Создаем директорию если нужно
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    fs.writeFileSync(targetPath, newContent, 'utf-8');
    console.log(`✓ Migrated: ${sourcePath} -> ${targetPath}`);
    
    return true;
  } catch (error) {
    console.error(`✗ Error migrating ${sourcePath}:`, error.message);
    return false;
  }
}

// Список файлов для миграции
const filesToMigrate = [
  // Основные страницы
  { source: 'index.html', target: 'src/pages/index.html' },
  { source: 'o-kompanii.html', target: 'src/pages/o-kompanii.html' },
  { source: 'kontakty.html', target: 'src/pages/kontakty.html' },
  { source: 'katalog.html', target: 'src/pages/katalog.html' },
  { source: 'blog.html', target: 'src/pages/blog.html' },
  { source: 'pricing.html', target: 'src/pages/pricing.html' },
  { source: 'delivery.html', target: 'src/pages/delivery.html' },
  { source: 'reviews.html', target: 'src/pages/reviews.html' },
  { source: 'warranty.html', target: 'src/pages/warranty.html' },
  { source: 'cases.html', target: 'src/pages/cases.html' },
  
  // Блог
  { source: 'blog/chto-takoe-invertornyj.html', target: 'src/pages/blog/chto-takoe-invertornyj.html' },
  { source: 'blog/kak-ekonomit-elektroenergiyu.html', target: 'src/pages/blog/kak-ekonomit-elektroenergiyu.html' },
  { source: 'blog/kak-vybrat-kondicioner-dlya-ofisa.html', target: 'src/pages/blog/kak-vybrat-kondicioner-dlya-ofisa.html' },
  { source: 'blog/kak-vybrat-kondicioner.html', target: 'src/pages/blog/kak-vybrat-kondicioner.html' },
  { source: 'blog/kondicioner-dlya-detskoj.html', target: 'src/pages/blog/kondicioner-dlya-detskoj.html' },
  { source: 'blog/obsluzhivanie-kondicionera-kogda-i-kak.html', target: 'src/pages/blog/obsluzhivanie-kondicionera-kogda-i-kak.html' },
  { source: 'blog/obsluzhivanie-svoimi-rukami.html', target: 'src/pages/blog/obsluzhivanie-svoimi-rukami.html' },
  { source: 'blog/rejting-konicionerov-2024.html', target: 'src/pages/blog/rejting-konicionerov-2024.html' },
  
  // Бренды
  { source: 'brands/daikin.html', target: 'src/pages/brands/daikin.html' },
  { source: 'brands/electrolux.html', target: 'src/pages/brands/electrolux.html' },
  { source: 'brands/gree.html', target: 'src/pages/brands/gree.html' },
  { source: 'brands/haier.html', target: 'src/pages/brands/haier.html' },
  { source: 'brands/lg.html', target: 'src/pages/brands/lg.html' },
  { source: 'brands/mitsubishi.html', target: 'src/pages/brands/mitsubishi.html' },
  { source: 'brands/panasonic.html', target: 'src/pages/brands/panasonic.html' },
  { source: 'brands/samsung.html', target: 'src/pages/brands/samsung.html' },
  
  // Услуги
  { source: 'uslugi/ustanovka.html', target: 'src/pages/uslugi/ustanovka.html' },
  { source: 'uslugi/obsluzhivanie.html', target: 'src/pages/uslugi/obsluzhivanie.html' },
  { source: 'uslugi/remont.html', target: 'src/pages/uslugi/remont.html' },
  { source: 'uslugi/zapravka.html', target: 'src/pages/uslugi/zapravka.html' },
  
  // Каталог
  { source: 'katalog/bytovye/nastennye.html', target: 'src/pages/katalog/bytovye/nastennye.html' },
  { source: 'katalog/bytovye/napolno-potolochnye.html', target: 'src/pages/katalog/bytovye/napolno-potolochnye.html' },
  { source: 'katalog/bytovye/multisplit.html', target: 'src/pages/katalog/bytovye/multisplit.html' },
  { source: 'katalog/bytovye/kassetnye.html', target: 'src/pages/katalog/bytovye/kassetnye.html' },
  { source: 'katalog/bytovye/kanalnye.html', target: 'src/pages/katalog/bytovye/kanalnye.html' },
];

// Запуск миграции
console.log('Starting migration...\n');

let successCount = 0;
let failCount = 0;

for (const file of filesToMigrate) {
  if (fs.existsSync(file.source)) {
    if (migrateFile(file.source, file.target)) {
      successCount++;
    } else {
      failCount++;
    }
  } else {
    console.warn(`⚠ File not found: ${file.source}`);
    failCount++;
  }
}

console.log(`\nMigration complete!`);
console.log(`✓ Success: ${successCount}`);
console.log(`✗ Failed: ${failCount}`);

