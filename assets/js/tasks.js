import localStorage from "./localStorage.js";
import counter from "./counter.js";

function isSelectedAll() {
  const tasks = Array.from(document.getElementsByClassName("task"));

  return tasks.every(task => {
    return task.classList.contains("selected");
  });
}

function select() {
  const tasks = Array.from(document.getElementsByClassName("task"));

  tasks.forEach(task => {
    if (this === task) {
      this.classList.add("selected");
    } else {
      task.classList.remove("selected");
    }
  });
}

function selectFirst() {
  const tasks = document.getElementsByClassName("task");

  if (isSelectedAll()) {
    deselectAll();
  }

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

function selectLast() {
  const tasks = document.getElementsByClassName("task");

  if (isSelectedAll()) {
    deselectAll();
  }

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

function selectAll() {
  const tasks = Array.from(document.getElementsByClassName("task"));

  tasks.forEach(task => {
    task.classList.add("selected");
  });
}

function deselectAll() {
  const tasks = Array.from(document.getElementsByClassName("task"));

  tasks.forEach(task => {
    task.classList.remove("selected");
  });
}

function remove() {
  const tasks = Array.from(document.getElementsByClassName("task"));

  tasks.forEach(task => {
    if (task.classList.contains("selected")) {
      task.remove();
      localStorage.removeTask(task.dataset.id);
      counter.renderCounter();
    }
  });
}

export default {
  select,
  selectFirst,
  selectLast,
  selectAll,
  deselectAll,
  remove
};
