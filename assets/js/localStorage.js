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
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filteredTasks = tasks.filter(task => task.completed === false);

  return filteredTasks;
}

function removeTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filteredTasks = tasks.filter(task => task.id !== Number(id));

  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

function completeTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex(task => task.id === Number(id));

  tasks[index].completed = true;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function uncompleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex(task => task.id === Number(id));

  tasks[index].completed = false;

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getCompletedTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filteredTasks = tasks.filter(task => task.completed === true);

  return filteredTasks;
}

function getTaskCounter() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filteredTasks = tasks.filter(task => task.completed === false);

  return filteredTasks.length;
}

export default {
  saveTask,
  getTasks,
  removeTask,
  completeTask,
  uncompleteTask,
  getCompletedTasks,
  getTaskCounter
};
