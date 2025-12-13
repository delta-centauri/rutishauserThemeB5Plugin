# rutishauserThemeB5Plugin

**[🇬🇧 English](README.md) | [🇩🇪 Deutsch](README-DE.md) | [🇪🇸 Español](README-ES.md) | [🇺🇦 Українська](README-UK.md)**

Un thème pleine largeur pour Artefactual AtoM (Access to Memory) basé sur `arDominionB5Plugin` avec une navigation améliorée et des capacités de visualisation spécifiquement pour les descriptions archivistiques avec images.

## Fonctionnalités

### Mise en Page Pleine Largeur
- Tous les conteneurs utilisent 100% de la largeur pour maximiser l'utilisation de l'espace disponible
- `container-xxl` → `container-fluid` dans tous les fichiers de mise en page
- `container-xl` → `container-fluid` dans l'en-tête (Barre de Description du Site)
- Les overrides SCSS définissent toutes les classes `.container*` à `max-width: 100%`
- Ajustements de l'en-tête et du wrapper pour un espacement horizontal cohérent
- Remplissage optimal pour différentes tailles d'écran

### Visionneuse d'Images GLightbox
- Les images dans la classe `.ooo` s'ouvrent dans une lightbox moderne au lieu d'un nouvel onglet
- Fonctionnalité de zoom (molette de la souris)
- Déplacer/glisser les images avec la souris
- Navigation au clavier (touches fléchées, ESC pour fermer)
- Support tactile pour tablettes/smartphones (glisser, pincer pour zoomer)
- Responsive et accessible

### Navigation Entre Frères
- Boutons Précédent/Suivant sous l'affichage d'image pour naviguer entre les descriptions sœurs
- Affiche la position actuelle dans l'unité archivistique parent (ex. "2 sur 5")
- Navigation directement dans la lightbox:
  - Flèches à gauche et à droite de l'image pour Précédent/Suivant
  - Numéro d'image et lien pour ouvrir dans un onglet séparé directement dans la description de l'image
  - La page de détail de la description archivistique derrière la lightbox est automatiquement chargée, de sorte qu'en fermant la lightbox, la page actuelle s'affiche

### Internationalisation (i18n)
- Traductions en allemand, anglais, espagnol, français et ukrainien pour tous les textes spécifiques au plugin


## Installation

### Prérequis
- Artefactual AtoM (Version 2.7 ; compatible Bootstrap 5)
- `arDominionB5Plugin` comme thème de base
- Node.js et npm pour le processus de compilation

### Installation Rapide avec install-theme.sh

Le plugin inclut un script d'installation qui copie automatiquement les fichiers au bon endroit :

```bash
# Rendre le script exécutable
chmod +x install-theme.sh

# Exécuter l'installation (par défaut : /usr/share/nginx/atom)
./install-theme.sh

# Ou avec un chemin personnalisé
./install-theme.sh /chemin/vers/votre/installation/atom
```

Le script :
1. Copie tous les fichiers du plugin vers `plugins/rutishauserThemeB5Plugin/`
2. Définit les permissions correctes pour l'utilisateur du serveur web (www-data)
3. Installe les dépendances du plugin (npm install)

### Installation Manuelle

Si vous préférez installer le plugin manuellement :

```bash
# 1. Copier le plugin vers AtoM
cp -r rutishauserThemeB5Plugin /usr/share/nginx/atom/plugins/

# 2. Définir les permissions
cd /usr/share/nginx/atom/plugins/rutishauserThemeB5Plugin
sudo chown -R www-data:www-data .

# 3. Installer les dépendances du plugin
sudo -u www-data npm install
```

### Compiler les Assets

Après l'installation, les assets doivent être compilés :

```bash
# Naviguer vers le répertoire racine d'AtoM
cd /usr/share/nginx/atom

# Installer les dépendances racine (si pas encore fait)
sudo -u www-data npm install

# Compilation de production
sudo -u www-data npm run build

# Ou pour le développement avec watch
sudo -u www-data npm run dev
```

### Activer le Thème

#### Option 1 : Via le Backend AtoM (recommandé)
1. Se connecter en tant qu'administrateur
2. Admin → Paramètres → Interface Utilisateur
3. Sélectionner le thème : "rutishauserThemeB5Plugin"
4. Enregistrer

#### Option 2 : Via la Base de Données (non testé)
```sql
UPDATE setting
SET value = 'rutishauserThemeB5Plugin'
WHERE name = 'plugins';
```

### Vider le Cache

```bash
# Vider le cache Symfony
sudo -u www-data php symfony cc

# Vider le cache du navigateur
# Chrome/Edge : Ctrl + Shift + R
# Firefox : Ctrl + F5
```

## Licence

AGPL-3.0

## Crédits

- Basé sur [arDominionB5Plugin](https://github.com/artefactual/atom/tree/qa/2.x/plugins/arDominionB5Plugin)
- Utilise [GLightbox](https://github.com/biati-digital/glightbox) pour la fonctionnalité lightbox
- Développé par Roger Rutishauser (roger.rutishauser@gmail.com) avec l'assistance de claude.ai

## Version

0.0.3
