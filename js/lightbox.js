// Import GLightbox
import GLightbox from 'glightbox';

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
