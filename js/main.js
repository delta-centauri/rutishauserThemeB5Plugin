import "../../arDominionB5Plugin/js/main";

/*

Extra/custom JS:

jQuery, $ and bootstrap are exposed globally. Also Drupal and Qubit,
but avoid its usage. Allows IIFEs, CommonJS, ES6 Modules and it could
allow Typescript if it's implemented in the Webpack build process.

*/

// Initialize GLightbox for image galleries
import "./lightbox";

// Initialize sibling navigation with keyboard shortcuts
import "./siblingNavigation";
