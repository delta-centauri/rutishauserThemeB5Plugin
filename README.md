# rutishauserThemeB5Plugin

**[🇩🇪 Deutsch](README-DE.md) | [🇪🇸 Español](README-ES.md) | [🇫🇷 Français](README-FR.md) | [🇺🇦 Українська](README-UK.md)**

A full-width theme for Artefactual AtoM (Access to Memory) based on `arDominionB5Plugin` with enhanced navigation and viewing capabilities specifically for archival descriptions with images.

## Features

### Full Width Layout
- All containers utilize 100% width for maximum use of available space
- `container-xxl` → `container-fluid` in all layout files
- `container-xl` → `container-fluid` in header (Site Description Bar)
- SCSS overrides set all `.container*` classes to `max-width: 100%`
- Header and wrapper adjustments for consistent horizontal spacing
- Optimal padding for various screen sizes

### GLightbox Image Viewer
- Images in the `.ooo` class open in a modern lightbox instead of a new tab
- Zoom functionality (mouse wheel)
- Pan/drag images with mouse
- Keyboard navigation (arrow keys, ESC to close)
- Touch support for tablets/smartphones (swipe, pinch-to-zoom)
- Responsive and accessible

### Sibling Navigation
- Previous/Next buttons below the image display for navigating through sibling descriptions
- Shows current position within parent archival unit (e.g., "2 of 5")
- Navigation directly in the lightbox:
  - Arrows left and right of the image for Previous/Next
  - Image number and link to open in separate tab directly in the image description
  - The detail page of the archival description behind the lightbox is automatically loaded, so when closing the lightbox, the current page is displayed

### Internationalization (i18n)
- German, English, Spanish, French, and Ukrainian translations for all plugin-specific texts


## Installation

### Prerequisites
- Artefactual AtoM (Version 2.7; Bootstrap 5 ready)
- `arDominionB5Plugin` as base theme
- Node.js and npm for the build process

### Quick Installation with install-theme.sh

The plugin includes an installation script that automatically copies files to the correct location:

```bash
# Make script executable
chmod +x install-theme.sh

# Run installation
./install-theme.sh
```

The script will prompt for your AtoM installation path (default: `/usr/share/nginx/atom`) with tab completion support.

The script:
1. Copies all plugin files to `plugins/rutishauserThemeB5Plugin/`
2. Sets correct permissions for the web server user (www-data)
3. Installs plugin dependencies (npm install)
4. Builds assets with webpack
5. Clears Symfony cache

### Manual Installation

If you prefer to install the plugin manually:

```bash
# 1. Copy plugin to AtoM
cp -r rutishauserThemeB5Plugin /usr/share/nginx/atom/plugins/

# 2. Set permissions
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo chown -R www-data:www-data .

# 3. Install plugin dependencies
sudo -u www-data npm install
```

### Building Assets

After installation, assets must be built:

```bash
# Navigate to AtoM root directory
cd /usr/share/nginx/atom

# Install root dependencies (if not done yet)
sudo -u www-data npm install

# Production build
sudo -u www-data npm run build

# Or for development with watch
sudo -u www-data npm run dev
```

### Activate Theme

#### Option 1: Via AtoM Backend (recommended)
1. Log in as administrator
2. Admin → Settings → User Interface
3. Select theme: "rutishauserThemeB5Plugin"
4. Save

#### Option 2: Via Database (not tested)
```sql
UPDATE setting
SET value = 'rutishauserThemeB5Plugin'
WHERE name = 'plugins';
```

### Clear Cache

```bash
# Clear Symfony cache
sudo -u www-data php symfony cc

# Clear browser cache
# Chrome/Edge: Ctrl + Shift + R
# Firefox: Ctrl + F5
```

## Troubleshooting

### Theme not loading
1. Check plugin order in `config/ProjectConfiguration.class.php`
2. Ensure webpack build was successful
3. Clear cache (Symfony + browser)

### Styles not applied
1. Re-run `sudo -u www-data npm run build`
2. Check if `web/` directory contains new bundle files
3. Clear browser cache with `Ctrl + Shift + R`

### GLightbox not working
1. Check if GLightbox is installed: `ls node_modules/glightbox`
2. If not: `sudo -u www-data npm install` in plugin directory
3. Rebuild
4. Check browser console for JavaScript errors

### Sibling navigation shows undefined
1. Check if `_showImage.php` sets data attributes correctly
2. Check browser console for errors
3. Ensure PHP template is being overridden (file precedence)

### Build errors
```bash
# Reinstall node modules
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo rm -rf node_modules package-lock.json
sudo -u www-data npm install

cd /usr/share/nginx/atom
sudo rm -rf node_modules package-lock.json
sudo -u www-data npm install
sudo -u www-data npm run build
```


## Development

### Project Structure

```
rutishauserThemeB5Plugin/
├── config/
│   └── rutishauserThemeB5PluginConfiguration.class.php  # Plugin configuration
├── i18n/
│   ├── de/
│   │   └── messages.xml                                 # German translations
│   ├── en/
│   │   └── messages.xml                                 # English translations
│   ├── es/
│   │   └── messages.xml                                 # Spanish translations
│   ├── fr/
│   │   └── messages.xml                                 # French translations
│   └── uk/
│       └── messages.xml                                 # Ukrainian translations
├── images/
│   └── image.png                                        # Theme preview image
├── js/
│   ├── lightbox.js                                      # GLightbox initialization with sibling navigation
│   └── main.js                                          # JavaScript entry point
├── modules/
│   ├── digitalobject/
│   │   └── templates/
│   │       ├── _show.php                                # Digital object display override
│   │       └── _showImage.php                           # Image display with GLightbox
│   └── informationobject/
│       └── templates/
│           └── _siblingNavigation.php                   # Sibling navigation component
├── scss/
│   └── main.scss                                        # Main stylesheet with full-width overrides
├── templates/
│   ├── layout.php                                       # Default layout
│   ├── layout_1col.php                                  # 1-column layout
│   ├── layout_2col.php                                  # 2-column layout (with sidebar)
│   ├── layout_3col.php                                  # 3-column layout (sidebar + context menu)
│   ├── _header.php                                      # Header partial
│   └── _layout_start_webpack.php                        # HTML head & body start
├── .gitignore
├── install-theme.sh                                     # Installation script
├── package.json                                         # Plugin dependencies (GLightbox)
├── README.md                                            # Main documentation (English)
├── README-DE.md                                         # German documentation
├── README-ES.md                                         # Spanish documentation
├── README-FR.md                                         # French documentation
├── README-UK.md                                         # Ukrainian documentation
└── webpack.entry.js                                     # Webpack entry point
```


## License

AGPL-3.0

## Credits

- Based on [arDominionB5Plugin](https://github.com/artefactual/atom/tree/qa/2.x/plugins/arDominionB5Plugin)
- Uses [GLightbox](https://github.com/biati-digital/glightbox) for lightbox functionality
- Developed by Roger Rutishauser (roger.rutishauser@gmail.com) with assistance from claude.ai

## Version

0.0.3

## Changelog

### Version 0.0.3 (2025-12-13)
- Optimized sibling navigation in lightbox
- Duplicate prevention for navigation elements
- Image number and tab link directly in image description
- i18n translations for all texts
- Removed keyboard navigation hint
- Removed hover effect on images

### Version 0.0.2
- GLightbox integration
- Sibling navigation below image display
- Full-width layout for all containers

### Version 0.0.1
- Initial version with full-width layout
