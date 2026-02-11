/////////////////////////////////////////////////////////
//SHOPPING-CART ACTIVATION AND DEACTIVATION
/////////////////////////////////////////////////////////
window.addEventListener("load", () => {
    const shopButtons = document.querySelectorAll(".quick-menu__content-item--shopping");
    const shopWindows = document.querySelectorAll(".shopping-cart__container");

    shopButtons.forEach(shopButton => {
        shopWindows.forEach(shopWindow => {
            shopButton.addEventListener("click", (event) => {
                event.stopPropagation(); 
                shopWindow.classList.toggle("active");
            });

            shopWindow.addEventListener("click", (event) => {
                event.stopPropagation();
            });

            document.addEventListener("click", (event) => {
                shopWindow.classList.remove("active");
            });
        });

    });

});