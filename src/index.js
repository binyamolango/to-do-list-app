import './style.css';

const todoList = document.getElementById('todo-list');
const lists = [
  {
    index: 1,
    description: 'Wash clothes',
    completed: true,
  },
  {
    index: 2,
    description: 'Cook dinner',
    completed: false,
  },
  {
    index: 3,
    description: 'Coding challenge',
    completed: false,
  },
  {
    index: 4,
    description: 'TAWG',
    completed: true,
  },
];

const listItemDisplay = () => {
  lists.forEach((list) => {
    todoList.innerHTML += `
        <div class="task">
            <input type="checkbox">
            <div class="list">${list.description}</div>
            <button class="move" type="button"></button>
        <div>
        `;
  });
};

listItemDisplay();