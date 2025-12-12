# Changelog - arRogerThemeB5Plugin

## Version 0.0.3 - Sibling Navigation

### Hinzugefügt
- **Sibling Navigation** in der Context-Menu Sidebar
  - Vor/Zurück-Buttons zum Durchklicken von Geschwister-Beschreibungen
  - Zeigt aktuelle Position (z.B. "2 von 5")
  - Tooltips mit Titel der nächsten/vorherigen Beschreibung
- **Keyboard Shortcuts** für Navigation:
  - `←` / `→` Pfeiltasten oder `P` / `N` Tasten
  - Funktioniert nur wenn kein Input-Feld fokussiert ist
- `modules/informationobject/templates/_siblingNavigation.php` - Neue Navigation-Komponente
- `modules/informationobject/templates/_actionIcons.php` - Override mit Sibling-Navigation
- `js/siblingNavigation.js` - Keyboard Navigation JavaScript
- Custom SCSS Styles für Navigation-Box

### Geändert
- `js/main.js` - Import für sibling Navigation hinzugefügt
- `scss/main.scss` - Styles für Sibling Navigation Box

## Version 0.0.2 - GLightbox Integration

### Hinzugefügt
- **Eigene `package.json`** im Plugin (keine Änderungen an Root-Package nötig!)
- **GLightbox** für Bilder in digitalen Objekten
- `modules/digitalobject/templates/_showImage.php` - Lightbox-Unterstützung
- `js/lightbox.js` - GLightbox Initialisierung
- Custom Lightbox Styles in `scss/main.scss`

### Geändert
- Import-Pfade für GLightbox zeigen auf Plugin-eigene `node_modules`
- `.gitignore` erweitert um `node_modules/` und `package-lock.json`

### Installation
Installiere Plugin-Dependencies separat:
```bash
cd /usr/share/nginx/atom/plugins/arRogerThemeB5Plugin
sudo -u www-data npm install
cd ../..
sudo -u www-data npm run build
sudo -u www-data php symfony cc
```

### Funktionalität
- Bilder in der Klasse `.ooo` öffnen nun in einer Lightbox statt in neuem Tab
- Zoom, Navigation und Touch-Support
- Responsive Galerie-Funktion
- Accessibility-Features (Tastaturnavigation)

## Version 0.0.1 - Initial Full-Width Theme

### Hinzugefügte Dateien

#### Von apps/qubit/templates/ kopiert und angepasst:
- `templates/layout.php` - Standard-Layout (container-xxl → container-fluid)
- `templates/layout_1col.php` - 1-Spalten Layout (container-xxl → container-fluid)
- `templates/layout_2col.php` - 2-Spalten Layout mit Sidebar (container-xxl → container-fluid)
- `templates/layout_3col.php` - 3-Spalten Layout mit Sidebar + Context Menu (container-xxl → container-fluid)
- `templates/_header.php` - Header Partial (container-xl → container-fluid in Site Description)

#### Skeleton-Dateien (bereits vorhanden, angepasst):
- `scss/main.scss` - Full-Width CSS Overrides hinzugefügt
- `js/main.js` - Dominion JS Import (unverändert)
- `templates/_layout_start_webpack.php` - HTML Start Template (unverändert)
- `config/arRogerThemeB5PluginConfiguration.class.php` - Plugin Config (unverändert)

#### Dokumentation:
- `README.md` - Vollständige Plugin-Dokumentation
- `INSTALL.md` - Schnellstart-Anleitung
- `CHANGELOG.md` - Diese Datei

### Änderungen im Detail

#### Template-Änderungen:
Alle Layout-Templates:
```php
// Vorher (Dominion):
<div id="wrapper" class="container-xxl pt-3 flex-grow-1">

// Nachher (Roger Theme):
<div id="wrapper" class="container-fluid pt-3 flex-grow-1">
```

Header Template (`_header.php`):
```php
// Vorher (apps/qubit):
<div class="container-xl py-1">

// Nachher (Roger Theme):
<div class="container-fluid py-1">
```

#### SCSS-Änderungen:
```scss
// Global Container Override
.container,
.container-sm,
.container-md,
.container-lg,
.container-xl,
.container-xxl,
.container-fluid {
  max-width: 100% !important;
  width: 100% !important;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

// Wrapper Full Width
#wrapper {
  width: 100%;
  max-width: 100%;
}

// Responsive Padding Adjustments
@media (min-width: 1400px) {
  #main-column {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
```

### Basis-Theme
- Basiert auf: `arDominionB5Plugin`
- Bootstrap Version: 5.x
- AtoM Version: 2.10+

### Kompatibilität
- ✅ Alle Standard-AtoM Layouts (1-, 2-, 3-Spalten)
- ✅ Responsive Design beibehalten
- ✅ Bootstrap Grid System kompatibel
- ✅ Dominion B5 JavaScript Funktionalität
- ✅ Accessibility Features

### Bekannte Einschränkungen
- Keine: Full-Width funktioniert mit allen Standard-Features

### Nächste geplante Features
- [ ] Optionale maximale Content-Breite für bessere Lesbarkeit
- [ ] Custom Color Variables
- [ ] Custom Typography
- [ ] Dark Mode Support
