#!/bin/bash

# Installation script for rutishauserThemeB5Plugin
# This script copies the theme to AtoM and performs necessary setup

set -e  # Exit on error

echo "=== AtoM Theme Installation Script ==="
echo ""

# 1) Prompt for AtoM installation path
read -p "Enter AtoM installation path (e.g. /usr/share/nginx/atom): " ATOM_PATH

# Validate path exists
if [ ! -d "$ATOM_PATH" ]; then
    echo "Error: Directory $ATOM_PATH does not exist!"
    exit 1
fi

PLUGIN_NAME="rutishauserThemeB5Plugin"
SOURCE_DIR="$HOME/git-repositories/$PLUGIN_NAME"
TARGET_DIR="$ATOM_PATH/plugins/$PLUGIN_NAME"

echo ""
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"
echo ""

# 2) Copy plugin to AtoM plugins directory
echo "Copying plugin files..."
sudo rm -rf "$TARGET_DIR"  # Remove if exists
sudo cp -r "$SOURCE_DIR" "$TARGET_DIR"

# 3) Set permissions and ownership
echo "Setting permissions and ownership..."
sudo chmod -R 775 "$TARGET_DIR"
sudo chown -R www-data:www-data "$TARGET_DIR"

# 4) Install npm dependencies for the plugin
echo "Installing plugin npm dependencies..."
cd "$TARGET_DIR"
sudo -u www-data npm install

# 5) Build all assets from AtoM root (includes plugin)
echo "Building assets with webpack..."
cd "$ATOM_PATH"
sudo -u www-data npm run build

# 6) Clear cache and restart PHP-FPM
echo "Clearing AtoM cache and restarting PHP-FPM..."
cd "$ATOM_PATH"
sudo -u www-data php symfony cc
sudo systemctl restart php8.3-fpm.service

# 7) Return to original directory
echo "Returning to source directory..."
cd "$SOURCE_DIR"

echo ""
echo "=== Installation completed successfully! ==="
echo "Theme installed at: $TARGET_DIR"
