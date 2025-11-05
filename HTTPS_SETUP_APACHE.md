# Настройка HTTPS с автоматическим обновлением для Apache

## Быстрый старт для Apache

### Шаг 1: Установка Certbot для Apache

```bash
sudo apt update
sudo apt install certbot python3-certbot-apache -y
```

### Шаг 2: Получение сертификата

```bash
# Автоматическая настройка (Certbot сам настроит Apache)
sudo certbot --apache -d msk.splitis.ru -d www.msk.splitis.ru

# Или ручная настройка (сертификаты только)
sudo certbot certonly --apache -d msk.splitis.ru -d www.msk.splitis.ru
```

### Шаг 3: Проверка автоматического обновления

Certbot автоматически настроит обновление через systemd timer:

```bash
# Проверка статуса
sudo systemctl status certbot.timer

# Включение (если не включен)
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Шаг 4: Тестовое обновление

```bash
sudo certbot renew --dry-run
```

## Важные замечания

1. **Редирект HTTPS уже включен** в `.htaccess` файле проекта
2. **HSTS заголовок активирован** для production
3. После получения сертификата Certbot автоматически добавит SSL конфигурацию в Apache

## Проверка

После настройки проверьте:
- ✅ Все HTTP запросы редиректятся на HTTPS
- ✅ Сертификат валиден
- ✅ Автоматическое обновление работает

```bash
# Проверка сертификата
sudo certbot certificates

# Проверка конфигурации Apache
sudo apache2ctl configtest
```

## Дополнительная информация

См. подробную инструкцию в `HTTPS_SETUP.md` (для Nginx, но принципы те же)
