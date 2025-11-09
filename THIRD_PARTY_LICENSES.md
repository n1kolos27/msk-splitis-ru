# Third-Party Licenses

**Проект:** Сайт msk.splitis.ru  
**Версия:** 1.0.0  
**Дата:** Январь 2025

Этот документ содержит полный список всех open-source библиотек и технологий, используемых в проекте, вместе с их лицензиями.

---

## Статистика зависимостей

- **Всего уникальных пакетов:** 267
- **Dev Dependencies:** 267 (100%)
- **Runtime Dependencies:** 0 (0%)
- **Опциональные зависимости:** 11 (4.1%)
- **Уникальных лицензий:** 13

---

## Распределение по лицензиям

| Лицензия | Количество | Процент | Коммерция | Примечание |
|----------|-----------|---------|-----------|------------|
| MIT | 198 | 74.2% | ✅ | |
| BSD-2-Clause | 17 | 6.4% | ✅ | |
| ISC | 16 | 6.0% | ✅ | |
| Apache-2.0 | 14 | 5.2% | ✅ | |
| LGPL-3.0-or-later | 8 | 3.0% | ✅* | Все опциональные |
| BSD-3-Clause | 5 | 1.9% | ✅ | |
| Apache-2.0 AND LGPL-3.0-or-later | 2 | 0.7% | ✅* | Опциональные |
| CC0-1.0 | 2 | 0.7% | ✅ | |
| Apache-2.0 AND LGPL-3.0-or-later AND MIT | 1 | 0.4% | ✅* | Опциональный |
| Python-2.0 | 1 | 0.4% | ✅ | |
| CC-BY-4.0 | 1 | 0.4% | ✅ | |
| BlueOak-1.0.0 | 1 | 0.4% | ✅ | |
| 0BSD | 1 | 0.4% | ✅ | |

\* LGPL-3.0 зависимости являются опциональными нативными модулями библиотеки sharp, используются только в процессе сборки и не включаются в финальный продукт.

---

## Прямые зависимости (Direct Dependencies)

### Static Site Generator

#### @11ty/eleventy v3.1.2
- **Лицензия:** MIT
- **Тип:** Dev Dependency
- **URL:** https://www.11ty.dev/
- **Репозиторий:** https://github.com/11ty/eleventy
- **Описание:** Static Site Generator для генерации HTML страниц из шаблонов

#### @11ty/eleventy-img v6.0.4
- **Лицензия:** MIT
- **Тип:** Dev Dependency
- **URL:** https://www.11ty.dev/docs/plugins/image/
- **Репозиторий:** https://github.com/11ty/eleventy-img
- **Описание:** Оптимизация изображений для Eleventy

### Build Tools

#### html-minifier v4.0.0
- **Лицензия:** MIT
- **Тип:** Dev Dependency
- **Репозиторий:** https://github.com/kangax/html-minifier
- **Описание:** Минификация HTML файлов

#### cssnano v7.1.2
- **Лицензия:** MIT
- **Тип:** Dev Dependency
- **Репозиторий:** https://github.com/cssnano/cssnano
- **Описание:** Минификация CSS файлов

#### postcss v8.5.6
- **Лицензия:** MIT
- **Тип:** Dev Dependency
- **URL:** https://postcss.org/
- **Репозиторий:** https://github.com/postcss/postcss
- **Описание:** Инструмент для трансформации CSS

#### terser v5.44.0
- **Лицензия:** BSD-2-Clause
- **Тип:** Dev Dependency
- **Репозиторий:** https://github.com/terser/terser
- **Описание:** Минификация и сжатие JavaScript файлов

---

## Зависимости по лицензиям

### MIT License (198 пакетов)

MIT License - одна из самых разрешающих лицензий. Разрешает коммерческое использование, модификацию и распространение.

**Основные пакеты:**
- @11ty/eleventy и все связанные пакеты
- @11ty/eleventy-img
- html-minifier
- cssnano
- postcss
- Большинство транзитивных зависимостей

**Полный список:** См. `all-dependencies.json` (фильтр: `license: "MIT"`)

### BSD-2-Clause License (17 пакетов)

BSD-2-Clause License - очень разрешающая лицензия, аналогична MIT.

**Основные пакеты:**
- terser
- css-select
- Различные утилиты

**Полный список:** См. `all-dependencies.json` (фильтр: `license: "BSD-2-Clause"`)

### ISC License (16 пакетов)

ISC License - эквивалентна MIT и BSD лицензиям по разрешительности.

**Основные пакеты:**
- Различные утилиты и библиотеки

**Полный список:** См. `all-dependencies.json` (фильтр: `license: "ISC"`)

### Apache-2.0 License (14 пакетов)

Apache License 2.0 - разрешающая лицензия с патентной защитой.

**Основные пакеты:**
- @img/sharp-* (опциональные нативные модули)
- baseline-browser-mapping

**Полный список:** См. `all-dependencies.json` (фильтр: `license: "Apache-2.0"`)

### LGPL-3.0-or-later License (8 пакетов)

**ВАЖНО:** Все LGPL-3.0 зависимости являются опциональными нативными модулями библиотеки sharp. Они используются только в процессе сборки и НЕ включаются в финальный продукт.

**Пакеты:**
- @img/sharp-libvips-darwin-arm64
- @img/sharp-libvips-darwin-x64
- @img/sharp-libvips-linux-arm
- @img/sharp-libvips-linux-arm64
- @img/sharp-libvips-linux-s390x
- @img/sharp-libvips-linux-x64
- @img/sharp-libvips-linuxmusl-arm64
- @img/sharp-libvips-linuxmusl-x64

**Коммерческое использование:** ✅ Разрешено (не включаются в продукт)

### Другие лицензии

- **BSD-3-Clause** (5 пакетов): Разрешающая лицензия
- **CC0-1.0** (2 пакета): Public Domain эквивалент
- **CC-BY-4.0** (1 пакет): Creative Commons Attribution
- **Python-2.0** (1 пакет): Python Software Foundation License
- **BlueOak-1.0.0** (1 пакет): Разрешающая лицензия
- **0BSD** (1 пакет): Public Domain эквивалент

---

## Frontend технологии (не npm пакеты)

### HTML5 (W3C Standard)
- **Лицензия:** W3C Software Notice and License
- **Коммерческое использование:** ✅ Разрешено
- **URL:** https://www.w3.org/TR/html5/

### CSS3 (W3C Standard)
- **Лицензия:** W3C Software Notice and License
- **Коммерческое использование:** ✅ Разрешено
- **URL:** https://www.w3.org/TR/CSS/

### JavaScript (ECMAScript ES6+)
- **Лицензия:** Нет (стандарт языка)
- **Коммерческое использование:** ✅ Разрешено

### Google Fonts (Inter)
- **Лицензия:** SIL Open Font License 1.1 (OFL-1.1)
- **Коммерческое использование:** ✅ Разрешено
- **URL:** https://fonts.google.com/specimen/Inter

### Schema.org Vocabulary
- **Лицензия:** Creative Commons Attribution-ShareAlike 3.0 Unported
- **Коммерческое использование:** ✅ Разрешено
- **URL:** https://schema.org/docs/terms.html

### Open Graph Protocol
- **Лицензия:** MIT License
- **Коммерческое использование:** ✅ Разрешено
- **URL:** https://github.com/opengraphprotocol/specs

### Twitter Cards
- **Лицензия:** Открытый стандарт
- **Коммерческое использование:** ✅ Разрешено

---

## Полный список зависимостей

Полный список всех 267 зависимостей с версиями и лицензиями доступен в файле `all-dependencies.json`.

Для просмотра:
```bash
cat all-dependencies.json | jq '.[] | {name, version, license}'
```

---

## Важные замечания

1. **Все зависимости являются Dev Dependencies:**
   - Используются только в процессе разработки и сборки
   - Финальный продукт (_site/) не содержит npm зависимостей

2. **LGPL-3.0 зависимости:**
   - Все опциональные нативные модули библиотеки sharp
   - Используются только при сборке для оптимизации изображений
   - Не включаются в финальный продукт
   - Совместимы с коммерческим использованием

3. **Runtime Dependencies:**
   - Отсутствуют
   - Финальный сайт - чистый HTML/CSS/JS

---

## Контакты

При возникновении вопросов относительно лицензий обращайтесь:

**ИП Лагуто Иван Иванович**
- Email: info@msk.splitis.ru
- Телефон: +7 (499) 757-57-19

---

_Документ создан: Январь 2025_  
_Последнее обновление: Январь 2025_  
_Версия проекта: 1.0.0_

