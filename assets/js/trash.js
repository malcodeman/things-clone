import counter from "./counter.js";
import localStorage from "./localStorage.js";
import components from "./components.js";
import menu from "./menu.js";
import keycodes from "./keycodes.js";

function renderRemovedTasks() {
  const removedasks = localStorage.getRemovedTasks();
  const trash = document.getElementById("trash");

  if (removedasks) {
    removedasks.forEach(removedTask => {
      trash.insertAdjacentHTML(
        "beforeend",
        components.ReadOnlyTask(
          removedTask.id,
          removedTask.value,
          removedTask.completed
        )
      );
    });
  }
}

function emptyTrash() {
  const trash = document.getElementById("trash");

  trash.textContent = "";
  localStorage.emptyTrash();
}

function keyboardShortcutsListeners(e) {
  if (e.ctrlKey && e.keyCode === keycodes.d.code) {
    emptyTrash();
  }
}

function addEventListeners() {
  document.addEventListener("keydown", keyboardShortcutsListeners);
  document.getElementById("emptyTrash").addEventListener("click", emptyTrash);
  document
    .getElementById("mobileMenuReference")
    .addEventListener("click", menu.toggleMobileMenu);
}

function main() {
  renderRemovedTasks();
  addEventListeners();
  counter.renderCounter();
  menu.toggleNavlink();
}

main();
