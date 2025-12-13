# rutishauserThemeB5Plugin

**[🇬🇧 English](README.md) | [🇩🇪 Deutsch](README-DE.md) | [🇫🇷 Français](README-FR.md) | [🇺🇦 Українська](README-UK.md)**

Un tema de ancho completo para Artefactual AtoM (Access to Memory) basado en `arDominionB5Plugin` con navegación mejorada y capacidades de visualización específicamente para descripciones archivísticas con imágenes.

## Características

### Diseño de Ancho Completo
- Todos los contenedores utilizan el 100% del ancho para aprovechar al máximo el espacio disponible
- `container-xxl` → `container-fluid` en todos los archivos de diseño
- `container-xl` → `container-fluid` en el encabezado (Barra de Descripción del Sitio)
- Los overrides de SCSS establecen todas las clases `.container*` a `max-width: 100%`
- Ajustes de encabezado y wrapper para espaciado horizontal consistente
- Relleno óptimo para varios tamaños de pantalla

### Visor de Imágenes GLightbox
- Las imágenes en la clase `.ooo` se abren en un lightbox moderno en lugar de una nueva pestaña
- Funcionalidad de zoom (rueda del mouse)
- Desplazar/arrastrar imágenes con el mouse
- Navegación por teclado (teclas de flecha, ESC para cerrar)
- Soporte táctil para tabletas/smartphones (deslizar, pellizcar para hacer zoom)
- Responsive y accesible

### Navegación Entre Hermanos
- Botones Anterior/Siguiente debajo de la visualización de imagen para navegar por descripciones hermanas
- Muestra la posición actual dentro de la unidad archivística padre (ej. "2 de 5")
- Navegación directamente en el lightbox:
  - Flechas a izquierda y derecha de la imagen para Anterior/Siguiente
  - Número de imagen y enlace para abrir en pestaña separada directamente en la descripción de la imagen
  - La página de detalle de la descripción archivística detrás del lightbox se carga automáticamente, por lo que al cerrar el lightbox, se muestra la página actual

### Internacionalización (i18n)
- Traducciones en alemán, inglés, español, francés y ucraniano para todos los textos específicos del plugin


## Instalación

### Requisitos Previos
- Artefactual AtoM (Versión 2.7; compatible con Bootstrap 5)
- `arDominionB5Plugin` como tema base
- Node.js y npm para el proceso de compilación

### Instalación Rápida con install-theme.sh

El plugin incluye un script de instalación que copia automáticamente los archivos a la ubicación correcta:

```bash
# Hacer el script ejecutable
chmod +x install-theme.sh

# Ejecutar instalación
./install-theme.sh
```

El script solicitará la ruta de instalación de AtoM (predeterminado: `/usr/share/nginx/atom`) con autocompletado con tabulador.

El script:
1. Copia todos los archivos del plugin a `plugins/rutishauserThemeB5Plugin/`
2. Establece permisos correctos para el usuario del servidor web (www-data)
3. Instala dependencias del plugin (npm install)
4. Compila assets con webpack
5. Limpia la caché de Symfony

### Instalación Manual

Si prefieres instalar el plugin manualmente:

```bash
# 1. Copiar plugin a AtoM
cp -r rutishauserThemeB5Plugin /usr/share/nginx/atom/plugins/

# 2. Establecer permisos
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo chown -R www-data:www-data .

# 3. Instalar dependencias del plugin
sudo -u www-data npm install
```

### Compilar Assets

Después de la instalación, los assets deben ser compilados:

```bash
# Navegar al directorio raíz de AtoM
cd /usr/share/nginx/atom

# Instalar dependencias raíz (si aún no se ha hecho)
sudo -u www-data npm install

# Compilación de producción
sudo -u www-data npm run build

# O para desarrollo con watch
sudo -u www-data npm run dev
```

### Activar Tema

#### Opción 1: Vía Backend de AtoM (recomendado)
1. Iniciar sesión como administrador
2. Admin → Configuración → Interfaz de Usuario
3. Seleccionar tema: "rutishauserThemeB5Plugin"
4. Guardar

#### Opción 2: Vía Base de Datos (no probado)
```sql
UPDATE setting
SET value = 'rutishauserThemeB5Plugin'
WHERE name = 'plugins';
```

### Limpiar Caché

```bash
# Limpiar caché de Symfony
sudo -u www-data php symfony cc

# Limpiar caché del navegador
# Chrome/Edge: Ctrl + Shift + R
# Firefox: Ctrl + F5
```


## Desarrollo

### Estructura del Proyecto

```
rutishauserThemeB5Plugin/
├── config/
│   └── rutishauserThemeB5PluginConfiguration.class.php  # Configuración del plugin
├── i18n/
│   ├── de/
│   │   └── messages.xml                                 # Traducciones en alemán
│   ├── en/
│   │   └── messages.xml                                 # Traducciones en inglés
│   ├── es/
│   │   └── messages.xml                                 # Traducciones en español
│   ├── fr/
│   │   └── messages.xml                                 # Traducciones en francés
│   └── uk/
│       └── messages.xml                                 # Traducciones en ucraniano
├── images/
│   └── image.png                                        # Imagen de vista previa del tema
├── js/
│   ├── lightbox.js                                      # Inicialización de GLightbox con navegación entre hermanos
│   └── main.js                                          # Punto de entrada JavaScript
├── modules/
│   ├── digitalobject/
│   │   └── templates/
│   │       ├── _show.php                                # Anulación de visualización de objeto digital
│   │       └── _showImage.php                           # Visualización de imagen con GLightbox
│   └── informationobject/
│       └── templates/
│           └── _siblingNavigation.php                   # Componente de navegación entre hermanos
├── scss/
│   └── main.scss                                        # Hoja de estilos principal con anulaciones de ancho completo
├── templates/
│   ├── layout.php                                       # Diseño predeterminado
│   ├── layout_1col.php                                  # Diseño de 1 columna
│   ├── layout_2col.php                                  # Diseño de 2 columnas (con barra lateral)
│   ├── layout_3col.php                                  # Diseño de 3 columnas (barra lateral + menú contextual)
│   ├── _header.php                                      # Parcial de encabezado
│   └── _layout_start_webpack.php                        # Inicio de HTML head & body
├── .gitignore
├── install-theme.sh                                     # Script de instalación
├── package.json                                         # Dependencias del plugin (GLightbox)
├── README.md                                            # Documentación principal (inglés)
├── README-DE.md                                         # Documentación en alemán
├── README-ES.md                                         # Documentación en español
├── README-FR.md                                         # Documentación en francés
├── README-UK.md                                         # Documentación en ucraniano
└── webpack.entry.js                                     # Punto de entrada de Webpack
```


## Licencia

AGPL-3.0

## Créditos

- Basado en [arDominionB5Plugin](https://github.com/artefactual/atom/tree/qa/2.x/plugins/arDominionB5Plugin)
- Utiliza [GLightbox](https://github.com/biati-digital/glightbox) para la funcionalidad de lightbox
- Desarrollado por Roger Rutishauser (roger.rutishauser@gmail.com) con asistencia de claude.ai

## Versión

0.0.3
