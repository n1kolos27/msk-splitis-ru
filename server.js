const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Загружаем Resend только если есть API ключ (для локальной разработки)
let Resend = null;
let resendApiKey = null;
try {
  // Проверяем наличие переменной окружения или .env файла
  resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    Resend = require('resend');
  }
} catch (e) {
  console.log('⚠️  Resend не установлен. Установите: npm install resend');
}

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.webp': 'image/webp',
  '.txt': 'text/plain',
  '.xml': 'application/xml'
};

// Заголовки безопасности
function getSecurityHeaders(isProduction = false) {
  const headers = {
    // Защита от MIME-type sniffing
    'X-Content-Type-Options': 'nosniff',
    // Защита от clickjacking
    'X-Frame-Options': 'DENY',
    // Защита от XSS (устаревший, но все еще поддерживается некоторыми браузерами)
    'X-XSS-Protection': '1; mode=block',
    // Политика реферера
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    // Политика разрешений
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  };

  // Для production добавляем HSTS
  if (isProduction) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  // Content Security Policy - разрешаем необходимые ресурсы
  // Google Fonts, inline styles/scripts от Eleventy, и т.д.
  headers['Content-Security-Policy'] = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');

  return headers;
}

// Функция обработки API запросов
async function handleApiRequest(req, res, parsedUrl) {
  const securityHeaders = getSecurityHeaders(process.env.NODE_ENV === 'production');
  
  // CORS заголовки
  const corsHeaders = {
    ...securityHeaders,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Обработка OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(200, corsHeaders);
    res.end();
    return;
  }

  // Обработка /api/contact
  if (parsedUrl.pathname === '/api/contact' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const formData = JSON.parse(body);
        const { name, phone, email, message } = formData;

        // Валидация
        if (!name || !phone) {
          res.writeHead(400, {
            ...corsHeaders,
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ error: 'Имя и телефон обязательны для заполнения' }));
          return;
        }

        // Проверка наличия Resend
        if (!Resend || !resendApiKey) {
          console.error('⚠️  Resend не настроен. Установите RESEND_API_KEY в переменных окружения.');
          res.writeHead(500, {
            ...corsHeaders,
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ error: 'Сервис отправки писем не настроен' }));
          return;
        }

        const resend = new Resend(resendApiKey);
        const recipientEmail = process.env.CONTACT_EMAIL || 'info@msk.splitis.ru';

        const subject = `Новая заявка с сайта msk.splitis.ru${name ? ` от ${name}` : ''}`;
        const emailBody = `
          <h2>Новая заявка с сайта</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${message ? `<p><strong>Сообщение:</strong><br>${message.replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><small>Дата отправки: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}</small></p>
          <p><small>IP адрес: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'неизвестно'}</small></p>
        `;

        const { data, error } = await resend.emails.send({
          from: 'noreply@msk.splitis.ru', // Замените на ваш верифицированный домен
          to: recipientEmail,
          replyTo: email || recipientEmail,
          subject: subject,
          html: emailBody,
        });

        if (error) {
          console.error('Ошибка отправки через Resend:', error);
          res.writeHead(500, {
            ...corsHeaders,
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ error: 'Ошибка при отправке письма. Попробуйте позже или свяжитесь с нами по телефону.' }));
          return;
        }

        res.writeHead(200, {
          ...corsHeaders,
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Заявка успешно отправлена',
          id: data?.id 
        }));

      } catch (error) {
        console.error('Ошибка обработки запроса:', error);
        res.writeHead(500, {
          ...corsHeaders,
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ error: 'Внутренняя ошибка сервера' }));
      }
    });
    return true; // Указываем, что запрос обработан
  }

  return false; // Запрос не обработан
}

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Парсим URL
  const parsedUrl = url.parse(req.url, true);
  
  // Пытаемся обработать как API запрос
  const apiHandled = await handleApiRequest(req, res, parsedUrl);
  if (apiHandled) {
    return; // API запрос обработан
  }

  // Обработка статических файлов
  let filePath = '.' + parsedUrl.pathname;

  // Определяем базовый путь (для разработки используем _site если есть)
  const baseDir = fs.existsSync('./_site') ? './_site' : '.';
  
  // Обработка корневого пути
  if (filePath === './' || filePath === '.') {
    filePath = path.join(baseDir, 'index.html');
  } else {
    filePath = path.join(baseDir, parsedUrl.pathname);
  }

  // Нормализация пути для безопасности
  filePath = path.normalize(filePath);
  
  // Проверка, что путь не выходит за пределы базовой директории
  const resolvedPath = path.resolve(filePath);
  const resolvedBase = path.resolve(baseDir);
  if (!resolvedPath.startsWith(resolvedBase)) {
    filePath = path.join(baseDir, '404.html');
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Заголовки безопасности
  const securityHeaders = getSecurityHeaders(process.env.NODE_ENV === 'production');
  
  // Кэширование для статических ресурсов в production
  // Исключаем /services/ images из долгосрочного кэша (они могут обновляться)
  const isServiceImage = parsedUrl.pathname.includes('/services/');
  const cacheHeaders = process.env.NODE_ENV === 'production' && 
    (extname.match(/\.(jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot|webp|css|js)$/)) &&
    !isServiceImage ? {
      'Cache-Control': 'public, max-age=31536000, immutable'
    } : {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Пытаемся загрузить страницу 404
        const error404Path = path.join(baseDir, '404.html');
        fs.readFile(error404Path, (err404, errorContent) => {
          if (err404) {
            // Если 404.html не найден, отправляем простую страницу
            res.writeHead(404, {
              'Content-Type': 'text/html; charset=utf-8',
              ...securityHeaders
            });
            res.end('<h1>404 - Страница не найдена</h1><p><a href="/">Вернуться на главную</a></p>', 'utf-8');
          } else {
            res.writeHead(404, {
              'Content-Type': 'text/html; charset=utf-8',
              ...securityHeaders,
              ...cacheHeaders
            });
            res.end(errorContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500, {
          'Content-Type': 'text/html; charset=utf-8',
          ...securityHeaders
        });
        res.end(`<h1>Ошибка сервера</h1><p>${error.code}</p>`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 
        'Content-Type': contentType,
        ...securityHeaders,
        ...cacheHeaders
      });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🚀 Локальный сервер запущен!');
  console.log('='.repeat(60));
  console.log(`📡 Адрес: http://${HOST}:${PORT}`);
  console.log(`📡 Localhost: http://localhost:${PORT}`);
  console.log('='.repeat(60));
  console.log('📝 Нажмите Ctrl+C для остановки сервера');
  console.log('='.repeat(60));
  console.log();
});
