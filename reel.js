/////////////////////////////////////////////////////////////////
//REEL SCROLL NAVIGATION
/////////////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  const scrollContainers = document.querySelectorAll(".reel-promo__article-mask");

  scrollContainers.forEach(scrollContainer => {
    // navigation wrapper next to this specific scrollContainer
    const naviReference = scrollContainer.nextElementSibling;
    const navigationContainer = naviReference.querySelector(".reel-promo__navi-content");



    const scrollContainerBorderWidth = scrollContainer.clientLeft;
    const scrollContainerPaddingWidth = parseInt(getComputedStyle(scrollContainer).paddingLeft);
    const scrollContainerRect = scrollContainer.getBoundingClientRect();
    const visibleItems = parseInt(
      getComputedStyle(scrollContainer)
        .getPropertyValue("--reel-promo-number-of-visible-items")
        .trim(),
      10
    );

    const scrollElements = scrollContainer.querySelectorAll(":scope > *");

    const batchPositions = [];
    let currentScrollIndex = 0;



    let naviButtonLeft = document.createElement("button"); naviButtonLeft.classList.add("reel-promo__navi-dir-button", "reel-promo__navi-dir-button--left");
    navigationContainer.appendChild(naviButtonLeft);
    const buttonLeft = naviReference.querySelector(".reel-promo__navi-dir-button--left");

    buttonLeft.addEventListener("click", () => {
      newScrollTo(Math.max(currentScrollIndex - 1, 0));
      midButtonChecker();
    });
    
    scrollElements.forEach((scrollElement, index) => {
      const elementRect = scrollElement.getBoundingClientRect();

      let elementScrollLeft =
        elementRect.left -
        scrollContainerRect.left +
        scrollContainerBorderWidth +
        scrollContainerPaddingWidth +
        scrollContainer.scrollLeft;






      if (index % visibleItems === 0) {
        batchPositions.push(elementScrollLeft); // 0,1,2,...

        const buttonMid = document.createElement("button");
        buttonMid.classList.add("reel-promo__navi-mid-button");
        navigationContainer.appendChild(buttonMid);

        buttonMid.addEventListener("click", () => {
          newScrollTo(index / visibleItems);
          midButtonChecker();
        });
      }
    });

    

    let naviButtonRight = document.createElement("button"); naviButtonRight.classList.add("reel-promo__navi-dir-button", "reel-promo__navi-dir-button--right");
    navigationContainer.appendChild(naviButtonRight);
    const buttonRight = naviReference.querySelector(".reel-promo__navi-dir-button--right");

    buttonRight.addEventListener("click", () => {
      newScrollTo(Math.min(currentScrollIndex + 1, batchPositions.length - 1));
      midButtonChecker();
    });

    newScrollTo(0);
    midButtonChecker();

    function newScrollTo(index) {
      scrollContainer.scrollTo({
        left: batchPositions[index],
        behavior: "smooth"
      });
      currentScrollIndex = index;
    }

    function midButtonChecker() {
      const allMidButtons = navigationContainer.querySelectorAll(".reel-promo__navi-mid-button");
      allMidButtons.forEach((midButton, index) => {
        if (index === currentScrollIndex) {
          midButton.classList.add("active");
        } else {
          midButton.classList.remove("active");
        }
      });
    }
  });
});

