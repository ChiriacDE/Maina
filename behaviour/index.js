// Get the last color so to fill automatically the wave color of the footer
function getLastSectionBgColor() {
    // Get all the section elements in the document
    const sections = document.getElementsByTagName("section");
    
    // Get the last section element
    const lastSection = sections[sections.length - 1];
  
    // Get the background color of the last section element
    const bgColor = window.getComputedStyle(lastSection).getPropertyValue("background-color");
    
    return bgColor;
}

function changeFooterFillColor(color) {
    // Get the element with the class name ".footer-wave-path"
    const footerWavePath = document.querySelector(".footer-wave-path");
  
    // Set the fill color of the element to the specified color
    footerWavePath.style.fill = color;
}

// Change automatically the fill color of the footer
changeFooterFillColor(getLastSectionBgColor())

