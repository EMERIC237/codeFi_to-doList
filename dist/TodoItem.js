"use strict";
class TodoItem {
    constructor(title, status = "NOT-COMPLETE", description) {
        this.id = TodoItem.nextId++;
        this.title = title;
        this.description = description;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    setId(newId) {
        this.id = newId;
    }
    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getStatus() {
        return this.status;
    }
    setStatus(newStatus) {
        this.status = newStatus;
    }
    getDescription() {
        return this.description;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    static fromJson(data) {
        const todo = new TodoItem(data.title, data.status, data.description);
        todo.id = data.id;
        return todo;
    }
    static updateNextId(newId) {
        TodoItem.nextId = newId;
    }
}
TodoItem.nextId = 1;
