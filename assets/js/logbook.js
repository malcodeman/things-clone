import localStorage from "./localStorage.js";
import components from "./components.js";
import keycodes from "./keycodes.js";
import keyboardShortcuts from "./keyboardShortcuts.js";
import counter from "./counter.js";
import menu from "./menu.js";

function uncompleteTask() {
  this.parentNode.remove();
  localStorage.uncompleteTask(this.parentNode.dataset.id);
  counter.renderCounter();
}

function selectTask() {
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    if (this === task) {
      this.classList.toggle("selected");
    } else {
      task.classList.remove("selected");
    }
  });
}

function renderCompletedTasks() {
  const completedTasks = localStorage.getCompletedTasks();

  if (completedTasks) {
    completedTasks.forEach(completedTask => {
      document
        .getElementById("logbook")
        .insertAdjacentHTML(
          "beforeend",
          components.Task(completedTask.id, completedTask.value, true)
        );
    });
  }
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    task.addEventListener("click", selectTask);
    task.childNodes[1].addEventListener("click", uncompleteTask);
  });
}

function deselectAllTasks() {
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    task.classList.remove("selected");
  });
}

function keyboardShortcutsListeners(e) {
  if (e.keyCode === keycodes.escape.code) {
    deselectAllTasks();
  } else if (e.ctrlKey && e.keyCode === keycodes.d.code) {
    keyboardShortcuts.deleteTask();
  } else if (e.keyCode === keycodes.downArrow.code) {
    keyboardShortcuts.selectTaskDownArrowShortcut();
  } else if (e.keyCode === keycodes.upArrow.code) {
    keyboardShortcuts.selectTaskUpArrowShortcut();
  }
}

function addEventListeners() {
  document.addEventListener("keydown", keyboardShortcutsListeners);
  document
    .getElementById("mobileMenuReference")
    .addEventListener("click", menu.toggleMobileMenu);
}

function main() {
  renderCompletedTasks();
  addEventListeners();
  counter.renderCounter();
  menu.toggleNavlink();
}

main();
