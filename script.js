let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-content" onclick="toggleTask(${index})">
        <span>${task.text}</span>
        <span class="task-deadline">Deadline: ${task.deadline || "Not set"}</span>
      </div>
      <div class="actions">
        <button class="complete-btn" onclick="toggleTask(${index})">✔</button>
        <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const deadlineInput = document.getElementById("task-deadline");

  const text = input.value.trim();
  const deadline = deadlineInput.value;

  if (text !== "") {
    tasks.push({
      text: text,
      completed: false,
      deadline: deadline
    });

    input.value = "";
    deadlineInput.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
