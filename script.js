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
let tasks = JSON.parse(localStorage.getItem("task")) || [
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

    taskList.addEventListener("click", () => {
      taskList.classList.toggle("completed");
    });

    taskList.classList.add(
      "task-list",
      "flex-start",
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
      "button-base"
    );

    const deleteButton = document.createElement("button");
    taskList.appendChild(deleteButton);
    deleteButton.classList.add("cursor-pointer", "bi", "bi-x", "button-base");

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
  //filterTasksEl(filterType);
  addTaskToLocalStorage(tasks);
}

function filterTasksEl(filterType) {
  let filterLists = [];

  switch (filterType) {
    case "all":
      filterLists = tasks;
      break;
    case "active":
      filterLists = tasks.filter(function (task) {
        return !task.completed;
      });
      break;
    case "completed":
      filterLists = tasks.filter(function (task) {
        return task.completed;
      });
      break;
    case "countUncompleted":
      const countUncompletedTasks = tasks.filter(function (task) {
        return !task.completed;
      });
      countUncompleted.innerText = countUncompletedTasks.length;
      break;
  }

  renderTasks(filterLists);
}

function addTaskToLocalStorage(tasks) {
  window.localStorage.setItem("task", JSON.stringify(tasks));
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

allTasks.addEventListener("click", () => {
  filterTasksEl("all");
});
activeTasks.addEventListener("click", () => {
  filterTasksEl("active");
});
completedTasks.addEventListener("click", () => {
  filterTasksEl("completed");
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
