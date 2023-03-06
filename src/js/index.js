// DETECT MOBILE VIEW SCREEN SIZE
// Execute the function when the window is resized
window.addEventListener('resize', detectMobileView);
// Execute the function when the page loads
detectMobileView();

// Call the init function when the HTML DOM is ready
window.onload = operateNavbar;

// Change automatically the fill color of the footer
changeFooterFillColor(getLastSectionBgColor());

// Highlight nav links based on users viewpoint
highlightNavLinks();

// Call clicker event listner for the newsletter button
buttonFliesAway();