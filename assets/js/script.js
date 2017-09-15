function focusInputNewTask() {
    "use strict";
    document.getElementById("input_new_task").focus();
}
function clearInputNewTask() {
    "use strict";
    document.getElementById("input_new_task").value = "";
}

// Getting local storage items
function getTask(task_number) {
    "use strict";
    return localStorage.getItem("task_" + task_number);
}
function getTaskCounter() {
    "use strict";
    return localStorage.getItem("task_counter");
}

// Setting and removing local storage items
function setTask(new_task) {
    "use strict";
    localStorage.setItem("task_" + getTaskCounter(), new_task);
}
function setTaskCounter(new_counter) {
    "use strict";
    localStorage.setItem("task_counter", new_counter);
}
function removeTask(task_number) {
    "use strict";
    localStorage.removeItem("task_" + task_number);
}

// Deletes task if user double clicks on task
var deleteTask = function () {
    "use strict";
    removeTask(this.id);
    setTaskCounter(Number(getTaskCounter()) - 1);
    document.getElementById("tasks_content").getElementsByClassName("task-item")[this.id].remove();
    var i = Number(this.id);
    for (i; i < Number(getTaskCounter()); i += 1) {
        localStorage.setItem("task_" + i, getTask(i + 1));
        document.getElementById("tasks_content").getElementsByClassName("task-item")[i].id = i;
    }
    focusInputNewTask();
};

// Shows task
function renderTask(task_number) {
    "use strict";
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
var addTask = function (event) {
    "use strict";
    if (event.keyCode === 13 && this.value !== "") {
        setTask(this.value);
        renderTask(getTaskCounter());
        setTaskCounter(Number(getTaskCounter()) + 1);
        clearInputNewTask();
    }
};

// Loops through all saved tasks and shows them one by one
function renderTasks() {
    "use strict";
    var i = 0;
    for (i; i < getTaskCounter(); i += 1) {
        renderTask(i);
    }
}

// Shows date
function renderDate() {
    "use strict";
    var month_names, day_names, d;
    month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    d = new Date();
    document.getElementById("date_text").textContent = day_names[d.getDay()] + ",  " + month_names[d.getMonth()] + " " + d.getDate();
}
function main() {
    "use strict";
    if (getTaskCounter() === null) {
        setTaskCounter(0);
    }
    renderDate();
    renderTasks();
    focusInputNewTask();
    document.getElementById("input_new_task").addEventListener("keyup", addTask);
}
main();