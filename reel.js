/////////////////////////////////////////////////////////////////
//REEL SCROLL NAVIGATION
/////////////////////////////////////////////////////////////////
window.addEventListener("load", () => {
  const scrollContainers = document.querySelectorAll(".reel-promo__article-mask");

  scrollContainers.forEach(scrollContainer => {
    // navigation wrapper next to this specific scrollContainer
    const naviReference = scrollContainer.nextElementSibling;
    const navigationContainer = naviReference.querySelector(".reel-promo__navi-content");

    const buttonLeft = naviReference.querySelector(".reel-promo__navi-dir-button--left");
    const buttonRight = naviReference.querySelector(".reel-promo__navi-dir-button--right");

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

    console.log("scrollElementslength", scrollElements.length);

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

    buttonLeft.addEventListener("click", () => {
      newScrollTo(Math.max(currentScrollIndex - 1, 0));
      midButtonChecker();
    });

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
        console.log("MID BUTTONS:", index);
        console.log("CURRENT SCROLL INDEX:", currentScrollIndex);
      });
    }
  });
});









/*
function configureReel() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  // Set a CSS variable that CSS can use
  document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);

  const contentElements = document.querySelectorAll(".reel-promo__article-mask");

  contentElements.forEach(content => {
    const contentNavi = content.nextElementSibling?.querySelector(".reel-promo__navi-content");
    if (!contentNavi) console.warn("Navigation content not found!");

    const vwToPx = v => window.innerWidth * (v / 100);
    const buttonLeft = contentNavi.querySelector(".reel-promo__navi-dir-button--left");
    const buttonRight = contentNavi.querySelector(".reel-promo__navi-dir-button--right");

    const visibleItems = parseInt(
      getComputedStyle(content)
        .getPropertyValue("--reel-promo-number-of-visible-items")
        .trim(),
      10
    ); // Trim whitespace, base 10 for decimal system

    const columnGap = vwToPx(
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--reel-promo-column-gap")
      )
    );

    let items = Array.from(content.children);
    let itemPositions = items.map(item => item.offsetLeft - item.clientLeft);
    let currentIndex = 0;

    const batchPosition = [];
    const batchButton = [];
    const batchSize = visibleItems; // use visibleItems if you want it dynamic

    for (let i = 0; i < items.length; i += batchSize) {
      batchPosition.push(itemPositions[i]);
      const midButton = document.createElement("button");
      midButton.classList.add("reel-promo__navi-mid-button");
      contentNavi.appendChild(midButton);
      batchButton.push(midButton); // append to array sequentially

    }



    initialItemPositions();

    function initialItemPositions() {
      content.scrollLeft = itemPositions[0];
    }

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initialItemPositions, 50);
    });

    batchButton.forEach((button, index) => {
      button.addEventListener("click", () => {
        currentIndex = index * visibleItems; // synchronize the index
        setActiveButton(index);

        let targetScroll = batchPosition[index];
        const distance = targetScroll - content.scrollLeft;
        smoothScroll(content, distance, 0.5);


      });

    });
    function setActiveButton(index) {
      batchButton.forEach(btn => btn.classList.remove("active"));
      if (batchButton[index]) batchButton[index].classList.add("active");
    }
    setActiveButton(0);


    // Add these two variables anywhere above the left/right event listeners
    const totalBatches = Math.ceil(items.length / visibleItems);
    let currentBatch = 0;

    buttonLeft.addEventListener("click", () => {
      // move one batch left
      currentBatch = Math.max(0, currentBatch - 1);

      // Find the index of the first fully visible item
      let closestIndex = items.findIndex(item => item.offsetLeft >= content.scrollLeft);
      if (closestIndex === -1) closestIndex = items.length - 1;

      // Move left by visibleItems to rasterize batches (e.g., 3 visible items)
      currentIndex = Math.max(0, closestIndex - visibleItems);

      let targetScroll = itemPositions[currentIndex];
      const distance = targetScroll - content.scrollLeft;
      smoothScroll(content, distance, 0.5);

      // Highlight correct mid button (optional, non-breaking)
      setActiveButton(currentBatch);
    });

    buttonRight.addEventListener("click", () => {
      // move one batch right
      currentBatch = Math.min(totalBatches - 1, currentBatch + 1);

      currentIndex = Math.min(items.length - 1, currentIndex + visibleItems);

      // Adjust if last item would overshoot
      const containerWidth = content.clientWidth;
      const lastItemRight =
        items[items.length - 1].offsetLeft + items[items.length - 1].offsetWidth;
      const maxScrollLeft = lastItemRight - containerWidth;

      let targetScroll = itemPositions[currentIndex];
      if (targetScroll > maxScrollLeft) {
        targetScroll = maxScrollLeft;
        currentIndex = items.length - 1;
      }

      const distance = targetScroll - content.scrollLeft;
      smoothScroll(content, distance, 0.5);

      // Highlight correct mid button (optional, non-breaking)
      setActiveButton(currentBatch);
    });

    function scrollToIndex(index) {
      const distance = itemPositions[index] - content.scrollLeft;
      smoothScroll(content, distance, 0.5);
    }

    function smoothScroll(element, distance, durationInSeconds) {
      const duration = durationInSeconds * 1000;
      const start = element.scrollLeft;
      const startTime = performance.now();

      function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.scrollLeft = start + distance * easeOutQuad(progress);
        if (progress < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }

    function easeOutQuad(t) {
      return t * (2 - t);
    }
  });
}



window.addEventListener("load", configureReel);

// re-run when viewport width crosses breakpoints
window.addEventListener("resize", debounce(() => {
  // clear old navigation buttons to prevent duplicates
  document.querySelectorAll(".reel-promo__navi-mid-button").forEach(btn => btn.remove());
  configureReel();
}, 300));

function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}
*/