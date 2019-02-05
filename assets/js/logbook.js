import localStorage from "./localStorage.js";
import components from "./components.js";
import keycodes from "./keycodes.js";
import counter from "./counter.js";
import menu from "./menu.js";
import tasks from "./tasks.js";

function uncompleteTask() {
  this.parentNode.remove();
  localStorage.uncompleteTask(this.parentNode.dataset.id);
  counter.renderCounter();
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

  const renderedTasks = document.getElementsByClassName("task");

  Array.from(renderedTasks).forEach(task => {
    task.addEventListener("click", tasks.select);
    task.childNodes[1].addEventListener("click", uncompleteTask);
  });
}

function keyboardShortcutsListeners(e) {
  if (e.keyCode === keycodes.escape.code) {
    tasks.deselectAll();
  } else if (e.ctrlKey && e.keyCode === keycodes.d.code) {
    tasks.remove();
  } else if (e.keyCode === keycodes.downArrow.code) {
    tasks.selectFirst();
  } else if (e.keyCode === keycodes.upArrow.code) {
    tasks.selectLast();
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
