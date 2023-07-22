const todoList = document.getElementById('tasks');
const form = document.getElementById('form');
const taskIn = document.getElementById('taskInput');

const updateList = () => {
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  if (tasks === null) return;
  const sortedList = tasks.slice().sort((a, b) => a.index - b.index);
  todoList.innerHTML = '';
  sortedList.forEach((task) => {
    const { completed } = task;
    const checked = completed ? 'active' : '';
    const lineT = completed ? 'line' : '';
    const unfinished = !completed ? 'active' : '';
    const list = `
        <div class="task task-${task.index}">
          <div class="checkbox" data-btn="${task.index}">
            <button class="square ${unfinished}"></button>
            <button class="done ${checked}"></button>
          </div>
          <input type="text" class="list ${lineT}" value="${task.description}" data-desc="${task.index}"/>
          <button class="move" data-remove="${task.index}"></button>
        </div>
      `;
    todoList.insertAdjacentHTML('beforeend', list);
  });
};

const addTask = (e) => {
  e.preventDefault();
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  const tasksItem = taskIn.value;
  taskIn.value = '';
  if (tasksItem === null) return;
  const task = {
    description: tasksItem,
    completed: false,
    index: tasks.length,
  };
  const filtered = [...tasks, task];
  localStorage.setItem('listItems', JSON.stringify(filtered));
  updateList();
};
form.addEventListener('submit', addTask);

const removeTask = (e) => {
  const clicked = e.target.closest('.move');
  if (!clicked) return;
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  const listNum = +clicked.dataset.remove;
  const filtered = tasks.filter((task) => task.index !== listNum);
  let filterOrder = [];
  filtered.forEach((task, count) => {
    task.index = count;
    filterOrder = [...filterOrder, task];
  });
  localStorage.setItem('listItems', JSON.stringify(filterOrder));
  updateList();
};
todoList.addEventListener('click', removeTask);

const editTask = (e) => {
  const clicked = e.target.closest('.list');
  if (!clicked) return;
  clicked.addEventListener('keyup', () => {
    const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
    const listNum = +clicked.dataset.desc;
    const task = tasks.find((task) => task.index === listNum);
    task.description = clicked.value.trim();
    localStorage.setItem('listItems', JSON.stringify(tasks));
  });
};
todoList.addEventListener('click', editTask);

export default updateList;