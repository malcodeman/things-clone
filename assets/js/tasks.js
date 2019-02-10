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
  const tasks = Array.from(document.getElementsByClassName("task"));

  if (isSelectedAll()) {
    deselectAll();
  }

  const index = tasks.findIndex(task => {
    return task.classList.contains("selected");
  });

  if (index === -1) {
    tasks[0].classList.add("selected");
  } else if (index !== -1 && index !== tasks.length - 1) {
    tasks[index].classList.remove("selected");
    tasks[index + 1].classList.add("selected");
  }
}

function selectLast() {
  const tasks = Array.from(document.getElementsByClassName("task"));

  if (isSelectedAll()) {
    deselectAll();
  }

  const index = tasks.findIndex(task => {
    return task.classList.contains("selected");
  });

  if (index === -1) {
    tasks[tasks.length - 1].classList.add("selected");
  } else if (index !== -1 && index !== 0) {
    tasks[index].classList.remove("selected");
    tasks[index - 1].classList.add("selected");
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
