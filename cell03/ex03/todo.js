const list = document.getElementById("ft_list");
const newBtn = document.getElementById("new");

loadTodos();

// กดปุ่ม New
newBtn.addEventListener("click", function () {
    const text = prompt("Enter a new TO DO:");

    if (text && text.trim() !== "") {
        addTodo(text.trim());
        saveTodos();
    }
});

function addTodo(text) {
    const todo = document.createElement("div");
    todo.textContent = text;

    // คลิกเพื่อลบ
    todo.addEventListener("click", function () {
        const confirmDelete = confirm("Do you want to remove this TO DO?");
        if (confirmDelete) {
            todo.remove();
            saveTodos();
        }
    });

    // เพิ่มไว้ด้านบนสุด
    list.prepend(todo);
}

function saveTodos() {
    const todos = [];
    const items = list.querySelectorAll("div");

    items.forEach(item => {
        todos.push(item.textContent);
    });

    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        if (cookie.startsWith("todos=")) {
            const data = decodeURIComponent(cookie.substring(6));
            const todos = JSON.parse(data);

            // วนจากท้ายไปต้น
            for (let i = todos.length - 1; i >= 0; i--) {
                addTodo(todos[i]);
            }
        }
    }
}