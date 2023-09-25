class TodoItem {
  static possibleStatus = ["COMPLETED", "NOT-COMPLETE"];
  static nextId = 1;

  constructor(title, status = "NOT-COMPLETE", description = "") {
    this._id = TodoItem.nextId++;
    this._title = title;
    this._description = description;
    this.status = status;
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    this._title = newTitle;
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    if (!TodoItem.isValidStatus(newStatus)) {
      console.error("Invalid todo status");
    } else {
      this._status = newStatus;
    }
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  static isValidStatus(status) {
    return TodoItem.possibleStatus.includes(status);
  }
  
  static fromJson(data) {
    const todo = new TodoItem(data._title, data._status, data._description);
    todo._id = data._id;
    return todo;
  }
}
