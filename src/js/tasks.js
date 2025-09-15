import swal from 'sweetalert';
import refs from './refs';
import { nanoid } from 'nanoid';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from './local-storage-api';
import { markupTasksAdd } from './markup-tasks';

// перевірка local storage та відмалювання карток
const KEY_TASKLIST = 'taskList';
let taskArr = getLocalStorage(KEY_TASKLIST) || [];
if (getLocalStorage(KEY_TASKLIST)) {
  taskArr.forEach(({ taskName, taskDescription, id }) => {
    markupTasksAdd(refs.list, taskName, taskDescription, id);
  });
}

const KEY_THEME = 'theme';
let themArr = getLocalStorage(KEY_THEME) || '[]';
if (getLocalStorage(KEY_THEME)) {
  refs.body.classList.replace('theme-dark', 'theme-light');
}

// додавання нової картки
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(refs.form);
  const taskName = formData.get('taskName').trim();
  const taskDescription = formData.get('taskDescription').trim();
  if (!taskName || !taskDescription) {
    swal({
      title: 'Нотатка не додана!',
      text: 'Ви не заповнили всі поля!',
      icon: 'error',
    });
    return;
  }
  const taskObj = { taskName, taskDescription, id: nanoid() };
  taskArr.push(taskObj);
  setLocalStorage(KEY_TASKLIST, taskArr);
  markupTasksAdd(refs.list, taskName, taskDescription);
  refs.form.reset();
});

// видалення картки
refs.list.addEventListener('click', event => {
  const btn = event.target.closest('.task-list-item-btn');
  if (!btn) {
    return;
  }
  const taskId = btn.dataset.id;
  const parentItem = btn.closest('.task-list-item');
  if (parentItem) {
    taskArr = taskArr.filter(el => el.id !== taskId);
    setLocalStorage(KEY_TASKLIST, taskArr);
    parentItem.remove();
  }
});

// зміна теми
refs.btnToggle.addEventListener('click', () => {
  if (refs.body.classList.contains('theme-dark')) {
    refs.body.classList.replace('theme-dark', 'theme-light');
    setLocalStorage(KEY_THEME, [1]);
  } else {
    refs.body.classList.replace('theme-light', 'theme-dark');
    removeLocalStorage(KEY_THEME);
  }
});
