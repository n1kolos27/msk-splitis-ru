#!/bin/bash
# ============================================
# Автоматическая настройка HTTPS с Let's Encrypt
# Для проекта msk.splitis.ru
# ============================================

set -e

DOMAIN="msk.splitis.ru"
EMAIL="info@msk.splitis.ru"
NGINX_CONFIG="/etc/nginx/sites-available/${DOMAIN}"
SITE_ROOT="/var/www/${DOMAIN}/_site"

echo "============================================"
echo "Настройка HTTPS для ${DOMAIN}"
echo "============================================"

# Проверка прав root
if [ "$EUID" -ne 0 ]; then 
    echo "Ошибка: Запустите скрипт с правами root (sudo)"
    exit 1
fi

# Шаг 1: Установка Certbot
echo ""
echo "Шаг 1: Установка Certbot..."
if ! command -v certbot &> /dev/null; then
    echo "Установка Certbot..."
    if apt update && apt install -y certbot python3-certbot-nginx; then
        echo "✓ Certbot установлен"
    else
        echo "✗ Ошибка при установке Certbot"
        echo "  Попробуйте установить вручную:"
        echo "  sudo apt update && sudo apt install -y certbot python3-certbot-nginx"
        exit 1
    fi
else
    echo "✓ Certbot уже установлен"
fi

# Шаг 2: Проверка DNS
echo ""
echo "Шаг 2: Проверка DNS..."
# Проверка наличия утилит
if command -v dig &> /dev/null && command -v curl &> /dev/null; then
    IP=$(dig +short ${DOMAIN} 2>/dev/null | head -n1)
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "")
    
    if [ -z "$IP" ] || [ -z "$SERVER_IP" ]; then
        echo "⚠ Не удалось проверить DNS (dig или curl недоступны)"
        echo "   Убедитесь, что домен ${DOMAIN} указывает на IP сервера"
        read -p "Продолжить? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    elif [ "$IP" != "$SERVER_IP" ]; then
        echo "⚠ ВНИМАНИЕ: DNS может быть не настроен корректно"
        echo "   DNS указывает на: ${IP}"
        echo "   Сервер имеет IP: ${SERVER_IP}"
        read -p "Продолжить? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        echo "✓ DNS настроен корректно"
    fi
else
    echo "⚠ Утилиты dig или curl не найдены. Пропускаем проверку DNS."
    echo "   Убедитесь, что домен ${DOMAIN} указывает на IP сервера"
    read -p "Продолжить? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Шаг 3: Проверка Nginx
echo ""
echo "Шаг 3: Проверка Nginx..."
if ! command -v nginx &> /dev/null; then
    echo "✗ Nginx не установлен. Установите его сначала."
    exit 1
fi

# Проверка конфигурации Nginx
if [ ! -f "$NGINX_CONFIG" ]; then
    echo "⚠ Файл конфигурации ${NGINX_CONFIG} не найден"
    echo "  Создайте его из nginx.conf проекта"
    read -p "Продолжить настройку Certbot? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✓ Конфигурация Nginx найдена"
fi

# Шаг 4: Получение сертификата
echo ""
echo "Шаг 4: Получение SSL сертификата..."
echo "  Домен: ${DOMAIN}"
echo "  Email: ${EMAIL}"
echo ""
read -p "Начать получение сертификата? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Проверяем, существует ли уже сертификат
    if [ -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
        echo "⚠ Сертификат для ${DOMAIN} уже существует"
        read -p "Обновить/пересоздать сертификат? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --email ${EMAIL} --agree-tos --redirect --force-renewal
        else
            echo "Используем существующий сертификат"
        fi
    else
        certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --email ${EMAIL} --agree-tos --redirect
    fi
    
    if [ $? -eq 0 ]; then
        echo "✓ Сертификат получен и настроен"
    else
        echo "✗ Ошибка при получении сертификата"
        echo "  Проверьте логи: sudo tail -f /var/log/letsencrypt/letsencrypt.log"
        exit 1
    fi
else
    echo "Пропущено"
fi

# Шаг 5: Проверка автоматического обновления
echo ""
echo "Шаг 5: Проверка автоматического обновления..."
if systemctl is-active --quiet certbot.timer; then
    echo "✓ Автоматическое обновление активно"
else
    echo "⚠ Автоматическое обновление не активно"
    systemctl enable certbot.timer
    systemctl start certbot.timer
    echo "✓ Автоматическое обновление включено"
fi

# Шаг 6: Тестовое обновление
echo ""
echo "Шаг 6: Тестовое обновление сертификата..."
if certbot renew --dry-run 2>&1; then
    echo "✓ Тестовое обновление прошло успешно"
else
    echo "⚠ Ошибка при тестовом обновлении. Проверьте логи:"
    echo "  sudo journalctl -u certbot.timer"
    echo "  sudo tail -f /var/log/letsencrypt/letsencrypt.log"
    # Не прерываем выполнение, так как это только тест
fi

# Шаг 7: Проверка конфигурации Nginx
echo ""
echo "Шаг 7: Проверка конфигурации Nginx..."
if nginx -t 2>&1; then
    echo "✓ Конфигурация Nginx корректна"
    if systemctl reload nginx 2>&1; then
        echo "✓ Nginx перезагружен"
    else
        echo "⚠ Не удалось перезагрузить Nginx. Попробуйте вручную:"
        echo "  sudo systemctl reload nginx"
    fi
else
    echo "✗ Ошибка в конфигурации Nginx"
    echo "  Проверьте конфигурацию: sudo nginx -t"
    exit 1
fi

# Финальная информация
echo ""
echo "============================================"
echo "Настройка завершена!"
echo "============================================"
echo ""
echo "Проверка сертификата:"
echo "  sudo certbot certificates"
echo ""
echo "Ручное обновление:"
echo "  sudo certbot renew"
echo ""
echo "Проверка статуса автообновления:"
echo "  sudo systemctl status certbot.timer"
echo ""
echo "Онлайн проверка:"
echo "  https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}"
echo ""
echo "============================================"
