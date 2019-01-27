import counter from "./counter.js";
import localStorage from "./localStorage.js";
import components from "./components.js";

function toggleNavlink() {
  const lists = document.getElementsByClassName("list");

  Array.from(lists).forEach(list => {
    if (list.pathname === window.location.pathname) {
      list.classList.add("list-active");
    }
  });
}

function renderDeletedTasks() {
  const deletedTasks = localStorage.getDeletedTasks();
  const trash = document.getElementById("trash");

  if (deletedTasks) {
    deletedTasks.forEach(deletedTask => {
      trash.insertAdjacentHTML(
        "beforeend",
        components.ReadOnlyTask(
          deletedTask.id,
          deletedTask.value,
          deletedTask.completed
        )
      );
    });
  }
}

function emptyTrash() {
  const trash = document.getElementById("trash");

  trash.textContent = "";
  localStorage.emptyTrash();
}

function main() {
  toggleNavlink();
  counter.renderCounter();
  renderDeletedTasks();
  document.getElementById("emptyTrash").addEventListener("click", emptyTrash);
}

main();
