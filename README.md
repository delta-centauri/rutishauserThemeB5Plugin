# rutishauserThemeB5Plugin

Ein Full-Width Theme für Artefactual AtoM (Access to Memory) basierend auf `arDominionB5Plugin` mit verbesserter Navigation und Ansicht speziell für Verzeichnungseinheiten mit Bildern.

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
- Zoom-Funktionalität (Mausrad)
- Bild verschieben durch Ziehen mit der Maus (Pan/Drag)
- Tastatur-Navigation (Pfeiltasten, ESC zum Schließen)
- Touch-Support für Tablets/Smartphones (Wischen, Pinch-to-Zoom)
- Responsive und barrierefrei

### Geschwister-Navigation (Sibling Navigation)
- Vor/Zurück-Buttons unterhalb der Bildanzeige zum Durchklicken von Geschwister-Beschreibungen
- Zeigt aktuelle Position innerhalb der Elter-Verzeichnungseinheit (z.B. "2 von 5")
- Navigation direkt in der Lightbox:
  - Pfeile links und rechts vom Bild für Vor/Zurück
  - Bildnummer und Link zum Öffnen in separatem Tab direkt in der Bildbeschreibung
  - Die Detailseite der Verzeichnungseinheit hinter der Lightbox wird automatisch geladen, sodass beim schliessen der Lightbox die aktuelle Seite angezeigt wird.

### Mehrsprachigkeit (i18n)
- Deutsche und englische Übersetzungen für alle Plugin-spezifischen Texte


## Installation

### Voraussetzungen
- Artefactual AtoM (Version 2.7; Bootsgtrap 5 ready)
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

#### Option 2: Via Datenbank (nicht getestet)
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


## Lizenz

AGPL-3.0

## Credits

- Basiert auf [arDominionB5Plugin](https://github.com/artefactual/atom/tree/qa/2.x/plugins/arDominionB5Plugin)
- Nutzt [GLightbox](https://github.com/biati-digital/glightbox) für die Lightbox-Funktionalität
- Entwickelt von Roger Rutishauser (roger.rutishauser@gmail.com) mit Hilfe von claude.ai

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
