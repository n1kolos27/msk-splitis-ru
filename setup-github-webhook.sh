#!/bin/bash
# Скрипт для настройки автоматического деплоя через GitHub Webhook
# Использование: ./setup-github-webhook.sh <github-repo-url>

set -e

GITHUB_REPO_URL="$1"
REPO_DIR="/var/www/msk.splitis.ru/repo"
DEPLOY_DIR="/var/www/msk.splitis.ru/_site"
WEBHOOK_PORT="9000"

if [ -z "$GITHUB_REPO_URL" ]; then
    echo "Ошибка: Укажите URL GitHub репозитория"
    echo "Использование: $0 <github-repo-url>"
    echo "Пример: $0 https://github.com/username/msk-splitis-ru.git"
    exit 1
fi

echo "=========================================="
echo "Настройка автоматического деплоя"
echo "=========================================="

# Клонирование репозитория
if [ ! -d "$REPO_DIR/.git" ]; then
    echo "Клонирование репозитория..."
    git clone "$GITHUB_REPO_URL" "$REPO_DIR"
else
    echo "Репозиторий уже существует, обновление..."
    cd "$REPO_DIR"
    git pull origin main
fi

# Установка зависимостей и первая сборка
echo "Установка зависимостей..."
cd "$REPO_DIR"
npm install

echo "Первая сборка..."
npm run build

# Копирование файлов
echo "Копирование файлов..."
rsync -av --delete "$REPO_DIR/_site/" "$DEPLOY_DIR/"

# Установка прав доступа
chown -R www-data:www-data "$DEPLOY_DIR"

echo "=========================================="
echo "Настройка завершена!"
echo "=========================================="
echo ""
echo "Для автоматического деплоя при пуше в GitHub:"
echo "1. Настройте GitHub Webhook:"
echo "   URL: http://91.200.150.96:$WEBHOOK_PORT/webhook"
echo "   Content type: application/json"
echo "   Events: Just the push event"
echo ""
echo "2. Или используйте ручной деплой:"
echo "   ssh root@91.200.150.96 '/usr/local/bin/deploy-msk-splitis.sh'"
echo ""

