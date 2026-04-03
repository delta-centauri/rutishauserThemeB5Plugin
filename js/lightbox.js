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

  // Add link to open image in new tab below sibling navigation (page-level, outside lightbox)
  const siblingCounterText = document.getElementById('sibling-counter-text');
  if (siblingCounterText) {
    const lightboxLink = document.querySelector('a.glightbox');
    if (lightboxLink) {
      const imageUrl = lightboxLink.href;
      // Use PHP-rendered translated label via data attribute
      const labelOpenTab = lightboxLink.dataset.labelOpenTab || 'Open image in separate tab';

      const sep = document.createElement('span');
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = ' | ';

      const openTabLink = document.createElement('a');
      openTabLink.href = imageUrl;
      openTabLink.target = '_blank';
      openTabLink.rel = 'noopener noreferrer';
      openTabLink.textContent = labelOpenTab;

      siblingCounterText.appendChild(sep);
      siblingCounterText.appendChild(openTabLink);
    }
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

    // Check if navigation already exists - if so, don't add again
    if (slideInner.querySelector('.gslide-sibling-nav')) {
      return;
    }

    // Get data from the first glightbox link on the page
    const originalLink = document.querySelector('a.glightbox');

    if (!originalLink) {
      return;
    }

    const prevUrl = originalLink.dataset.prevUrl;
    const nextUrl = originalLink.dataset.nextUrl;
    const prevTitle = originalLink.dataset.prevTitle;
    const nextTitle = originalLink.dataset.nextTitle;
    // PHP renders the translated count label (e.g. "2 of 5") via AtoM's __() helper
    const imageCountLabel = originalLink.dataset.imageCountLabel;
    const labelOpenTab = originalLink.dataset.labelOpenTab || 'Open image in separate tab';

    // Add navigation arrows for siblings (left and right of image)
    if (prevUrl || nextUrl) {
      const navContainer = document.createElement('div');
      navContainer.className = 'gslide-sibling-nav';

      if (prevUrl) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gslide-sibling-prev';
        prevBtn.title = prevTitle || '';
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
        nextBtn.title = nextTitle || '';
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

    // Add image count and open-in-tab link to description area
    if (imageCountLabel) {
      const descElement = activeSlide.querySelector('.gslide-desc');

      // Only add if not already rendered (check for separator span)
      if (descElement && !descElement.querySelector('.separator')) {
        const currentSlide = activeSlide.querySelector('.gslide-image img');
        const imageUrl = currentSlide ? currentSlide.src : '';

        // Use DOM API - avoids innerHTML concatenation with untrusted values
        const sep1 = document.createElement('span');
        sep1.className = 'separator';
        sep1.setAttribute('aria-hidden', 'true');
        sep1.textContent = ' | ';

        const counter = document.createElement('span');
        counter.textContent = imageCountLabel;

        descElement.appendChild(sep1);
        descElement.appendChild(counter);

        if (imageUrl) {
          const sep2 = document.createElement('span');
          sep2.className = 'separator';
          sep2.setAttribute('aria-hidden', 'true');
          sep2.textContent = ' | ';

          const openTabLink = document.createElement('a');
          openTabLink.href = imageUrl;
          openTabLink.target = '_blank';
          openTabLink.rel = 'noopener noreferrer';
          openTabLink.textContent = labelOpenTab;

          descElement.appendChild(sep2);
          descElement.appendChild(openTabLink);
        }
      }
    }
  }
});
