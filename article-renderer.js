let dataTypes = ["navbar","poster","promo-banner","reel","slideshow","checkout"]


window.addEventListener("load", ()=> {
dataTypes.forEach(dataType => {
  let elements = document.querySelectorAll(`[data-type="${dataType}"]`);
  elements.forEach((element, index) => {
    switch(dataType)
    {
      case "navbar":
        element.id = `N${String(index).padStart(4, '0')}`;
        createNavbarList(navbarContent, element.id);
      break;
      case "poster":
        element.id = `P${String(index).padStart(4, '0')}`;
        let assignedArticles = JSON.parse(element.dataset.categories);
        let filteredArticles = articleSetup(articles, assignedArticles, true, element);
        filteredArticles.forEach(article => {
          article.imageOrientation = element.dataset.imageOrientation;
        });
        createPosters(filteredArticles, element.id);
        console.log(element.dataset.singleArticle);
        console.log(filteredArticles);
        
      break;
      case "promo-banner":
        element.id = `PB${String(index).padStart(4, '0')}`;
      break;
      case "reel":
        element.id = `R${String(index).padStart(4, '0')}`;
      break;
      case "slideshow":
        element.id = `S${String(index).padStart(4, '0')}`;
      break;
      case "checkout":
        element.id = `C${String(index).padStart(4, '0')}`;
      break;
    }
  });
});

function articleSetup(articles, assignedArticles, singleArticle, element) {
  if (singleArticle === true){
    return articles.filter(article => article.id === element.dataset.singleArticle);
  } else {
    return articles.filter(article => assignedArticles.includes(article.category));
  }
}



function createNavbarList(navbarContent,elementId) {
  let content = document.getElementById(elementId);
  if (!content) return;
      if (!content.dataset.cleared) {
      content.innerHTML = "";
      content.dataset.cleared = "true"; // mark this container as cleared
  }
  navbarContent.forEach(nav => {
    
    let navbarOption = nav.option;
    // Create option li and submenu li
    let li = document.createElement("li");
    li.classList.add("navbar__option");

    let a = document.createElement("a");
    a.classList.add("navbar__option-link");
    a.textContent = navbarOption;
    li.appendChild(a);

    let li2 = document.createElement("li");
    li2.classList.add("submenu");

    content.appendChild(li);
    content.appendChild(li2);

    // Use the newly created li2 as the submenu container
    let submenuElement = li2;
    submenuElement.classList.add(navbarOption);

    nav.sections.forEach(section => {
        const sectionElement = document.createElement("div");
        sectionElement.classList.add("submenu__section");
        submenuElement.appendChild(sectionElement);

        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = section.sectionName;
        sectionElement.appendChild(sectionTitle);

        if (section.listItems && Array.isArray(section.listItems)) {
            const ul = document.createElement("ul");
            sectionElement.appendChild(ul);

            section.listItems.forEach(listItem => {
                const liItem = document.createElement("li");
                const aItem = document.createElement("a");
                aItem.textContent = listItem;
                aItem.href = "#";
                liItem.appendChild(aItem);
                ul.appendChild(liItem);
            });
        } else if (typeof section.listItems === "string" && section.listItems !== "none") {
            const p = document.createElement("p");
            p.textContent = section.listItems;
            sectionElement.appendChild(p);
        } else if (section.image) {
            const imgCont = document.createElement("div");
            imgCont.classList.add("submenu__section-image-container");
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("submenu__section-image");
            imgDiv.style.backgroundImage = `url(${section.image})`;
            imgDiv.style.backgroundSize = section.imageSize;
            imgDiv.style.backgroundPosition = section.imagePosition;
            sectionElement.appendChild(imgCont);
            imgCont.appendChild(imgDiv);
            sectionElement.classList.add("submenu__section--image");
        }
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
    
    //Text
    let textCell = document.createElement("article"); textCell.classList.add("poster__text-cell");
    let textLayout = document.createElement("div"); textLayout.classList.add("poster__text-layout");
    let textContent = document.createElement("div"); textContent.classList.add("poster__text-content");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    h1.textContent = article.title;
    p.textContent = article.description;

    //Image
    let posterImage = document.createElement("article"); posterImage.classList.add("poster__image");
    posterImage.style.backgroundImage = `url(${article.image})`;
    posterImage.style.backgroundSize = article.imageSize;
    posterImage.style.backgroundPosition = article.imagePosition;

    if (article.imageOrientation === "left") {
      content.appendChild(posterImage);
      content.appendChild(textCell);
      textCell.appendChild(textLayout);
      textCell.appendChild(textContent);
      textContent.appendChild(h1);
      textContent.appendChild(p);

    } else if (article.imageOrientation === "right") {
      content.appendChild(textCell);
      textCell.appendChild(textLayout);
      textCell.appendChild(textContent);
      textContent.appendChild(h1);
      textContent.appendChild(p);
      content.appendChild(posterImage);
    }

  });
  
}

function createPromoBanner(article){
  let content = document.getElementById(article.id);
  if (!content) return;
  content.innerHTML ="";
  
  article.content.sections.forEach(section => {
    //Text
    let textCont = document.createElement("div"); textCont.classList.add("promo-banner__text-content");
    let title = document.createElement("div"); title.classList.add("promo-banner__title");
    let h1 = document.createElement("h1"); 
    h1.textContent = section.title;

    content.appendChild(textCont);
    textCont.appendChild(title);
    title.appendChild(h1);

    //Image
    let imageCont = document.createElement("div"); imageCont.classList.add("promo-banner__image-content");
    let image = document.createElement("div"); image.classList.add("promo-banner__image");
    image.style.backgroundImage = `url(${section.image})`;
    image.style.backgroundSize = section.imageSize;
    image.style.backgroundPosition = section.imagePosition;

    content.appendChild(imageCont);
    imageCont.appendChild(image);


  });
}
function createReelPromo(article) {
  let content = document.getElementById(article.id);
  if (!content) return;
 
  if (!content.dataset.cleared) {
    content.innerHTML = "";
    content.dataset.cleared = "true"; // mark this container as cleared
}
  
  //Title
  
  let selectionEl = content.parentElement;
  if (!selectionEl.classList.contains("reel-promo__container--selection")) {
    let titleContent = document.createElement("div"); titleContent.classList.add("reel-promo__title-content");
    let titleH1 = document.createElement("h1"); 
    content.appendChild(titleContent);
    titleH1.textContent = article.overheadTitle;
    titleContent.appendChild(titleH1);
}
  //Articles
  let articleMask = document.createElement("div"); articleMask.classList.add("reel-promo__article-mask");
  content.appendChild(articleMask);
  

  article.content.sections.forEach(section => {
    let articleContainer = document.createElement("article"); articleContainer.classList.add("reel-promo__article-container");
    if (selectionEl.classList.contains("reel-promo__container--selection")) {
  articleContainer.classList.add("reel-promo__article-container--selection");
}
    let articleContent = document.createElement("div"); articleContent.classList.add("reel-promo__article-content");
    
    articleMask.appendChild(articleContainer);
    articleContainer.appendChild(articleContent);
    let imageCell = document.createElement("div"); imageCell.classList.add("reel-promo__image-cell");
    let textCell = document.createElement("div"); textCell.classList.add("reel-promo__text-cell");
    articleContent.appendChild(imageCell);
    articleContent.appendChild(textCell);

    let imageContent = document.createElement("div"); imageContent.classList.add("reel-promo__image-content");
    imageContent.style.backgroundImage = `url(${section.image})`;
    imageContent.style.backgroundSize = section.imageSize;
    imageContent.style.backgroundPosition = section.imagePosition;
    
    let textLayout = document.createElement("div"); textLayout.classList.add("reel-promo__text-layout");
    let text = document.createElement("div"); text.classList.add("reel-promo__text-content");
    let textH1 = document.createElement("h1");
    let textP = document.createElement("p");
    textH1.textContent = section.title;
    textP.textContent = section.description;
    

    imageCell.appendChild(imageContent);
    textCell.appendChild(textLayout);
    textCell.appendChild(text);
    text.appendChild(textH1);
    text.appendChild(textP);
  });
  

  //Navigation
  let naviContainer = document.createElement("div"); naviContainer.classList.add("reel-promo__navi-container");
  let naviContent = document.createElement("div"); naviContent.classList.add("reel-promo__navi-content");
  let naviButtonLeft = document.createElement("button"); naviButtonLeft.classList.add("reel-promo__navi-dir-button", "reel-promo__navi-dir-button--left");
  let naviButtonRight = document.createElement("button"); naviButtonRight.classList.add("reel-promo__navi-dir-button", "reel-promo__navi-dir-button--right");

  content.appendChild(naviContainer);
  naviContainer.appendChild(naviContent);
  naviContent.appendChild(naviButtonLeft);
  naviContent.appendChild(naviButtonRight);

}

function createSlideshow(article) {
  let content = document.getElementById(article.id)
  if (!content) return;

  if (!content.dataset.cleared) {
    content.innerHTML = "";
    content.dataset.cleared = "true"; // mark this container as cleared
  } 
  
  article.content.sections.forEach(section => {
    section.images.forEach((image, i) => {
      let imageContainer = document.createElement("div");
      imageContainer.classList.add("poster-slideshow__image");
      imageContainer.style.backgroundImage = `url(${image})`;
      imageContainer.style.backgroundSize = section.imageSizes[i];
      imageContainer.style.backgroundPosition = section.imagePositions[i];
      content.appendChild(imageContainer);

      let textContainer = document.createElement("div");
      textContainer.classList.add("poster-slideshow__text-container");
      let title1 = document.createElement("h1");
      let descrip1 = document.createElement("p");

      title1.textContent = section.titles[i];
      descrip1.textContent = section.descriptions[i];

      content.appendChild(textContainer);
      textContainer.appendChild(title1);
      textContainer.appendChild(descrip1);
    });


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
  } , { once: true });

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

function renderCheckoutPage(article) {
  if (!article || !article.content || !article.content.length) return;

  const product = article.content[0]; // single product

  // Reference to the checkout container
  let container = document.getElementById(article.id);
  if (!container) return;

  // Clear previous content
  container.innerHTML = "";

  // LEFT SIDE
  const leftContainer = document.createElement("div");
  leftContainer.className = "checkout__left-side-container";

  const leftContent = document.createElement("div");
  leftContent.className = "checkout__left-side-content";

  // Product images
  product.images.forEach((image, i) => {
    const div = document.createElement("div");
    div.className = "checkout__grid-item";
    div.style.gridArea = i === 0 ? "main" : "secondary";
    div.style.backgroundImage = `url("${image}")`;
    div.style.backgroundSize = product.imageSizes[i] || "100%";
    div.style.backgroundPosition = product.imagePositions[i] || "center center";
    leftContent.appendChild(div);
  });

  // Video
  const videoDiv = document.createElement("div");
  videoDiv.className = "checkout__grid-item";
  videoDiv.style.gridArea = "video";

  const videoEl = document.createElement("video");
  videoEl.className = "checkout__grid-item-video";
  videoEl.controls = true;
  videoEl.muted = true;
  videoEl.loop = true;
  videoEl.playsInline = true;

  const sourceEl = document.createElement("source");
  sourceEl.src = product.video;
  sourceEl.type = "video/mp4";

  videoEl.appendChild(sourceEl);
  videoDiv.appendChild(videoEl);
  leftContent.appendChild(videoDiv);

  leftContainer.appendChild(leftContent);
  container.appendChild(leftContainer);

  // RIGHT SIDE
  const rightContainer = document.createElement("div");
  rightContainer.className = "checkout__right-side-container";

  const rightContent = document.createElement("div");
  rightContent.className = "checkout__right-side-content";

  // Title & Price
  const titlePrice = document.createElement("div");
  titlePrice.className = "checkout__titleandprice-container";

  const titleDiv = document.createElement("div");
  titleDiv.className = "checkout__flex-item checkout__flex-item-title";
  const titleH1 = document.createElement("h1");
  titleH1.style.fontSize = "2.1rem";
  titleH1.style.padding = "2rem";
  titleH1.textContent = product.productName;
  titleDiv.appendChild(titleH1);

  const priceDiv = document.createElement("div");
  priceDiv.className = "checkout__flex-item checkout__flex-item-price";
  const priceH1 = document.createElement("h1");
  priceH1.style.fontSize = "1.3rem";
  priceH1.style.padding = "2rem";
  priceH1.textContent = product.productPrice;
  priceDiv.appendChild(priceH1);

  titlePrice.appendChild(titleDiv);
  titlePrice.appendChild(priceDiv);
  rightContent.appendChild(titlePrice);

  // Purchase Buttons
  const purchaseDiv = document.createElement("div");
  purchaseDiv.className = "checkout__flex-item checkout__flex-item-purchase";

  const addBag = document.createElement("div");
  addBag.className = "checkout__flex-subitem checkout__flex-item--button-white checkout__flex-subitem-addtobag";
  const addBagH1 = document.createElement("h1");
  addBagH1.textContent = "Add to bag";
  addBag.appendChild(addBagH1);

  const checkoutNow = document.createElement("div");
  checkoutNow.className = "checkout__flex-subitem checkout__flex-item--button-green checkout__flex-subitem-checkout";
  const checkoutH1 = document.createElement("h1");
  checkoutH1.textContent = "Checkout Now";
  checkoutNow.appendChild(checkoutH1);

  const splitBtn = document.createElement("div");
  splitBtn.className = "checkout__flex-subitem checkout__flex-subitem-split-button";

  const giftBtn = document.createElement("div");
  giftBtn.className = "checkout__flex-subsubitem checkout__flex-item--button-white checkout__flex-subsubitem-gift";
  const giftH1 = document.createElement("h1");
  giftH1.textContent = "Send as Gift 📧";
  giftBtn.appendChild(giftH1);

  const favBtn = document.createElement("div");
  favBtn.className = "checkout__flex-subsubitem checkout__flex-item--button-white checkout__flex-subsubitem-favorites";
  const favH1 = document.createElement("h1");
  favH1.textContent = "Add to Favorites ❤️";
  favBtn.appendChild(favH1);

  splitBtn.appendChild(giftBtn);
  splitBtn.appendChild(favBtn);

  purchaseDiv.appendChild(addBag);
  purchaseDiv.appendChild(checkoutNow);
  purchaseDiv.appendChild(splitBtn);
  rightContent.appendChild(purchaseDiv);


  // Promo Section
  let promoDiv2 = document.createElement("div");
  promoDiv2.className = "checkout__flex-item checkout__flex-item-promo";

  let promoLeft = document.createElement("div");
  promoLeft.className = "checkout__promo checkout__promo-left";
  let promoTitle = document.createElement("h1");
  promoTitle.textContent = product.promoTitle;
  let promoDesc = document.createElement("p");
  promoDesc.textContent = product.promoDescription;
  promoLeft.appendChild(promoTitle);
  promoLeft.appendChild(promoDesc);

  let promoRight = document.createElement("div");
  promoRight.className = "checkout__promo checkout__promo-right";
  let promoImg = document.createElement("img");
  promoImg.className = "checkout__promo checkout__promo-image";
  promoImg.style.backgroundImage = 'url("media/earrings-special2.PNG")';
  promoImg.style.backgroundSize = "150%";
  promoImg.style.backgroundPosition = "center center";
  promoRight.appendChild(promoImg);

  promoDiv2.appendChild(promoLeft);
  promoDiv2.appendChild(promoRight);
  rightContent.appendChild(promoDiv2);

  // Horizontal separator helper
  const createHr = () => {
    const hr = document.createElement("hr");
    hr.className = "horizontal-separator";
    hr.style.width = "85%";
    hr.style.height = "0.001%";
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

  // Shipping
  const shippingDiv = document.createElement("div");
  shippingDiv.className = "checkout__flex-item checkout__flex-item-shipping";
  shippingDiv.innerHTML = `
    <button class="collapsible-btn" style="font-size: 1.2rem;">Free Shipping & Returns</button>
    <div class="collapsible-content">
      <p>Enjoy a seamless shopping experience with our complimentary shipping service. Every order is carefully packed and delivered to your door with priority handling. If it’s not a perfect match, returns are simple and free of charge.</p>
      <ul>
        ${product.productDescriptionList.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
  rightContent.appendChild(shippingDiv);
  rightContent.appendChild(createHr());

  // Details
  let detailsDiv = document.createElement("div");
  detailsDiv.className = "checkout__flex-item checkout__flex-item-details";
  detailsDiv.innerHTML = `
    <button class="collapsible-btn" style="font-size: 1.2rem;">Details</button>
    <div class="collapsible-content">
      <p>${product.productDescription}</p>
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
  paymentDiv.className = "checkout__flex-item checkout__flex-item-payment-options";
  paymentDiv.innerHTML = `
    <button class="collapsible-btn" style="font-size: 1.2rem;">Payment Options</button>
    <div class="collapsible-content">
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
          const allContents = document.querySelectorAll(".collapsible-content");

          // First, close all panels
          allContents.forEach(c => {
          if (c !== content) {
              c.style.maxHeight = null;
          }
          });

          // Then toggle the clicked one
          if (content.style.maxHeight) {
          content.style.maxHeight = null;
          } else {
          content.style.maxHeight = content.scrollHeight + "px";
          }
      });
      });

}




});