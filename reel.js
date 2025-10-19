/////////////////////////////////////////////////////////////////
//REEL SCROLL NAVIGATION
/////////////////////////////////////////////////////////////////
window.addEventListener("load", () => {
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
        let targetScroll = batchPosition[index];
        const distance = targetScroll - content.scrollLeft;
        smoothScroll(content, distance, 0.5);
      });
    });

    buttonLeft.addEventListener("click", () => {
      // Find the index of the first fully visible item
      let closestIndex = items.findIndex(item => item.offsetLeft >= content.scrollLeft);
      if (closestIndex === -1) closestIndex = items.length - 1;

      // Move left by visibleItems to rasterize batches (e.g., 3 visible items)
      currentIndex = Math.max(0, closestIndex - visibleItems);

      let targetScroll = itemPositions[currentIndex];
      const distance = targetScroll - content.scrollLeft;
      smoothScroll(content, distance, 0.5);
    });

    buttonRight.addEventListener("click", () => {
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
});
