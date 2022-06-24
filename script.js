"use strict";

const form_elem = document.getElementById('form');
const input_elem = document.getElementById('input');
const todos_elem = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form_elem.addEventListener("submit", (event) => {
    event.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todo_text = input_elem.value;

    if (todo) {
        todo_text = todo.text;
    }

    if (todo_text) {
        const new_todo_elem = document.createElement("li");
        if (todo && todo.completed) {
            new_todo_elem.classList.add("completed");
        }
        new_todo_elem.innerHTML = todo_text;

        new_todo_elem.addEventListener("click", (event) => {
            event.preventDefault();
            new_todo_elem.classList.toggle("completed");
            updateLS();
        });

        new_todo_elem.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            new_todo_elem.remove();
            updateLS();
        });

        todos_elem.appendChild(new_todo_elem);

        input_elem.value = "";

        updateLS();
    }
}

function updateLS() {
    const todo_elems = document.querySelectorAll('li');
    const todos = [];

    todo_elems.forEach(todo_elems => {
        todos.push({
            text: todo_elems.innerText,
            completed: todo_elems.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}