const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-all");
const blossomsContainer = document.querySelector(".blossoms-container");
const butterfliesContainer = document.querySelector(".butterflies-container");
const birdsContainer = document.querySelector(".birds-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  initAnimations();

  addButton.addEventListener("click", addTask);
  clearButton.addEventListener("click", clearAllTasks);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.key === "c" || e.key === "C") && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clearAllTasks();
    }
  });
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${
                      task.completed ? "checked" : ""
                    } 
                           onchange="markDone(${task.id})">
                    <span class="task-text ${
                      task.completed ? "completed" : ""
                    }">${task.text}</span>
                    <button class="delete-button" onclick="deleteTask(${
                      task.id
                    })" aria-label="Delete task">×</button>
                `;
    taskList.appendChild(li);
  });

  updateTaskCounter();
}

// Add a new task
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    // Shake animation for empty input
    taskInput.style.animation = "shake 0.5s";
    setTimeout(() => {
      taskInput.style.animation = "";
    }, 500);
    return;
  }

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  saveToStorage();
  renderTasks();
  taskInput.value = "";

  triggerFlowerBloom();
}

function markDone(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveToStorage();
    renderTasks();

    triggerButterflyFlutter();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveToStorage();
  renderTasks();

  triggerBirdFly();
}

function clearAllTasks() {
  if (tasks.length === 0) return;

  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    saveToStorage();
    renderTasks();

    triggerBlossomShower();
  }
}

function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCounter() {
  const pendingCount = tasks.filter((t) => !t.completed).length;
  taskCounter.textContent = `You have ${pendingCount} task${
    pendingCount !== 1 ? "s" : ""
  } pending`;
}

function initAnimations() {
  for (let i = 0; i < 15; i++) {
    createBlossom();
  }

  for (let i = 0; i < 5; i++) {
    createButterfly();
  }

  for (let i = 0; i < 3; i++) {
    createBird();
  }
}

function createBlossom() {
  const blossom = document.createElement("div");
  blossom.className = "blossom";
  blossom.style.left = Math.random() * 100 + "vw";
  blossom.style.animation = `fall ${5 + Math.random() * 5}s linear infinite`;
  blossom.style.animationDelay = Math.random() * 5 + "s";
  blossomsContainer.appendChild(blossom);
}

function createButterfly() {
  const butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  butterfly.style.left = Math.random() * 100 + "vw";
  butterfly.style.top = Math.random() * 100 + "vh";
  butterfly.style.animation = `flutter ${
    4 + Math.random() * 2
  }s ease-in-out infinite`;
  butterfly.style.animationDelay = Math.random() * 4 + "s";
  butterfliesContainer.appendChild(butterfly);
}

function createBird() {
  const bird = document.createElement("div");
  bird.className = "bird";
  bird.style.top = Math.random() * 50 + 10 + "vh";
  bird.style.animation = `fly ${8 + Math.random() * 4}s linear infinite`;
  bird.style.animationDelay = Math.random() * 8 + "s";
  birdsContainer.appendChild(bird);
}

function triggerFlowerBloom() {
  const flower = document.createElement("div");
  flower.className = "flower";
  flower.style.left = "50%";
  flower.style.top = "50%";
  flower.style.transform = "translate(-50%, -50%)";
  flower.style.animation = "flowerBloom 2s ease-out forwards";

  document.body.appendChild(flower);

  setTimeout(() => {
    document.body.removeChild(flower);
  }, 2000);
}

function triggerButterflyFlutter() {
  const butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  butterfly.style.left = Math.random() * 100 + "vw";
  butterfly.style.top = Math.random() * 100 + "vh";
  butterfly.style.animation = `flutter 2s ease-in-out forwards`;

  butterfliesContainer.appendChild(butterfly);

  setTimeout(() => {
    butterfliesContainer.removeChild(butterfly);
  }, 2000);
}

function triggerBirdFly() {
  const bird = document.createElement("div");
  bird.className = "bird";
  bird.style.top = Math.random() * 50 + 25 + "vh";
  bird.style.animation = `fly 3s linear forwards`;

  birdsContainer.appendChild(bird);

  setTimeout(() => {
    birdsContainer.removeChild(bird);
  }, 3000);
}

function triggerBlossomShower() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const blossom = document.createElement("div");
      blossom.className = "blossom";
      blossom.style.left = Math.random() * 100 + "vw";
      blossom.style.animation = `fall 3s linear forwards`;

      blossomsContainer.appendChild(blossom);

      setTimeout(() => {
        if (blossom.parentNode) {
          blossomsContainer.removeChild(blossom);
        }
      }, 3000);
    }, i * 100);
  }
}
