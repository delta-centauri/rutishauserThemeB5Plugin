#!/bin/bash

# Installation script for rutishauserThemeB5Plugin
# This script copies the theme to AtoM and performs necessary setup

ATOM_DIR_NAME="atom"

set -e  # Exit on error

echo "=== AtoM Theme Installation Script ==="
echo ""

# Prompt for AtoM installation path with default (with tab completion)
echo "Enter AtoM installation path [default: /usr/share/nginx/$ATOM_DIR_NAME]"
echo "(Tab completion enabled - press Tab to autocomplete path)"
read -e -p "Path: " ATOM_PATH

# Use default if empty
if [ -z "$ATOM_PATH" ]; then
    ATOM_PATH="/usr/share/nginx/$ATOM_DIR_NAME"
    echo "Using default path: $ATOM_PATH"
fi

# Validate path exists
if [ ! -d "$ATOM_PATH" ]; then
    echo "Error: Directory $ATOM_PATH does not exist!"
    exit 1
fi

PLUGIN_NAME="rutishauserThemeB5Plugin"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SOURCE_DIR="$SCRIPT_DIR"
TARGET_DIR="$ATOM_PATH/plugins/$PLUGIN_NAME"

echo ""
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"
echo ""

# Copy plugin to AtoM plugins directory
echo "Copying plugin files..."
sudo rm -rf "$TARGET_DIR"  # Remove if exists
sudo cp -r "$SOURCE_DIR" "$TARGET_DIR"

# Set permissions and ownership
echo "Setting permissions and ownership..."
sudo chmod -R 755 "$TARGET_DIR"
sudo chown -R www-data:www-data "$TARGET_DIR"

# Install npm dependencies for the plugin
echo "Installing plugin npm dependencies..."
cd "$TARGET_DIR"
sudo -u www-data npm install

# Build all assets from AtoM root (includes plugin)
echo "Building assets with webpack..."
cd "$ATOM_PATH"
sudo -u www-data npm run build

# Clear cache
echo "Clearing AtoM cache..."
cd "$ATOM_PATH"

# 1. AtoM symfony cache (config + template cache)
sudo -u www-data php symfony cc

# 2. Remaining PHP cache files not removed by symfony cc
echo "  Removing residual PHP cache files..."
sudo find "$ATOM_PATH/cache" -type f \( -name "*.php" -o -name "*.html" \) -delete

# 3. Restart PHP-FPM to clear APCu in-memory cache.
#    AtoM uses sfAPCCache which stores compiled templates in RAM.
#    Without this step the old webpack bundle hash remains cached and the
#    new JS/CSS bundles (with updated content hashes) fail to load.
echo "  Restarting PHP-FPM to clear APCu in-memory cache..."
PHP_FPM_SERVICE=""
for candidate in php8.4-fpm php8.3-fpm php8.2-fpm php8.1-fpm php8.0-fpm php7.4-fpm php-fpm; do
    if systemctl list-units --type=service --all 2>/dev/null | grep -q "${candidate}.service"; then
        PHP_FPM_SERVICE="$candidate"
        break
    fi
done

if [ -n "$PHP_FPM_SERVICE" ]; then
    sudo systemctl restart "$PHP_FPM_SERVICE"
    echo "  PHP-FPM restarted ($PHP_FPM_SERVICE)."
else
    echo "  WARNING: Could not detect PHP-FPM service name."
    echo "  Please restart PHP-FPM manually to clear APCu cache, e.g.:"
    echo "    sudo systemctl restart php8.2-fpm"
fi

# 4. Nginx FastCGI cache (optional, only if configured)
NGINX_CACHE_DIR="/var/cache/nginx"
if [ -d "$NGINX_CACHE_DIR" ] && [ "$(sudo find "$NGINX_CACHE_DIR" -maxdepth 1 -mindepth 1 | head -1)" != "" ]; then
    echo "  Clearing Nginx FastCGI cache..."
    sudo find "$NGINX_CACHE_DIR" -type f -delete
fi

# 5. Varnish cache (optional, only if varnishadm is available)
if command -v varnishadm &> /dev/null; then
    echo "  Clearing Varnish cache..."
    sudo varnishadm "ban req.url ~ /" 2>/dev/null && echo "  Varnish cleared." || echo "  Varnish ban failed (non-fatal)."
fi

# Return to original directory
echo "Returning to source directory..."
cd "$SOURCE_DIR"

echo ""
echo "=== Installation completed successfully! ==="
echo "Theme installed at: $TARGET_DIR"
echo ""
echo "IMPORTANT: Perform a hard refresh in the browser (Ctrl+Shift+R)"
echo "to ensure the old cached JS/CSS bundles are replaced."
