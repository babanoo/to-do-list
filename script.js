"use strict";

const dark = document.querySelector(".dark-bttn");
const backGroundImg = document.querySelector(".bg-img");
const darkBackGround = document.querySelectorAll(".dark-bg");
const bodyBackGround = document.querySelector(".body-bg");
const darkText = document.querySelectorAll(".color-dark-gray");

const tasksWrapper = document.querySelector(".tasks-wrapper");
const addTaskElement = document.querySelector(".add-task-bttn");
const allTasks = document.querySelector("#all");
const activeTasks = document.querySelector("#active");
const completedTasks = document.querySelector("#completed");
const countUncompleted = document.querySelector(".uncompleted-items");
const switchActive = document.querySelectorAll(".active-bttn");
const clearCompleted = document.querySelector(".clear-completed");

/*--------DARK MODE--------*/
const userThemePreference = localStorage.getItem("theme");

function toggleDarkTheme() {
  bodyBackGround.classList.toggle("dark-theme");

  darkText.forEach((el) => {
    el.classList.toggle("bg-dark");
  });

  darkBackGround.forEach((el) => {
    el.classList.toggle("bg-dark");
  });
}

if (userThemePreference === "dark") {
  toggleDarkTheme();
}

dark.addEventListener("click", () => {
  toggleDarkTheme();

  const currentTheme = bodyBackGround.classList.contains("dark-theme")
    ? "dark"
    : "light";

  localStorage.setItem("theme", currentTheme);
});

/*---------ADD TASKS--------*/
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  {
    id: "t4",
    title: "task four",
    completed: false,
  },
  {
    id: "t3",
    title: "task three",
    completed: false,
  },
  {
    id: "t2",
    title: "task two",
    completed: false,
  },
  {
    id: "t1",
    title: "task one",
    completed: false,
  },
];
renderTasks(tasks);

function renderTasks(task) {
  tasksWrapper.innerHTML = "";
  task.forEach((task) => {
    const taskList = document.createElement("div");

    if (task.completed) {
      taskList.classList.add("completed");
    }

    taskList.addEventListener("click", function () {
      task.completed = !task.completed;
      taskList.classList.toggle("completed");
      addTaskToLocalStorage();
      uncompletedItems();
    });

    taskList.classList.add(
      "task-list",
      "flex-start",
      "cursor-pointer",
      "font-family"
    );

    const taskContent = document.createElement("p");
    taskContent.appendChild(document.createTextNode(task.title));
    taskList.appendChild(taskContent);
    taskContent.classList.add("task-content", "flex-grow-1", "dark-text");

    const editeButton = document.createElement("button");
    taskList.appendChild(editeButton);
    editeButton.classList.add(
      "cursor-pointer",
      "bi",
      "bi-pencil",
      "button-base"
    );
    editeButton.addEventListener("click", () => editTask(task));

    const deleteButton = document.createElement("button");
    taskList.appendChild(deleteButton);
    deleteButton.classList.add("cursor-pointer", "bi", "bi-x", "button-base");
    deleteButton.addEventListener("click", () => deleteTask(taskList, task.id));

    tasksWrapper.prepend(taskList);
  });
  uncompletedItems();
}

function createNewTask(taskText) {
  const newTask = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  tasks.push(newTask);
  renderTasks(tasks);
  addTaskToLocalStorage(tasks);
  filterTasks("completed");
}

function addTaskToLocalStorage() {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function uncompletedItems() {
  const CountItemsUncompleted = tasks.filter((task) => !task.completed).length;
  countUncompleted.textContent = CountItemsUncompleted;
}

function editTask(task) {
  const newText = prompt("Edit task:", task.title);
  if (newText !== null && newText.trim() !== "") {
    tasks = tasks.map((taskEL) => {
      if (taskEL.id === task.id) {
        return { ...taskEL, title: newText.trim(), completed: task.completed };
      }
      return taskEL;
    });
  }
  addTaskToLocalStorage();
  renderTasks(tasks);
}

function deleteTask(taskElement, taskId) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    tasks = tasks.filter((task) => task.id !== taskId);
    addTaskToLocalStorage();
    taskElement.remove();
    uncompletedItems();
  }
}

function removeActive() {
  switchActive.forEach((bttnEl) => {
    bttnEl.classList.remove("active");
    this.classList.add("active");
  });
}

function filterTasks(filterType) {
  let filteredTasks;
  switch (filterType) {
    case "active":
      filteredTasks = tasks.filter((task) => !task.completed);
      break;
    case "completed":
      filteredTasks = tasks.filter((task) => task.completed);
      break;
    default:
      filteredTasks = tasks;
  }
  renderTasks(filteredTasks);
}

function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  addTaskToLocalStorage();
  renderTasks(tasks);
}

addTaskElement.addEventListener("click", () => {
  const promptMsgTask = prompt("Enter Task");
  if (promptMsgTask.trim() !== "") {
    createNewTask(promptMsgTask);
  } else {
    alert("😮 Task cannot be empty!");
    return false;
  }
});

switchActive.forEach((bttnEl) => {
  bttnEl.addEventListener("click", removeActive);
});

allTasks.addEventListener("click", () => filterTasks("all"));
activeTasks.addEventListener("click", () => filterTasks("active"));
completedTasks.addEventListener("click", () => filterTasks("completed"));
clearCompleted.addEventListener("click", clearCompletedTasks);
