import localStorage from "./localStorage.js";

function renderCounter() {
  const counter = document.getElementById("counter");
  const taskCounter = localStorage.getTaskCounter();

  if (taskCounter === 0) {
    counter.textContent = "";
  } else {
    counter.textContent = taskCounter;
  }
}

export default {
  renderCounter
};
