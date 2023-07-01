// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const priorityInput = document.getElementById("priority-input");
  const deadlineInput = document.getElementById("deadline-input");

  const taskName = taskInput.value;
  const priority = parseInt(priorityInput.value);
  const deadline = deadlineInput.value || getDefaultDeadline();

  if (taskName && priority >= 1 && priority <= 5) {
    const task = {
      name: taskName,
      priority: priority,
      deadline: deadline,
      emoji: getRandomEmoji()
    };

    tasks.push(task);
    renderTasks();
    
    // Clear input fields
    taskInput.value = "";
    priorityInput.value = "";
    deadlineInput.value = "";
  }
}


// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  // Sort tasks based on priority
  tasks.sort((a, b) => a.priority - b.priority);

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task");

    const taskInfo = document.createElement("span");
    taskInfo.textContent = `${task.name} (Priority: ${task.priority}, Deadline: ${task.deadline})`;

    const emoji = document.createElement("span");
    emoji.textContent = task.emoji;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(index));

    actions.appendChild(deleteBtn);
    actions.appendChild(editBtn);

    listItem.appendChild(taskInfo);
    listItem.appendChild(emoji);
    listItem.appendChild(actions);

    taskList.appendChild(listItem);
  });
}


// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const task = tasks[index];
  const newName = prompt("Enter a new task name:", task.name);
  if (newName) {
    task.name = newName;
    renderTasks();
  }
}

// Function to generate a random emoji
function getRandomEmoji() {
  const emojis = ["😊", "🚀", "🎉", "✨", "🌟", "📝", "📌", "🔥", "🌈", "⭐️"];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

// Function to get default deadline (2 days from today)
function getDefaultDeadline() {
  const today = new Date();
  const twoDaysLater = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
  return twoDaysLater.toISOString().split("T")[0];
}

// Initial rendering of tasks
renderTasks();
