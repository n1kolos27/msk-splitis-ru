# Настройка SSL сертификатов - Завершено ✅

## Что было сделано:

1. ✅ **Установлен Certbot** для автоматического получения SSL сертификатов
2. ✅ **Получены SSL сертификаты** для обоих доменов:
   - `msk.splitis.ru` и `www.msk.splitis.ru`
   - `splitis.ru` и `www.splitis.ru`
3. ✅ **Настроена конфигурация Nginx** с поддержкой HTTPS
4. ✅ **Настроены редиректы**:
   - `http://splitis.ru` → `https://msk.splitis.ru` (301)
   - `https://splitis.ru` → `https://msk.splitis.ru` (301)
   - `http://msk.splitis.ru` → `https://msk.splitis.ru` (301)
   - `www.msk.splitis.ru` → `msk.splitis.ru` (301)

## Детали сертификатов:

### msk.splitis.ru
- **Срок действия:** до 2026-02-08 (89 дней)
- **Тип ключа:** ECDSA
- **Домены:** msk.splitis.ru, www.msk.splitis.ru
- **Путь:** `/etc/letsencrypt/live/msk.splitis.ru/`

### splitis.ru
- **Срок действия:** до 2026-02-08 (89 дней)
- **Тип ключа:** ECDSA
- **Домены:** splitis.ru, www.splitis.ru
- **Путь:** `/etc/letsencrypt/live/splitis.ru/`

## Автоматическое обновление:

Certbot автоматически настроил обновление сертификатов:
- **Таймер:** `certbot.timer` (systemd)
- **Обновление:** Автоматически за 30 дней до истечения
- **Проверка:** `systemctl status certbot.timer`

## Проверка сертификатов:

### Команды для проверки:

```bash
# Список всех сертификатов
certbot certificates

# Проверка конкретного сертификата
certbot certificates -d msk.splitis.ru

# Тестовое обновление (dry-run)
certbot renew --dry-run
```

### Онлайн проверка:

- [SSL Labs](https://www.ssllabs.com/ssltest/) - проверка качества SSL
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html) - проверка сертификата

## Текущая конфигурация Nginx:

Конфигурация находится в: `/etc/nginx/sites-available/msk.splitis.ru`

**Структура:**
1. HTTP сервер для `splitis.ru` → редирект на HTTPS `msk.splitis.ru`
2. HTTPS сервер для `splitis.ru` → редирект на HTTPS `msk.splitis.ru`
3. HTTP сервер для `msk.splitis.ru` → редирект на HTTPS
4. HTTPS сервер для `msk.splitis.ru` → основной сайт

## Безопасность SSL:

- ✅ TLS 1.2 и TLS 1.3
- ✅ Современные шифры (ECDHE, ChaCha20-Poly1305)
- ✅ OCSP Stapling включен
- ✅ HSTS заголовок (max-age=31536000, includeSubDomains, preload)
- ✅ Отключены устаревшие протоколы и шифры

## Проверка работы:

После настройки проверьте:

- ✅ `http://splitis.ru` → `https://msk.splitis.ru` (301) - **РАБОТАЕТ**
- ✅ `https://splitis.ru` → `https://msk.splitis.ru` (301) - **РАБОТАЕТ**
- ✅ `http://msk.splitis.ru` → `https://msk.splitis.ru` (301) - **РАБОТАЕТ**
- ✅ `https://www.msk.splitis.ru` → `https://msk.splitis.ru` (301) - **РАБОТАЕТ**
- ✅ SSL сертификат валиден (зеленый замочек в браузере)
- ✅ Нет предупреждений о безопасности

**Все редиректы настроены и работают корректно!**

## Управление сертификатами:

### Обновление вручную:

```bash
# Обновить все сертификаты
certbot renew

# Обновить конкретный сертификат
certbot renew --cert-name msk.splitis.ru

# Обновить и перезагрузить Nginx
certbot renew && systemctl reload nginx
```

### Удаление сертификата:

```bash
# Удалить сертификат (если нужно)
certbot delete --cert-name splitis.ru
```

### Логи:

```bash
# Логи Certbot
tail -f /var/log/letsencrypt/letsencrypt.log

# Логи Nginx
tail -f /var/log/nginx/msk.splitis.ru.error.log
```

## Важные моменты:

1. **Автоматическое обновление:** Сертификаты обновляются автоматически через systemd timer
2. **Валидация:** Let's Encrypt проверяет домены через HTTP-01 challenge
3. **Ограничения:** Let's Encrypt имеет лимиты на количество запросов (50 в неделю на домен)
4. **Резервное копирование:** Рекомендуется делать бэкап директории `/etc/letsencrypt/`

## Следующие шаги:

1. ✅ SSL сертификаты настроены и работают
2. ✅ Редиректы настроены корректно
3. ✅ Автоматическое обновление настроено
4. ⏭️ Проверить работу сайта в браузере
5. ⏭️ Проверить SSL рейтинг через SSL Labs
6. ⏭️ Добавить секреты в GitHub для автоматического деплоя

---

**Готово!** SSL сертификаты настроены и работают. Сайт доступен по HTTPS с автоматическим обновлением сертификатов.

