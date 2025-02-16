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
const clearAllBtn = document.createElement("button");

clearAllBtn.textContent = "Hapus Semua";
clearAllBtn.classList.add("delete-btn");
clearAllBtn.style.marginTop = "10px";
clearAllBtn.style.backgroundColor = "darkred";
clearAllBtn.style.width = "150px";
clearAllBtn.style.display = "block";
clearAllBtn.style.margin = "auto";
clearAllBtn.addEventListener("click", function () {
	localStorage.removeItem("todos");
	todoList.innerHTML = "";
});

todoList.after(clearAllBtn);

function loadTodos() {
	const todos = JSON.parse(localStorage.getItem("todos")) || [];
	todos.forEach(({ text, done }) => addTodoToDOM(text, done));
}
loadTodos();

todoForm.addEventListener("submit", function (event) {
	event.preventDefault();
	let task = todoInput.value.trim();
	if (task) {
		addTodoToDOM(task);
		saveTodos();
		todoInput.value = "";
	}
});

function addTodoToDOM(task, done = false) {
	const li = document.createElement("li");

	const textSpan = document.createElement("span");
	textSpan.textContent = task;
	textSpan.style.flexGrow = "1";
	textSpan.style.whiteSpace = "pre-line";
	textSpan.style.textAlign = "left";
	if (done) textSpan.style.textDecoration = "line-through";

	const buttonContainer = document.createElement("div");
	buttonContainer.style.display = "flex";
	buttonContainer.style.gap = "10px";

	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Delete";
	deleteBtn.classList.add("delete-btn");
	deleteBtn.addEventListener("click", function () {
		li.remove();
		saveTodos();
	});

	const centangBtn = document.createElement("button");
	centangBtn.textContent = "Done";
	centangBtn.classList.add("centang-btn");
	centangBtn.style.backgroundColor = "green";
	centangBtn.style.color = "white";
	centangBtn.style.border = "none";
	centangBtn.style.padding = "5px 10px";
	centangBtn.style.cursor = "pointer";
	centangBtn.style.borderRadius = "5px";
	centangBtn.addEventListener("click", function () {
		textSpan.style.textDecoration = textSpan.style.textDecoration === "line-through" ? "none" : "line-through";
		saveTodos();
	});

	buttonContainer.appendChild(deleteBtn);
	buttonContainer.appendChild(centangBtn);

	li.appendChild(textSpan);
	li.appendChild(buttonContainer);
	todoList.appendChild(li);
	saveTodos();
}

function saveTodos() {
	const todos = Array.from(todoList.children).map((li) => ({
		text: li.firstChild.textContent,
		done: li.firstChild.style.textDecoration === "line-through",
	}));
	localStorage.setItem("todos", JSON.stringify(todos));
}
