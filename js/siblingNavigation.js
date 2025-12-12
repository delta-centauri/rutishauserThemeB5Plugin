// Sibling Navigation mit Keyboard Shortcuts
(($) => {
  "use strict";

  $(() => {
    const $siblingNav = $("#sibling-navigation");
    
    if ($siblingNav.length === 0) {
      return;
    }

    // Get prev/next links
    const $prevLink = $siblingNav.find('a').first();
    const $nextLink = $siblingNav.find('a').last();

    // Keyboard navigation: Arrow keys
    $(document).on('keydown', (e) => {
      // Only if not in input/textarea
      if ($(e.target).is('input, textarea, select')) {
        return;
      }

      // Left arrow or 'p' = Previous
      if ((e.key === 'ArrowLeft' || e.key === 'p') && $prevLink.length) {
        e.preventDefault();
        window.location.href = $prevLink.attr('href');
      }

      // Right arrow or 'n' = Next  
      if ((e.key === 'ArrowRight' || e.key === 'n') && $nextLink.length) {
        e.preventDefault();
        window.location.href = $nextLink.attr('href');
      }
    });

    // Show keyboard hints on hover
    $siblingNav.attr('title', 'Keyboard: ← → or P/N');
  });
})(jQuery);
