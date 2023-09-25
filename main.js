const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo");
const todoList = new TodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoVal = todoInput.value;
  const newTodoItem = new TodoItem(todoVal);
  createNewTodo(newTodoItem, todoList);
});

function updateListFromStorage() {
  const storedTodoList = loadFromLocalStorage();
  if (storedTodoList) {
    storedTodoList.todos.forEach((item) => {
      createNewTodo(item, todoList);
    });
  }
}
