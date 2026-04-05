// Import GLightbox
import GLightbox from 'glightbox';

document.addEventListener('DOMContentLoaded', () => {
  const lightboxLink = document.querySelector('a.glightbox');

  // No lightbox on this page - nothing to do
  if (!lightboxLink) return;

  const prevUrl         = lightboxLink.dataset.prevUrl   || null;
  const nextUrl         = lightboxLink.dataset.nextUrl   || null;
  const prevTitle       = lightboxLink.dataset.prevTitle || '';
  const nextTitle       = lightboxLink.dataset.nextTitle || '';
  const imageCountLabel = lightboxLink.dataset.imageCountLabel || null;
  const labelOpenTab    = lightboxLink.dataset.labelOpenTab    || 'Open image in separate tab';

  // ── Sibling nav overlay ──────────────────────────────────────────────────
  // Buttons are appended directly to document.body, completely outside
  // GLightbox's DOM tree. This avoids ALL event interception by GLightbox.
  let navOverlay = null;

  function buildNavOverlay() {
    if (navOverlay || (!prevUrl && !nextUrl)) return;

    navOverlay = document.createElement('div');
    navOverlay.id = 'sibling-nav-overlay';
    navOverlay.style.display = 'none';

    if (prevUrl) {
      const btn = document.createElement('button');
      btn.className = 'sibling-nav-btn sibling-nav-prev';
      btn.title = prevTitle;
      btn.setAttribute('aria-label', prevTitle);
      btn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      btn.addEventListener('click', () => {
        sessionStorage.setItem('openLightbox', 'true');
        window.location.href = prevUrl;
      });
      navOverlay.appendChild(btn);
    }

    if (nextUrl) {
      const btn = document.createElement('button');
      btn.className = 'sibling-nav-btn sibling-nav-next';
      btn.title = nextTitle;
      btn.setAttribute('aria-label', nextTitle);
      btn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      btn.addEventListener('click', () => {
        sessionStorage.setItem('openLightbox', 'true');
        window.location.href = nextUrl;
      });
      navOverlay.appendChild(btn);
    }

    document.body.appendChild(navOverlay);
  }

  function showNavOverlay() {
    if (navOverlay) navOverlay.style.display = 'flex';
  }

  function hideNavOverlay() {
    if (navOverlay) navOverlay.style.display = 'none';
  }

  // ── GLightbox init ───────────────────────────────────────────────────────
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
    closeButton: true,
    zoomable: true,
    draggable: false,
    skin: 'clean',
    closeOnOutsideClick: true,
    descPosition: 'bottom',
  });

  lightbox.on('open', () => {
    buildNavOverlay();
    showNavOverlay();
    addCounterToDesc();
  });

  lightbox.on('close', () => {
    hideNavOverlay();
  });

  // ── Counter + open-in-tab in GLightbox description ───────────────────────
  function addCounterToDesc() {
    if (!imageCountLabel) return;

    requestAnimationFrame(() => {
      const descElement = document.querySelector('.gslide.current .gslide-desc');
      if (!descElement || descElement.querySelector('.sibling-counter')) return;

      const currentImg = document.querySelector('.gslide.current .gslide-image img');
      const imageUrl = currentImg ? currentImg.src : lightboxLink.href;

      const sep1 = document.createElement('span');
      sep1.className = 'separator';
      sep1.setAttribute('aria-hidden', 'true');
      sep1.textContent = ' | ';

      const counter = document.createElement('span');
      counter.className = 'sibling-counter';
      counter.textContent = imageCountLabel;

      descElement.appendChild(sep1);
      descElement.appendChild(counter);

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
    });
  }

  // ── Page-level "open in tab" link (outside lightbox) ────────────────────
  const siblingCounterText = document.getElementById('sibling-counter-text');
  if (siblingCounterText) {
    const sep = document.createElement('span');
    sep.setAttribute('aria-hidden', 'true');
    sep.textContent = ' | ';

    const openTabLink = document.createElement('a');
    openTabLink.href = lightboxLink.href;
    openTabLink.target = '_blank';
    openTabLink.rel = 'noopener noreferrer';
    openTabLink.textContent = labelOpenTab;

    siblingCounterText.appendChild(sep);
    siblingCounterText.appendChild(openTabLink);
  }

  // ── Auto-open lightbox after sibling navigation ──────────────────────────
  if (sessionStorage.getItem('openLightbox') === 'true') {
    sessionStorage.removeItem('openLightbox');
    setTimeout(() => lightboxLink.click(), 200);
  }
});
