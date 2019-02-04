import counter from "./counter.js";

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");

  mobileMenu.classList.toggle("mobile-menu-open");
  if (mobileMenu.classList.contains("mobile-menu-open")) {
    counter.renderCounterMobile();
  }
}

function toggleNavlink() {
  const lists = document.getElementsByClassName("list");

  Array.from(lists).forEach(list => {
    if (list.pathname === window.location.pathname) {
      list.classList.add("list-active");
    }
  });
}

export default {
  toggleMobileMenu,
  toggleNavlink
};
