document.addEventListener('DOMContentLoaded', function () {
  const textBox = document.getElementById('textBox');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('list');
  const awaitingMessage = document.querySelector('.awaiting');

  addTaskBtn.addEventListener('click', function () {
    const newTask = textBox.value.trim();
    if (newTask !== '') {
      addTask(newTask);
      textBox.value = '';
      awaitingMessage.style.display = 'none'; // Hide the awaiting message when tasks are present
    }
  });

  function addTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      <i class="checkmark icon fas fa-check"></i>
      <span class="taskText">${task}</span>
      <button class="deleteBtn"><i class="icon fas fa-x"></i></button>
    `;
    taskList.appendChild(li);

    const taskText = li.querySelector('.taskText');
    const checkmark = li.querySelector('.checkmark');

    // Set initial visibility of the checkmark
    checkmark.style.visibility = 'hidden';

    taskText.addEventListener('click', function () {
      // Toggle strikethrough style
      taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? 'none' : 'line-through';

      // Toggle checkmark visibility based on strikethrough style
      checkmark.style.visibility = taskText.style.textDecoration === 'line-through' ? 'visible' : 'hidden';
    });
  }

  taskList.addEventListener('click', function (event) {
    const target = event.target;
    const li = target.closest('li');

    // Check if the clicked element is a delete button or its child icon
    if (target.classList.contains('deleteBtn') || target.classList.contains('fa-x')) {
      // Remove the task element
      li.remove();

      // Show the awaiting message if there are no tasks
      if (taskList.children.length === 0) {
        awaitingMessage.style.display = 'block';
      }
    }
  });
});