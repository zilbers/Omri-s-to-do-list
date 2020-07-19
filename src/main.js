const addItem = function () {
  let text = document.querySelector("#textInput");
  if (text.value == "") return;
  let priority = document.querySelector("#prioritySelector");
  let itemContainer = document.createElement("div");
  let viewList = document.querySelector("#view");
  let item = {
    todoText: text.value,
    todoCreatedAt: timeAndDate(),
    todoPriority: priority.value,
  };
  for (const property in item) {
    let itemDiv = document.createElement("div");
    itemDiv.classList = property;
    itemDiv.innerHTML = item[property];
    itemContainer.appendChild(itemDiv);
    console.log(`${property}: ${item[property]}`);
  }
  viewList.appendChild(itemContainer);
  text.value = "";
  priority.value = "1";
  counter(counterNum ++);
};

function timeAndDate() {
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return `${date} ${time}`;
}

function counter(tasksLeft){
    let counterElem = document.querySelector('#displayLeft');
    counterElem.innerHTML = `${tasksLeft} TODO's left! `;
}

const sortItems = function (){
    let taskLeft = document.querySelector('#displayLeft');
}

let counterNum = 1;
let sendButton = document.querySelector("#addButton");
sendButton.addEventListener("click", addItem);
