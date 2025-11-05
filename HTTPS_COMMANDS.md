# HTTPS - Быстрые команды

## Проверка статуса автообновления
```bash
sudo systemctl status certbot.timer
```

## Тестовое обновление
```bash
sudo certbot renew --dry-run
```

## Проверка сертификатов
```bash
sudo certbot certificates
```

## Ручное обновление сертификата
```bash
sudo certbot renew
sudo systemctl reload nginx    # для Nginx
# или
sudo systemctl reload apache2  # для Apache
```

## Проверка логов
```bash
# Логи Certbot
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Логи автообновления
sudo journalctl -u certbot.timer -f
```

## Включение/выключение автообновления
```bash
# Включить
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Выключить
sudo systemctl stop certbot.timer
sudo systemctl disable certbot.timer
```

## Проверка конфигурации веб-сервера
```bash
# Nginx
sudo nginx -t
sudo systemctl reload nginx

# Apache
sudo apache2ctl configtest
sudo systemctl reload apache2
```

## Онлайн проверка SSL
- SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=msk.splitis.ru
- Security Headers: https://securityheaders.com/?q=https://msk.splitis.ru
- SSL Checker: https://www.sslshopper.com/ssl-checker.html#hostname=msk.splitis.ru
