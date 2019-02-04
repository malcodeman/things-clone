import counter from "./counter.js";
import localStorage from "./localStorage.js";
import components from "./components.js";
import menu from "./menu.js";
import keyboardShortcuts from "./keyboardShortcuts.js";
import keycodes from "./keycodes.js";

function renderDeletedTasks() {
  const deletedTasks = localStorage.getDeletedTasks();
  const trash = document.getElementById("trash");

  if (deletedTasks) {
    deletedTasks.forEach(deletedTask => {
      trash.insertAdjacentHTML(
        "beforeend",
        components.ReadOnlyTask(
          deletedTask.id,
          deletedTask.value,
          deletedTask.completed
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
  renderDeletedTasks();
  addEventListeners();
  counter.renderCounter();
  menu.toggleNavlink();
}

main();
