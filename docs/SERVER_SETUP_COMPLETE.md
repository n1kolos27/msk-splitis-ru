# Настройка редиректа с splitis.ru на msk.splitis.ru - ЗАВЕРШЕНО ✅

## Что было сделано:

1. ✅ **Установлен Nginx** на сервере Ubuntu 24.04
2. ✅ **Создана директория** для сайта: `/var/www/msk.splitis.ru/_site`
3. ✅ **Настроена конфигурация Nginx** с правилами редиректа:
   - `splitis.ru` → `msk.splitis.ru` (301 редирект)
   - `www.splitis.ru` → `msk.splitis.ru` (301 редирект)
   - Сохранение путей при редиректе
4. ✅ **Nginx запущен и работает**

## Текущая конфигурация:

- **Конфигурационный файл**: `/etc/nginx/sites-available/msk.splitis.ru`
- **Активирован через**: `/etc/nginx/sites-enabled/msk.splitis.ru`
- **Директория сайта**: `/var/www/msk.splitis.ru/_site`
- **Статус Nginx**: Активен и работает

## Что нужно сделать дальше:

### 1. Загрузить файлы сайта

После сборки проекта (`npm run build` или `npx @11ty/eleventy`), загрузите содержимое папки `_site` на сервер:

```bash
# Через SCP (из локальной машины)
scp -i ~/.ssh/id_ed25519_timeweb -r _site/* root@91.200.150.96:/var/www/msk.splitis.ru/_site/

# Или через FTP/SFTP клиент (FileZilla, WinSCP)
# Подключитесь к серверу и загрузите файлы в /var/www/msk.splitis.ru/_site/
```

### 2. Настроить SSL-сертификаты (для HTTPS)

После загрузки файлов сайта, настройте SSL-сертификаты через панель Timeweb Cloud или через Let's Encrypt:

```bash
# Установка certbot (если еще не установлен)
apt-get install -y certbot python3-certbot-nginx

# Получение сертификата для msk.splitis.ru
certbot --nginx -d msk.splitis.ru -d www.msk.splitis.ru

# Получение сертификата для splitis.ru (для HTTPS-редиректа)
certbot --nginx -d splitis.ru -d www.splitis.ru
```

После получения сертификатов, обновите конфигурацию Nginx для поддержки HTTPS (файл `nginx.conf` в проекте содержит полную конфигурацию с SSL).

### 3. Проверить работу редиректов

После настройки DNS и SSL, проверьте:

- ✅ `http://splitis.ru` → `https://msk.splitis.ru` (301)
- ✅ `https://splitis.ru` → `https://msk.splitis.ru` (301)
- ✅ `http://www.splitis.ru` → `https://msk.splitis.ru` (301)
- ✅ `https://www.splitis.ru` → `https://msk.splitis.ru` (301)

## Команды для управления:

```bash
# Проверить конфигурацию Nginx
nginx -t

# Перезагрузить Nginx
systemctl reload nginx

# Проверить статус Nginx
systemctl status nginx

# Просмотр логов
tail -f /var/log/nginx/msk.splitis.ru.access.log
tail -f /var/log/nginx/msk.splitis.ru.error.log
```

## Важные файлы:

- **Конфигурация Nginx**: `/etc/nginx/sites-available/msk.splitis.ru`
- **Директория сайта**: `/var/www/msk.splitis.ru/_site`
- **Логи доступа**: `/var/log/nginx/msk.splitis.ru.access.log`
- **Логи ошибок**: `/var/log/nginx/msk.splitis.ru.error.log`

## Примечания:

1. **DNS**: DNS-записи уже настроены в Timeweb Cloud, но могут потребоваться часы для полного распространения
2. **SSL**: После получения SSL-сертификатов нужно обновить конфигурацию Nginx для поддержки HTTPS
3. **Файлы сайта**: После загрузки файлов сайта редирект будет работать полностью

## Следующие шаги:

1. Собрать проект: `npm run build`
2. Загрузить файлы на сервер
3. Настроить SSL-сертификаты
4. Проверить работу редиректов

