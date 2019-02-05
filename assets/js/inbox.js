import localStorage from "./localStorage.js";
import components from "./components.js";
import keycodes from "./keycodes.js";
import counter from "./counter.js";
import menu from "./menu.js";
import tasks from "./tasks.js";

function focusInputNewTodo() {
  document.getElementById("newTodoInput").focus();
}

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
      removed: false
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

  lastTask.addEventListener("click", tasks.select);
  lastTask.childNodes[1].addEventListener("click", completeTask);
}

function completeTask() {
  this.parentNode.remove();
  localStorage.completeTask(this.parentNode.dataset.id);
  counter.renderCounter();
  focusInputNewTodo();
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

  const renderedTasks = document.getElementsByClassName("task");

  Array.from(renderedTasks).forEach(task => {
    task.addEventListener("click", tasks.select);
    task.childNodes[1].addEventListener("click", completeTask);
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
  const newTodoInput = document.getElementById("newTodoInput");

  document.addEventListener("keydown", keyboardShortcutsListeners);
  newTodoInput.addEventListener("keyup", addTask);
  newTodoInput.addEventListener("focus", tasks.deselectAll);
  document
    .getElementById("mobileMenuReference")
    .addEventListener("click", menu.toggleMobileMenu);
}

function main() {
  renderTasks();
  addEventListeners();
  counter.renderCounter();
  menu.toggleNavlink();
}

main();
