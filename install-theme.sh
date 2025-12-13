#!/bin/bash

# Installation script for rutishauserThemeB5Plugin
# This script copies the theme to AtoM and performs necessary setup

ATOM_DIR_NAME="atom"

set -e  # Exit on error

echo "=== AtoM Theme Installation Script ==="
echo ""

# Prompt for AtoM installation path with default
read -p "Enter AtoM installation path [default: /usr/share/nginx/$ATOM_DIR_NAME]: " ATOM_PATH

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
sudo chmod -R 775 "$TARGET_DIR"
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
sudo -u www-data php symfony cc

# Return to original directory
echo "Returning to source directory..."
cd "$SOURCE_DIR"

echo ""
echo "=== Installation completed successfully! ==="
echo "Theme installed at: $TARGET_DIR"
