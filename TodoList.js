class TodoList {
  constructor() {
    this.todos = [];
  }

  add(todoItem) {
    this.todos.push(todoItem);
  }

  getById(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }

  updateTodo(oldTodoItem, newTodoItem) {
    const index = this.todos.indexOf(oldTodoItem);
    if (index !== -1) {
      this.todos[index] = newTodoItem;
    } else {
      console.error("Todo not found for update");
    }
  }

  updateTodoStatus(todoItemId, newStatus) {
    const currTodoItem = this.getById(todoItemId);
    if (currTodoItem) {
      currTodoItem.status = newStatus;
    } else {
      console.error("Todo not found for update");
    }
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo._id !== todoId);
  }

  static fromJson(data) {
    const list = new TodoList();
    data.todos.forEach((todoData) => {
      list.todos.push(TodoItem.fromJson(todoData));
    });
    return list;
  }
}
