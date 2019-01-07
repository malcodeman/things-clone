function focusInputNewTask() {
  document.getElementById("input_new_task").focus();
}

function clearInputNewTask() {
  document.getElementById("input_new_task").value = "";
}

// Getting local storage items
function getTask(task_number) {
  return localStorage.getItem("task_" + task_number);
}

function getTaskCounter() {
  return localStorage.getItem("task_counter");
}

// Setting and removing local storage items
function setTask(new_task) {
  localStorage.setItem("task_" + getTaskCounter(), new_task);
}

function setTaskCounter(new_counter) {
  localStorage.setItem("task_counter", new_counter);
}

function removeTask(task_number) {
  localStorage.removeItem("task_" + task_number);
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

// Shows date
function renderDate() {
  const date = new Date();
  const day = date.toLocaleDateString("en-us", { weekday: "long" });
  const month = date.toLocaleDateString("en-us", { month: "long" });

  document.getElementById(
    "date_text"
  ).textContent = `${day}, ${month} ${date.getDate()}`;
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
