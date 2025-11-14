////////////////////////////////////////////////////////////
//SUBMENU DYNAMIC ITEM PLACEMENT
////////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  function arrangeSubmenu(submenu) {
    const sections = Array.from(submenu.children);

    const textBlocks = sections.filter(sec => sec.querySelector("ul, p")); // texts
    const imageBlocks = sections.filter(sec => sec.querySelector("div[style*='background-image'], img")); // images

    const colCount = Math.ceil(sections.length / 2);
    const currentGap = parseFloat(getComputedStyle(submenu).columnGap);
    submenu.style.columnGap = (currentGap / colCount) + "%";

    // Place text blocks
    textBlocks.forEach((block, i) => {
      const textColCount = Math.round(textBlocks.length / 2);
      let startCol = 1;

      if (imageBlocks.length > 0) {
        // Images exist → text stays in col 1 (stacked)
        let col = i + 1 > 2 ? startCol + 1 : startCol;
        let row = (i % 2) + 1; // shift to 1, 2, 1, 2 instead of 0, 1, 0, 1
        block.style.gridColumn = col.toString();
        block.style.gridRow = row.toString();
      } else {
        // No images → text flows naturally
        block.style.gridColumn = "";
        block.style.gridRow = "";
      }
    });

    // Place image blocks
    imageBlocks.forEach((block, i) => {
      const imageColCount = Math.round(imageBlocks.length / 2);
      let startCol = 2;
      let col;

      if (textBlocks.length <= 2) {
        col = i + 1 > 1 ? startCol + 1 : startCol;
      } else {
        col = i + 1 > 1 ? startCol + 2 : startCol + 1;
      }

      block.style.gridColumn = col.toString();
      block.style.gridRow = "1";
    });
  }

  document.querySelectorAll(".submenu").forEach(arrangeSubmenu);
  ///////////////////////////////////////////////////////////////
  //BACKGROUND ANIMATION
  ///////////////////////////////////////////////////////////////
  const options = document.querySelectorAll(".navbar__option");
  const submenuAnimLeft = document.querySelector(".submenu__bg-animation--left");
  const submenuAnimRight = document.querySelector(".submenu__bg-animation--right");
  const submenuAnimBG = document.querySelector(".submenu__bg-animation-background");



  options.forEach(option => {
    const submenu = option.nextElementSibling;
    const sections = Array.from(submenu.children);

    const sectionHeights = sections.map(section => {
      let bottom = section.offsetTop + section.offsetHeight;

      // check for absolutely positioned divs with background images
      const imgDivs = section.querySelectorAll("img");
      imgDivs.forEach(imgDiv => {
        const imgDivRect = imgDiv.getBoundingClientRect();
        const parentRect = section.getBoundingClientRect();

        // bottom relative to section
        const divBottomRelative = imgDivRect.bottom - parentRect.top;
        bottom = Math.max(bottom, section.offsetTop + divBottomRelative);
      });

      return bottom;
    });

    const highestSection = Math.max(...sectionHeights);
    const bottomDistance = 70;

    window.addEventListener("scroll", () => {
      submenuAnimLeft.classList.remove("active");
      submenuAnimRight.classList.remove("active");
      submenuAnimBG.classList.remove("active");
      submenu.classList.remove("active");
    });

    option.addEventListener("mouseleave", () => {
      submenuAnimLeft.classList.remove("active");
      submenuAnimRight.classList.remove("active");
      submenuAnimBG.classList.remove("active");
      submenu.classList.remove("active");
    });

    option.addEventListener("mouseenter", () => {
      submenuAnimLeft.classList.remove("active");
      submenuAnimRight.classList.remove("active");
      submenuAnimBG.classList.remove("active");
      submenu.classList.remove("active");

      submenuAnimLeft.classList.add("active");
      submenuAnimRight.classList.add("active");
      submenuAnimBG.classList.add("active");
      submenu.classList.add("active");

      submenu.style.height = highestSection + bottomDistance + "px";
      let ultimateHeight = submenu.offsetHeight;

      submenuAnimLeft.style.height = ultimateHeight + "px";
      submenuAnimRight.style.height = ultimateHeight + "px";
      submenuAnimBG.style.height = ultimateHeight + "px";
    });

    submenu.addEventListener("mouseenter", () => {
      submenuAnimLeft.classList.remove("active");
      submenuAnimRight.classList.remove("active");
      submenuAnimBG.classList.remove("active");
      submenu.classList.remove("active");

      submenuAnimLeft.classList.add("active");
      submenuAnimRight.classList.add("active");
      submenuAnimBG.classList.add("active");
      submenu.classList.add("active");

      submenu.style.height = highestSection + bottomDistance + "px";
      let ultimateHeight = submenu.offsetHeight;

      submenuAnimLeft.style.height = ultimateHeight + "px";
      submenuAnimRight.style.height = ultimateHeight + "px";
      submenuAnimBG.style.height = ultimateHeight + "px";
    });

    submenu.addEventListener("mouseleave", () => {
      submenuAnimLeft.classList.remove("active");
      submenuAnimRight.classList.remove("active");
      submenuAnimBG.classList.remove("active");
      submenu.classList.remove("active");
    });
  });
  ///////////////////////////////////////////////////////////////
  //NAVBAR-MOBILE
  ///////////////////////////////////////////////////////////////

  let closeButton = document.querySelector(".hamburger-button__container--close");
  let hamburgerButton = document.querySelector(".hamburger-button__container");
  let main = document.querySelector("main");
  let body = document.querySelector("body");
  let mobileMenu = document.querySelector(".navbar-mobile__menu-container");
  let submenu = document.querySelector(".navbar-mobile__submenu-container");
  let returnButton = document.querySelector(".navbar-mobile__submenu-title-box--left");

  const mobileMenuOptionParent = document.querySelector(".navbar-mobile__menu-content");
  const menuOptions = mobileMenuOptionParent.querySelectorAll(".navbar-mobile__menu-option");
  //nodeList

  returnButton.addEventListener("click", ()=> {
    submenu.classList.remove("active");
  });

  closeButton.addEventListener("click", () => {
    closeButton.classList.toggle("active");
    hamburgerButton.classList.toggle("active");
    main.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.classList.toggle("active");
    menuOptions.forEach(menuOption => {
      let siblingSubmenu = menuOption.nextElementSibling;
      if (siblingSubmenu && siblingSubmenu.classList.contains("navbar-mobile__submenu-container")) {
        siblingSubmenu.classList.remove("active");
      }
    });

  });

  hamburgerButton.addEventListener("click", () => {
    closeButton.classList.toggle("active");
    hamburgerButton.classList.toggle("active");
    main.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    body.classList.toggle("active");
  });


  menuOptions.forEach(menuOption => {
    menuOption.addEventListener("click", () => {
      let siblingSubmenu = menuOption.nextElementSibling;
      if (siblingSubmenu && siblingSubmenu.classList.contains("navbar-mobile__submenu-container")) {
        siblingSubmenu.classList.toggle("active");
      }
    });
  });


});
