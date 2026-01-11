const dataTypes = ["navbar", "poster", "promo-banner", "reel", "slideshow", "checkout", "shopping-bag"]

let productPageContainer = document.querySelector(".product-page__container");
if (productPageContainer) productPageContainer.style.opacity = 0;

window.addEventListener("load", () => {

  // ✅ Helper: add intrinsic size attributes to prevent layout shift
  const setImgDimensions = (img, width, height) => {
    if (!img) return;
    img.setAttribute("width", String(width));
    img.setAttribute("height", String(height));
  };

  dataTypes.forEach(dataType => {
    let elements = document.querySelectorAll(`[data-type="${dataType}"]`);
    let elementArticleCategories = [];
    let elementArticleArray;
    let filteredArticles;
    elements.forEach((element, index) => {
      switch (dataType) {
        case dataTypes[0]:
          element.id = `N${String(index).padStart(4, '0')}`;
          elementArticleCategories = JSON.parse(element.dataset.categories);
          elementArticleArray = JSON.parse(element.dataset.articles);
          filteredArticles = articleSetup(articles, elementArticleCategories, elementArticleArray, element);
          createNavbarList(navbarContent, element.id, filteredArticles);
          break;

        case dataTypes[1]:
          element.id = `P${String(index).padStart(4, '0')}`;
          elementArticleCategories = JSON.parse(element.dataset.categories);
          elementArticleArray = JSON.parse(element.dataset.articles);
          filteredArticles = articleSetup(articles, elementArticleCategories, elementArticleArray, element);
          filteredArticles.forEach(article => {
            article.imageOrientation = element.dataset.imageOrientation;
          });
          createPosters(filteredArticles, element.id);

          break;
        case dataTypes[2]:
          element.id = `PB${String(index).padStart(4, '0')}`;
          elementArticleCategories = JSON.parse(element.dataset.categories);
          elementArticleArray = JSON.parse(element.dataset.articles);
          filteredArticles = articleSetup(promoBannerContent, elementArticleCategories, element.id, element);
          createPromoBanner(filteredArticles, element.id);

          break;

        case dataTypes[3]:
          element.id = `R${String(index).padStart(4, '0')}`;
          elementArticleCategories = JSON.parse(element.dataset.categories);
          elementArticleArray = JSON.parse(element.dataset.articles);
          filteredArticles = articleSetup(articles, elementArticleCategories, elementArticleArray, element);
          createReel(filteredArticles, element.id);
          break;
        case dataTypes[4]:
          element.id = `S${String(index).padStart(4, '0')}`;
          elementArticleCategories = JSON.parse(element.dataset.categories);
          elementArticleArray = JSON.parse(element.dataset.articles);
          filteredArticles = articleSetup(articles, elementArticleCategories, elementArticleArray, element);
          createSlideshow(filteredArticles, element.id);
          break;
        case dataTypes[5]:
          element.id = `CH${String(index).padStart(4, '0')}`;
          const selectedArticles = localStorage.getItem("selectedArticles");

          if (!selectedArticles) {
            console.warn("No selected article found");
            return;
          }
          let productPageContainer = document.querySelector(".product-page__container");
          renderProductPage(checkoutContent, element.id, selectedArticles);
          if (productPageContainer) productPageContainer.style.opacity = 1;

          break;
        case dataTypes[6]:
          element.id = `SB${String(index).padStart(4, '0')}`;
          let assignedArticles = JSON.parse(localStorage.getItem("shoppingBag"));
          renderShoppingBag(articles, assignedArticles);
          break;
      }
    });
  });

  function articleSetup(articles, elementArticleCategories, elementArticleArray, element) {
    if (!elementArticleArray && !elementArticleCategories) return articles;
    if (Array.isArray(elementArticleArray)) {
      if (elementArticleArray && elementArticleArray.length > 0 && elementArticleArray[0] !== "") {
        return articles.filter(article => elementArticleArray.includes(article.id));
      }

      if (elementArticleCategories && elementArticleCategories.length > 0 && elementArticleCategories[0] !== "") {
        return articles.filter(article => elementArticleCategories.includes(article.category));
      }

      if (elementArticleArray[0] == "") {
        return articles;
      }

    } else {
      let elementId = elementArticleArray;
      return articles.filter(article => article.id === elementId);
    }

    return articles;
  }


  function createNavbarList(navbarContents, elementId, filteredArticles) {
    let content = document.getElementById(elementId);
    if (!content) return;
    if (!content.dataset.cleared) {
      content.innerHTML = "";
      content.dataset.cleared = "true"; // mark this container as cleared
    }

    const mobileContent = document.querySelector("header #navbar-mobile");
    mobileContent.innerHTML = "";
    navbarContents.forEach(navbarContent => {

      ////MOBILE SECTION
      let menuOptionContainer = document.createElement("div");
      menuOptionContainer.classList.add("navbar-mobile__menu-option");
      mobileContent.appendChild(menuOptionContainer);
      let menuOptionA = document.createElement("a");
      menuOptionA.textContent = navbarContent.option;
      menuOptionA.href = "#";

      menuOptionA.setAttribute("aria-label", `Open ${navbarContent.option} menu`);
      menuOptionA.setAttribute("title", navbarContent.option);
      menuOptionContainer.appendChild(menuOptionA);

      let mobileSubContainer = document.createElement("div");
      mobileSubContainer.classList.add("navbar-mobile__submenu-container");
      mobileContent.appendChild(mobileSubContainer);

      let mobileSubTitleContainer = document.createElement("div");
      mobileSubTitleContainer.classList.add("navbar-mobile__submenu-title-container");
      let mobileSubContent = document.createElement("div");
      mobileSubContent.classList.add("navbar-mobile__submenu-content");
      mobileSubContainer.appendChild(mobileSubTitleContainer);
      mobileSubContainer.appendChild(mobileSubContent);

      let mobileTitleDesignBoxL = document.createElement("div");
      mobileTitleDesignBoxL.classList.add("navbar-mobile__submenu-title-box", "navbar-mobile__submenu-title-box--left");
      let mobileTitleDesignBoxR = document.createElement("div");
      mobileTitleDesignBoxR.classList.add("navbar-mobile__submenu-title-box", "navbar-mobile__submenu-title-box--right");
      let mobileTitleContent = document.createElement("div");
      mobileTitleContent.classList.add("navbar-mobile__submenu-title-content");
      let mobileTitleH2 = document.createElement("h2");
      mobileTitleH2.textContent = navbarContent.option;

      mobileSubTitleContainer.appendChild(mobileTitleDesignBoxL);
      mobileSubTitleContainer.appendChild(mobileTitleContent);
      mobileSubTitleContainer.appendChild(mobileTitleDesignBoxR);
      mobileTitleContent.appendChild(mobileTitleH2);


      ////////////
      ////DESKTOP SECTION

      let navbarOptionText = navbarContent.option;

      let navbarOptionContainer = document.createElement("li");
      navbarOptionContainer.classList.add("navbar__option");

      let navbarOptionLink = document.createElement("a");
      navbarOptionLink.classList.add("navbar__option-link");
      navbarOptionLink.textContent = navbarOptionText;
      navbarOptionLink.href = "product.html";
      navbarOptionLink.setAttribute("aria-label", `${navbarOptionText} category`);
      navbarOptionLink.setAttribute("title", navbarOptionText);

      if (navbarContent.option === "Home") {
        menuOptionA.href = "home.html";
        navbarOptionLink.href = "home.html";
      }

      navbarOptionContainer.appendChild(navbarOptionLink);

      let submenuContainer = document.createElement("li");
      submenuContainer.classList.add("submenu");

      content.appendChild(navbarOptionContainer);
      content.appendChild(submenuContainer);

      let submenuElement = submenuContainer;
      submenuElement.classList.add(navbarOptionText);

      navbarContent.sections.forEach(section => {

        ////MOBILE SECTION
        let mobileSubSectionContainer = document.createElement("section");
        mobileSubSectionContainer.classList.add("navbar-mobile__submenu-sections", "navbar-mobile__submenu-section-container");
        mobileSubContent.appendChild(mobileSubSectionContainer);

        let mobileSubSectionTitleH2 = document.createElement("h2");
        mobileSubSectionTitleH2.textContent = section.sectionName;
        mobileSubSectionContainer.appendChild(mobileSubSectionTitleH2);
        /////////////////////
        ////DESKTOP SECTION

        const sectionElement = document.createElement("div");
        sectionElement.classList.add("submenu__section");
        submenuElement.appendChild(sectionElement);

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = section.sectionName;
        sectionElement.appendChild(sectionTitle);

        if (section.listItems && Array.isArray(section.listItems)) {

          let mobileSubUl = document.createElement("ul");
          mobileSubUl.classList.add("navbar-mobile__submenu-section-text-container");
          mobileSubSectionContainer.appendChild(mobileSubUl);

          ///////////
          ////DESKTOP SECTION
          const ul = document.createElement("ul");
          sectionElement.appendChild(ul);

          section.listItems.forEach(listItem => {

            ////MOBILE SECTION
            let mobileSubTextLi = document.createElement("li");
            mobileSubTextLi.classList.add("navbar-mobile__submenu-section-text");
            let mobileSubTextA = document.createElement("a");
            mobileSubTextA.textContent = listItem;
            mobileSubTextA.href = "#";
            mobileSubTextA.setAttribute("aria-label", listItem);
            mobileSubTextA.setAttribute("title", listItem);

            mobileSubUl.appendChild(mobileSubTextLi);
            mobileSubTextLi.appendChild(mobileSubTextA);


            //////////////
            ////DESKTOP SECTION
            const liItem = document.createElement("li");
            const aItem = document.createElement("a");
            let selectedArticle = [];
            aItem.textContent = listItem;
            aItem.setAttribute("aria-label", listItem);
            aItem.setAttribute("title", listItem);

            switch (navbarContent.option) {
              case "Rings":
                selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "rings");
                break;
              case "Necklaces":
                selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "necklaces");
                break;
              case "Earrings":
                selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "earrings");
                break;
              case "Bracelets":
                selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "bracelets");
                break;
              case "Watches":
                selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "watches");
                break;
              case "Collections":
                selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "rings");
                break;
            }
            mobileSubTextA.addEventListener("click", () => {
              localStorage.setItem("selectedArticles", selectedArticle[0].id); //selectedArticle is still an array
              window.location.href = "product.html";
            });
            aItem.addEventListener("click", () => {
              localStorage.setItem("selectedArticles", selectedArticle[0].id); //selectedArticle is still an array
              window.location.href = "product.html";
            });
            navbarOptionLink.addEventListener("click", () => {
              localStorage.setItem("selectedArticles", selectedArticle[0].id); //selectedArticle is still an array
              window.location.href = "product.html";
            });

            aItem.href = "#";
            liItem.appendChild(aItem);
            ul.appendChild(liItem);
          });
        } else if (typeof section.listItems === "string" && section.listItems !== "none") {

          ////MOBILE SECTION
          const mobileP = document.createElement("p");
          mobileP.textContent = section.listItems;
          mobileSubSectionContainer.appendChild(mobileP);


          ////DESKTOP SECTION
          const p = document.createElement("p");
          p.textContent = section.listItems;
          sectionElement.appendChild(p);
        } else if (section.image) {

          ////MOBILE SECTION
          let mobileSubSectionImageContainer = document.createElement("a");
          mobileSubSectionImageContainer.classList.add("navbar-mobile__submenu-image-container")
          mobileSubSectionImageContainer.href = "product.html"
          let mobileSubSectionImage = document.createElement("img");
          mobileSubSectionImage.src = section.image;
          mobileSubSectionImage.alt = `Image for ${navbarContent.option} - ${section.sectionName}`;
          mobileSubSectionImage.loading = "lazy";
          mobileSubSectionImage.decoding = "async";
          setImgDimensions(mobileSubSectionImage, 480, 320);

          mobileSubSectionContainer.appendChild(mobileSubSectionImageContainer);
          mobileSubSectionImageContainer.appendChild(mobileSubSectionImage);


          ////////////
          /////DESKTOP SECTION
          const imgA = document.createElement("a");
          imgA.classList.add("submenu__section-image-container");
          imgA.href = section.sectionLink;

          switch (navbarContent.option) {
            case "Rings":
              selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "rings");
              break;
            case "Necklaces":
              selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "necklaces");
              break;
            case "Earrings":
              selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "earrings");
              break;
            case "Bracelets":
              selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "bracelets");
              break;
            case "Watches":
              selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "watches");
              break;
            case "Collections":
              selectedArticle = filteredArticles.filter(filteredArticle => filteredArticle.category === "rings");
              break;
          }
          imgA.addEventListener("click", (e) => {
            localStorage.setItem("selectedArticles", selectedArticle[0].id);
            window.location.href = "product.html";
          });
          mobileSubSectionImageContainer.addEventListener("click", (e) => {
            localStorage.setItem("selectedArticles", selectedArticle[0].id);
            window.location.href = "product.html";
          });

          const img = document.createElement("img");
          img.classList.add("submenu__section-image");
          img.src = section.image;
          img.alt = "image of " + navbarContent.option
          img.loading = "lazy";
          img.decoding = "async";
          setImgDimensions(img, 480, 320);

          sectionElement.appendChild(imgA);
          imgA.appendChild(img);
          sectionElement.classList.add("submenu__section--image");
        }
      });

    });

  }

  function createPromoBanner(promoBannerContent, elementId) {
    let content = document.getElementById(elementId);
    if (!content) return;
    if (!content.dataset.cleared) {
      content.innerHTML = "";
      content.dataset.cleared = "true"; // mark this container as cleared
    }

    promoBannerContent.forEach(banner => {
      //Text
      let textCont = document.createElement("div"); textCont.classList.add("promo-banner__text-content");
      let title = document.createElement("div"); title.classList.add("promo-banner__title");
      let h1 = document.createElement("h2");
      h1.textContent = banner.title;

      content.parentElement.insertAdjacentElement("beforebegin", textCont);
      textCont.appendChild(title);
      title.appendChild(h1);

      //Image (container is now the anchor)
      let imageCont = document.createElement("a"); imageCont.classList.add("promo-banner__image-content");
      imageCont.href = "product.html";
      imageCont.setAttribute("aria-label", `View product: ${banner.title}`);
      imageCont.setAttribute("title", `View ${banner.title}`);

      let image = document.createElement("img"); image.classList.add("promo-banner__image");
      image.src = banner.image;
      image.alt = "image of " + banner.title;
      image.loading = "lazy";
      image.decoding = "async";
      setImgDimensions(image, 1600, 900);

      content.appendChild(imageCont);
      imageCont.appendChild(image);

      imageCont.addEventListener("click", () => {
        localStorage.setItem("selectedArticles", banner.assignedArticleId);
        window.location.href = "product.html";
      });

    });
  }

  function createPosters(articles, elementId) {
    let content = document.getElementById(elementId);
    if (!content) return;
    if (!content.dataset.cleared) {
      content.innerHTML = "";
      content.dataset.cleared = "true"; // mark this container as cleared
    }

    articles.forEach(article => {

      // MOBILE: container is now the anchor (removes inner anchor)
      let compMobileContainer = document.createElement("a");
      compMobileContainer.classList.add("poster__comp-mobile-container");
      compMobileContainer.href = "product.html";
      compMobileContainer.setAttribute("aria-label", `View product: ${article.title}`);
      compMobileContainer.setAttribute("title", `View ${article.title}`);
      compMobileContainer.addEventListener("click", (e) => {
        localStorage.setItem("selectedArticles", article.id);
        window.location.href = "product.html";
      });

      let compMobileContent = document.createElement("div");
      compMobileContent.classList.add("poster__comp-mobile-content");
      let compTextCell = document.createElement("div");
      compTextCell.classList.add("poster__comp-mobile-text");
      let compImageCell = document.createElement("div");
      compImageCell.classList.add("poster__comp-mobile-image");

      content.parentElement.insertAdjacentElement("beforebegin", compMobileContainer);

      compMobileContainer.appendChild(compMobileContent);

      //Text (DESKTOP text cell becomes anchor)
      let textCell = document.createElement("a"); textCell.classList.add("poster__text-cell");
      textCell.href = "product.html";
      textCell.setAttribute("aria-label", `View product: ${article.title}`);
      textCell.setAttribute("title", `View ${article.title}`);
      textCell.addEventListener("click", (e) => {
        localStorage.setItem("selectedArticles", article.id);
        window.location.href = "product.html";
      });

      let textLayout = document.createElement("div"); textLayout.classList.add("poster__text-layout");
      let textContent = document.createElement("div"); textContent.classList.add("poster__text-content");
      let h1 = document.createElement("h2");
      let p = document.createElement("p");
      h1.textContent = article.title;
      p.textContent = article.description;

      //Image (wrap image in an anchor instead of separate overlay anchors)
      let posterImageLink = document.createElement("a");
      posterImageLink.href = "product.html";
      posterImageLink.setAttribute("aria-label", `View product: ${article.title}`);
      posterImageLink.setAttribute("title", `View ${article.title}`);
      posterImageLink.addEventListener("click", (e) => {
        localStorage.setItem("selectedArticles", article.id);
        window.location.href = "product.html";
      });

      let posterImage = document.createElement("img"); posterImage.classList.add("poster__image");
      posterImage.src = article.posterImage;
      posterImage.alt = "image of " + article.title;
      posterImage.loading = "lazy";
      posterImage.decoding = "async";
      setImgDimensions(posterImage, 1600, 900);
      posterImageLink.appendChild(posterImage);

      if (article.imageOrientation === "left") {
        content.appendChild(posterImageLink);

        content.appendChild(textCell);

        textCell.appendChild(textLayout);
        textCell.appendChild(textContent);
        textContent.appendChild(h1);
        textContent.appendChild(p);

        compMobileContent.appendChild(compTextCell);
        compMobileContent.appendChild(compImageCell);

      } else if (article.imageOrientation === "right") {
        content.appendChild(textCell);

        textCell.appendChild(textLayout);
        textCell.appendChild(textContent);
        textContent.appendChild(h1);
        textContent.appendChild(p);

        content.appendChild(posterImageLink);

        compMobileContent.appendChild(compImageCell);
        compMobileContent.appendChild(compTextCell);
      }

      let compH2 = document.createElement("h2");
      compH2.textContent = article.title;
      let compP = document.createElement("p");
      compP.textContent = article.description;
      let compImage = document.createElement("img");
      compImage.src = article.image;
      compImage.alt = `Image of ${article.title}`;
      compImage.loading = "lazy";
      compImage.decoding = "async";
      setImgDimensions(compImage, 900, 900);

      compTextCell.appendChild(compH2);
      compTextCell.appendChild(compP);

      compImageCell.appendChild(compImage);

    });

  }

  function createReel(articles, elementId) {
    let content = document.getElementById(elementId);
    if (!content) return;
    if (!content.dataset.cleared) {
      content.innerHTML = "";
      content.dataset.cleared = "true"; // mark this container as cleared
    }

    //Title
    let selectionEl = content.parentElement;
    if (!selectionEl.classList.contains("reel-promo__container--selection")) {
      let titleContent = document.createElement("div"); titleContent.classList.add("reel-promo__title-content");
      let titleH1 = document.createElement("h2");
      content.appendChild(titleContent);
      let currentReel = reelContent.find(rCont => rCont.id === elementId);
      if (currentReel) {
        titleH1.textContent = currentReel.overheadTitle;
      }

      titleContent.appendChild(titleH1);
    }

    //Articles
    let articleMask = document.createElement("div"); articleMask.classList.add("reel-promo__article-mask");
    content.appendChild(articleMask);

    // ✅ Side frame margin that is INCLUDED in sizing calculations
    // (viewport becomes narrower, so items/gaps remain consistent inside the frame)
    const sideMargin = "var(--reel-side-margin, 1.2rem)";
    articleMask.style.marginLeft = sideMargin;
    articleMask.style.marginRight = sideMargin;
    articleMask.style.width = `calc(100% - (2 * ${sideMargin}))`;
    articleMask.style.maxWidth = `calc(100% - (2 * ${sideMargin}))`;
    articleMask.style.boxSizing = "border-box";

    articles.forEach(article => {
      // ✅ Turn the container into an anchor tag (and remove the inner anchor)
      let articleContainer = document.createElement("a"); articleContainer.classList.add("reel-promo__article-container");
      articleContainer.href = "product.html";
      articleContainer.setAttribute("aria-label", `View product: ${article.title}`);
      articleContainer.setAttribute("title", `View ${article.title}`);

      if (selectionEl.classList.contains("reel-promo__container--selection")) {
        articleContainer.classList.add("reel-promo__article-container--selection");
      }

      let articleContent = document.createElement("div"); articleContent.classList.add("reel-promo__article-content");

      articleMask.appendChild(articleContainer);
      articleContainer.appendChild(articleContent);

      articleContainer.addEventListener("click", (e) => {
        localStorage.setItem("selectedArticles", article.id);
        window.location.href = "product.html";
      });

      let imageCell = document.createElement("div"); imageCell.classList.add("reel-promo__image-cell");
      let textCell = document.createElement("div"); textCell.classList.add("reel-promo__text-cell");
      articleContent.appendChild(imageCell);
      articleContent.appendChild(textCell);

      let imageContent = document.createElement("div"); imageContent.classList.add("reel-promo__image-content");
      imageContent.style.backgroundImage = `url(${article.image})`;
      imageContent.style.backgroundSize = article.imageSize;
      imageContent.style.backgroundPosition = article.imagePosition;
      imageContent.setAttribute("role", "img");
      imageContent.setAttribute("aria-label", `Image of ${article.title}`);

      let textLayout = document.createElement("div"); textLayout.classList.add("reel-promo__text-layout");
      let text = document.createElement("div"); text.classList.add("reel-promo__text-content");
      let textH1 = document.createElement("h2");
      let textP = document.createElement("p");
      textH1.textContent = article.title;
      textP.textContent = article.description;

      imageCell.appendChild(imageContent);
      textCell.appendChild(textLayout);
      textCell.appendChild(text);
      text.appendChild(textH1);
      text.appendChild(textP);
    });

    //Navigation
    let naviContainer = document.createElement("div"); naviContainer.classList.add("reel-promo__navi-container");
    let naviContent = document.createElement("div"); naviContent.classList.add("reel-promo__navi-content");
    //left and right buttons are created in reel.js

    content.appendChild(naviContainer);
    naviContainer.appendChild(naviContent);
  }

  function createSlideshow(articles, elementId) {
    let content = document.getElementById(elementId)
    if (!content) return;

    if (!content.dataset.cleared) {
      content.innerHTML = "";
      content.dataset.cleared = "true"; // mark this container as cleared
    }

    articles.forEach(article => {
      // image container is now the anchor (removes inner hyperlink)
      let slideshowImageContainer = document.createElement("a");
      slideshowImageContainer.classList.add("poster-slideshow__image-link");
      slideshowImageContainer.href = "product.html";

      content.appendChild(slideshowImageContainer);

      let slideshowImage = document.createElement("img");
      slideshowImage.classList.add("poster-slideshow__image");
      slideshowImage.src = article.image;
      slideshowImage.setAttribute("aria-label", `View product: ${article.title}`);
      slideshowImage.setAttribute("title", `View ${article.title}`);
      slideshowImage.setAttribute("role", "img");
      slideshowImage.setAttribute("aria-label", `Image of ${article.title}`);

      slideshowImageContainer.appendChild(slideshowImage);
      
      slideshowImageContainer.addEventListener("click", (e) => {
        localStorage.setItem("selectedArticles", article.id);
        window.location.href = "product.html";
      });

      // text container is now the anchor (removes inner textHyper)
      let textContainer = document.createElement("a");
      textContainer.classList.add("poster-slideshow__text-container");
      textContainer.href = "product.html";
      textContainer.setAttribute("aria-label", `View product: ${article.title}`);
      textContainer.setAttribute("title", `View ${article.title}`);
      textContainer.addEventListener("click", (e) => {
        localStorage.setItem("selectedArticles", article.id);
        window.location.href = "product.html";
      });

      let title1 = document.createElement("h2");
      let descrip1 = document.createElement("p");

      title1.textContent = article.title;
      descrip1.textContent = article.description;

      content.appendChild(textContainer);
      textContainer.appendChild(title1);
      textContainer.appendChild(descrip1);
    });

    let slideshowLayout = document.createElement("div");
    slideshowLayout.classList.add("poster-slideshow__layout");
    content.appendChild(slideshowLayout);

    const slideshow = document.querySelector(".poster-slideshow__image-container");
    const images = Array.from(slideshow.querySelectorAll(".poster-slideshow__image"));
    const texts = Array.from(slideshow.querySelectorAll(".poster-slideshow__text-container"));

    let currentIndex = 0;
    const interval = 3 * 1000; //interval in seconds

    //Function to show next image
    function showNextImage() {
      // remove "active" from the current image and give it exit animation
      images[currentIndex].classList.remove("active");
      texts[currentIndex].classList.remove("active");
      images[currentIndex].classList.add("exit");

      // force browser to notice
      images[currentIndex].offsetWidth; // reading this triggers reflow
      // listen for the animation finishing so we can reset it
      images[currentIndex].addEventListener("transitionend", function handler() {
        this.classList.remove("exit"); // clean up
        this.removeEventListener("transitionend", handler); // prevent stacking
      }, { once: true });

      // move to next index (wrap around with modulo)
      currentIndex = (currentIndex + 1) % images.length;

      // add "active" to the new image
      texts[currentIndex].classList.add("active");
      images[currentIndex].classList.add("active");

    }

    let lastTime = 0;

    function animateSlideshow(time) {
      if (!lastTime) lastTime = time;
      if (time - lastTime >= interval) {
        showNextImage();
        lastTime = time;
      }
      requestAnimationFrame(animateSlideshow);
    }

    requestAnimationFrame(animateSlideshow);
    texts[currentIndex].classList.add("active");
    images[currentIndex].classList.add("active");
  }

  function renderProductPage(checkoutContent, elementId, assignedArticleId) {
    // Reference to the checkout container
    let container = document.getElementById(elementId);
    if (!container) return;

    if (!container.dataset.cleared) {
      container.innerHTML = "";
      container.dataset.cleared = "true"; // mark this container as cleared
    }

    let assignedArticle = articles.find(article => article.id === assignedArticleId);


    // LEFT SIDE
    const leftContainer = document.createElement("div");
    leftContainer.className = "product-page__left-side-container";

    const leftContent = document.createElement("div");
    leftContent.className = "product-page__left-side-content";

    // Product images
    checkoutContent.forEach(checkCont => {
      assignedArticle.checkImages.forEach((image, i) => {
        const gridImage = document.createElement("img");
        gridImage.className = "product-page__grid-item";
        gridImage.style.gridArea = i === 0 ? "main" : "secondary";
        gridImage.src = image;
        gridImage.alt = "Product Image of: " + assignedArticle.title;
        gridImage.loading = i === 0 ? "eager" : "lazy";
        gridImage.decoding = "async";
        setImgDimensions(gridImage, 1200, 1200);

        leftContent.appendChild(gridImage);
      });



      // Video
      const videoDiv = document.createElement("div");
      videoDiv.className = "product-page__grid-item";
      videoDiv.style.gridArea = "video";

      const videoEl = document.createElement("video");
      videoEl.className = "product-page__grid-item-video";
      videoEl.controls = true;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.preload = "metadata";
      videoEl.setAttribute("aria-label", `Product video for ${assignedArticle.title}`);
      videoEl.setAttribute("title", `Product video: ${assignedArticle.title}`);
      videoEl.setAttribute("controlslist", "nodownload");

      const sourceEl = document.createElement("source");
      sourceEl.src = assignedArticle.checkVideo;
      sourceEl.type = "video/mp4";

      videoEl.appendChild(sourceEl);
      videoDiv.appendChild(videoEl);
      leftContent.appendChild(videoDiv);

      leftContainer.appendChild(leftContent);
      container.appendChild(leftContainer);

      // RIGHT SIDE
      const rightContainer = document.createElement("div");
      rightContainer.className = "product-page__right-side-container";

      const rightContent = document.createElement("div");
      rightContent.className = "product-page__right-side-content";

      // Title & Price
      const titlePrice = document.createElement("div");
      titlePrice.className = "product-page__titleandprice-container";

      const titleDivContainer = document.createElement("div");
      titleDivContainer.classList.add("product-page__flex-item-title-container");

      const titleDiv = document.createElement("div");
      titleDiv.className = "product-page__flex-item product-page__flex-item-title";
      const titleH1 = document.createElement("h2");
      titleH1.textContent = assignedArticle.title;
      titleDiv.appendChild(titleH1);


      if (window.matchMedia("(max-width: 480px)").matches) {
        titleDivContainer.appendChild(titleDiv);
        container.parentElement.parentNode.insertBefore(titleDivContainer, container.parentElement);
      } else {
        titlePrice.appendChild(titleDiv);
      }

      const priceDiv = document.createElement("div");
      priceDiv.className = "product-page__flex-item product-page__flex-item-price";
      const priceH1 = document.createElement("h2");
      priceH1.textContent = assignedArticle.price;
      priceDiv.appendChild(priceH1);




      titlePrice.appendChild(priceDiv);
      rightContent.appendChild(titlePrice);

      // Purchase Buttons
      const purchaseSection = document.createElement("div");
      purchaseSection.className = "product-page__purchase-section";

      const addToBagCont = document.createElement("div");
      addToBagCont.className = "product-page__addtobag-container";

      let addToBagBtn = document.createElement("button");
      addToBagBtn.classList.add("product-page__checkout-buttons", "product-page__addtobag-button");
      addToBagBtn.type = "button";
      addToBagBtn.setAttribute("aria-label", `Add ${assignedArticle.title} to bag`);
      addToBagBtn.setAttribute("title", "Add to bag");
      addToBagBtn.textContent = "Add to bag";

      addToBagCont.appendChild(addToBagBtn);

      addToBagBtn.addEventListener("click", () => {
        let articlesBag = JSON.parse(localStorage.getItem("shoppingBag")) || [];
        articlesBag.push(assignedArticleId);
        localStorage.setItem("shoppingBag", JSON.stringify(articlesBag));
        let articlesInBag = JSON.parse(localStorage.getItem("shoppingBag")) || [];

        renderShoppingBag(articles, articlesInBag)



      });


      const CheckNowCont = document.createElement("div");
      CheckNowCont.className = "product-page__checkout-container";
      const CheckNowBtn = document.createElement("button");
      CheckNowBtn.classList.add("product-page__checkout-buttons", "product-page__checkout-button", "green");
      CheckNowBtn.type = "button";
      CheckNowBtn.textContent = "Checkout Now";
      CheckNowBtn.setAttribute("aria-label", `Checkout article ${assignedArticle.title}`);
      CheckNowBtn.setAttribute("title", "Checkout Now");


      const giftAndFavCont = document.createElement("div");
      giftAndFavCont.className = "product-page__giftandfav-container";

      const giftBtn = document.createElement("button");
      giftBtn.className = "product-page__checkout-buttons product-page__giftandfav-gift";
      giftBtn.type = "button";
      giftBtn.textContent = "Send as Gift 📧";

      const favBtn = document.createElement("button");
      favBtn.className = "product-page__checkout-buttons product-page__giftandfav-fav";
      favBtn.type = "button";
      favBtn.textContent = "Add to Favorites ❤️";

      giftAndFavCont.appendChild(giftBtn);
      giftAndFavCont.appendChild(favBtn);
      purchaseSection.appendChild(addToBagBtn);
      purchaseSection.appendChild(CheckNowBtn);
      purchaseSection.appendChild(giftAndFavCont);
      rightContent.appendChild(purchaseSection);


      // Promo Section
      let promoA = document.createElement("a");
      promoA.className = "product-page__flex-item product-page__flex-item-promo";
      promoA.href = "product.html";
      promoA.addEventListener("click", (e) => {
        localStorage.setItem("selectedArticles", checkCont.promoArticleId);
        window.location.href = "product.html";
      });

      let promoLeft = document.createElement("div");
      promoLeft.className = "product-page__promo product-page__promo-left";
      let promoTitle = document.createElement("h2");
      promoTitle.textContent = checkCont.promoTitle;
      let promoDesc = document.createElement("p");
      promoDesc.textContent = checkCont.promoDescription;
      promoLeft.appendChild(promoTitle);
      promoLeft.appendChild(promoDesc);

      let promoRight = document.createElement("figure");
      promoRight.className = "product-page__promo product-page__promo-right";
      let promoImg = document.createElement("img");
      promoImg.className = "product-page__promo product-page__promo-image";
      promoImg.src = "media/earrings-special2.PNG";
      promoImg.alt = "Image of Red Earrings"
      promoImg.loading = "lazy";
      promoImg.decoding = "async";
      setImgDimensions(promoImg, 800, 800);

      promoRight.appendChild(promoImg);

      promoA.appendChild(promoLeft);
      promoA.appendChild(promoRight);
      rightContent.appendChild(promoA);

      // Horizontal separator helper
      const createHr = () => {
        const hr = document.createElement("hr");
        hr.className = "horizontal-separator";
        hr.style.width = "100%";
        hr.style.height = "1px";
        hr.style.background = "rgb(83,83,83)";
        hr.style.border = "1px solid rgb(83,83,83)";
        hr.style.borderRadius = "100%";

        return hr;
      };

      rightContent.appendChild(createHr());
      let hr = rightContent.querySelector("horizontal-separator");
      if (hr) {
        hr.style.marginTop = "2%";
      }

      const shippingPanelId = `${elementId}-shipping-panel`;
      const detailsPanelId = `${elementId}-details-panel`;
      const paymentPanelId = `${elementId}-payment-panel`;

      // Shipping
      const shippingDiv = document.createElement("div");
      shippingDiv.className = "product-page__flex-item product-page__flex-item-shipping";
      shippingDiv.innerHTML = `
    <button type="button" class="collapsible-btn" aria-expanded="false" aria-controls="${shippingPanelId}">Free Shipping & Returns</button>
    <div class="collapsible-content" id="${shippingPanelId}">
      <p>Enjoy a seamless shopping experience with our complimentary shipping service. Every order is carefully packed and delivered to your door with priority handling. If it’s not a perfect match, returns are simple and free of charge.</p>
      <ul>
        ${checkCont.productDescriptionList.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
      rightContent.appendChild(shippingDiv);
      rightContent.appendChild(createHr());

      // Details
      let detailsDiv = document.createElement("div");
      detailsDiv.className = "product-page__flex-item product-page__flex-item-details";
      detailsDiv.innerHTML = `
    <button type="button" class="collapsible-btn" aria-expanded="false" aria-controls="${detailsPanelId}">Details</button>
    <div class="collapsible-content" id="${detailsPanelId}">
      <p>${assignedArticle.description}</p>
      <ul>
        <li>Hand-polished red crystal centerpiece</li>
        <li>Premium hypoallergenic metal finish</li>
        <li>Lightweight yet durable for daily wear</li>
        <li>Designed in limited quantities</li>
      </ul>
    </div>
  `;
      rightContent.appendChild(detailsDiv);
      rightContent.appendChild(createHr());

      // Payment Options
      let paymentDiv = document.createElement("div");
      paymentDiv.className = "product-page__flex-item product-page__flex-item-payment-options";
      paymentDiv.innerHTML = `
    <button type="button" class="collapsible-btn" aria-expanded="false" aria-controls="${paymentPanelId}">Payment Options</button>
    <div class="collapsible-content" id="${paymentPanelId}">
      <p>We’ve made checkout simple, flexible, and secure. Choose the method that fits your lifestyle and complete your purchase with confidence.</p>
      <ul>
        <li>Secure credit & debit card payments</li>
        <li>PayPal and trusted digital wallets</li>
        <li>Flexible installment plans available</li>
        <li>Encrypted transactions for full protection</li>
      </ul>
    </div>
  `;
      rightContent.appendChild(paymentDiv);

      rightContainer.appendChild(rightContent);
      container.appendChild(rightContainer);

      document.querySelectorAll(".collapsible-btn").forEach(button => {
        button.addEventListener("click", () => {
          const content = button.nextElementSibling;
          const allButtons = document.querySelectorAll(".collapsible-btn");
          const allContents = document.querySelectorAll(".collapsible-content");

          // First, close all panels
          allContents.forEach((c, i) => {
            if (c !== content) {
              c.style.maxHeight = null;
            }
          });

          // Keep aria-expanded in sync
          allButtons.forEach(b => {
            if (b !== button) b.setAttribute("aria-expanded", "false");
          });

          // Then toggle the clicked one
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
            button.setAttribute("aria-expanded", "false");
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
            button.setAttribute("aria-expanded", "true");
          }
        });
      });

      const hamburgerButton = document.querySelector(".hamburger-button__container");
      const closeButton = document.querySelector(".hamburger-button__container--close");

      if (hamburgerButton) hamburgerButton.setAttribute("aria-expanded", "false");
      if (closeButton) closeButton.setAttribute("aria-expanded", "false");
    });
  }



  function renderShoppingBag(articles, shoppingArticleIds) {
    const contents = document.querySelectorAll(`[data-type="${dataTypes[6]}"]`);

    contents.forEach(content => {
      if (!content) return;

      content.innerHTML = "";

      // Filter valid articles (only those that exist)
      const shoppingArticles = articles.filter(article =>
        shoppingArticleIds.includes(article.id)
      );

      // 🧹 Remove invalid IDs from localStorage (nonexistent articles)
      const validIds = shoppingArticles.map(a => a.id);
      const cleanedIds = shoppingArticleIds.filter(id => validIds.includes(id));
      localStorage.setItem("shoppingBag", JSON.stringify(cleanedIds));

      // Combine duplicates (count quantities)
      const duplicateArticles = [];
      const totalArticlePrices = [];

      shoppingArticleIds.forEach(shoppingArticleId => {
        let check = duplicateArticles.find(article => article.id === shoppingArticleId);
        if (check) {
          let shoppingArticle = check;
          shoppingArticle.quantity += 1;
        } else {
          let getDuplicateArticles = articles.find(article => article.id === shoppingArticleId);
          if (getDuplicateArticles) duplicateArticles.push({ ...getDuplicateArticles, quantity: 1 });
        }
      });

      let shoppingCounters = document.querySelectorAll(".quick-menu__shopping-cart-counter");
      shoppingCounters.forEach(shoppingCounter => {
        if (shoppingArticleIds.length > 0) {
          shoppingCounter.classList.add("active");
        } else {
          shoppingCounter.classList.remove("active");
        }
      });

      let shoppingCounterTexts = document.querySelectorAll(".quick-menu__shopping-cart-counter-text p");
      shoppingCounterTexts.forEach(shoppingCounterText => {
        shoppingCounterText.innerHTML = "";
        shoppingCounterText.textContent = shoppingArticleIds.length;
      });

      duplicateArticles.forEach(shoppingArticle => {
        const productContainer = document.createElement("article");
        productContainer.classList.add("shopping-cart__product-item");
        productContainer.dataset.article = shoppingArticle.id;
        content.appendChild(productContainer);

        const productImage = document.createElement("div");
        productImage.classList.add("shopping-cart__product-image");
        productImage.style.backgroundImage = `url(${shoppingArticle.image})`;
        productImage.style.backgroundSize = shoppingArticle.imageSize;
        productImage.style.backgroundPosition = shoppingArticle.imagePosition;
        productImage.setAttribute("role", "img");
        productImage.setAttribute("aria-label", `Image of ${shoppingArticle.title}`);
        productContainer.appendChild(productImage);

        const textContainer = document.createElement("div"); textContainer.classList.add("shopping-cart__product-text-container");
        productContainer.appendChild(textContainer)

        const productDetailsTitle = document.createElement("div");
        productDetailsTitle.classList.add("shopping-cart__product-title");
        const title = document.createElement("h2");
        title.textContent = shoppingArticle.title;
        textContainer.appendChild(productDetailsTitle);
        productDetailsTitle.appendChild(title);

        const quantityContainer = document.createElement("div"); quantityContainer.classList.add("shopping-cart__quantity-container");
        textContainer.appendChild(quantityContainer);

        const productDetailsQuantity = document.createElement("div");
        productDetailsQuantity.classList.add("shopping-cart__product-quantity");
        const textQuantity = document.createElement("p");
        textQuantity.textContent = `Qty: `;
        quantityContainer.appendChild(productDetailsQuantity);
        productDetailsQuantity.appendChild(textQuantity);

        const quantityNavigator = document.createElement("div"); quantityNavigator.classList.add("shopping-cart__product-quantity-navigator");
        quantityContainer.appendChild(quantityNavigator);

        const quantityPlusContainer = document.createElement("div"); quantityPlusContainer.classList.add("shopping-cart__product-quantity-button-container");
        const quantityMinusContainer = document.createElement("div"); quantityMinusContainer.classList.add("shopping-cart__product-quantity-button-container");
        const quantityNumberContainer = document.createElement("div"); quantityNumberContainer.classList.add("shopping-cart__product-quantity-number-container")

        quantityPlusContainer.setAttribute("role", "button");
        quantityPlusContainer.setAttribute("tabindex", "0");
        quantityPlusContainer.setAttribute("aria-label", `Increase quantity of ${shoppingArticle.title}`);
        quantityPlusContainer.setAttribute("title", "Increase quantity");

        quantityMinusContainer.setAttribute("role", "button");
        quantityMinusContainer.setAttribute("tabindex", "0");
        quantityMinusContainer.setAttribute("aria-label", `Decrease quantity of ${shoppingArticle.title}`);
        quantityMinusContainer.setAttribute("title", "Decrease quantity");

        quantityNavigator.appendChild(quantityPlusContainer);
        quantityNavigator.appendChild(quantityNumberContainer);
        quantityNavigator.appendChild(quantityMinusContainer);

        const quantityPlus = document.createElement("div"); quantityPlus.classList.add("shopping-cart__product-quantity-button", "shopping-cart__product-quantity-button--plus");
        const quantityMinus = document.createElement("div"); quantityMinus.classList.add("shopping-cart__product-quantity-button", "shopping-cart__product-quantity-button--minus");
        const quantityNumber = document.createElement("p"); quantityNumber.classList.add("shopping-cart__product-quantity-number");
        quantityNumber.textContent = shoppingArticle.quantity;

        quantityPlusContainer.appendChild(quantityPlus);
        quantityNumberContainer.appendChild(quantityNumber);
        quantityMinusContainer.appendChild(quantityMinus);

        quantityPlus.parentElement.addEventListener("click", () => {
          let getArticleBag = JSON.parse(localStorage.getItem("shoppingBag"));
          getArticleBag.push(shoppingArticle.id);
          localStorage.setItem("shoppingBag", JSON.stringify(getArticleBag));
          renderShoppingBag(articles, getArticleBag);
        });

        quantityMinus.parentElement.addEventListener("click", () => {
          let getArticleBag = JSON.parse(localStorage.getItem("shoppingBag"));
          // Remove only one occurrence
          const index = getArticleBag.lastIndexOf(shoppingArticle.id);
          if (index !== -1) {
            getArticleBag.splice(index, 1);
          }
          localStorage.setItem("shoppingBag", JSON.stringify(getArticleBag));
          renderShoppingBag(articles, getArticleBag);
        });

        const productDetailsPrice = document.createElement("div");
        productDetailsPrice.classList.add("shopping-cart__product-price");
        const textPrice = document.createElement("p");
        textPrice.textContent = shoppingArticle.price;

        textContainer.appendChild(productDetailsPrice);
        productDetailsPrice.appendChild(textPrice);

        let price = parseFloat(shoppingArticle.price.replace("€", "").trim());
        let quantity = Number(shoppingArticle.quantity);

        const trashButton = document.createElement("button");
        trashButton.classList.add("shopping-cart__product-remove-button");
        trashButton.type = "button";
        trashButton.setAttribute("aria-label", `Remove ${shoppingArticle.title} from cart`);
        trashButton.setAttribute("title", `Remove ${shoppingArticle.title}`);

        const removeCarpet = document.createElement("div"); removeCarpet.classList.add("shopping-cart__product-item-removal-confirmation");
        productContainer.appendChild(removeCarpet);
        const removeConfirmation = document.createElement("div"); removeConfirmation.classList.add("item-removal-confirmation__container");
        removeCarpet.appendChild(removeConfirmation);

        const removeText = document.createElement("h2");
        removeText.textContent = "Remove this item from your cart?";
        removeConfirmation.appendChild(removeText);

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm";
        confirmButton.type = "button";
        confirmButton.setAttribute("aria-label", `Confirm removal of ${shoppingArticle.title}`);
        confirmButton.setAttribute("title", "Confirm removal");

        confirmButton.addEventListener("click", () => {
          let getArticleBag = JSON.parse(localStorage.getItem("shoppingBag"));
          getArticleBag = getArticleBag.filter(id => id !== shoppingArticle.id);
          localStorage.setItem("shoppingBag", JSON.stringify(getArticleBag));
          renderShoppingBag(articles, getArticleBag);

        });

        removeConfirmation.appendChild(confirmButton);

        // Add SVG via innerHTML
        trashButton.innerHTML = `
<svg class="shopping-cart__trash-icon" xmlns="http://www.w3.org/2000/svg" overflow="visible" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">
  <title>Remove Product</title>
  <!-- Lid group for rotation -->
  <g class="lid">
    <path d="M3 6h18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" fill="white" stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <!-- Body -->
  <rect x="4" y="6.5" width="16" height="14" rx="2" ry="2" fill="white" stroke="black" stroke-width="1.6"/>
  <!-- Inner vertical lines -->
  <line x1="10" y1="10" x2="10" y2="17" stroke="black" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="14" y1="10" x2="14" y2="17" stroke="black" stroke-width="1.6" stroke-linecap="round"/>
</svg>
`;
        trashButton.addEventListener("click", () => {

          if (removeCarpet.classList.contains("active")) {
            removeText.classList.remove("active");
            confirmButton.classList.remove("active");
            removeCarpet.classList.remove("active");
          } else {
            function textTransition() {
              removeText.classList.add("active");
              confirmButton.classList.add("active");
              removeCarpet.removeEventListener("transitionend", textTransition);
            }
            removeCarpet.addEventListener("transitionend", textTransition);
            removeCarpet.classList.add("active");
          }

        });

        productContainer.appendChild(trashButton);

      });

      function parsePrice(str) {
        return parseFloat(String(str).replace(/[^0-9.,]/g, "").replace(",", "."));
      }
      const totalBagPrice = duplicateArticles.reduce((sum, item) => {
        const price = parsePrice(item.price);
        return sum + price * Number(item.quantity);
      }, 0);

      let totalPriceElements = document.querySelectorAll(".shopping-cart__product-total-price-value");

      totalPriceElements.forEach(totalPriceElement => {
        totalPriceElement.textContent = String(totalBagPrice) + "€";
      });

    });
  }

  if (!localStorage.getItem("shoppingBag")) {
    localStorage.setItem("shoppingBag", JSON.stringify([]));
  }
  if (!localStorage.getItem("selectedArticles")) {
    localStorage.setItem("selectedArticles", "");
  }
});
