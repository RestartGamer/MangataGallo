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

    let naviButtonLeft = document.createElement("button");
    naviButtonLeft.classList.add("reel-promo__navi-dir-button", "reel-promo__navi-dir-button--left");
    navigationContainer.appendChild(naviButtonLeft);

    const buttonLeft = naviReference.querySelector(".reel-promo__navi-dir-button--left");
    buttonLeft.addEventListener("click", () => {
      newScrollTo(Math.max(currentScrollIndex - 1, 0));
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
        });
      }
    });

    let naviButtonRight = document.createElement("button");
    naviButtonRight.classList.add("reel-promo__navi-dir-button", "reel-promo__navi-dir-button--right");
    navigationContainer.appendChild(naviButtonRight);

    const buttonRight = naviReference.querySelector(".reel-promo__navi-dir-button--right");
    buttonRight.addEventListener("click", () => {
      newScrollTo(Math.min(currentScrollIndex + 1, batchPositions.length - 1));
    });

    // ---------------------------------------------------------
    // TOUCH-ONLY "SWIPE CHECKER" GATE
    // ---------------------------------------------------------
    let touchScrolling = false;
    let touchScrollTimeout = null;

    // If the user starts interacting with the scrollContainer via TOUCH, allow snapper.
    // (Pointer Events covers most modern browsers; touchstart helps older iOS Safari cases.)
    scrollContainer.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") {
        touchScrolling = true;
      }
    });

    scrollContainer.addEventListener("touchstart", () => {
      touchScrolling = true;
    }, { passive: true });

    function scheduleTouchReset() {
      if (touchScrollTimeout) clearTimeout(touchScrollTimeout);
      touchScrollTimeout = setTimeout(() => {
        touchScrolling = false;
      }, 180); // keeps inertia scrolling counted as "touch" briefly
    }

    //the swipe checker
    let rafId = null;
    scrollContainer.addEventListener("scroll", () => {
      // Only run the scroll snapper logic if the scroll is happening due to touch.
      if (!touchScrolling) return;

      // keep touch mode alive while scrolling/inertia continues
      scheduleTouchReset();

      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;

        const currentLeft = scrollContainer.scrollLeft;

        let nearestIndex = 0;
        let smallestDiff = Infinity; //the infinity is an impossibly huge value which quarantees that the first condition comparisson will run

        batchPositions.forEach((pos, i) => { //So in other words this is to snap to the nearest position.
          const diff = Math.abs(currentLeft - pos);
          if (diff < smallestDiff) {
            smallestDiff = diff;
            nearestIndex = i;
          }
        });

        if (nearestIndex !== currentScrollIndex) { //This automatically snaps to the position.
          currentScrollIndex = nearestIndex;
          midButtonChecker();
        }
      });
    });

    newScrollTo(0);

    function newScrollTo(index) {
      scrollContainer.scrollTo({
        left: batchPositions[index],
        behavior: "smooth"
      });
      currentScrollIndex = index;
      midButtonChecker(); 
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
