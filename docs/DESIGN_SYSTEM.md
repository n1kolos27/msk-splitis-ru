# Дизайн-система проекта

## Обзор

Эта дизайн-система определяет все визуальные и интерактивные элементы проекта msk.splitis.ru для компании ИП Лагуто Иван Иванович.

**Версия:** 1.0.0  
**Последнее обновление:** Январь 2025

---

## Цветовая палитра

### Основные цвета

```css
--color-primary: #0066CC;      /* Основной синий */
--color-primary-hover: #0052A3;
--color-secondary: #00A3FF;    /* Вторичный голубой */
--color-secondary-hover: #0088D9;
```

### Статусные цвета

```css
--color-success: #10B981;      /* Зеленый - успех */
--color-warning: #F59E0B;      /* Оранжевый - предупреждение */
--color-error: #EF4444;        /* Красный - ошибка */
--color-info: #3B82F6;         /* Синий - информация */
```

### Нейтральные цвета

Градация серых от `--color-gray-50` (самый светлый) до `--color-gray-900` (самый темный).

### Использование цветов

- **Primary:** Основные действия, ссылки, акценты
- **Secondary:** Вторичные действия, дополняющие элементы
- **Success:** Успешные операции, валидация
- **Warning:** Предупреждения, внимания требуют
- **Error:** Ошибки, критичные сообщения
- **Info:** Информационные сообщения

---

## Типографика

### Шрифт

**Основной шрифт:** Inter (Google Fonts)  
**Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

### Размеры заголовков

```css
h1: clamp(2rem, 5vw, 3.5rem)    /* 32px - 56px */
h2: clamp(1.75rem, 4vw, 2.5rem) /* 28px - 40px */
h3: clamp(1.5rem, 3vw, 2rem)    /* 24px - 32px */
h4: clamp(1.25rem, 2vw, 1.5rem) /* 20px - 24px */
h5: clamp(1.125rem, 1.5vw, 1.25rem)
h6: 1rem
```

### Веса шрифтов

- **400 (normal):** Основной текст
- **500 (medium):** Акцентированный текст, labels
- **600 (semibold):** Подзаголовки, кнопки
- **700 (bold):** Заголовки, важные элементы

### Высота строки

- **Body text:** 1.5
- **Headings:** 1.2

---

## Spacing (Отступы)

Базовая единица: `1rem = 16px`

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
```

### Принципы spacing

- Используйте предопределенные значения переменных
- Для небольших корректировок используйте кратные `--spacing-xs`
- Между секциями: `--spacing-2xl` или `--spacing-3xl`

---

## Тени (Shadows)

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

### Использование

- **sm:** Карточки, легкие элементы
- **md:** Кнопки при hover, модальные окна
- **lg:** Выпадающие меню, popovers
- **xl:** Модальные окна, важные элементы

---

## Border Radius

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 9999px;   /* Полный круг */
```

### Использование

- **sm:** Маленькие элементы (badges, маленькие кнопки)
- **md:** Стандартные элементы (кнопки, input, карточки)
- **lg:** Большие карточки, секции
- **xl:** Hero секции, крупные блоки
- **full:** Круглые элементы (avatars, иконки)

---

## Анимации и переходы

### Длительность

```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-base: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

### Easing функции

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Принципы анимаций

- Все анимации должны уважать `prefers-reduced-motion`
- Используйте `ease-out` для появления элементов
- Используйте `ease-in` для скрытия элементов
- Для интерактивных элементов: `duration-fast` или `duration-base`

---

## Breakpoints (Точки перелома)

```css
Base:    320px+    /* Mobile portrait */
sm:     640px+    /* Mobile landscape */
md:     768px+    /* Tablet */
lg:     1024px+   /* Desktop */
xl:     1280px+   /* Large desktop */
2xl:    1536px+   /* Extra large */
```

### Mobile First подход

Все стили пишутся для мобильных устройств первыми, затем добавляются media queries для больших экранов.

---

## Z-index Scale

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
--z-toast: 1080;
```

### Использование

Используйте только эти предопределенные значения. Никогда не создавайте новые z-index значения напрямую.

---

## Компоненты

### Кнопки

**Размеры:**
- `btn--sm`: 36px высота
- `btn` (default): 44px высота
- `btn--lg`: 52px высота

**Варианты:**
- `btn--primary`: Основная кнопка
- `btn--secondary`: Вторичная кнопка
- `btn--outline`: Контурная кнопка
- `btn--ghost`: Прозрачная кнопка

**Состояния:**
- `:hover`, `:focus`, `:active`
- `:disabled` или `.btn--disabled`
- `.btn--loading`

### Карточки

**Базовые классы:**
- `.card`: Базовая карточка
- `.card--elevated`: Карточка с тенью

**Специализированные:**
- `.product-card`: Карточка товара
- `.benefit-card`: Карточка преимущества
- `.review-card`: Карточка отзыва

### Формы

**Структура:**
- `.form`: Контейнер формы
- `.form__group`: Группа полей
- `.form__label`: Метка поля
- `.form__input`, `.form__textarea`, `.form__select`: Поля ввода

**Состояния:**
- `.form__group--error`: Группа с ошибкой
- `.form__input--error`: Поле с ошибкой
- `.form__input--success`: Поле с успешной валидацией

---

## Утилитарные классы

### Spacing

```css
.mt-{size}, .mb-{size}, .pt-{size}, .pb-{size}
```

Где `{size}`: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Типографика

```css
.text-xs, .text-sm, .text-base, .text-lg, .text-xl, .text-2xl, .text-3xl, .text-4xl
.font-normal, .font-medium, .font-semibold, .font-bold
.text-center, .text-left, .text-right
.text-primary, .text-secondary, .text-muted
```

### Layout

```css
.container: Центрированный контейнер с max-width
.grid: Grid система
.text-center, .text-left, .text-right
```

---

## Accessibility (A11y)

### Обязательные требования

1. **ARIA labels:** Все интерактивные элементы должны иметь aria-label или aria-labelledby
2. **Keyboard navigation:** Все элементы должны быть доступны с клавиатуры
3. **Focus indicators:** Все фокусируемые элементы должны иметь видимый focus state
4. **Color contrast:** Минимум WCAG 2.1 AA (4.5:1 для текста)
5. **Skip links:** Доступны для screen readers

### Focus States

```css
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## Best Practices

1. **Всегда используйте CSS переменные** вместо hardcoded значений
2. **Mobile First:** Пишите стили сначала для мобильных
3. **Семантический HTML:** Используйте правильные HTML теги
4. **Производительность:** Минимизируйте количество DOM элементов
5. **Accessibility First:** Делайте интерфейс доступным с самого начала

---

## Версионирование

Дизайн-система следует семантическому версионированию:

- **MAJOR:** Breaking changes (удаление компонентов, изменение API)
- **MINOR:** Новые компоненты, обратно совместимые изменения
- **PATCH:** Багфиксы, мелкие улучшения

---

*Документация обновляется по мере развития проекта*

