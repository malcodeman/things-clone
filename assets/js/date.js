export function renderDate() {
  const date = new Date();
  const day = date.toLocaleDateString("en-us", { weekday: "long" });
  const month = date.toLocaleDateString("en-us", { month: "long" });

  document.getElementById(
    "date_text"
  ).textContent = `${day}, ${month} ${date.getDate()}`;
}
