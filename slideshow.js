window.addEventListener("load", ()=> {
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
            });