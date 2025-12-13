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
      addSiblingNavigation();
    },

    onSlideChange: () => {
      addSiblingNavigation();
    }
  });

  // Function to add sibling navigation to lightbox
  function addSiblingNavigation() {
    setTimeout(() => {
      const activeSlide = document.querySelector('.gslide.current');
      if (!activeSlide) return;

      const slideInner = activeSlide.querySelector('.gslide-inner-content');
      if (!slideInner) return;

      // Remove existing sibling navigation if present
      const existingNav = slideInner.querySelector('.gslide-sibling-nav');
      if (existingNav) existingNav.remove();

      const existingCounter = slideInner.querySelector('.gslide-sibling-counter');
      if (existingCounter) existingCounter.remove();

      // Find the original link element to get data attributes
      const originalLink = findOriginalLinkForCurrentSlide();
      if (!originalLink) return;

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
        navContainer.innerHTML = `
          ${prevUrl ? `
            <a href="${prevUrl}" class="gslide-sibling-prev" title="${prevTitle || 'Previous'}">
              <i class="fas fa-chevron-left"></i>
            </a>
          ` : ''}
          ${nextUrl ? `
            <a href="${nextUrl}" class="gslide-sibling-next" title="${nextTitle || 'Next'}">
              <i class="fas fa-chevron-right"></i>
            </a>
          ` : ''}
        `;
        slideInner.appendChild(navContainer);
      }

      // Add sibling counter at bottom center
      if (siblingIndex && siblingTotal) {
        const counterContainer = document.createElement('div');
        counterContainer.className = 'gslide-sibling-counter';
        counterContainer.innerHTML = `<span>${siblingIndex} of ${siblingTotal}</span>`;
        slideInner.appendChild(counterContainer);
      }
    }, 50);
  }

  // Helper function to find the original link element for current slide
  function findOriginalLinkForCurrentSlide() {
    const currentSlide = document.querySelector('.gslide.current');
    if (!currentSlide) return null;

    const currentImg = currentSlide.querySelector('.ginner-container img');
    if (!currentImg) return null;

    const imgHref = currentImg.src;

    // Find all glightbox links
    const allLinks = document.querySelectorAll('a.glightbox');

    // Try to match by href
    for (const link of allLinks) {
      if (link.href === imgHref) {
        return link;
      }
    }

    // Try to match by contained image src
    for (const link of allLinks) {
      const img = link.querySelector('img');
      if (img && currentImg.src.includes(img.src.split('/').pop())) {
        return link;
      }
    }

    return allLinks[0]; // Fallback to first link
  }
});
