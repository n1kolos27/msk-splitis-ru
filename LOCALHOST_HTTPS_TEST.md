# Локальная проверка HTTPS перед деплоем

## Быстрый старт

### 1. Генерация локального SSL сертификата

```bash
# Запустите скрипт генерации сертификата
bash generate-localhost-cert.sh
```

Скрипт создаст:
- `certs/localhost.key` - приватный ключ
- `certs/localhost.crt` - самоподписанный сертификат

### 2. Запуск сервера с HTTPS

```bash
# Запуск HTTPS сервера
node server-https.js
```

Или добавьте в `package.json`:

```json
{
  "scripts": {
    "serve:https": "node server-https.js"
  }
}
```

Затем запустите:
```bash
npm run serve:https
```

### 3. Откройте браузер

- **HTTP:** http://localhost:5000 (автоматически редиректит на HTTPS)
- **HTTPS:** https://localhost:5443

## Важно: Предупреждение браузера

Браузер покажет предупреждение о безопасности, так как это самоподписанный сертификат. Это нормально для локальной разработки!

### Как принять сертификат:

**Chrome/Edge:**
1. Нажмите "Advanced" (Дополнительно)
2. Нажмите "Proceed to localhost (unsafe)" (Перейти на localhost)

**Firefox:**
1. Нажмите "Advanced" (Дополнительно)
2. Нажмите "Accept the Risk and Continue" (Принять риск и продолжить)

**Safari:**
1. Нажмите "Show Details" (Показать детали)
2. Нажмите "visit this website" (посетить этот сайт)

## Проверка HTTPS функционала

После принятия сертификата проверьте:

1. ✅ **Редирект HTTP → HTTPS**
   - Откройте http://localhost:5000
   - Должен автоматически редиректить на https://localhost:5443

2. ✅ **Заголовки безопасности**
   - Откройте DevTools → Network
   - Проверьте Response Headers:
     - `X-Content-Type-Options: nosniff`
     - `X-Frame-Options: DENY`
     - `Content-Security-Policy`
     - `Strict-Transport-Security` (если установлен NODE_ENV=production)

3. ✅ **Страница 404**
   - Откройте несуществующую страницу: https://localhost:5443/test404
   - Должна отображаться кастомная страница 404

4. ✅ **Смешанный контент**
   - Убедитесь, что все ресурсы загружаются через HTTPS
   - Проверьте консоль браузера на ошибки смешанного контента

## Проверка через командную строку

```bash
# Проверка HTTPS соединения
curl -k https://localhost:5443

# Проверка редиректа HTTP → HTTPS
curl -I http://localhost:5000

# Проверка заголовков безопасности
curl -k -I https://localhost:5443 | grep -i "x-content-type\|x-frame\|content-security"
```

## Проверка сертификата

```bash
# Просмотр информации о сертификате
openssl s_client -connect localhost:5443 -servername localhost < /dev/null

# Проверка срока действия
openssl x509 -in certs/localhost.crt -noout -dates
```

## Отладка

### Проблема: Сертификат не найден

```bash
# Убедитесь, что файлы существуют
ls -la certs/

# Пересоздайте сертификат
bash generate-localhost-cert.sh
```

### Проблема: Порт занят

```bash
# Измените порт через переменные окружения
HTTPS_PORT=8443 node server-https.js
```

### Проблема: Браузер не принимает сертификат

1. Убедитесь, что используете `localhost`, а не `127.0.0.1`
2. Проверьте, что сертификат создан для правильного домена
3. Попробуйте в режиме инкогнито/приватном режиме

## Сравнение с production

| Параметр | Localhost | Production |
|----------|-----------|------------|
| Сертификат | Самоподписанный | Let's Encrypt |
| Предупреждение | Да (нормально) | Нет |
| Домен | localhost | msk.splitis.ru |
| Порт | 5443 | 443 |
| Автообновление | Нет | Да (Certbot) |

## Следующие шаги

После успешной проверки на localhost:

1. ✅ Убедитесь, что все работает корректно
2. ✅ Проверьте все страницы на HTTPS
3. ✅ Проверьте заголовки безопасности
4. ✅ Убедитесь, что нет ошибок смешанного контента
5. ✅ Разверните на production сервере
6. ✅ Настройте Let's Encrypt (см. `HTTPS_SETUP.md`)

## Дополнительные ресурсы

- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/) (для production)
- [Security Headers Test](https://securityheaders.com/) (для production)
