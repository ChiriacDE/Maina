function detectMobileView() {
    const body = document.querySelector('body');
    const isMobileView = window.innerWidth < 861;
  
    if (isMobileView) {
      body.classList.add('mobile-view');
    } else {
      body.classList.remove('mobile-view');
    }
  }

// GET LAST BODYS SECTION COLOR
function getLastSectionBgColor() {
    // Get all the section elements in the document
    const sections = document.getElementsByTagName("section")
    
    // Get the last section element
    const lastSection = sections[sections.length - 1]
  
    // Get the background color of the last section element
    const bgColor = window.getComputedStyle(lastSection).getPropertyValue("background-color")
    
    return bgColor;
}

// FULLFILL FOOTER WAVE WITH SAME COLOR AS LAST SECTION
function changeFooterFillColor(color) {
    // Get the element with the class name ".footer-wave-path"
    const footerWavePath = document.querySelector(".footer-wave-path")
  
    // Set the fill color of the element to the specified color
    footerWavePath.style.fill = color;
}


// HIGHLIGHT NAVTAB BASED ON VIEWPOINTS SECTION
function highlightNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    window.addEventListener('scroll', () => {
        // Loop through each section
        document.querySelectorAll('section').forEach((section) => {
        // Get the section's bounding rectangle
        const sectionRect = section.getBoundingClientRect();

        // Check if the section is in the viewport
        if (sectionRect.top <= 100 && sectionRect.bottom >= 0) {
            // Get the section's ID
            const sectionId = section.getAttribute('id');

            // Loop through each nav link and remove the active class
            navLinks.forEach((navLink) => {
            navLink.classList.remove('active');

            // Add the active class to the nav link that matches the section's ID
            if (navLink.getAttribute('href') === `#${sectionId}`) {
                navLink.classList.add('active');
            } 

            });
        } 
    });
    

    // Do the same for the header and footer
    const headerRect = header.getBoundingClientRect()
    const footerRect = footer.getBoundingClientRect()
        // Remove highlight when the viewport is on the header, on the footer (speacially for mobile) or the user reaches the bottom of the window
        if (headerRect.top <= 0 && headerRect.bottom >= 100 || footerRect.top <= 100 && footerRect.bottom >= 0 || isWindowBottom()) { 
            navLinks.forEach((navLink) => {
                navLink.classList.remove('active');
            })
        }

    });
}


// GET WINDOW BOTTOM
function isWindowBottom() {
    const windowHeight = window.innerHeight;
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const scrollTop = window.pageYOffset || html.scrollTop || body.scrollTop;
    const scrollBottom = documentHeight - scrollTop - windowHeight;
    
    // Return true when so
    if (scrollBottom <= 0) {
      return true;
    }
}
