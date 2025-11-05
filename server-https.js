// ============================================
// Node.js HTTPS Server для локальной разработки
// ============================================

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;
const HTTPS_PORT = process.env.HTTPS_PORT || 5443;
const HOST = '0.0.0.0';

// Пути к SSL сертификатам
const CERTS_DIR = path.join(__dirname, 'certs');
const KEY_FILE = path.join(CERTS_DIR, 'localhost.key');
const CERT_FILE = path.join(CERTS_DIR, 'localhost.crt');

// Проверка наличия SSL сертификатов
let sslOptions = null;
let httpsServer = null;
const hasSSL = fs.existsSync(KEY_FILE) && fs.existsSync(CERT_FILE);

if (hasSSL) {
    try {
        sslOptions = {
            key: fs.readFileSync(KEY_FILE),
            cert: fs.readFileSync(CERT_FILE),
            // Дополнительные опции для совместимости
            secureProtocol: 'TLSv1_2_method',
            ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384',
            honorCipherOrder: true,
            requestCert: false,
            rejectUnauthorized: false
        };
        console.log('✓ SSL сертификаты найдены');
    } catch (error) {
        console.error('✗ Ошибка при загрузке SSL сертификатов:', error.message);
        console.error('  Убедитесь, что файлы существуют и доступны для чтения');
        console.warn('  Запуск только HTTP сервера');
        sslOptions = null;
    }
} else {
    console.warn('⚠ SSL сертификаты не найдены');
    console.warn(`  Создайте их командой:`);
    console.warn(`  Windows: powershell -ExecutionPolicy Bypass -File generate-localhost-cert.ps1`);
    console.warn(`  Linux/Mac: bash generate-localhost-cert.sh`);
    console.warn('  Запуск только HTTP сервера');
}

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
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  };

  // Для production добавляем HSTS
  if (isProduction) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  // Content Security Policy
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

// Функция обработки запроса
function handleRequest(req, res) {
  console.log(`${req.method} ${req.url}`);

  // Парсим URL
  const parsedUrl = url.parse(req.url, true);
  let filePath = '.' + parsedUrl.pathname;

  // Определяем базовый путь
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
  const cacheHeaders = process.env.NODE_ENV === 'production' && 
    (extname.match(/\.(jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot|webp|css|js)$/)) ? {
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
}

// HTTP сервер (с редиректом на HTTPS если доступен)
const httpServer = http.createServer((req, res) => {
  if (hasSSL && sslOptions && httpsServer) {
    // Редирект на HTTPS
    const host = req.headers.host || `${HOST}:${PORT}`;
    res.writeHead(301, {
      'Location': `https://${host.replace(`:${PORT}`, `:${HTTPS_PORT}`)}${req.url}`
    });
    res.end();
  } else {
    handleRequest(req, res);
  }
});

// HTTPS сервер (если сертификаты доступны)
if (hasSSL && sslOptions) {
  try {
    httpsServer = https.createServer(sslOptions, handleRequest);
  } catch (error) {
    console.error('✗ Ошибка при создании HTTPS сервера:', error.message);
    httpsServer = null;
    sslOptions = null;
  }
}

// Запуск серверов
httpServer.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🚀 Локальный сервер запущен!');
  console.log('='.repeat(60));
  console.log(`📡 HTTP:  http://${HOST}:${PORT}`);
  console.log(`📡 HTTP:  http://localhost:${PORT}`);
  
  if (hasSSL && httpsServer) {
    httpsServer.listen(HTTPS_PORT, HOST, () => {
      console.log(`🔒 HTTPS: https://${HOST}:${HTTPS_PORT}`);
      console.log(`🔒 HTTPS: https://localhost:${HTTPS_PORT}`);
      console.log('');
      console.log('⚠ ВАЖНО: Самоподписанный сертификат!');
      console.log('  Браузер покажет предупреждение о безопасности.');
      console.log('  Нажмите "Продолжить" или "Advanced" → "Proceed to localhost"');
      console.log('  Это безопасно для локальной разработки.');
    }).on('error', (error) => {
      console.error('');
      console.error('✗ Ошибка при запуске HTTPS сервера:', error.message);
      console.error('  Проверьте:');
      console.error('    1. Порт не занят другим процессом');
      console.error('    2. Сертификаты корректны');
      console.error('    3. Права доступа к файлам сертификатов');
      console.error('  Запускается только HTTP сервер');
    });
  } else {
    console.log('');
    console.log('⚠ HTTPS недоступен. Создайте сертификат:');
    if (process.platform === 'win32') {
      console.log('  npm run cert:generate:win');
      console.log('  или: powershell -ExecutionPolicy Bypass -File generate-localhost-cert.ps1');
    } else {
      console.log('  npm run cert:generate');
      console.log('  или: bash generate-localhost-cert.sh');
    }
  }
  
  console.log('='.repeat(60));
  console.log('📝 Нажмите Ctrl+C для остановки сервера');
  console.log('='.repeat(60));
  console.log();
}).on('error', (error) => {
  console.error('');
  console.error('✗ Ошибка при запуске HTTP сервера:', error.message);
  console.error('');
  if (error.code === 'EADDRINUSE') {
    console.error('Порт ' + PORT + ' уже занят!');
    console.error('Попробуйте:');
    console.error('  1. Остановить другой процесс на порту ' + PORT);
    console.error('  2. Использовать другой порт: PORT=8080 npm run server:https');
  } else {
    console.error('Проверьте:');
    console.error('  1. Права доступа');
    console.error('  2. Firewall не блокирует порт');
    console.error('  3. Другой процесс не использует порт');
  }
  process.exit(1);
});

// Обработка ошибок
process.on('SIGINT', () => {
  console.log('\n\nОстановка серверов...');
  httpServer.close();
  if (httpsServer) {
    httpsServer.close();
  }
  process.exit(0);
});
