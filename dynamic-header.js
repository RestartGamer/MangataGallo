


function dynamicQuickMenu() {
  const quickMenu = document.querySelector(".quick-menu");
  const scrollThreshold = 100;

  window.addEventListener("scroll", ()=>{
    if (window.scrollY > scrollThreshold) {
    quickMenu.classList.add('scrolled');
    } else {
      quickMenu.classList.remove('scrolled');
    }

  });
}

window.addEventListener("load", dynamicQuickMenu);