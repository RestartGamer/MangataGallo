document.addEventListener("DOMContentLoaded", () => {
  const logoContainer = document.getElementById("logo-container");
  const navbar = document.querySelector(".navbar");
  const buttons = document.querySelectorAll(".navbar .button");
  const leftCarpet = document.getElementById("dropdown-carpet");
  const rightCarpet = document.getElementById("dropdown-carpet2");
  const nav = document.querySelector("nav");

  let activeButton = null;
  let carpetsVisible = false;

  function showCarpets(button) {
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const logoRect = logoContainer.getBoundingClientRect();

    const maxRight = window.innerWidth * 0.8;
    const rightEdge = Math.min(buttonRect.right, maxRight);
    const logoBottom = logoRect.bottom - navRect.top;

    leftCarpet.style.width = window.innerWidth + "px";
    leftCarpet.style.left = "0";
    leftCarpet.style.clipPath = `polygon(0 ${logoBottom}px, 55% ${logoBottom}px, ${rightEdge * 0.9}px 100%, 0 100%)`;
    leftCarpet.style.opacity = 1;
    leftCarpet.style.pointerEvents = "auto";

    rightCarpet.style.width = window.innerWidth + "px";
    rightCarpet.style.right = "0";
    rightCarpet.style.clipPath = `polygon(100% ${logoBottom}px, 45% ${logoBottom}px, ${rightEdge * 0.8}px 100%, 100% 100%)`;
    rightCarpet.style.opacity = 1;
    rightCarpet.style.pointerEvents = "auto";

    carpetsVisible = true;
  }

  function hideCarpets() {
    if (!carpetsVisible) return;

    leftCarpet.style.transition = rightCarpet.style.transition =
      "width 1s ease, opacity 1s ease, clip-path 1s ease, transform 1s ease";

    leftCarpet.style.opacity = 0;
    rightCarpet.style.opacity = 0;
    leftCarpet.style.pointerEvents = "none";
    rightCarpet.style.pointerEvents = "none";

    setTimeout(() => {
      [leftCarpet, rightCarpet].forEach(el => {
        el.style.removeProperty("width");
        el.style.removeProperty("left");
        el.style.removeProperty("right");
        el.style.removeProperty("opacity");
        el.style.removeProperty("pointer-events");
      });
      carpetsVisible = false;
      activeButton = null;
    }, 300);
  }

  function handleButtonHover() {
    const hovered = [...buttons].find(btn => btn.matches(":hover"));
    if (hovered) {
      activeButton = hovered;
      showCarpets(hovered);
    }
  }

  function handleMouseMove(event) {
    const x = event.clientX;
    const y = event.clientY;

    const inNavbar = navbar.getBoundingClientRect();
    const inLeftCarpet = leftCarpet.getBoundingClientRect();
    const inRightCarpet = rightCarpet.getBoundingClientRect();

    const insideHoverZone =
      (x >= inNavbar.left && x <= inNavbar.right && y >= inNavbar.top && y <= inNavbar.bottom) ||
      (x >= inLeftCarpet.left && x <= inLeftCarpet.right && y >= inLeftCarpet.top && y <= inLeftCarpet.bottom) ||
      (x >= inRightCarpet.left && x <= inRightCarpet.right && y >= inRightCarpet.top && y <= inRightCarpet.bottom);

    if (!insideHoverZone) {
      hideCarpets();
    }
  }

  // Events
  navbar.addEventListener("mouseenter", handleButtonHover);
  navbar.addEventListener("mousemove", handleButtonHover);

  document.addEventListener("mousemove", handleMouseMove);






  
});
