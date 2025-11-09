# Руководство по внедрению системы компонентов

## Обзор

Система компонентов позволяет избежать дублирования кода header, footer и других повторяющихся элементов на всех страницах сайта.

## Архитектура

### Компоненты
- `components/header.html` - Шапка сайта с навигацией
- `components/footer.html` - Подвал сайта
- `components/breadcrumbs.html` - Хлебные крошки (базовый шаблон)

### JavaScript модули
- `assets/js/components-loader.js` - Загрузчик компонентов
- `assets/js/schema-generator.js` - Генератор Schema.org разметки

## Использование

### 1. Замена header и footer на компоненты

**До:**
```html
<header class="header">
  <!-- 220+ строк кода -->
</header>

<!-- Контент страницы -->

<footer class="footer">
  <!-- 90+ строк кода -->
</footer>
```

**После:**
```html
<!-- Header будет загружен автоматически -->
<div data-component="header"></div>

<!-- Контент страницы -->

<!-- Footer будет загружен автоматически -->
<div data-component="footer"></div>
```

### 2. Подключение скриптов

В `<head>` или перед закрывающим `</body>`:
```html
<script src="assets/js/schema-generator.js"></script>
<script src="assets/js/components-loader.js" defer></script>
```

### 3. Использование Schema.org генератора

**До (статичный код):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ИП Лагуто Иван Иванович",
  // ... 40+ строк
}
</script>
```

**После (динамическая генерация):**
```html
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Генерация Organization
  const orgSchema = SchemaGenerator.generateOrganization();
  SchemaGenerator.insertSchema(orgSchema, 'schema-organization');

  // Генерация LocalBusiness (для главной страницы)
  const localBusinessSchema = SchemaGenerator.generateLocalBusiness({
    description: 'Описание для главной страницы'
  });
  SchemaGenerator.insertSchema(localBusinessSchema, 'schema-localbusiness');
});
</script>
```

## Миграция существующих страниц

### Шаг 1: Найти и заменить header
1. Найти начало `<header class="header">`
2. Найти конец `</header>` (включая mobile menu)
3. Заменить весь блок на `<div data-component="header"></div>`

### Шаг 2: Найти и заменить footer
1. Найти начало `<footer class="footer">`
2. Найти конец `</footer>`
3. Заменить весь блок на `<div data-component="footer"></div>`

### Шаг 3: Подключить скрипты
Добавить перед закрывающим `</body>`:
```html
<script src="assets/js/schema-generator.js"></script>
<script src="assets/js/components-loader.js" defer></script>
```

### Шаг 4: Оптимизировать Schema.org (опционально)
Заменить статичные блоки на динамическую генерацию через `SchemaGenerator`.

## Преимущества

1. **Устранение дублирования:** Снижение дублирования кода с 112% до <5%
2. **Упрощение поддержки:** Изменение header/footer в 1 месте вместо 32
3. **Единообразие:** Гарантированная одинаковость компонентов на всех страницах
4. **Автоматизация:** Автоматическое определение активной страницы в навигации

## Обратная совместимость

Система работает с существующим кодом:
- Если компонент не загрузился, страница продолжит работать (fallback)
- Существующие скрипты (mobile-menu.js и т.д.) продолжают работать
- Можно мигрировать страницы постепенно

## Примечания

- Компоненты загружаются асинхронно через fetch API
- Для работы требуется веб-сервер (не работает при открытии файла напрямую)
- Активная ссылка в навигации определяется автоматически по URL страницы

