const Task = (id, text) => `
  <div id=${id} class="task-item">
    <input type="checkbox" class="checkbox" />
    <span class="task-title">${text}</span>
  </div>
`;

export default { Task };
