const logoContainer = document.getElementById("logo-container");
const logo = document.getElementById("logo");
const navbar = document.getElementById("navbar");

function normalizeLogo() {

    const viewportWidth = window.innerWidth;
    const zoom = window.devicePixelRatio || 1;
    const logo_width = logo.naturalWidth * 0.7;
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

const buttons = document.querySelectorAll(".navbar .button");
const carpet = document.getElementById("dropdown-carpet");
const carpet2 = document.getElementById("dropdown-carpet2");
const nav = document.querySelector("nav");

function showCarpet(button) {
  const rect = button.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  const logoRect = logoContainer.getBoundingClientRect();

  const maxRight = window.innerWidth * 0.80; // 63% of viewport width in pixels
    const right = Math.min(rect.right , maxRight);
  const logoBottomY = logoRect.bottom - navRect.top;

  carpet.style.width = window.innerWidth + "px";
  carpet.style.left = "0px";
  carpet.style.clipPath = `polygon(0 ${logoBottomY}px, 50% ${logoBottomY}px,${right}px 100%,0 100%)`;

  carpet.style.opacity = 1;
  carpet.style.pointerEvents = "auto"; // allow hovering
}

function hideCarpet() {
  carpet.style.opacity = 0;
  carpet.style.pointerEvents = "none"; // ignore mouse events when hidden
}

function updateCarpet() {
  // Check if any button is hovered
  const hoveredButton = [...buttons].find(btn => btn.matches(":hover"));
  const carpetHovered = carpet.matches(":hover");

  if (hoveredButton) {
    showCarpet(hoveredButton);
  } else if (!hoveredButton && !carpetHovered) {
    hideCarpet();
  }
}

// Add event listeners
buttons.forEach(button => {
  button.addEventListener("mouseenter", updateCarpet);
  button.addEventListener("mouseleave", updateCarpet);
});

carpet.addEventListener("mouseenter", updateCarpet);
carpet.addEventListener("mouseleave", updateCarpet);

// Run on load
document.addEventListener("DOMContentLoaded", normalizeLogo);

// Re-run when window size (and zoom) changes
window.addEventListener("resize", normalizeLogo);

// If mobile view, remove JS sizing and let CSS handle it
if (viewportWidth <= 768) { // breakpoint for mobile
    logo.style.width = "";      // my preferred width based on the zoom level
    logoContainer.style.marginTop = ""; // reset margin
    
} 