# Plugin Dependencies

Dieses Plugin hat seine eigenen npm-Dependencies (GLightbox).

## Installation (auf Server)

```bash
# Im Plugin-Verzeichnis
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo -u www-data npm install
```

Dies installiert GLightbox in `node_modules/` dieses Plugins.

## Installation (lokal/Windows)

```powershell
# Im Plugin-Verzeichnis
cd plugins\rutishauserThemeB5Plugin
npm install
```

## Dependencies

- **glightbox** (^3.3.0) - Moderne, leichtgewichtige Lightbox für Bilder

## Hinweis

Die `node_modules/` dieses Plugins werden vom Root-Webpack-Build verwendet, aber sind unabhängig von den Root-Dependencies.
