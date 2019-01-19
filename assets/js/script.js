import localStorage from "./localStorage.js";
import components from "./components.js";
import keycodes from "./keycodes.js";

function focusInputNewTodo() {
  document.getElementById("newTodoInput").focus();
}

function deleteTask() {
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    if (task.classList.contains("selected")) {
      task.remove();
    }
  });
}

// Adds task if user pressed enter and textfield isnt empty
function addTask(event) {
  if (
    (event.keyCode === keycodes.enter.code ||
      event.keyCode === keycodes.escape.code) &&
    this.value !== ""
  ) {
    localStorage.saveTask({ date: new Date(), value: this.value });
    appendTask(this.value);
    closeAddTodo();
  } else if (event.keyCode === keycodes.escape.code && this.value === "") {
    closeAddTodo();
  }
}

function closeAddTodo() {
  const newTodo = document.getElementById("newTodo");

  newTodo.classList.add("no-transition");
  newTodo.classList.remove("new-todo-active");
  document.getElementById("newTodoInput").value = "";
}

function appendTask(value) {
  const tasksContent = document.getElementById("tasks_content");

  tasksContent.insertAdjacentHTML("beforeend", components.Task(value));
  const lastTask = document.querySelectorAll(".task:last-child")[0];

  lastTask.addEventListener("click", selectTask);
  lastTask.childNodes[1].addEventListener("click", checkTask);

  document.activeElement.blur();
}

let timerId;

function checkTask() {
  this.classList.toggle("checked");
  if (this.classList.contains("checked")) {
    this.innerHTML = "";
    this.insertAdjacentHTML("beforeend", components.CheckboxChecked());
    focusInputNewTodo();
    timerId = setTimeout(() => {
      this.parentNode.classList.add("task-completed");
      setTimeout(() => {
        this.parentNode.remove();
      }, 300);
    }, 1000);
  } else {
    this.innerHTML = "";
    this.insertAdjacentHTML("beforeend", components.Checkbox());
    focusInputNewTodo();
    clearTimeout(timerId);
  }
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
        .getElementById("tasks_content")
        .insertAdjacentHTML("beforeend", components.Task(savedTask.value));
    });
  }
  const tasks = document.getElementsByClassName("task");

  Array.from(tasks).forEach(task => {
    task.addEventListener("dblclick", deleteTask);
    task.addEventListener("click", selectTask);
    task.childNodes[1].addEventListener("click", checkTask);
  });
}

function toggleAddTodo() {
  const newTodo = document.getElementById("newTodo");

  newTodo.classList.remove("no-transition");
  newTodo.classList.toggle("new-todo-active");
  if (newTodo.classList.contains("new-todo-active")) {
    focusInputNewTodo();
    deselectAllTasks();
  }
}

function selectTaskDownArrowShortcut() {
  const tasks = document.getElementsByClassName("task");

  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i].classList.contains("selected")) {
      if (i === tasks.length - 1) {
        return;
      }
      tasks[i].classList.remove("selected");
      tasks[i + 1].classList.add("selected");
      return;
    }
  }
  if (tasks.length > 0) {
    tasks[0].classList.add("selected");
  }
}

function selectTaskUpArrowShortcut() {
  const tasks = document.getElementsByClassName("task");

  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i].classList.contains("selected")) {
      if (i === 0) {
        return;
      }
      tasks[i].classList.remove("selected");
      tasks[i - 1].classList.add("selected");
      return;
    }
  }
  if (tasks.length > 0) {
    tasks[tasks.length - 1].classList.add("selected");
  }
}

function keyboardShortcuts(e) {
  if (e.ctrlKey && e.keyCode === keycodes.n.code) {
    toggleAddTodo();
  } else if (e.ctrlKey && e.keyCode === keycodes.d.code) {
    deleteTask();
  } else if (e.keyCode === keycodes.escape.code) {
    deselectAllTasks();
  } else if (e.keyCode === keycodes.downArrow.code) {
    selectTaskDownArrowShortcut();
  } else if (e.keyCode === keycodes.upArrow.code) {
    selectTaskUpArrowShortcut();
  }
}

function main() {
  renderTasks();
  document
    .getElementById("newTodoBtn")
    .addEventListener("click", toggleAddTodo);
  document.getElementById("newTodoInput").addEventListener("keyup", addTask);
  document
    .getElementById("newTodo")
    .childNodes[1].addEventListener("click", checkTask);
  document.addEventListener("keydown", keyboardShortcuts);
}

main();
