document.addEventListener("DOMContentLoaded", () => {

  const logoContainer = document.getElementById("logo-container");
  const logo = document.getElementById("logo");
  const navbar = document.querySelector(".navbar"); // fixed: select by class

  const buttons = document.querySelectorAll(".navbar .button");
  const carpet = document.getElementById("dropdown-carpet");
  const carpet2 = document.getElementById("dropdown-carpet2");
  const nav = document.querySelector("nav");

  let lastHoveredButton = null;

  function showCarpet(button) {
    const rect = button.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const logoRect = logoContainer.getBoundingClientRect();

    const maxRight = window.innerWidth * 0.80;
    const right = Math.min(rect.right, maxRight);
    const logoBottomY = logoRect.bottom - navRect.top;

     carpet.style.width = window.innerWidth + "px";
    carpet.style.left = "0px";
    carpet.style.clipPath = `polygon(0 ${logoBottomY}px, 55% ${logoBottomY}px, ${right*0.9}px 100%, 0 100%)`;
    carpet.style.opacity = 1;
    carpet.style.pointerEvents = "auto";

    carpet2.style.width = window.innerWidth + "px";
    carpet2.style.right = "0px";
    carpet2.style.clipPath = `polygon(100% ${logoBottomY}px, 45% ${logoBottomY}px, ${right*0.8}px 100%, 100% 100%)`;
    carpet2.style.opacity = 1;
    carpet2.style.pointerEvents = "auto";
  }

  function hideCarpet() {
    
    carpet.style.transition = "width 1s ease, opacity 1s ease, clip-path 1s ease, transform 1s ease"; 
    carpet2.style.transition = "width 1s ease, opacity 1s ease, clip-path 1s ease, transform 1s ease"; 

    // Remove pointer events after fade-out finishes
    const cleanup = () => {
        
    carpet.style.opacity = 0;
    carpet2.style.opacity = 0;
      carpet.style.pointerEvents = "none";
      carpet2.style.pointerEvents = "none";
      [carpet, carpet2].forEach(el => {
      el.style.removeProperty("width");
      el.style.removeProperty("left");
      el.style.removeProperty("right");
      el.style.removeProperty("opacity");
      el.style.removeProperty("pointer-events");
    });
    };

    // Match the CSS transition duration (opacity 0.3s)
    setTimeout(cleanup, 300);
  }

  function updateCarpet() {
    const navbarHovered = navbar.matches(":hover");
    const carpetHovered = carpet.matches(":hover") || carpet2.matches(":hover");

    if (navbarHovered) {
      const hoveredButton = [...buttons].find(btn => btn.matches(":hover"));
      if (hoveredButton) {
        lastHoveredButton = hoveredButton;
        showCarpet(hoveredButton);
      } else if (lastHoveredButton) {
        // Keep showing the last hovered button's carpet when moving between buttons
        showCarpet(lastHoveredButton);
      }
    } else if (!navbarHovered && !carpetHovered) {
      hideCarpet();
      lastHoveredButton = null;
    }
  }

  // Event listeners
  navbar.addEventListener("mouseenter", updateCarpet);
  navbar.addEventListener("mouseleave", updateCarpet);
  navbar.addEventListener("mousemove", updateCarpet);

  carpet.addEventListener("mouseenter", updateCarpet);
  carpet.addEventListener("mouseleave", updateCarpet);
  carpet2.addEventListener("mouseenter", updateCarpet);
  carpet2.addEventListener("mouseleave", updateCarpet);

});