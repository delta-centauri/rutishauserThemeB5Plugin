# rutishauserThemeB5Plugin

**[🇬🇧 English](README.md) | [🇩🇪 Deutsch](README-DE.md) | [🇪🇸 Español](README-ES.md) | [🇫🇷 Français](README-FR.md)**

Тема на всю ширину для Artefactual AtoM (Access to Memory) на основі `arDominionB5Plugin` з покращеною навігацією та можливостями перегляду, спеціально для архівних описів із зображеннями.

## Особливості

### Макет на Всю Ширину
- Усі контейнери використовують 100% ширини для максимального використання доступного простору
- `container-xxl` → `container-fluid` у всіх файлах макета
- `container-xl` → `container-fluid` у заголовку (Панель опису сайту)
- SCSS overrides встановлюють усі класи `.container*` на `max-width: 100%`
- Налаштування заголовка та обгортки для узгодженого горизонтального відступу
- Оптимальні відступи для різних розмірів екрана

### Переглядач Зображень GLightbox
- Зображення в класі `.ooo` відкриваються в сучасному lightbox замість нової вкладки
- Функція масштабування (колесо миші)
- Переміщення/перетягування зображень мишею
- Навігація клавіатурою (клавіші зі стрілками, ESC для закриття)
- Підтримка сенсорного управління для планшетів/смартфонів (гортання, зведення для масштабування)
- Адаптивний та доступний

### Навігація Між Сусідніми
- Кнопки Попередній/Наступний під відображенням зображення для навігації між сусідніми описами
- Показує поточну позицію в батьківській архівній одиниці (наприклад, "2 з 5")
- Навігація безпосередньо в lightbox:
  - Стрілки зліва та справа від зображення для Попередній/Наступний
  - Номер зображення та посилання для відкриття в окремій вкладці безпосередньо в описі зображення
  - Детальна сторінка архівного опису за lightbox автоматично завантажується, тому при закритті lightbox відображається поточна сторінка

### Інтернаціоналізація (i18n)
- Переклади німецькою, англійською, іспанською, французькою та українською мовами для всіх текстів плагіна


## Встановлення

### Передумови
- Artefactual AtoM (Версія 2.7; сумісний з Bootstrap 5)
- `arDominionB5Plugin` як базова тема
- Node.js та npm для процесу збірки

### Швидке Встановлення за Допомогою install-theme.sh

Плагін включає скрипт встановлення, який автоматично копіює файли в правильне місце:

```bash
# Зробити скрипт виконуваним
chmod +x install-theme.sh

# Запустити встановлення
./install-theme.sh
```

Скрипт запитає шлях встановлення AtoM (за замовчуванням: `/usr/share/nginx/atom`) з автодоповненням за допомогою Tab.

Скрипт:
1. Копіює всі файли плагіна до `plugins/rutishauserThemeB5Plugin/`
2. Встановлює правильні дозволи для користувача веб-сервера (www-data)
3. Встановлює залежності плагіна (npm install)
4. Збирає assets за допомогою webpack
5. Очищає кеш Symfony

### Ручне Встановлення

Якщо ви віддаєте перевагу встановленню плагіна вручну:

```bash
# 1. Скопіювати плагін до AtoM
cp -r rutishauserThemeB5Plugin /usr/share/nginx/atom/plugins/

# 2. Встановити дозволи
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo chown -R www-data:www-data .

# 3. Встановити залежності плагіна
sudo -u www-data npm install
```

### Збірка Assets

Після встановлення assets повинні бути зібрані:

```bash
# Перейти до кореневого каталогу AtoM
cd /usr/share/nginx/atom

# Встановити кореневі залежності (якщо ще не зроблено)
sudo -u www-data npm install

# Збірка для продакшена
sudo -u www-data npm run build

# Або для розробки з watch
sudo -u www-data npm run dev
```

### Активувати Тему

#### Варіант 1: Через Бекенд AtoM (рекомендовано)
1. Увійти як адміністратор
2. Адмін → Налаштування → Інтерфейс Користувача
3. Вибрати тему: "rutishauserThemeB5Plugin"
4. Зберегти

#### Варіант 2: Через Базу Даних (не перевірено)
```sql
UPDATE setting
SET value = 'rutishauserThemeB5Plugin'
WHERE name = 'plugins';
```

### Очистити Кеш

```bash
# Очистити кеш Symfony
sudo -u www-data php symfony cc

# Очистити кеш браузера
# Chrome/Edge: Ctrl + Shift + R
# Firefox: Ctrl + F5
```


## Розробка

### Структура Проєкту

```
rutishauserThemeB5Plugin/
├── config/
│   └── rutishauserThemeB5PluginConfiguration.class.php  # Конфігурація плагіна
├── i18n/
│   ├── de/
│   │   └── messages.xml                                 # Німецькі переклади
│   ├── en/
│   │   └── messages.xml                                 # Англійські переклади
│   ├── es/
│   │   └── messages.xml                                 # Іспанські переклади
│   ├── fr/
│   │   └── messages.xml                                 # Французькі переклади
│   └── uk/
│       └── messages.xml                                 # Українські переклади
├── images/
│   └── image.png                                        # Зображення попереднього перегляду теми
├── js/
│   ├── lightbox.js                                      # Ініціалізація GLightbox з навігацією між сусідніми
│   └── main.js                                          # Точка входу JavaScript
├── modules/
│   ├── digitalobject/
│   │   └── templates/
│   │       ├── _show.php                                # Перевизначення відображення цифрового об'єкта
│   │       └── _showImage.php                           # Відображення зображення з GLightbox
│   └── informationobject/
│       └── templates/
│           └── _siblingNavigation.php                   # Компонент навігації між сусідніми
├── scss/
│   └── main.scss                                        # Основна таблиця стилів з перевизначеннями повної ширини
├── templates/
│   ├── layout.php                                       # Макет за замовчуванням
│   ├── layout_1col.php                                  # Макет з 1 колонкою
│   ├── layout_2col.php                                  # Макет з 2 колонками (з бічною панеллю)
│   ├── layout_3col.php                                  # Макет з 3 колонками (бічна панель + контекстне меню)
│   ├── _header.php                                      # Частковий заголовок
│   └── _layout_start_webpack.php                        # Початок HTML head & body
├── .gitignore
├── install-theme.sh                                     # Скрипт встановлення
├── package.json                                         # Залежності плагіна (GLightbox)
├── README.md                                            # Основна документація (англійська)
├── README-DE.md                                         # Німецька документація
├── README-ES.md                                         # Іспанська документація
├── README-FR.md                                         # Французька документація
├── README-UK.md                                         # Українська документація
└── webpack.entry.js                                     # Точка входу Webpack
```


## Ліцензія

AGPL-3.0

## Подяки

- Базується на [arDominionB5Plugin](https://github.com/artefactual/atom/tree/qa/2.x/plugins/arDominionB5Plugin)
- Використовує [GLightbox](https://github.com/biati-digital/glightbox) для функціональності lightbox
- Розроблено Roger Rutishauser (roger.rutishauser@gmail.com) за допомогою claude.ai

## Версія

0.0.3
