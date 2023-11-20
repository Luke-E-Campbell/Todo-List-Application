const textBox = document.getElementById('textBox');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const awaitingMessage = document.querySelector('.awaiting');

// Function for clicking on textbox
addTaskBtn.addEventListener('click', addNewTask);

// Function for handling keydown event on the textbox
textBox.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addNewTask();
  }
});

function addNewTask() {
  // Get text content from the textbox and save to newTask
  const newTask = textBox.value.trim();
  if (newTask !== '') {
    // addTask Function creates
    addTask(newTask);

    // Set textbox to empty after hitting add task button
    textBox.value = '';

    // Hide the awaiting message when tasks are present
    awaitingMessage.style.display = 'none';
  }
}

// Function that adds new task
function addTask(task) {
  const li = document.createElement('li');
  li.innerHTML = `
      <i class="checkmark icon fas fa-check"></i>
      <span class="taskText">${task}</span>
      <button class="deleteBtn"><i class="icon fas fa-x"></i></button>
    `;
// Add the slide-down animation class
  li.classList.add('slide-down');

  taskList.appendChild(li);

  // Trigger reflow to apply the initial styles before adding the 'show' class
  li.offsetHeight;

  // Add the 'show' class to trigger the animation
  li.classList.add('show');

  const taskText = li.querySelector('.taskText');
  const checkmark = li.querySelector('.checkmark');

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
