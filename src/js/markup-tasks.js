export const markupTasksAdd = (el, title, text, id) => {
  el.insertAdjacentHTML(
    'beforeend',
    `<li class="task-list-item">
      <button data-id="${id}" class="task-list-item-btn">Delete</button>
      <h3>${title}</h3>
      <p>${text}</p>
    </li>`
  );
};

