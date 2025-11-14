/////////////////////////////////////////////////////////
//SHOPPING-CART ACTIVATION AND DEACTIVATION
/////////////////////////////////////////////////////////
window.addEventListener("load", () => {
    const shopButtons = document.querySelectorAll(".quick-menu__content-item--shopping");
    const shopWindows = document.querySelectorAll(".shopping-cart__container");

    shopButtons.forEach(shopButton => {
        shopWindows.forEach(shopWindow => {
            // Toggle cart on button click
            shopButton.addEventListener("click", (event) => {
                event.stopPropagation(); // stop it from bubbling to document
                shopWindow.classList.toggle("active");
                shopButton.classList.toggle("active");
            });

            // Prevent closing when clicking inside the cart
            shopWindow.addEventListener("click", (event) => {
                event.stopPropagation();
            });

            // Close the cart when clicking anywhere else
            document.addEventListener("click", (event) => {
                shopWindow.classList.remove("active");
            });
        });

    });

});