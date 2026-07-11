const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
let editId = null;

// Load Tasks
async function loadTasks() {
    const response = await fetch("https://task-management-app-1-s8kh.onrender.com/api/tasks");
    const tasks = await response.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
        taskList.innerHTML += `
            <div class="task">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Status:</strong> ${task.status}</p>

                <button onclick="editTask('${task._id}', '${task.title}', '${task.description}')">
    Edit
</button>

<button onclick="deleteTask('${task._id}')">
    Delete
</button>
            </div>
        `;
    });
}

// Add Task
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value
    };

    if (editId) {

        await fetch(`https://task-management-app-1-s8kh.onrender.com/api/tasks/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        editId = null;

    } else {

        await fetch("https://task-management-app-1-s8kh.onrender.com/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

    }

    taskForm.reset();
    loadTasks();
});

// Delete Task
async function deleteTask(id) {
    await fetch(`https://task-management-app-1-s8kh.onrender.com/api/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();
function editTask(id, title, description) {

    editId = id;

    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
}