const bar = (e) => {
  const clicked = e.target.closest('.checkbox');
  if (!clicked) return;
  const listNum = +clicked.dataset.btn;
  const taskList = document.querySelector(`.task-${listNum}`);
  taskList.querySelector('.list').classList.toggle('line');
  taskList.querySelector('.square').classList.toggle('active');
  taskList.querySelector('.done').classList.toggle('active');
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  const taskDone = tasks.find((task) => task.index === listNum);
  taskDone.completed = !taskDone.completed;
  localStorage.setItem('listItems', JSON.stringify(tasks));
};

const clear = () => {
  const tasks = JSON.parse(localStorage.getItem('listItems')) || [];
  const filtered = tasks.filter((task) => task.completed === false);
  let filterOrder = [];
  filtered.forEach((task, count) => {
    task.index = count;
    filterOrder = [...filterOrder, task];
  });
  localStorage.setItem('listItems', JSON.stringify(filterOrder));
};

export { bar, clear };