import {
  getTask,
  getTaskCounter,
  setTask,
  setTaskCounter,
  removeTask
} from "./localStorage.js";
import components from "./components.js";
import keycodes from "./keycodes.js";

function focusInputNewTodo() {
  document.getElementById("newTodoInput").focus();
}

// Deletes task if user double clicks on task
function deleteTask() {
  removeTask(this.id);
  setTaskCounter(Number(getTaskCounter()) - 1);
  document
    .getElementById("tasks_content")
    .getElementsByClassName("task")
    [this.id].remove();
  var j = Number(this.id),
    i = 0;
  for (j; j < Number(getTaskCounter()) + 1; j += 1) {
    localStorage.setItem("task_" + j, getTask(j + 1));
  }
  removeTask(getTaskCounter());
  for (i; i < Number(getTaskCounter()); i += 1) {
    document.getElementById("tasks_content").getElementsByClassName("task")[
      i
    ].id = i;
  }
}

// Shows task
function renderTask(task_number) {
  const task = components.Task(task_number, getTask(task_number));

  document
    .getElementById("tasks_content")
    .insertAdjacentHTML("beforeend", task);
}

// Adds task if user pressed enter and textfield isnt empty
function addTask(event) {
  if (
    (event.keyCode === keycodes.enter.code ||
      event.keyCode === keycodes.escape.code) &&
    this.value !== ""
  ) {
    setTask(this.value);
    setTaskCounter(Number(getTaskCounter()) + 1);
    makeTask(this.value);
  } else if (event.keyCode === keycodes.escape.code && this.value === "") {
    closeAddTodo();
  }
}

function closeAddTodo() {
  const newTodo = document.getElementById("newTodo");

  newTodo.classList.remove("new-todo-active");
}

function makeTask(value) {
  const newTodo = document.getElementById("newTodo");
  const newTodoInput = document.getElementById("newTodoInput");

  newTodo.className = "task";
  newTodo.removeAttribute("id");
  newTodo.addEventListener("click", selectTask);
  newTodo.childNodes[1].addEventListener("click", checkTask);

  newTodoInput.readOnly = true;
  newTodoInput.removeAttribute("placeholder");
  newTodoInput.removeAttribute("id");
  newTodoInput.value = value;

  document
    .getElementById("main")
    .insertAdjacentHTML("beforeend", components.NewTodo());
  document.getElementById("newTodoInput").addEventListener("keyup", addTask);
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

// Loops through all saved tasks and shows them one by one
function renderTasks() {
  let i = 0;
  for (i; i < getTaskCounter(); i += 1) {
    renderTask(i);
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
  tasks[0].classList.add("selected");
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
  tasks[tasks.length - 1].classList.add("selected");
}

function keyboardShortcuts(e) {
  if (e.ctrlKey && e.keyCode === keycodes.n.code) {
    toggleAddTodo();
  } else if (e.keyCode === keycodes.escape.code) {
    deselectAllTasks();
  } else if (e.keyCode === keycodes.downArrow.code) {
    selectTaskDownArrowShortcut();
  } else if (e.keyCode === keycodes.upArrow.code) {
    selectTaskUpArrowShortcut();
  }
}

function main() {
  if (getTaskCounter() === null) {
    setTaskCounter(0);
  }
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
