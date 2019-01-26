const Task = (id, value, checked) => `
  <div data-id=${id} class="task">
    <div class=${checked ? "custom-checkbox" : "custom-checkbox-special"}>
      ${checked ? CheckboxChecked() : Checkboxes()}
    </div>
    <input
      type="text"
      spellcheck="false"
      autocomplete="off"
      readonly="true"
      value="${value}"
      class="new-todo-input"
    />
  </div>
`;

const NewTodo = () => `
  <div class="new-todo" id="newTodo">
    <div class="custom-checkbox">
      ${Checkbox()}
    </div>
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

const Checkbox = () => `
  <svg class="checkbox-icon" viewBox="0 0 24 24">
    <path
      d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
`;

const CheckboxChecked = () => `
  <svg class="checkbox-checked-icon" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </svg>
`;

const Checkboxes = () => `
  <svg class="checkbox-icon" viewBox="0 0 24 24">
    <path
      d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
  <svg class="checkbox-checked-icon" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
    />
  </svg>
`;

export default { Task, NewTodo, Checkbox, CheckboxChecked };
