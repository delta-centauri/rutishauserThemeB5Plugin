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

      console.log('Original link found:', originalLink);

      if (!originalLink) {
        console.log('No original link found');
        return;
      }

      const prevUrl = originalLink.dataset.prevUrl;
      const nextUrl = originalLink.dataset.nextUrl;
      const prevTitle = originalLink.dataset.prevTitle;
      const nextTitle = originalLink.dataset.nextTitle;
      const siblingIndex = originalLink.dataset.siblingIndex;
      const siblingTotal = originalLink.dataset.siblingTotal;

      console.log('Sibling data:', { prevUrl, nextUrl, siblingIndex, siblingTotal });

      // Add navigation arrows for siblings (left and right of image)
      if (prevUrl || nextUrl) {
        const navContainer = document.createElement('div');
        navContainer.className = 'gslide-sibling-nav';

        let navHTML = '';

        if (prevUrl) {
          navHTML += `
            <button class="gslide-sibling-prev" title="${prevTitle || 'Previous'}" data-url="${prevUrl}">
              <i class="fas fa-chevron-left"></i>
            </button>
          `;
        }

        if (nextUrl) {
          navHTML += `
            <button class="gslide-sibling-next" title="${nextTitle || 'Next'}" data-url="${nextUrl}">
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
            if (url && currentLightbox) {
              currentLightbox.close();
              window.location.href = url;
            }
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = nextBtn.dataset.url;
            if (url && currentLightbox) {
              currentLightbox.close();
              window.location.href = url;
            }
          });
        }
      }

      // Add sibling counter at bottom center
      if (siblingIndex && siblingTotal) {
        const counterContainer = document.createElement('div');
        counterContainer.className = 'gslide-sibling-counter';
        counterContainer.innerHTML = `<span>${siblingIndex} von ${siblingTotal}</span>`;
        slideInner.appendChild(counterContainer);
      }
    }, 100);
  }

  // Helper function to find the original link element for current slide
  function findOriginalLinkForCurrentSlide() {
    const currentSlide = document.querySelector('.gslide.current');
    if (!currentSlide) {
      console.log('No current slide found');
      return null;
    }

    const currentImg = currentSlide.querySelector('.ginner-container img, .gslide-image');
    if (!currentImg) {
      console.log('No image in current slide');
      return null;
    }

    const imgSrc = currentImg.src;
    console.log('Looking for image with src:', imgSrc);

    // Find all glightbox links
    const allLinks = document.querySelectorAll('a.glightbox');
    console.log('Found glightbox links:', allLinks.length);

    // Try to match by href (exact match)
    for (const link of allLinks) {
      if (link.href === imgSrc) {
        console.log('Found exact match by href');
        return link;
      }
    }

    // Try to match by data-glightbox attribute
    for (const link of allLinks) {
      const dataGlightbox = link.getAttribute('data-glightbox');
      if (dataGlightbox && imgSrc.includes(dataGlightbox)) {
        console.log('Found match by data-glightbox');
        return link;
      }
    }

    // Try to match by checking if link href is contained in img src
    for (const link of allLinks) {
      if (imgSrc.includes(link.href) || link.href.includes(imgSrc)) {
        console.log('Found match by href contains');
        return link;
      }
    }

    // Fallback: use the first link (better than nothing)
    if (allLinks.length > 0) {
      console.log('Using fallback: first link');
      return allLinks[0];
    }

    console.log('No link found at all');
    return null;
  }
});
