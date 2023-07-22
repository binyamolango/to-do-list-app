const todoList = document.getElementById('todo-list');
const form = document.getElementById('form');
const taskIn = document.getElementById('taskIn');

const addTask = () => {
  const lists = JSON.parse(localStorage.getItem('listItem')) || [];
  if (lists === null) return;

  const sortedList = lists.slice().sort((a, b) => a.index - b.index);
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

const editTask = (e) => {
  const lists = JSON.parse(localStorage.getItem('listItem')) || [];
  const clicked = e.target.closest('.move');
  if (!clicked) return;
  const listNum = +clicked.dataset.remove;
  const filtered = lists.filter((list) => list.index !== listNum);
  let filterOrder = [];
  filtered.forEach((list, count) => {
    list.index = count;
    filterOrder = [...filterOrder, list];
  });
  localStorage.setItem('listItem', JSON.stringify(filterOrder));
  addTask();
};

const removeTask = (e) => {
  const lists = JSON.parse(localStorage.getItem('listItem')) || [];
  const clicked = e.target.closest('.list');
  if (!clicked) return;
  clicked.addEventListener('keyup', () => {
    const listNum = +clicked.dataset.desc;
    const list = lists.find((list) => list.index === listNum);
    list.description = clicked.value;
    localStorage.setItem('listItem', JSON.stringify(lists));
  });
};

const saveLocalStorage = () => {
  const lists = JSON.parse(localStorage.getItem('listItem')) || [];
  const tasksItem = taskIn.value;
  taskIn.value = '';
  if (tasksItem === null) return;
  const list = {
    description: tasksItem,
    completed: false,
    index: lists.length,
  };
  const filtered = [...lists, list];
  localStorage.setItem('listItem', JSON.stringify(filtered));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  saveLocalStorage();
  addTask();
});
todoList.addEventListener('click', editTask);
todoList.addEventListener('click', removeTask);