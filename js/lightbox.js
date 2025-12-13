// Import GLightbox
import GLightbox from 'glightbox';

// Initialize GLightbox for digital object images with sibling navigation
document.addEventListener('DOMContentLoaded', () => {
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
    closeButton: true,
    zoomable: true,
    draggable: true,
    skin: 'clean',
    closeOnOutsideClick: true,
    descPosition: 'bottom',

    // Add custom sibling navigation when lightbox opens or slides change
    onOpen: () => {
      setTimeout(() => addSiblingNavigation(lightbox), 300);
    },

    onSlideChange: () => {
      setTimeout(() => addSiblingNavigation(lightbox), 300);
    }
  });

  // Check if we should auto-open lightbox (from sibling navigation)
  if (sessionStorage.getItem('openLightbox') === 'true') {
    sessionStorage.removeItem('openLightbox');
    setTimeout(() => {
      const lightboxLink = document.querySelector('a.glightbox');
      if (lightboxLink) {
        lightboxLink.click();
      }
    }, 200);
  }

  // Function to add sibling navigation to lightbox
  function addSiblingNavigation(lightboxInstance) {
    // Wait for DOM to be ready with retry logic
    const activeSlide = document.querySelector('.gslide.current');
    if (!activeSlide) {
      // Retry after a short delay
      setTimeout(() => addSiblingNavigation(lightboxInstance), 100);
      return;
    }

    const slideInner = activeSlide.querySelector('.gslide-inner-content');
    if (!slideInner) {
      // Retry after a short delay
      setTimeout(() => addSiblingNavigation(lightboxInstance), 100);
      return;
    }

    // Remove existing sibling navigation if present
    const existingNav = slideInner.querySelector('.gslide-sibling-nav');
    if (existingNav) existingNav.remove();

    const existingCounter = slideInner.querySelector('.gslide-sibling-counter');
    if (existingCounter) existingCounter.remove();

    // Get data from the first glightbox link on the page
    const originalLink = document.querySelector('a.glightbox');

    if (!originalLink) {
      return;
    }

    const prevUrl = originalLink.dataset.prevUrl;
    const nextUrl = originalLink.dataset.nextUrl;
    const prevTitle = originalLink.dataset.prevTitle;
    const nextTitle = originalLink.dataset.nextTitle;
    const siblingIndex = originalLink.dataset.siblingIndex;
    const siblingTotal = originalLink.dataset.siblingTotal;

    // Add navigation arrows for siblings (left and right of image)
    if (prevUrl || nextUrl) {
      const navContainer = document.createElement('div');
      navContainer.className = 'gslide-sibling-nav';

      if (prevUrl) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gslide-sibling-prev';
        prevBtn.title = prevTitle || 'Vorheriger';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          sessionStorage.setItem('openLightbox', 'true');
          window.location.href = prevUrl;
        };
        navContainer.appendChild(prevBtn);
      }

      if (nextUrl) {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'gslide-sibling-next';
        nextBtn.title = nextTitle || 'Nächster';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          sessionStorage.setItem('openLightbox', 'true');
          window.location.href = nextUrl;
        };
        navContainer.appendChild(nextBtn);
      }

      slideInner.appendChild(navContainer);
    }

    // Add sibling counter and link to description area
    if (siblingIndex && siblingTotal) {
      // Get the current image URL from the lightbox
      const currentSlide = activeSlide.querySelector('.gslide-image img');
      const imageUrl = currentSlide ? currentSlide.src : '';

      // Determine language for link text (check HTML lang attribute or default to German)
      const lang = document.documentElement.lang || 'de';
      const linkText = lang.startsWith('en') ? 'Open image in separate tab' : 'Bild in separatem Tab öffnen';

      // Find the description element
      const descElement = activeSlide.querySelector('.gslide-desc');

      if (descElement) {
        // Get existing text content
        const existingText = descElement.textContent.trim();

        // Create the counter and link HTML
        const counterAndLink = `
          <span class="separator"> | </span>
          <span>Bild ${siblingIndex} von ${siblingTotal}</span>
          <span class="separator"> | </span>
          <a href="${imageUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>
        `;

        // Append to existing description
        descElement.innerHTML = existingText + counterAndLink;
      }
    }
  }
});
