#!/bin/bash
# Bash скрипт для запуска локального сервера (Linux/macOS)
# Использование: ./serve.sh или bash serve.sh

echo "============================================================"
echo "  Запуск локального веб-сервера"
echo "============================================================"
echo ""

# Проверяем наличие Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "[ОШИБКА] Python не найден!"
    echo ""
    echo "Установите Python:"
    echo "  Ubuntu/Debian: sudo apt-get install python3"
    echo "  macOS: brew install python3"
    echo "  или скачайте с https://www.python.org/downloads/"
    echo ""
    exit 1
fi

# Проверяем наличие index.html
if [ ! -f "index.html" ]; then
    echo "[ОШИБКА] Файл index.html не найден!"
    echo ""
    echo "Убедитесь, что вы запускаете скрипт из корневой папки проекта."
    echo ""
    exit 1
fi

# Определяем версию Python
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
else
    PYTHON_CMD="python"
fi

# Делаем serve.py исполняемым
chmod +x serve.py 2>/dev/null || true

# Запускаем сервер
echo "[INFO] Запуск сервера на порту 8000..."
echo "[INFO] Откройте браузер: http://localhost:8000"
echo "[INFO] Нажмите Ctrl+C для остановки"
echo ""
$PYTHON_CMD serve.py

