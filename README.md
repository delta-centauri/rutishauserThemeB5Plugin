# rutishauserThemeB5Plugin

Ein benutzerdefiniertes Full-Width Theme für Artefactual AtoM (basierend auf `arDominionB5Plugin`).

## Aktivierung
1. Stelle sicher, dass Dein Plugin-Ordner `plugins/rutishauserThemeB5Plugin` vorhanden ist.
2. **Plugin-Dependencies installieren**:
   ```bash
   cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
   sudo -u www-data npm install
   cd ../..
   ```
3. Führe einen Frontend Build aus:
   ```bash
   # Falls noch nicht geschehen, Root Dependencies installieren
   sudo -u www-data npm install
   
   # Build für Produktion
   sudo -u www-data npm run build
   
   # Oder für Entwicklung mit Watch
   sudo -u www-data npm run dev
   ```
4. Symfony Cache leeren:
   ```bash
   sudo -u www-data php symfony cc
   ```
5. Im AtoM Backend (Administration > Einstellungen > Benutzeroberfläche) das Theme auf "rutishauserThemeB5Plugin" setzen.
6. Browser Cache leeren (`Strg + Shift + R`).efiniertes Full-Width Theme für AtoM (basierend auf `arDominionB5Plugin`).

## Änderungen
- **Volle Seitenbreite** auf allen Layouts (1-, 2- und 3-Spalten)
- `container-xxl` → `container-fluid` in allen Layout-Dateien
- `container-xl` → `container-fluid` im Header (Site Description Bar)
- SCSS Overrides setzen alle `.container*` Klassen auf `max-width: 100%`
- Header und Wrapper Anpassungen für konsistente horizontale Abstände
- **GLightbox Integration**: Bilder in der Klasse `.ooo` öffnen in einer Lightbox statt neuem Tab
- **Sibling Navigation**: Vor/Zurück-Buttons in der Sidebar zum Durchklicken von Geschwister-Beschreibungen
  - Keyboard Shortcuts: `←` / `→` oder `P` / `N`
  - Zeigt aktuelle Position (z.B. "2 von 5")

## Kopierte und angepasste Dateien

Gemäß der [AtoM Theming-Dokumentation](https://www.accesstomemory.org/en/docs/2.10/admin-manual/customization/theming/) wurden folgende Dateien kopiert und für Full-Width angepasst:

### Templates
- `templates/layout.php` (Standard-Layout)
- `templates/layout_1col.php` (1-Spalten Layout)
- `templates/layout_2col.php` (2-Spalten Layout mit Sidebar)
- `templates/layout_3col.php` (3-Spalten Layout mit Sidebar + Context Menu)
- `templates/_header.php` (Header Partial mit Site Description)
- `templates/_layout_start_webpack.php` (bereits im Skeleton vorhanden)

### Module
- `modules/digitalobject/templates/_showImage.php` (Bilder mit GLightbox-Attributen)
- `modules/informationobject/templates/_actionIcons.php` (erweitert mit Sibling-Navigation)
- `modules/informationobject/templates/_siblingNavigation.php` (Vor/Zurück Buttons)

### Styling
- `scss/main.scss` (erweitert mit Full-Width Overrides + GLightbox + Sibling Navigation Styles)
- `js/main.js` (importiert Dominion JS + GLightbox + Sibling Navigation)
- `js/lightbox.js` (GLightbox Initialisierung)
- `js/siblingNavigation.js` (Keyboard Shortcuts für Navigation)

## Aktivierung
1. Stelle sicher, dass Dein Plugin-Ordner `plugins/rutishauserThemeB5Plugin` vorhanden ist.
2. In AtoM über die Administrations-Oberfläche das Theme wechseln (Systemeinstellungen > Benutzeroberfläche) oder via Konfiguration die Plugin-Reihenfolge anpassen, sodass dieses Theme geladen wird.
3. Führe einen Frontend Build aus:
   - `npm install` (falls noch nicht geschehen)
   - `npm run build` oder `npm run dev` für Entwicklungsmodus.
4. Browser Cache leeren.

## Weitere Anpassungen
- Eigene Farben: Kopiere `scss/_variables.scss` aus `arDominionB5Plugin` und überschreibe gewünschte Variablen bevor Bootstrap geladen wird.
- Zusätzliche Komponenten: Füge neue Imports oder eigene SCSS-Dateien unten in `scss/main.scss` hinzu.

## Nächste Schritte
- Eigene Farbpalette definieren (Orange -> deine Primärfarbe) in `scss/_variables.scss`
- Typografie (Font-Family, Heading-Größen) anpassen
- Eigenes Logo/Favicon in `uploads/r/static/conf` ablegen
- Optional: Performance Tuning durch Entfernen nicht benötigter JS Imports in `js/main.js`

## Dateien im Plugin

```
rutishauserThemeB5Plugin/
├── config/
│   └── rutishauserThemeB5PluginConfiguration.class.php  # Plugin-Konfiguration
├── images/
│   └── image.png                                     # Platzhalter für eigene Bilder
├── js/
│   ├── lightbox.js                                   # GLightbox Initialisierung
│   └── main.js                                       # JavaScript Entry Point
├── modules/
│   └── digitalobject/
│       └── templates/
│           ├── _show.php                             # Digital Object Display
│           └── _showImage.php                        # Image Display mit GLightbox
├── scss/
│   └── main.scss                                     # Haupt-Stylesheet mit Full-Width Overrides
├── templates/
│   ├── layout.php                                    # Standard-Layout
│   ├── layout_1col.php                               # 1-Spalten Layout
│   ├── layout_2col.php                               # 2-Spalten Layout (mit Sidebar)
│   ├── layout_3col.php                               # 3-Spalten Layout (Sidebar + Context Menu)
│   ├── _header.php                                   # Header Partial
│   └── _layout_start_webpack.php                     # HTML Head & Body Start
├── modules/
│   └── digitalobject/
│       └── templates/
│           ├── _show.php                             # Digital Object Display Override
│           └── _showImage.php                        # Image Display mit GLightbox
├── .gitignore
├── CHANGELOG.md
├── INSTALL.md
├── package.json                                      # Plugin Dependencies (GLightbox)
├── README.md
└── webpack.entry.js                                  # Webpack Entry Point
```

## Technische Details

### File Precedence
Gemäß AtoM Dokumentation werden Dateien in folgender Reihenfolge geladen:
1. `plugins/rutishauserThemeB5Plugin/` (höchste Priorität)
2. `plugins/arDominionB5Plugin/`
3. `apps/qubit/` (niedrigste Priorität)

Die Plugin-Konfiguration stellt sicher, dass dieses Theme-Plugin an oberster Stelle geladen wird.

### Container-Klassen Änderungen
Alle folgenden Container-Klassen wurden auf volle Breite angepasst:
- `container-xxl` → `container-fluid` (in allen Layout-Dateien)
- `container-xl` → `container-fluid` (im Header)
- SCSS Override: alle `.container*` Klassen erhalten `max-width: 100%`

