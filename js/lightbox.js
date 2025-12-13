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
      setTimeout(() => addSiblingNavigation(lightbox), 150);
    },

    onSlideChange: () => {
      setTimeout(() => addSiblingNavigation(lightbox), 150);
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
    }, 200);
  }

  // Function to add sibling navigation to lightbox
  function addSiblingNavigation(lightboxInstance) {
    const activeSlide = document.querySelector('.gslide.current');
    if (!activeSlide) {
      console.log('No active slide found');
      return;
    }

    const slideInner = activeSlide.querySelector('.gslide-inner-content');
    if (!slideInner) {
      console.log('No slide inner found');
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
      console.log('No glightbox link found on page');
      return;
    }

    const prevUrl = originalLink.dataset.prevUrl;
    const nextUrl = originalLink.dataset.nextUrl;
    const prevTitle = originalLink.dataset.prevTitle;
    const nextTitle = originalLink.dataset.nextTitle;
    const siblingIndex = originalLink.dataset.siblingIndex;
    const siblingTotal = originalLink.dataset.siblingTotal;

    console.log('Sibling data:', {
      prevUrl,
      nextUrl,
      siblingIndex,
      siblingTotal,
      prevTitle,
      nextTitle
    });

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
          console.log('Previous clicked, navigating to:', prevUrl);
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
          console.log('Next clicked, navigating to:', nextUrl);
          sessionStorage.setItem('openLightbox', 'true');
          window.location.href = nextUrl;
        };
        navContainer.appendChild(nextBtn);
      }

      slideInner.appendChild(navContainer);
      console.log('Navigation arrows added');
    }

    // Add sibling counter at bottom center
    if (siblingIndex && siblingTotal) {
      const counterContainer = document.createElement('div');
      counterContainer.className = 'gslide-sibling-counter';
      counterContainer.innerHTML = `<span>Bild ${siblingIndex} von ${siblingTotal}</span>`;
      slideInner.appendChild(counterContainer);
      console.log('Counter added:', `Bild ${siblingIndex} von ${siblingTotal}`);
    } else {
      console.log('No counter data:', { siblingIndex, siblingTotal });
    }
  }
});
