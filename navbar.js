document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const buttons = document.querySelectorAll(".navbar .button");
  const leftCarpet = document.getElementById("dropdown-carpet");
  const rightCarpet = document.getElementById("dropdown-carpet2");
  const logoContainer = document.getElementById("logo-bg");

  let activeButton = null;
  let carpetsVisible = false;

  function showCarpets(button) {
    const buttonRect = button.getBoundingClientRect();
    const logoRect = logoContainer.getBoundingClientRect();
    const logoBottom = logoRect.bottom;

    const rightEdge = Math.min(buttonRect.right, window.innerWidth * 0.8);

    // Left carpet
    leftCarpet.style.width = window.innerWidth + "px";
    leftCarpet.style.left = "0";
    leftCarpet.style.clipPath = `polygon(0 ${logoBottom}px, 55% ${logoBottom}px, ${rightEdge * 0.9}px 100%, 0 100%)`;
    leftCarpet.style.opacity = 1;
    leftCarpet.style.pointerEvents = "auto";

    // Right carpet
    rightCarpet.style.width = window.innerWidth + "px";
    rightCarpet.style.right = "0";
    rightCarpet.style.clipPath = `polygon(100% ${logoBottom}px, 45% ${logoBottom}px, ${rightEdge * 0.8}px 100%, 100% 100%)`;
    rightCarpet.style.opacity = 1;
    rightCarpet.style.pointerEvents = "auto";

    carpetsVisible = true;
    activeButton = button;
  }

  function hideCarpets() {
    if (!carpetsVisible) return;

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
        el.style.removeProperty("clip-path");
      });
      carpetsVisible = false;
      activeButton = null;
    }, 300);
  }

  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => showCarpets(button));
  });

  document.addEventListener("mousemove", e => {
    const x = e.clientX;
    const y = e.clientY;
    const inNavbar = navbar.getBoundingClientRect();
    const inLeftCarpet = leftCarpet.getBoundingClientRect();
    const inRightCarpet = rightCarpet.getBoundingClientRect();

    const insideHoverZone =
      (x >= inNavbar.left && x <= inNavbar.right && y >= inNavbar.top && y <= inNavbar.bottom) ||
      (x >= inLeftCarpet.left && x <= inLeftCarpet.right && y >= inLeftCarpet.top && y <= inLeftCarpet.bottom) ||
      (x >= inRightCarpet.left && x <= inRightCarpet.right && y >= inRightCarpet.top && y <= inRightCarpet.bottom);

    if (!insideHoverZone) hideCarpets();
  });
});
