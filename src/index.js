import './style.css';
import './add-rmv-edit.js';

const todoList = document.getElementById('todo-list');
const lists = JSON.parse(localStorage.getItem('listItem')) || [];

const loadLocalStorage = () => {
  if (lists === null) return;

  const sortedList = lists.slice().sort((a, b) => a.index - b.index);
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

loadLocalStorage();