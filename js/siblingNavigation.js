// Sibling Navigation mit Keyboard Shortcuts
(($) => {
  "use strict";

  $(() => {
    const $siblingNav = $("#sibling-navigation");
    
    if ($siblingNav.length === 0) {
      return;
    }

    // Get prev/next links via explicit data-direction attribute
    // Using 'a' alone would fail at list boundaries (first/last item),
    // where only one <a> exists and both .first()/.last() would point to the same element.
    const $prevLink = $siblingNav.find('a[data-direction="prev"]');
    const $nextLink = $siblingNav.find('a[data-direction="next"]');

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
