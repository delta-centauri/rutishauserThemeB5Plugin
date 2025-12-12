# Schnellstart-Anleitung für rutishauserThemeB5Plugin

## Schnellinstallation (Server)

```bash
# 1. Plugin-Dependencies installieren
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo -u www-data npm install

# 2. Zurück zum Root und Build
cd /usr/share/nginx/atom
sudo -u www-data npm run build

# 3. Cache leeren
sudo -u www-data php symfony cc

# 4. Browser-Cache leeren (Strg + Shift + R)
```

Danach Theme im AtoM Backend aktivieren.

---

## Theme aktivieren

### Option 1: Via AtoM Backend (empfohlen)
1. Als Administrator einloggen
2. Admin → Einstellungen → Benutzeroberfläche
3. Theme auswählen: "rutishauserThemeB5Plugin"
4. Speichern

### Option 2: Via Datenbank
```sql
-- Theme in der Datenbank setzen
UPDATE setting 
SET value = 'rutishauserThemeB5Plugin' 
WHERE name = 'plugins';
```

## Build durchführen

**WICHTIG**: Das Plugin hat seine eigene `package.json` mit GLightbox als Dependency!

### Installation (auf Server)
```bash
# 1. Plugin Dependencies installieren (im Plugin-Verzeichnis)
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo -u www-data npm install
cd ../..

# 2. Root Dependencies installieren (falls noch nicht geschehen)
sudo -u www-data npm install
```

### Entwicklungsmodus (mit Watch)
```bash
sudo -u www-data npm run dev
```

### Produktions-Build
```bash
sudo -u www-data npm run build
```

## Cache leeren

### Symfony Cache
```bash
sudo -u www-data php symfony cc
```

### Browser Cache
- Chrome/Edge: `Strg + Shift + R`
- Firefox: `Strg + F5`



## Troubleshooting

### Theme wird nicht geladen
1. Plugin-Reihenfolge prüfen in `config/ProjectConfiguration.class.php`
2. Sicherstellen, dass Webpack-Build erfolgreich war
3. Cache leeren (Symfony + Browser)

### Styles werden nicht angewendet
1. `sudo -u www-data npm run build` erneut ausführen
2. Prüfen ob `web/` Verzeichnis die neuen Bundle-Dateien enthält
3. Browser-Cache mit `Strg + Shift + R` leeren

### Fehler beim Build
```bash
# Node Modules neu installieren
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo rm -rf node_modules package-lock.json
sudo -u www-data npm install
cd ../..
sudo -u www-data npm run build
```

## Weitere Anpassungen

### Eigene Farben definieren
Erstelle `plugins/rutishauserThemeB5Plugin/scss/_variables.scss`:
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

## GLightbox testen

1. Navigiere zu einem Digital Object (Archivbeschreibung mit Bild)
2. Das Bild sollte einen `cursor: zoom-in` zeigen beim Hover
3. Klick auf das Bild öffnet die Lightbox (nicht neuen Tab)
4. In der Lightbox:
   - Pfeiltasten oder Klick-Navigation funktioniert
   - ESC schließt die Lightbox
   - Zoom mit Mausrad möglich
   - Touch-Gesten auf Mobile funktionieren

## Features

### Full Width Layout
- Alle Container nutzen 100% Breite
- Responsive Grid bleibt funktional
- Optimale Padding für verschiedene Bildschirmgrößen

### GLightbox Image Viewer
- Ersetzt `target="_blank"` bei Bildlinks
- Zoom und Pan Funktionalität
- Tastatur-Zugänglich (Accessibility)
- Touch-Support für Tablets/Smartphones
- Galerie-Navigation zwischen mehreren Bildern
