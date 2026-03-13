// ------------------------
// Elements
// ------------------------
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const noTasks = document.getElementById("no-tasks");
const clearAllBtn = document.getElementById("clear-all");
const taskCounter = document.getElementById("task-counter");

// ------------------------
// Load tasks from localStorage
// ------------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// ------------------------
// Add new task
// ------------------------
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter") addTask();
});

function addTask(){
    const text = taskInput.value.trim();
    if(text === "") return;

    tasks.push({text:text, completed:false});
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

// ------------------------
// Delete / Complete / Edit Tasks
// ------------------------
taskList.addEventListener("click", function(e){
    const button = e.target.closest("button");
    if(!button) return;

    const li = button.closest("li");
    const index = li.dataset.index;

    // Delete
    if(button.classList.contains("delete-btn")){
        tasks.splice(index,1);
    }

    // Complete
    if(button.classList.contains("complete-btn")){
        tasks[index].completed = !tasks[index].completed;
    }

    // Edit
    if(button.classList.contains("edit-btn")){
        const newText = prompt("Edit task:", tasks[index].text);
        if(newText) tasks[index].text = newText;
    }

    saveTasks();
    renderTasks();
});

// ------------------------
// Clear all tasks
// ------------------------
clearAllBtn.addEventListener("click", function(){
    if(tasks.length && confirm("Delete all tasks?")){
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// ------------------------
// Save to localStorage
// ------------------------
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ------------------------
// Render tasks
// ------------------------
function renderTasks(){
    taskList.innerHTML = "";
    if(tasks.length === 0){
        noTasks.style.display = "block";
        taskCounter.textContent = "0 tasks";
        return;
    }
    noTasks.style.display = "none";
    taskCounter.textContent = `${tasks.length} tasks`;

    tasks.forEach((task,index)=>{
        const li = document.createElement("li");
        li.dataset.index = index;
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="task-btn complete-btn"><i class="fas fa-check"></i></button>
                <button class="task-btn edit-btn"><i class="fas fa-pencil-alt"></i></button>
                <button class="task-btn delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(li);
    });
}