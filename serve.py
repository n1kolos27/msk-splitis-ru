#!/usr/bin/env python3
"""
Простой HTTP сервер для локальной разработки
Запускает статический веб-сайт на http://localhost:8000

Использование:
    python serve.py
    или
    python3 serve.py
"""

import http.server
import socketserver
import os
import sys
from typing import Tuple, Optional

# Порт по умолчанию
PORT = 8000

# Класс обработчика с правильными MIME-типами
class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Добавляем CORS заголовки для разработки
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def guess_type(self, path) -> Tuple[Optional[str], Optional[str]]:  # type: ignore[override]
        # Улучшенное определение MIME-типов
        mimetype, encoding = super().guess_type(path)
        
        # Преобразуем path в строку для проверки
        path_str = str(path)
        
        # Корректировка для SVG
        if path_str.endswith('.svg'):
            return 'image/svg+xml', encoding
        
        # Корректировка для JSON-LD
        if path_str.endswith('.json'):
            return 'application/ld+json', encoding
        
        return mimetype, encoding

def main():
    # Проверяем наличие index.html
    if not os.path.exists('index.html'):
        print("❌ Ошибка: Файл index.html не найден в текущей директории.")
        print("💡 Убедитесь, что вы запускаете сервер из корневой папки проекта.")
        sys.exit(1)
    
    # Создаем сервер
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print("=" * 60)
            print("🚀 Локальный сервер запущен!")
            print("=" * 60)
            print(f"📡 Адрес: http://localhost:{PORT}")
            print(f"📡 Или: http://127.0.0.1:{PORT}")
            print("=" * 60)
            print("📝 Нажмите Ctrl+C для остановки сервера")
            print("=" * 60)
            print()
            
            # Запускаем сервер
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 98 or e.errno == 10048:  # Address already in use (Linux/Windows)
            print(f"❌ Ошибка: Порт {PORT} уже занят.")
            print(f"💡 Попробуйте использовать другой порт или остановите процесс, использующий порт {PORT}.")
        else:
            print(f"❌ Ошибка при запуске сервера: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n\n🛑 Сервер остановлен пользователем.")
        sys.exit(0)

if __name__ == "__main__":
    main()

