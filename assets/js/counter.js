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

function renderCounterMobile() {
  const counterMobile = document.getElementById("counterMobile");
  const taskCounter = localStorage.getTaskCounter();

  if (taskCounter === 0) {
    counterMobile.textContent = "";
  } else {
    counterMobile.textContent = taskCounter;
  }
}

export default {
  renderCounter,
  renderCounterMobile
};
