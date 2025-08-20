const logoContainer = document.getElementById("logo-container");
const logo = document.getElementById("logo");
const navbar = document.getElementById("navbar");

function normalizeLogo() {

    const viewportWidth = window.innerWidth;
    const zoom = window.devicePixelRatio || 1;
    const logo_width = logo.naturalWidth * 0.63;
    const height = logo.naturalHeight;

    const minWidth = logo_width / zoom;
    const maxWidth = logo_width *0.6 / 4;

    var scaledWidth = (logo_width * 0.4) / zoom;


    if (scaledWidth < maxWidth) scaledWidth = maxWidth;
    if (scaledWidth > minWidth) scaledWidth = minWidth;

    
    logo.style.width = scaledWidth + "px";


    const baseSpacing = 20;
    var adjustedSpacing = baseSpacing / zoom;

    if (adjustedSpacing < 10) adjustedSpacing = 10;
    if (adjustedSpacing > 40) adjustedSpacing = 40;

    logoContainer.style.marginTop = adjustedSpacing + "px";

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