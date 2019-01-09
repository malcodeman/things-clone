export function getTask(task_number) {
  return localStorage.getItem("task_" + task_number);
}

export function getTaskCounter() {
  return localStorage.getItem("task_counter");
}

export function setTask(new_task) {
  localStorage.setItem("task_" + getTaskCounter(), new_task);
}

export function setTaskCounter(new_counter) {
  localStorage.setItem("task_counter", new_counter);
}

export function removeTask(task_number) {
  localStorage.removeItem("task_" + task_number);
}
