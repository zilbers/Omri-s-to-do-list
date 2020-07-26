/** Adds the input of the user to the view section of the HTML
 * @text {string} The user's input
 * @priority {number} The priority of the task
 * @itemContainer {div} New element to place the new task within
 * @item {object} object which contains all the relevant data on the task
 */
const addNewTask = function () {
  let text = document.querySelector("#textInput");
  if (text.value == "") return;
  let priority = document.querySelector("#prioritySelector");
  let item = {
    todoText: text.value,
    todoCreatedAt: timeAndDate(),
    todoPriority: priority.value,
  };
  printItems(item);
  text.value = "";
  priority.value = "1";
  counterNum++;
  counter(counterNum);
};

/** Sorts the tasks that already have been entered
 * @sortItems {nodeList} nodeList of all the items entered
 * @sortItemsArray {array} Array of the nodeList
 */
const sortItems = function () {
  let sortItemsArray = nodeListToArray(".sort");
  let viewList = document.querySelector("#view");
  viewList.innerHTML = "";
  sortItemsArray.sort((b, a) => a.classList.value[0] - b.classList.value[0]);
  for (let item of sortItemsArray) {
    viewList.appendChild(item);
  }
  console.log(sortItemsArray);
};

/** Strikes an item the users marks
 * @param {*} event the event that calls the function
 */
const taskDone = function (event) {
  let itemToStrike = event.target.closest(".sort");
  if (!itemToStrike) return;
  if (itemToStrike.classList[2] == "strike") {
    itemToStrike.classList.remove("strike");
    counterNum++;
    counter(counterNum);
  } else {
    itemToStrike.classList.add("strike");
    counterNum--;
    counter(counterNum);
  }
  return counterNum;
  console.log(itemToStrike.classList);
};

/** Deletes marked tasks
 * @tasksDelete {nodeList} nodeList of all the marked tasks
 */
const deleteTasks = function () {
  let tasksDelete = nodeListToArray(".strike");
  for (let task of tasksDelete) {
    task.remove();
  }
};

/** Opens and closes the navbar
 */
const openCloseNavbar = function () {
  let navbar = document.querySelector("#navbarDiv");
  navbar.hidden = navbar.hidden ? false : true;
};

/** Searches for input in page
 */
const searchInWindow = function () {
  let searchValue = document.querySelector("#navInput");
  window.find(searchValue.value);
  searchValue.value = "";
};

/** Creates select element to change priority
 * @param {*} event the elem that sets the event
 */
const changePriority = function (event) {
  let element = event.target;
  if (element.classList[0] != "todoPriority") return;
  console.log(element);
  document.removeEventListener("click", taskDone);
  let selectPriority = document.createElement("input");
  selectPriority.type = "number";
  selectPriority.min = 1;
  selectPriority.max = 5;
  selectPriority.value = element.innerHTML;
  selectPriority.classList = "priorityInput";
  element.innerHTML = "";
  element.appendChild(selectPriority);
  selectPriority.addEventListener("keypress", printNewPriority);
  console.log(element.parentElement);
};

/** Prints the new value for priority
 * @param {*} event
 */
const printNewPriority = function (event) {
  if (event.key !== "Enter") return;
  let element = event.target;
  let grandParent = element.parentElement.parentElement;
  let value = element.value;
  element.parentElement.innerHTML = value;
  grandParent.className = `${value} sort`;
  console.log(grandParent.classList);
  element.removeEventListener("keypress", printNewPriority);
  document.addEventListener("click", taskDone);
};

const openHelp = function () {
  let help = document.querySelector("#help");
  help.hidden = help.hidden ? false : true;
};

/** Transforms nodeList to an array
 * @param {*} itemName the item name to transform
 * @returns and array
 */
function nodeListToArray(itemName) {
  let nodeList = document.querySelectorAll(itemName);
  return Array.prototype.slice.call(nodeList);
}

/** Prints item to view section
 * @viewList The view section
 * @param {*} item object which contains all the relevant data on the task
 */
function printItems(item) {
  let priority = document.querySelector("#prioritySelector");
  let itemContainer = document.createElement("div");
  let viewList = document.querySelector("#view");
  for (const property in item) {
    let itemDiv = document.createElement("div");
    itemDiv.classList = property;
    itemDiv.classList.add("rail");
    itemDiv.innerHTML = item[property];
    itemContainer.appendChild(itemDiv);
    console.log(`${property}: ${item[property]}`);
  }
  itemContainer.classList = priority.value;
  itemContainer.classList.add("sort");
  viewList.appendChild(itemContainer);
}

/** Sends back string formatted in MySQL time and date format
 * @param {object} today is the time when eventListener was dispatched
 * @returns {string} formatted in YYY-MM-DD HH:MI:SS
 */
function timeAndDate() {
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return `${date} ${time}`;
}

/** Prints how many tasks left to do
 * @param {*} tasksLeft number who represents how many tasks left to do
 */
function counter(tasksLeft) {
  let counterElem = document.querySelector("#counter");
  counterElem.innerHTML = tasksLeft;
}

/** Saves data to local storage for next use
 * takes an array of all the input tasks, saves it in string
 * takes the counter and saves how many tasks left to do
 */
const setData = function () {
  let tasks = nodeListToArray(".sort");
  let tasksString = "";
  console.log(tasks);
  for (let item of tasks) {
    let priority = item.classList[0];
    tasksString += `<div class="${priority} sort">${item.innerHTML}</div>`;
  }
  console.log(tasksString);
  localStorage.setItem("tasks", tasksString);
  localStorage.setItem("counter", counterNum);
  console.log(localStorage.getItem("tasks"));
};

/** Retrieves the last data the user saved
 * @returns the last number counter was at
 */
function getData() {
  let tasks = localStorage.getItem("tasks");
  let counterNum = localStorage.getItem("counter");
  counter(counterNum);
  let printSec = document.querySelector("#view");
  printSec.innerHTML = tasks;
  return counterNum;
}

/** Finds and sets eventListener on an element
 * @param {*} elem Target element
 * @param {*} eventType The type of event to listen to
 * @param {*} eventFunc The function to activate on event
 */
function myQueryAndEventListener(elem, eventType, eventFunc) {
  let item = document.querySelector(elem);
  item.addEventListener(eventType, eventFunc);
}

let counterNum = 0;
counterNum = getData();
myQueryAndEventListener("#addButton", "click", addNewTask);
myQueryAndEventListener("#sortButton", "click", sortItems);
myQueryAndEventListener("#deleteButton", "click", deleteTasks);
myQueryAndEventListener("#saveButton", "click", setData);
myQueryAndEventListener("#openNavbarArrow", "click", openCloseNavbar);
myQueryAndEventListener("#closeNavbarArrow", "click", openCloseNavbar);
myQueryAndEventListener("#searchButton", "click", searchInWindow);
myQueryAndEventListener("#helpButton", "click", openHelp);
document.addEventListener("mouseover", changePriority);
document.addEventListener("click", taskDone);
