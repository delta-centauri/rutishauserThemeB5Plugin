// Import GLightbox from plugin's own node_modules
import GLightbox from '../../rutishauserThemeB5Plugin/node_modules/glightbox';

// Initialize GLightbox for digital object images
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true,
    closeButton: true,
    zoomable: true,
    draggable: true,
    skin: 'clean',
    closeOnOutsideClick: true,
  });
});
