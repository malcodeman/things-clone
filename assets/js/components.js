const Task = (id, text) => `
  <div class="task" id=${id}>
    <input type="checkbox" autocomplete="off" class="checkbox" />
    <input
      type="text"
      spellcheck="false"
      autocomplete="off"
      readonly="true"
      value="${text}"
      class="new-todo-input"
    />
  </div>
`;

const NewTodo = () => `
  <div class="new-todo" id="newTodo">
    <input type="checkbox" autocomplete="off" class="checkbox" />
    <input
      type="text"
      id="newTodoInput"
      placeholder="New To-Do"
      spellcheck="false"
      autocomplete=off
      class="new-todo-input"
    />
  </div>
`;

export default { Task, NewTodo };
