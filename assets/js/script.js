import { renderDate } from "./date.js";
import {
  getTask,
  getTaskCounter,
  setTask,
  setTaskCounter,
  removeTask
} from "./localStorage.js";
import components from "./components.js";

function focusInputNewTask() {
  document.getElementById("input_new_task").focus();
}

function clearInputNewTask() {
  document.getElementById("input_new_task").value = "";
}

// Deletes task if user double clicks on task
var deleteTask = function() {
  removeTask(this.id);
  setTaskCounter(Number(getTaskCounter()) - 1);
  document
    .getElementById("tasks_content")
    .getElementsByClassName("task-item")
    [this.id].remove();
  var j = Number(this.id),
    i = 0;
  for (j; j < Number(getTaskCounter()) + 1; j += 1) {
    localStorage.setItem("task_" + j, getTask(j + 1));
  }
  removeTask(getTaskCounter());
  for (i; i < Number(getTaskCounter()); i += 1) {
    document
      .getElementById("tasks_content")
      .getElementsByClassName("task-item")[i].id = i;
  }
  focusInputNewTask();
};

// Shows task
function renderTask(task_number) {
  const task = components.Task(task_number, getTask(task_number));
  document
    .getElementById("tasks_content")
    .insertAdjacentHTML("beforeend", task);
}

// Adds task if user pressed enter and textfield isnt empty
var addTask = function(event) {
  if (event.keyCode === 13 && this.value !== "") {
    setTask(this.value);
    renderTask(getTaskCounter());
    setTaskCounter(Number(getTaskCounter()) + 1);
    clearInputNewTask();
  }
};

// Loops through all saved tasks and shows them one by one
function renderTasks() {
  let i = 0;
  for (i; i < getTaskCounter(); i += 1) {
    renderTask(i);
  }
  const tasks = document.getElementsByClassName("task-item");
  Array.from(tasks).forEach(task => {
    task.addEventListener("dblclick", deleteTask);
  });
}

function main() {
  if (getTaskCounter() === null) {
    setTaskCounter(0);
  }
  renderDate();
  renderTasks();
  focusInputNewTask();
  document.getElementById("input_new_task").addEventListener("keyup", addTask);
}
main();
