import './style.css';
import displayList from './add-rmv-edit.js';
import { bar, clear } from './clear-interaction.js';

const taskList = document.getElementById('tasks');
taskList.addEventListener('click', bar);

const clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', () => {
  clear();
  displayList();
});

displayList();