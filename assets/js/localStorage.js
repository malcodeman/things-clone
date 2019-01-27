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

  if (tasks) {
    const filteredTasks = tasks.filter(
      task => task.completed === false && task.deleted === false
    );

    return filteredTasks;
  }
  return null;
}

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const index = tasks.findIndex(task => task.id === Number(id));

  tasks[index].deleted = true;

  localStorage.setItem("tasks", JSON.stringify(tasks));
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

  if (tasks) {
    const filteredTasks = tasks.filter(
      task => task.completed === true && task.deleted === false
    );

    return filteredTasks;
  }
  return null;
}

function getTaskCounter() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    const filteredTasks = tasks.filter(
      task => task.completed === false && task.deleted === false
    );

    return filteredTasks.length;
  }
  return null;
}

function getDeletedTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    const filteredTasks = tasks.filter(task => task.deleted === true);

    return filteredTasks;
  }
  return null;
}

function emptyTrash() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    const filteredTasks = tasks.filter(task => task.deleted !== true);

    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  }
}

export default {
  saveTask,
  getTasks,
  deleteTask,
  completeTask,
  uncompleteTask,
  getCompletedTasks,
  getTaskCounter,
  getDeletedTasks,
  emptyTrash
};
