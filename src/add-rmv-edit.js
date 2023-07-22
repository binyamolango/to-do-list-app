const todoList = document.getElementById('todo-list');
const form = document.getElementById('form');
const taskIn = document.getElementById('taskIn');

const displayTask = () => {
  const tasks = JSON.parse(localStorage.getItem('listItem')) || [];
  if (tasks === null) return;

  const sortedList = tasks.slice().sort((a, b) => a.index - b.index);
  todoList.innerHTML = '';
  sortedList.forEach((task) => {
    const list = `
        <div class="task task-${task.index}">
            <input type="checkbox" data-btn="${task.index}">
            <input type="text" class="list" value="${task.description}" data-desc="${task.index}">
            <button class="move" data-remove="${task.index}"></button>
        </div>
    `;
    todoList.insertAdjacentHTML('beforeend', list);
  });
};

const saveLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem('listItem')) || [];
  const tasksItem = taskIn.value;
  taskIn.value = '';
  if (tasksItem === null) return;
  const task = {
    description: tasksItem,
    completed: false,
    index: tasks.length,
  };
  const filtered = [...tasks, task];
  localStorage.setItem('listItem', JSON.stringify(filtered));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  saveLocalStorage();
  displayTask();
});

todoList.addEventListener('click', (e) => {
  const clicked = e.target.closest('.move');
  if (!clicked) return;
  const tasks = JSON.parse(localStorage.getItem('listItem')) || [];
  const listNum = +clicked.dataset.remove;
  const filtered = tasks.filter((task) => task.index !== listNum);
  let filterOrder = [];
  filtered.forEach((task, count) => {
    task.index = count;
    filterOrder = [...filterOrder, task];
  });
  localStorage.setItem('listItem', JSON.stringify(filterOrder));
  displayTask();
});

todoList.addEventListener('click', (e) => {
  const clicked = e.target.closest('.list');
  if (!clicked) return;
  clicked.addEventListener('keyup', () => {
    const tasks = JSON.parse(localStorage.getItem('listItem')) || [];
    const listNum = +clicked.dataset.desc;
    const task = tasks.find((task) => task.index === listNum);
    task.description = clicked.value;
    localStorage.setItem('listItem', JSON.stringify(tasks));
  });
});