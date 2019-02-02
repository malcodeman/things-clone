import counter from "./counter.js";

function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");

  mobileMenu.classList.toggle("mobile-menu-open");
  if (mobileMenu.classList.contains("mobile-menu-open")) {
    counter.renderCounterMobile();
  }
}

export default {
  toggleMenu
};
