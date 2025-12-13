// Import GLightbox
import GLightbox from 'glightbox';

// Initialize GLightbox for digital object images with sibling navigation
document.addEventListener('DOMContentLoaded', () => {
  let currentLightbox = null;

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
      currentLightbox = lightbox;
      addSiblingNavigation();
    },

    onSlideChange: () => {
      addSiblingNavigation();
    }
  });

  // Check if we should auto-open lightbox (from sibling navigation)
  if (sessionStorage.getItem('openLightbox') === 'true') {
    sessionStorage.removeItem('openLightbox');
    // Wait a bit for page to fully load
    setTimeout(() => {
      const lightboxLink = document.querySelector('a.glightbox');
      if (lightboxLink) {
        lightboxLink.click();
      }
    }, 100);
  }

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

        let navHTML = '';

        if (prevUrl) {
          navHTML += `
            <button class="gslide-sibling-prev" title="${prevTitle || 'Vorheriger'}" data-url="${prevUrl}">
              <i class="fas fa-chevron-left"></i>
            </button>
          `;
        }

        if (nextUrl) {
          navHTML += `
            <button class="gslide-sibling-next" title="${nextTitle || 'Nächster'}" data-url="${nextUrl}">
              <i class="fas fa-chevron-right"></i>
            </button>
          `;
        }

        navContainer.innerHTML = navHTML;
        slideInner.appendChild(navContainer);

        // Add click event handlers
        const prevBtn = navContainer.querySelector('.gslide-sibling-prev');
        const nextBtn = navContainer.querySelector('.gslide-sibling-next');

        if (prevBtn) {
          prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = prevBtn.dataset.url;
            if (url) {
              // Set flag to auto-open lightbox on next page
              sessionStorage.setItem('openLightbox', 'true');
              // Navigate to sibling page
              window.location.href = url;
            }
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = nextBtn.dataset.url;
            if (url) {
              // Set flag to auto-open lightbox on next page
              sessionStorage.setItem('openLightbox', 'true');
              // Navigate to sibling page
              window.location.href = url;
            }
          });
        }
      }

      // Add sibling counter at bottom center
      if (siblingIndex && siblingTotal) {
        const counterContainer = document.createElement('div');
        counterContainer.className = 'gslide-sibling-counter';
        counterContainer.innerHTML = `<span>Bild ${siblingIndex} von ${siblingTotal}</span>`;
        slideInner.appendChild(counterContainer);
      }
    }, 100);
  }

  // Helper function to find the original link element for current slide
  function findOriginalLinkForCurrentSlide() {
    const currentSlide = document.querySelector('.gslide.current');
    if (!currentSlide) {
      return null;
    }

    const currentImg = currentSlide.querySelector('.ginner-container img, .gslide-image');
    if (!currentImg) {
      return null;
    }

    const imgSrc = currentImg.src;

    // Find all glightbox links
    const allLinks = document.querySelectorAll('a.glightbox');

    // Try to match by href (exact match)
    for (const link of allLinks) {
      if (link.href === imgSrc) {
        return link;
      }
    }

    // Try to match by checking if link href is contained in img src
    for (const link of allLinks) {
      if (imgSrc.includes(link.href) || link.href.includes(imgSrc)) {
        return link;
      }
    }

    // Fallback: use the first link (better than nothing)
    if (allLinks.length > 0) {
      return allLinks[0];
    }

    return null;
  }
});
