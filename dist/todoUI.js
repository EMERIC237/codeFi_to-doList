"use strict";
const todoTable = document.getElementById("to-do-table");
const listSection = document.getElementsByClassName("list-display");
const tableBody = todoTable.querySelector("tbody");
const COMPLETED_STATUS = "COMPLETED";
function createNewTodo(todoItem, todoList) {
    const newTr = document.createElement("tr");
    const newtdOne = document.createElement("td");
    const newtdTwo = document.createElement("td");
    newtdOne.textContent = todoItem.getTitle();
    newTr.id = todoItem.getId().toString();
    const buttons = createButtons(todoItem.getId(), todoList, todoItem.getStatus() === COMPLETED_STATUS);
    buttons.forEach((btn) => newtdTwo.appendChild(btn));
    newTr.append(newtdOne, newtdTwo);
    if (todoItem.getStatus() === COMPLETED_STATUS) {
        newTr.classList.add("completed");
    }
    tableBody.appendChild(newTr);
    todoList.add(todoItem);
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
    const completeButton = createButton("Complete", () => {
        onTodoComplete(todoId, todoStore);
        completeButton.disabled = true;
    }, disabled);
    const deleteButton = createButton("Delete", () => {
        onTodoDelete(todoId, todoStore);
    });
    const editButton = createButton("Edit", () => {
        console.log("Edit button clicked");
    });
    return [completeButton, deleteButton, editButton];
}
function onTodoComplete(todoId, todoStore) {
    todoStore.updateTodoStatus(todoId, "COMPLETED");
    const currTodoItem = document.getElementById(todoId.toString());
    currTodoItem.classList.add("completed");
    saveToLocalStorage(todoStore);
    updateEmptyMessageDisplay();
}
function onTodoDelete(todoId, todoStore) {
    todoStore.deleteTodo(todoId);
    const currTodoItem = document.getElementById(todoId.toString());
    currTodoItem.classList.add("deleted");
    saveToLocalStorage(todoStore);
    updateEmptyMessageDisplay();
}
function updateEmptyMessageDisplay() {
    const emptyMessage = document.getElementById("emptyMessage");
    if (!tableBody.hasChildNodes()) {
        emptyMessage.style.display = "block";
    }
    else {
        emptyMessage.style.display = "none";
    }
}
function saveToLocalStorage(todoList) {
    window.localStorage.setItem("todoItems", JSON.stringify({ todos: todoList.todos }));
}
function loadFromLocalStorage() {
    const storedItems = window.localStorage.getItem("todoItems");
    if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        const todoList = TodoList.fromJson(parsedItems);
        const maxId = Math.max(...todoList.todos.map((todo) => todo.getId()), 0);
        TodoItem.updateNextId(maxId + 1);
        return todoList;
    }
    else {
        return null;
    }
}
