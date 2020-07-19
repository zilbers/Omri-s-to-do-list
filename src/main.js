const addItem = function (event) {
  let text = document.querySelector("#textInput");
  if (text.value == '') return;
  let priority = document.querySelector("#prioritySelector");
  let listItem = document.createElement("li");
  let viewList = document.querySelector("#viewList");
  let item = {
    todoText: text.value,
    todoCreatedAt: timeAndDate(),
    priority: priority.value,
  };
  listItem.innerHTML = `${item.priority} ${item.todoCreatedAt} ${item.todoText}`;
  viewList.appendChild(listItem);
  text.value = "";
  priority.value = "1";
};

function timeAndDate() {
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return `${date} ${time}`;
}

let sendButton = document.querySelector("#addButton");
sendButton.addEventListener("click", addItem);
