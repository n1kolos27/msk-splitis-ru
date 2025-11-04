@echo off
REM Windows batch скрипт для запуска локального сервера
REM Использование: двойной клик по файлу или запуск из командной строки

echo ============================================================
echo   Запуск локального веб-сервера
echo ============================================================
echo.

REM Проверяем наличие Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Python не найден!
    echo.
    echo Установите Python с https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

REM Проверяем наличие index.html
if not exist "index.html" (
    echo [ОШИБКА] Файл index.html не найден!
    echo.
    echo Убедитесь, что вы запускаете скрипт из корневой папки проекта.
    echo.
    pause
    exit /b 1
)

REM Запускаем сервер
echo [INFO] Запуск сервера на порту 8000...
echo [INFO] Откройте браузер: http://localhost:8000
echo [INFO] Нажмите Ctrl+C для остановки
echo.
python serve.py

pause

