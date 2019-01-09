import { renderDate } from "./date.js";
import {
  getTask,
  getTaskCounter,
  setTask,
  setTaskCounter,
  removeTask
} from "./localStorage.js";

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
  var task_item, task_title;
  task_item = document.createElement("div");
  task_title = document.createElement("span");
  task_item.id = task_number;
  task_item.classList.add("task-item");
  task_item.addEventListener("dblclick", deleteTask);
  task_title.classList.add("task-title");
  task_title.textContent = getTask(task_number);
  task_item.appendChild(task_title);
  document.getElementById("tasks_content").appendChild(task_item);
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
  var i = 0;
  for (i; i < getTaskCounter(); i += 1) {
    renderTask(i);
  }
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
