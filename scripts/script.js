const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const taskInput = document.getElementById('task');
const notDoneCounter = document.getElementById('notDoneCounter');
const doneCounter = document.getElementById('doneCounter');

let notDoneCount = 0;
let doneCount = 0;

function updateCounter() {
  notDoneCounter.textContent = notDoneCount;
  doneCounter.textContent = doneCount;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
            <input type="checkbox">
            <span class="task-text">${taskText}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
    notDoneCount++;
    updateCounter();
    addCheckboxListener(taskItem);
  }
}

function deleteTask(deleteButton) {
  const taskItem = deleteButton.parentElement;
  const parentList = taskItem.parentElement;
  parentList.removeChild(taskItem);

  const checkbox = taskItem.querySelector("input[type='checkbox']");
  if (checkbox.checked) {
    doneCount--;
  } else {
    notDoneCount--;
  }

  updateCounter();
}

function addCheckboxListener(taskItem) {
  const checkbox = taskItem.querySelector("input[type='checkbox']");
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      taskList.removeChild(taskItem);
      completedTaskList.appendChild(taskItem);
      notDoneCount--;
      doneCount++;
    } else {
      completedTaskList.removeChild(taskItem);
      taskList.appendChild(taskItem);
      doneCount--;
      notDoneCount++;
    }

    updateCounter();
  });
}

taskInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
