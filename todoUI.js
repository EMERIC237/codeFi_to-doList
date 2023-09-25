const [COMPLETED, INCOMPLETED] = ["COMPLETED", "NOT-COMPLETE"];
const todoTable = document.getElementById("to-do-table");
const listSection = document.getElementsByClassName("list-display");

const tableBody = todoTable.getElementsByTagName("tbody")[0];

function createNewTodo(todoItem, todoList) {
  // Create a new row, and table cells for the todo item
  const newTr = document.createElement("tr");
  const newtdOne = document.createElement("td");
  const newtdTwo = document.createElement("td");

  // Set the text content of the first cell to the todo value
  newtdOne.innerText = todoItem._title;
  newTr.setAttribute("id", todoItem._id);

  // Create buttons and append them to the second cell
  const buttons = createButtons(
    todoItem._id,
    todoList,
    todoItem.status === COMPLETED
  );
  buttons.forEach((btn) => newtdTwo.appendChild(btn));

  // Append the cells to the row
  newTr.appendChild(newtdOne);
  newTr.appendChild(newtdTwo);

  // Append the row to the table
  const tableBody = todoTable.getElementsByTagName("tbody")[0];
  tableBody.appendChild(newTr);

  // update the todo style
  if (todoItem.status === COMPLETED) {
    newTr.classList.add("completed");
  }
  todoList.add(todoItem);
  // add the todo to the local server
  saveToLocalStorage(todoList);
}

function createButton(textContent, clickCallback, disabled = false) {
  const button = document.createElement("button");
  button.textContent = textContent;
  button.onclick = clickCallback;
  button.disabled = disabled;
  return button;
}

function createButtons(todoId, todoStore, disabled = false) {
  const completeButton = createButton(
    "Complete",
    () => {
      onTodoComplete(todoId, todoStore);
      completeButton.disabled = true;
    },
    disabled
  );

  const deleteButton = createButton("Delete", () => {
    onTodoDelete(todoId, todoStore);
  });

  const editButton = createButton("Edit", () => {
    console.log("Edit button clicked");
  });

  return [completeButton, deleteButton, editButton];
}

function onTodoComplete(todoId, todoStore) {
  console.log(todoStore);
  console.log(todoId);
  todoStore.updateTodoStatus(todoId, COMPLETED);
  const currTodoItem = document.getElementById(todoId);
  currTodoItem.classList.add("completed");
  saveToLocalStorage(todoStore);
  updateEmptyMessageDisplay();
}

function onTodoDelete(todoId, todoStore) {
  todoStore.deleteTodo(todoId);
  const currTodoItem = document.getElementById(todoId);
  currTodoItem.classList.add("deleted");
  saveToLocalStorage(todoStore);
  updateEmptyMessageDisplay();
}

function updateEmptyMessageDisplay() {
  const tableBody = document.querySelector("#to-do-table tbody");
  const emptyMessage = document.getElementById("emptyMessage");

  if (tableBody.childElementCount === 0) {
    emptyMessage.style.display = "block"; // Show the message
  } else {
    emptyMessage.style.display = "none"; // Hide the message
  }
}

function saveToLocalStorage(todoList) {
  window.localStorage.setItem(
    "todoItems",
    JSON.stringify({ todos: todoList.todos })
  );
}

function loadFromLocalStorage() {
  const storedItems = window.localStorage.getItem("todoItems");
  if (storedItems) {
    const parsedItems = JSON.parse(storedItems);
    const todoList = TodoList.fromJson(parsedItems);
    const maxId = Math.max(...todoList.todos.map((todo) => todo.id), 0);
    TodoItem.nextId = maxId + 1;
    return todoList;
  } else {
    return null;
  }
}
