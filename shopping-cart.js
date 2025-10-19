/////////////////////////////////////////////////////////
//SHOPPING-CART ACTIVATION AND DEACTIVATION
/////////////////////////////////////////////////////////
window.addEventListener("load", () => { 
    const shopButton = document.querySelector(".quick-menu__content-item--shopping");
    const shopWindow = document.querySelector(".shopping-cart__container");

    // Toggle cart on button click
    shopButton.addEventListener("click", (event) => {
        event.stopPropagation(); // stop it from bubbling to document
        shopWindow.classList.toggle("active");
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