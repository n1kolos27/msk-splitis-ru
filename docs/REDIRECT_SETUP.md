# Инструкция по настройке редиректа с splitis.ru на msk.splitis.ru

## Что было сделано:

1. ✅ Обновлен файл `.htaccess` - добавлены правила редиректа для Apache
2. ✅ Обновлен файл `nginx.conf` - добавлены server блоки для редиректа в Nginx

## Как использовать:

### Вариант 1: Если используется Apache

1. Загрузите файл `.htaccess` в корневую директорию сайта на сервере
2. Убедитесь, что модуль `mod_rewrite` включен
3. Проверьте работу редиректов

### Вариант 2: Если используется Nginx

1. Подключитесь к серверу по SSH
2. Найдите конфигурационный файл Nginx (обычно `/etc/nginx/sites-available/default` или `/etc/nginx/conf.d/default.conf`)
3. Добавьте server блоки для редиректа из файла `nginx.conf` (строки 7-30)
4. Проверьте конфигурацию: `nginx -t`
5. Перезагрузите Nginx: `systemctl reload nginx`
6. Убедитесь, что SSL-сертификат для `splitis.ru` настроен

## Проверка редиректов:

После настройки проверьте следующие URL (должны редиректить на `https://msk.splitis.ru`):

- ✅ `http://splitis.ru` → `https://msk.splitis.ru` (301)
- ✅ `https://splitis.ru` → `https://msk.splitis.ru` (301)
- ✅ `http://www.splitis.ru` → `https://msk.splitis.ru` (301)
- ✅ `https://www.splitis.ru` → `https://msk.splitis.ru` (301)
- ✅ `splitis.ru/katalog.html` → `msk.splitis.ru/katalog.html` (301)

## Инструменты для проверки:

- [Redirect Checker](https://www.redirectchecker.com/)
- [HTTP Status Code Checker](https://httpstatus.io/)

## Важные моменты:

1. **SSL-сертификаты**: Для HTTPS-редиректов нужны SSL-сертификаты для обоих доменов
   - Для `msk.splitis.ru` (уже должен быть)
   - Для `splitis.ru` (нужно получить или использовать wildcard `*.splitis.ru`)

2. **Порядок правил**: В `.htaccess` правила редиректа должны быть ПЕРВЫМИ, до других правил

3. **Тип редиректа**: Используется 301 (постоянная переадресация) для передачи SEO-веса

4. **Сохранение путей**: Все пути сохраняются при редиректе (`/page.html` → `/page.html`)

## Команды для проверки на сервере (Nginx):

```bash
# Проверить конфигурацию
nginx -t

# Перезагрузить Nginx
systemctl reload nginx

# Проверить статус
systemctl status nginx

# Проверить логи
tail -f /var/log/nginx/error.log
```

## Команды для проверки на сервере (Apache):

```bash
# Проверить, включен ли mod_rewrite
apache2ctl -M | grep rewrite

# Перезагрузить Apache
systemctl reload apache2
# или
service apache2 reload

# Проверить статус
systemctl status apache2
```

