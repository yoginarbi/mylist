function updateDateTime() {
	let now = new Date();
	let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
	let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
	document.getElementById("date").innerText = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
	document.getElementById("time").innerText = now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

function loadTodos() {
	const todos = JSON.parse(localStorage.getItem("todos")) || [];
	todos.forEach((task) => addTodoToDOM(task));
}
loadTodos();

todoForm.addEventListener("submit", function (event) {
	event.preventDefault();
	let task = todoInput.value;
	if (task) {
		addTodoToDOM(task);
		saveTodos();
		todoInput.value = "";
	}
});

function addTodoToDOM(task) {
	const li = document.createElement("li");
	li.textContent = task;
	li.style.whiteSpace = "pre-line";
	li.style.textAlign = "left";
	li.style.width = "1000px";

	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Delete";
	deleteBtn.classList.add("delete-btn");
	deleteBtn.addEventListener("click", function () {
		li.remove();
		saveTodos();
	});

	li.appendChild(deleteBtn);
	todoList.appendChild(li);
}

function saveTodos() {
	const todos = Array.from(document.querySelectorAll(".todo-list li")).map((li) => li.firstChild.textContent);
	localStorage.setItem("todos", JSON.stringify(todos));
}
