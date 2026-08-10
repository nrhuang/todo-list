const STORAGE_KEY = 'todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = loadTodos();

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';
  for (const todo of todos) {
    const li = document.createElement('li');
    li.className = todo.done ? 'done' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.id = `todo-${todo.id}`;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = todo.text;

    li.append(checkbox, label);
    list.appendChild(li);
  }
}

function addTodo(text) {
  todos.push({ id: Date.now(), text, done: false });
  saveTodos();
  render();
}

function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    saveTodos();
    render();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = '';
  input.focus();
});

render();
