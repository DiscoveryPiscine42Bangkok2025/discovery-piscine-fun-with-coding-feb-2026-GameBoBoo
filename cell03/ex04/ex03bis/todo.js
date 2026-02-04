$(function () {
    loadTodos();

    $("#new").click(function () {
        const text = prompt("Enter TO DO");
        if (text && text.trim() !== "") {
            addTodo(text.trim());
            saveTodos();
        }
    });
});

function addTodo(text) {
    const todo = $("<div></div>").text(text);

    todo.click(function () {
        if (confirm("Remove this TO DO?")) {
            $(this).remove();
            saveTodos();
        }
    });

    $("#ft_list").prepend(todo);
}

function saveTodos() {
    const todos = [];
    $("#ft_list div").each(function () {
        todos.push($(this).text());
    });

    document.cookie =
        "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function loadTodos() {
    const cookies = document.cookie.split("; ");
    cookies.forEach(c => {
        if (c.startsWith("todos=")) {
            const data = JSON.parse(decodeURIComponent(c.substring(6)));
            for (let i = data.length - 1; i >= 0; i--) {
                addTodo(data[i]);
            }
        }
    });
}