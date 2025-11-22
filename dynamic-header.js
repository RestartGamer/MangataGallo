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
  const quickMenu2 = document.querySelector(".quick-menu--mobile");
  const scrollThreshold2 = 100;

  window.addEventListener("scroll", ()=>{
    if (window.scrollY > scrollThreshold2) {
    quickMenu2.classList.add('scrolled');
    } else {
      quickMenu2.classList.remove('scrolled');
    }

  });
}

window.addEventListener("load", dynamicQuickMenu);