"use strict";

const dark = document.querySelector(".dark-bttn");
const backGroundImg = document.querySelector(".bg-img");
const darkBackGround = document.querySelectorAll(".dark-bg");
const bodyBackGround = document.querySelector(".body-bg");
const darkText = document.querySelectorAll(".color-dark-gray");

const tasksWrapper = document.querySelector(".tasks-wrapper");
const addTaskElement = document.querySelector(".add-task-bttn");
let switchActive = document.querySelectorAll(".active-bttn");

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
let tasks = JSON.parse(localStorage.getItem("tasksList")) || [
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
    taskList.classList.add(
      "task-list",
      "flex-between",
      "cursor-pointer",
      "font-family"
    );

    const checkedBttn = document.createElement("button");
    taskList.appendChild(checkedBttn);
    checkedBttn.classList.add(
      "bi",
      "bi-circle",
      "cursor-pointer",
      "button-base",
      "text-gray"
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
      "button-base",
      "hidden",
      "text-gray"
    );

    const deleteButton = document.createElement("button");
    taskList.appendChild(deleteButton);
    deleteButton.classList.add(
      "cursor-pointer",
      "bi",
      "bi-x",
      "button-base",
      "hidden",
      "text-gray"
    );

    tasksWrapper.prepend(taskList);
  });
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
}

function addTaskToLocalStorage(tasks) {
  window.localStorage.setItem("tasksList", JSON.stringify(tasks));
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

function removeActive() {
  switchActive.forEach((bttnEl) => {
    bttnEl.classList.remove("active");
    this.classList.add("active");
  });
}
