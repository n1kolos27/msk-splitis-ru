# Скрипт для настройки Git и проверки статуса
$ErrorActionPreference = "Stop"

# Переходим в директорию проекта
Set-Location "D:\Главная"

# Настраиваем безопасную директорию локально
git config --local --add safe.directory D:/Главная

# Проверяем статус
git status

# Проверяем ветки
git branch

# Проверяем remote
git remote -v
