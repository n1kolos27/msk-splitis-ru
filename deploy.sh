#!/bin/bash
# Автоматический деплой для msk.splitis.ru
# Этот скрипт выполняется при обновлении репозитория

set -e  # Остановка при ошибке

echo "=========================================="
echo "Начало автоматического деплоя"
echo "Время: $(date)"
echo "=========================================="

# Переменные
REPO_DIR="/var/www/msk.splitis.ru/repo"
DEPLOY_DIR="/var/www/msk.splitis.ru/_site"
LOG_FILE="/var/log/deploy-msk-splitis.log"

# Логирование
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "Переход в директорию репозитория: $REPO_DIR"
cd "$REPO_DIR" || exit 1

log "Обновление репозитория из GitHub"
git fetch origin
git reset --hard origin/main
git clean -fd

log "Установка зависимостей"
npm install --production=false

log "Сборка проекта"
npm run build

if [ ! -d "_site" ]; then
    log "ОШИБКА: Директория _site не найдена после сборки!"
    exit 1
fi

log "Копирование файлов на сервер"
rsync -av --delete --exclude '.git' "$REPO_DIR/_site/" "$DEPLOY_DIR/"

log "Установка прав доступа"
chown -R www-data:www-data "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"

log "Перезагрузка Nginx"
systemctl reload nginx

log "=========================================="
log "Деплой завершен успешно!"
log "=========================================="

