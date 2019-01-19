function saveTask(newTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    localStorage.setItem("tasks", JSON.stringify(new Array(newTask)));
  }
}

function getTasks() {
  const tasks = localStorage.getItem("tasks");

  return JSON.parse(tasks);
}

export default { saveTask, getTasks };
