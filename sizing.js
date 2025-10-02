
const logo = document.getElementById("logo__image");
const navbar = document.getElementById("menu-main");

function normalizeLogo() {

    const viewportWidth = window.innerWidth;
    const zoom = window.devicePixelRatio || 1;
    const logo_width = 1580;
    const height = logo.naturalHeight;

    const minWidth = logo_width / zoom;
    const maxWidth = logo_width *0.6 / 4;

    var scaledWidth = (logo_width * 0.4) / zoom;


    if (scaledWidth < maxWidth) scaledWidth = maxWidth;
    if (scaledWidth > minWidth) scaledWidth = minWidth;

    
    logo.style.width = scaledWidth + "px";


}



// Run on load
document.addEventListener("DOMContentLoaded", normalizeLogo);

// Re-run when window size (and zoom) changes
window.addEventListener("resize", normalizeLogo);

// If mobile view, remove JS sizing and let CSS handle it
if (window.innerWidth <= 768) { // breakpoint for mobile
  logo.style.width = "";
  logoContainer.style.marginTop = "";
}

let savedX = 0;
let savedY = 0;
let resizeTimeout;

window.addEventListener("resize", () => {
  // Save current scroll position
  savedX = window.scrollX;
  savedY = window.scrollY;

  // Clear any pending timeout
  clearTimeout(resizeTimeout);

  // Restore after user stops resizing (e.g., 150ms pause)
  resizeTimeout = setTimeout(() => {
    window.scrollTo(savedX, savedY);
  }, 150);
});
