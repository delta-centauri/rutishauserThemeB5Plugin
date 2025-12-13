# rutishauserThemeB5Plugin

Ein benutzerdefiniertes Full-Width Theme für Artefactual AtoM (Access to Memory) basierend auf `arDominionB5Plugin`.

## Features

### Full Width Layout
- Alle Container nutzen 100% Breite für maximale Nutzung des verfügbaren Platzes
- `container-xxl` → `container-fluid` in allen Layout-Dateien
- `container-xl` → `container-fluid` im Header (Site Description Bar)
- SCSS Overrides setzen alle `.container*` Klassen auf `max-width: 100%`
- Header und Wrapper Anpassungen für konsistente horizontale Abstände
- Optimale Padding für verschiedene Bildschirmgrößen

### GLightbox Image Viewer
- Bilder in der Klasse `.ooo` öffnen in einer modernen Lightbox statt in neuem Tab
- Zoom und Pan Funktionalität
- Tastatur-Navigation (Pfeiltasten, ESC zum Schließen)
- Touch-Support für Tablets/Smartphones
- Drag & Drop Unterstützung
- Responsive und barrierefrei

### Geschwister-Navigation (Sibling Navigation)
- Vor/Zurück-Buttons unterhalb der Bildanzeige zum Durchklicken von Geschwister-Beschreibungen
- Zeigt aktuelle Position (z.B. "2 von 5")
- Navigation direkt in der Lightbox:
  - Pfeile links und rechts vom Bild für Vor/Zurück
  - Bildnummer und Link zum Öffnen in separatem Tab direkt in der Bildbeschreibung
  - Keine doppelten Klicks erforderlich
- Automatisches Öffnen der Lightbox nach Navigation

### Mehrsprachigkeit (i18n)
- Deutsche und englische Übersetzungen für alle Plugin-spezifischen Texte
- "Geschwister-Navigation" / "Navigate siblings"
- "Bild in separatem Tab öffnen" / "Open image in separate tab"

## Installation

### Voraussetzungen
- Artefactual AtoM (Version 2.x)
- `arDominionB5Plugin` als Basis-Theme
- Node.js und npm für den Build-Prozess

### Schnellinstallation mit install-theme.sh

Das Plugin enthält ein Installationsskript, das die Dateien automatisch an den richtigen Ort kopiert:

```bash
# Script ausführbar machen
chmod +x install-theme.sh

# Installation durchführen (Standard: /usr/share/nginx/atom)
./install-theme.sh

# Oder mit benutzerdefiniertem Pfad
./install-theme.sh /pfad/zu/deiner/atom/installation
```

Das Skript:
1. Kopiert alle Plugin-Dateien nach `plugins/rutishauserThemeB5Plugin/`
2. Setzt korrekte Berechtigungen für den Webserver-Benutzer (www-data)
3. Installiert Plugin-Dependencies (npm install)

### Manuelle Installation

Wenn du das Plugin manuell installieren möchtest:

```bash
# 1. Plugin nach AtoM kopieren
cp -r rutishauserThemeB5Plugin /usr/share/nginx/atom/plugins/

# 2. Berechtigungen setzen
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo chown -R www-data:www-data .

# 3. Plugin-Dependencies installieren
sudo -u www-data npm install
```

### Build durchführen

Nach der Installation müssen die Assets gebaut werden:

```bash
# Zum AtoM Root-Verzeichnis wechseln
cd /usr/share/nginx/atom

# Root Dependencies installieren (falls noch nicht geschehen)
sudo -u www-data npm install

# Produktions-Build
sudo -u www-data npm run build

# Oder für Entwicklung mit Watch
sudo -u www-data npm run dev
```

### Theme aktivieren

#### Option 1: Via AtoM Backend (empfohlen)
1. Als Administrator einloggen
2. Admin → Einstellungen → Benutzeroberfläche
3. Theme auswählen: "rutishauserThemeB5Plugin"
4. Speichern

#### Option 2: Via Datenbank
```sql
UPDATE setting
SET value = 'rutishauserThemeB5Plugin'
WHERE name = 'plugins';
```

### Cache leeren

```bash
# Symfony Cache leeren
sudo -u www-data php symfony cc

# Browser Cache leeren
# Chrome/Edge: Strg + Shift + R
# Firefox: Strg + F5
```

## Entwicklung

### Projektstruktur

```
rutishauserThemeB5Plugin/
├── config/
│   └── rutishauserThemeB5PluginConfiguration.class.php  # Plugin-Konfiguration
├── i18n/
│   ├── de/
│   │   └── messages.xml                                 # Deutsche Übersetzungen
│   └── en/
│       └── messages.xml                                 # Englische Übersetzungen
├── images/
│   └── image.png                                        # Theme-Vorschaubild
├── js/
│   ├── lightbox.js                                      # GLightbox Initialisierung mit Sibling Navigation
│   └── main.js                                          # JavaScript Entry Point
├── modules/
│   ├── digitalobject/
│   │   └── templates/
│   │       ├── _show.php                                # Digital Object Display Override
│   │       └── _showImage.php                           # Image Display mit GLightbox
│   └── informationobject/
│       └── templates/
│           └── _siblingNavigation.php                   # Sibling Navigation Component
├── scss/
│   └── main.scss                                        # Haupt-Stylesheet mit Full-Width Overrides
├── templates/
│   ├── layout.php                                       # Standard-Layout
│   ├── layout_1col.php                                  # 1-Spalten Layout
│   ├── layout_2col.php                                  # 2-Spalten Layout (mit Sidebar)
│   ├── layout_3col.php                                  # 3-Spalten Layout (Sidebar + Context Menu)
│   ├── _header.php                                      # Header Partial
│   └── _layout_start_webpack.php                        # HTML Head & Body Start
├── .gitignore
├── install-theme.sh                                     # Installationsskript
├── package.json                                         # Plugin Dependencies (GLightbox)
├── README.md
└── webpack.entry.js                                     # Webpack Entry Point
```

### Kopierte und angepasste Dateien

Gemäß der [AtoM Theming-Dokumentation](https://www.accesstomemory.org/en/docs/2.10/admin-manual/customization/theming/) wurden folgende Dateien kopiert und angepasst:

#### Templates
- `templates/layout.php` - Standard-Layout mit Full-Width
- `templates/layout_1col.php` - 1-Spalten Layout mit Full-Width
- `templates/layout_2col.php` - 2-Spalten Layout mit Sidebar und Full-Width
- `templates/layout_3col.php` - 3-Spalten Layout mit Sidebar, Context Menu und Full-Width
- `templates/_header.php` - Header Partial mit Full-Width Container
- `templates/_layout_start_webpack.php` - HTML Head (bereits im Skeleton vorhanden)

#### Module Templates
- `modules/digitalobject/templates/_showImage.php` - Bilder mit GLightbox-Attributen und Sibling-Daten
- `modules/informationobject/templates/_siblingNavigation.php` - Vor/Zurück Buttons mit Counter

#### Styling und JavaScript
- `scss/main.scss` - Erweitert mit Full-Width Overrides, GLightbox und Sibling Navigation Styles
- `js/main.js` - Importiert Dominion JS + GLightbox
- `js/lightbox.js` - GLightbox Initialisierung mit Sibling Navigation in der Lightbox

#### Übersetzungen
- `i18n/de/messages.xml` - Deutsche Übersetzungen für Plugin-spezifische Texte
- `i18n/en/messages.xml` - Englische Übersetzungen für Plugin-spezifische Texte

### Eigene Anpassungen vornehmen

#### Farben ändern
Erstelle `scss/_variables.scss`:
```scss
// Deine Custom Colors
$primary: #007bff;  // Anstatt Orange
$secondary: #6c757d;

// Bootstrap importieren
@import "../../arDominionB5Plugin/scss/variables";
```

Dann in `scss/main.scss` vor dem Import einfügen:
```scss
@import "variables";
@import "../../arDominionB5Plugin/scss/main.scss";
```

#### Weitere SCSS/CSS Anpassungen
Ergänze deine Styles am Ende von `scss/main.scss`:
```scss
// Deine custom styles
.custom-class {
  // ...
}
```

#### JavaScript erweitern
Füge weitere Imports in `js/main.js` hinzu:
```javascript
// Eigene Module
import './custom-feature.js';
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

### GLightbox Integration
Das Plugin nutzt GLightbox v3.3.0 für die Lightbox-Funktionalität:
- Automatische Initialisierung für alle `.glightbox` Links
- Custom Sibling Navigation wird dynamisch hinzugefügt
- SessionStorage für Auto-Open nach Navigation
- Data-Attribute für Sibling-Informationen (prev/next URLs, Titel, Position)

### Sibling Navigation Implementation
Die Navigation zwischen Geschwister-Beschreibungen erfolgt auf zwei Ebenen:

1. **Unterhalb der Bildanzeige** (`_siblingNavigation.php`):
   - PHP-basierte Navigation mit Vor/Zurück-Buttons
   - Zeigt aktuelle Position (z.B. "2 von 5")
   - Link zum Öffnen des Bildes in separatem Tab

2. **In der Lightbox** (`lightbox.js`):
   - JavaScript fügt dynamisch Navigationselemente hinzu
   - Pfeile links und rechts vom Bild
   - Bildnummer und Tab-Link in der Bildbeschreibung
   - Auto-Open nach Navigation durch SessionStorage

## Troubleshooting

### Theme wird nicht geladen
1. Plugin-Reihenfolge prüfen in `config/ProjectConfiguration.class.php`
2. Sicherstellen, dass Webpack-Build erfolgreich war
3. Cache leeren (Symfony + Browser)

### Styles werden nicht angewendet
1. `sudo -u www-data npm run build` erneut ausführen
2. Prüfen ob `web/` Verzeichnis die neuen Bundle-Dateien enthält
3. Browser-Cache mit `Strg + Shift + R` leeren

### GLightbox funktioniert nicht
1. Prüfen ob GLightbox installiert wurde: `ls node_modules/glightbox`
2. Falls nicht: `sudo -u www-data npm install` im Plugin-Verzeichnis
3. Build neu durchführen
4. Browser-Konsole auf JavaScript-Fehler prüfen

### Sibling Navigation zeigt undefined
1. Prüfen ob `_showImage.php` die data-Attribute korrekt setzt
2. Browser-Konsole auf Fehler prüfen
3. Sicherstellen dass PHP-Template überschrieben wird (File Precedence)

### Fehler beim Build
```bash
# Node Modules neu installieren
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo rm -rf node_modules package-lock.json
sudo -u www-data npm install

cd /usr/share/nginx/atom
sudo rm -rf node_modules package-lock.json
sudo -u www-data npm install
sudo -u www-data npm run build
```

### Lightbox öffnet nach doppeltem Klick
Dies sollte mit den aktuellen Duplicate-Prevention-Checks behoben sein. Falls es weiterhin auftritt:
1. Browser-Cache leeren
2. Prüfen ob die neueste Version von `lightbox.js` deployed wurde
3. JavaScript-Konsole auf Fehler prüfen

## Testing

### GLightbox testen
1. Navigiere zu einem Digital Object (Archivbeschreibung mit Bild)
2. Das Bild sollte einen `cursor: zoom-in` zeigen beim Hover
3. Klick auf das Bild öffnet die Lightbox (nicht neuen Tab)
4. In der Lightbox:
   - Pfeiltasten funktionieren für Navigation
   - ESC schließt die Lightbox
   - Zoom mit Mausrad möglich
   - Touch-Gesten auf Mobile funktionieren
   - Drag & Drop zum Verschieben des Bildes

### Sibling Navigation testen
1. Navigiere zu einem Information Object mit Geschwistern (gleicher Parent)
2. Unterhalb des Bildes sollte die Navigation erscheinen
3. Klick auf "Zurück"/"Vor" navigiert zu Geschwister-Beschreibungen
4. Öffne die Lightbox:
   - Pfeile links/rechts vom Bild sollten erscheinen
   - Bildbeschreibung zeigt "Bild X von Y | Bild in separatem Tab öffnen"
   - Klick auf Pfeile navigiert zur nächsten/vorherigen Beschreibung
   - Lightbox öffnet sich automatisch nach Navigation

## Lizenz

AGPL-3.0

## Credits

- Basiert auf [arDominionB5Plugin](https://github.com/artefactual/atom/tree/qa/2.x/plugins/arDominionB5Plugin)
- Nutzt [GLightbox](https://github.com/biati-digital/glightbox) für die Lightbox-Funktionalität
- Entwickelt für das Archiv Rutishauser

## Version

0.0.3

## Changelog

### Version 0.0.3 (2025-12-13)
- Sibling Navigation in Lightbox optimiert
- Duplicate Prevention für Navigation-Elemente
- Bildnummer und Tab-Link direkt in Bildbeschreibung
- i18n Übersetzungen für alle Texte
- Keyboard-Navigation-Hint entfernt
- Hover-Effekt auf Bildern entfernt

### Version 0.0.2
- GLightbox Integration
- Sibling Navigation unterhalb der Bildanzeige
- Full-Width Layout für alle Container

### Version 0.0.1
- Initiale Version mit Full-Width Layout
