import localStorage from "./localStorage.js";
import components from "./components.js";
import keycodes from "./keycodes.js";
import keyboardShortcuts from "./keyboardShortcuts.js";
import counter from "./counter.js";
import mobileMenu from "./mobileMenu.js";

function focusInputNewTodo() {
  document.getElementById("newTodoInput").focus();
}

// Adds task if user pressed enter and textfield isn't empty
function addTask(event) {
  if (
    (event.keyCode === keycodes.enter.code ||
      event.keyCode === keycodes.escape.code) &&
    this.value !== ""
  ) {
    const id = Math.random();
    localStorage.saveTask({
      id,
      date: new Date(),
      value: this.value,
      completed: false,
      deleted: false
    });
    appendTask(id, this.value);
    document.getElementById("newTodoInput").value = "";
    counter.renderCounter();
  } else if (event.keyCode === keycodes.escape.code && this.value === "") {
    document.getElementById("newTodoInput").value = "";
  }
}

function appendTask(id, value) {
  const tasksContent = document.getElementById("inbox");

  tasksContent.insertAdjacentHTML("beforeend", components.Task(id, value));
  const lastTask = document.querySelectorAll(".task:last-child")[0];

  lastTask.addEventListener("click", selectTask);
  lastTask.childNodes[1].addEventListener("click", completeTask);
}

function completeTask() {
  this.parentNode.remove();
  localStorage.completeTask(this.parentNode.dataset.id);
  counter.renderCounter();
  focusInputNewTodo();
}

function deselectAllTasks() {
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    task.classList.remove("selected");
  });
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

function renderTasks() {
  const savedTasks = localStorage.getTasks();

  if (savedTasks) {
    savedTasks.forEach(savedTask => {
      document
        .getElementById("inbox")
        .insertAdjacentHTML(
          "beforeend",
          components.Task(savedTask.id, savedTask.value, false)
        );
    });
  }
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    task.addEventListener("click", selectTask);
    task.childNodes[1].addEventListener("click", completeTask);
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

function toggleNavlink() {
  const lists = document.getElementsByClassName("list");

  Array.from(lists).forEach(list => {
    if (list.pathname === window.location.pathname) {
      list.classList.add("list-active");
    }
  });
}

function main() {
  const newTodoInput = document.getElementById("newTodoInput");
  const mobileMenuReference = document.getElementById("mobileMenuReference");

  renderTasks();
  toggleNavlink();
  counter.renderCounter();
  newTodoInput.addEventListener("keyup", addTask);
  newTodoInput.addEventListener("focus", deselectAllTasks);
  mobileMenuReference.addEventListener("click", mobileMenu.toggleMenu);
  document.addEventListener("keydown", keyboardShortcutsListeners);
}

main();
