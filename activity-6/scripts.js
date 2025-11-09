// Activity 6: Interactive To-Do List (Part 2)

console.log("=== Activity 6: Enhanced To-Do List Application ===");

// Global variables for task management
let tasks = []; //array to store data
let taskIdCounter = 1; //tracks IDs to identify each task

// Application state
let todoState = {
    tasks: [],
    nextId: 1,
    currentFilter: 'all'
};

// Utility functions
function generateTaskId() {
    return todoState.nextId++;
}

function getCurrentTimestamp() {
    return new Date().toLocaleString();
}

function validateTaskInput(taskText) {
    const trimmed = taskText.trim();
    if (trimmed.length === 0) {
        return { valid: false, message: "Task cannot be empty!" };
    }
    if (trimmed.length > 100) {
        return { valid: false, message: "Task is too long! Keep it under 100 characters." };
    }
    return { valid: true, text: trimmed };
}


// refactored To-Do List Functions
console.log("\n=== TO-DO LIST FUNCTIONALITY ===");

// Core task management functions
function createTask(text, priority = 'medium') {
    const validation = validateTaskInput(text);
    
    if (!validation.valid) {
        throw new Error(validation.message);
    }
    
    const task = {
        id: generateTaskId(),
        text: validation.text,
        completed: false,
        priority: priority,
        createdAt: getCurrentTimestamp(),
        completedAt: null
    };
    
    console.log("Created task:", task);
    return task;
}

function addTask(taskText, priority) {
    try {
        const task = createTask(taskText, priority);
        todoState.tasks.push(task);
        
        const taskElement = createTaskElement(task);
        document.getElementById('todo-list').appendChild(taskElement);
        
        updateDisplay();
        clearTaskInput();
        
        console.log(`Task added successfully. Total tasks: ${todoState.tasks.length}`);
    } catch (error) {
        console.error("Error adding task:", error.message);
        alert(error.message);
    }
}

function deleteTask(taskId) {
    console.log(`Deleting task with ID: ${taskId}`);
    
    const taskIndex = todoState.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
        console.error(`Task with ID ${taskId} not found`);
        return false;
    }
    
    const task = todoState.tasks[taskIndex];
    
    if (confirm(`Are you sure you want to delete "${task.text}"?`)) {
        // Remove from array
        todoState.tasks.splice(taskIndex, 1);
        
        // Remove from DOM
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.remove();
        }
        
        updateDisplay();
        console.log(`Task "${task.text}" deleted successfully`);
        return true;
    }
    
    return false;
}

function toggleTaskStatus(taskId) {
    console.log(`Toggling status for task ID: ${taskId}`);
    
    const task = todoState.tasks.find(t => t.id === taskId);
    
    if (!task) {
        console.error(`Task with ID ${taskId} not found`);
        return;
    }
    
    task.completed = !task.completed;
    task.completedAt = task.completed ? getCurrentTimestamp() : null;
    
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    updateTaskElementStatus(taskElement, task);
    
    updateDisplay();
    
    console.log(`Task "${task.text}" is now ${task.completed ? 'completed' : 'pending'}`);
}

// DOM manipulation functions
function createTaskElement(task) {
    const listItem = document.createElement('li');
    listItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    listItem.setAttribute('data-task-id', task.id);
    listItem.setAttribute('data-priority', task.priority);
    
    listItem.innerHTML = `
        <div class="task-priority priority-${task.priority}"></div>
        <div class="task-text">${escapeHtml(task.text)}</div>
        <div class="task-actions">
            <button class="task-btn toggle-btn" onclick="toggleTaskStatus(${task.id})">
                ${task.completed ? '\u21B6 Undo' : '\u2713 Done'}
            </button>
            <button class="task-btn delete-btn" onclick="confirmDeleteTask(${task.id})">
                \uD83D\uDDD1 Delete
            </button>
        </div>
    `;

    //double click editing for task list items
    const taskText = listItem.querySelector('.task-text');
    taskText.addEventListener('dblclick', () => {
        const newText = prompt("Edit task:", task.text);
        if (newText !== null && newText.trim() !== "") {
            task.text = newText.trim();
            taskText.textContent = task.text;
        } else if (newText !== null) {
            alert("Task empty - not edits received.");
        }
        console.log(`Task "${task.text}" updaed successfully`);
    });
    
    // Add click listener for toggle (excluding buttons)
    listItem.addEventListener('click', function(event) {
        if (!event.target.classList.contains('task-btn')) {
            toggleTaskStatus(task.id);
        }
    });
    
    console.log("Created task element for:", task.text);
    return listItem;
}



function updateTaskElementStatus(taskElement, task) {
    taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    const toggleBtn = taskElement.querySelector('.toggle-btn');
    toggleBtn.textContent = task.completed ? '\u21B6 Undo' : '\u2713 Done';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Filter and display functions
function filterTasks(filterType) {
    console.log(`Filtering tasks by: ${filterType}`);
    
    todoState.currentFilter = filterType;
    
    const taskElements = document.querySelectorAll('.task-item');
    
    taskElements.forEach(element => {
        const taskId = parseInt(element.getAttribute('data-task-id'));
        const task = todoState.tasks.find(t => t.id === taskId);
        
        let shouldShow = true;
        
        switch (filterType) {
            case 'pending':
                shouldShow = !task.completed;
                break;
            case 'completed':
                shouldShow = task.completed;
                break;
            case 'all':
            default:
                shouldShow = true;
                break;
        }
        
        element.classList.toggle('hidden', !shouldShow);
    });
    
    // Update filter button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-filter="${filterType}"]`).classList.add('active');
    
    updateEmptyState();
}

function updateDisplay() {
    updateTaskStats();
    updateEmptyState();
    applyCurrentFilter();
}

function updateTaskStats() {
    const total = todoState.tasks.length;
    const completed = todoState.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    document.getElementById('taskCount').textContent = `(${total} task${total !== 1 ? 's' : ''})`;
    document.getElementById('totalTasks').textContent = `Total: ${total}`;
    document.getElementById('completedTasks').textContent = `Completed: ${completed}`;
    document.getElementById('pendingTasks').textContent = `Pending: ${pending}`;
    
    console.log(`Stats updated - Total: ${total}, Completed: ${completed}, Pending: ${pending}`);
}

function updateEmptyState() {
    const emptyState = document.getElementById('emptyState');
    const todoList = document.getElementById('todo-list');
    
    const visibleTasks = todoList.querySelectorAll('.task-item:not(.hidden)');
    
    if (visibleTasks.length === 0) {
        emptyState.classList.remove('hidden');
        if (todoState.currentFilter === 'all') {
            emptyState.innerHTML = '<p>No tasks yet. Add one above! \uD83D\uDCDD</p>';
        } else {
            emptyState.innerHTML = `<p>No ${todoState.currentFilter} tasks found. \uD83D\uDD0D</p>`;
        }
    } else {
        emptyState.classList.add('hidden');
    }
}

function applyCurrentFilter() {
    filterTasks(todoState.currentFilter);
}

// Input and UI functions
function clearTaskInput() {
    document.getElementById('taskInput').value = '';
    document.getElementById('prioritySelect').value = 'medium';
}

function getTaskInputValues() {
    const taskText = document.getElementById('taskInput').value;
    const priority = document.getElementById('prioritySelect').value;
    return { taskText, priority };
}

// Part C: Event Handling Functions
function handleAddTask() {
    const { taskText, priority } = getTaskInputValues();
    addTask(taskText, priority);
}

function confirmDeleteTask(taskId) {
    deleteTask(taskId);
}

// Part D: Bulk Operations
function markAllTasksDone() {
    console.log("Marking all tasks as done");
    
    let changedCount = 0;
    
    todoState.tasks.forEach(task => {
        if (!task.completed) {
            task.completed = true;
            task.completedAt = getCurrentTimestamp();
            changedCount++;
            
            const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            updateTaskElementStatus(taskElement, task);
        }
    });
    
    updateDisplay();
    
    if (changedCount > 0) {
        alert(`Marked ${changedCount} task${changedCount !== 1 ? 's' : ''} as completed!`);
    } else {
        alert("All tasks are already completed!");
    }
}

function deleteAllCompletedTasks() {
    const completedTasks = todoState.tasks.filter(task => task.completed);
    
    if (completedTasks.length === 0) {
        alert("No completed tasks to delete!");
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${completedTasks.length} completed task${completedTasks.length !== 1 ? 's' : ''}?`)) {
        console.log(`Deleting ${completedTasks.length} completed tasks`);
        
        // Remove from array
        todoState.tasks = todoState.tasks.filter(task => !task.completed);
        
        // Remove from DOM
        completedTasks.forEach(task => {
            const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
            if (taskElement) {
                taskElement.remove();
            }
        });
        
        updateDisplay();
        alert(`Deleted ${completedTasks.length} completed task${completedTasks.length !== 1 ? 's' : ''}!`);
    }
}

function clearAllTasks() {
    if (todoState.tasks.length === 0) {
        alert("No tasks to clear!");
        return;
    }
    
    if (confirm(`Are you sure you want to delete ALL ${todoState.tasks.length} tasks? This cannot be undone!`)) {
        console.log("Clearing all tasks");
        
        todoState.tasks = [];
        document.getElementById('todo-list').innerHTML = '';
        
        updateDisplay();
        alert("All tasks cleared!");
    }
}

// Event listeners setup
function initializeEventListeners() {
    console.log("Initializing event listeners...");
    
    // Add task button and enter key
    document.getElementById('addTaskBtn').addEventListener('click', handleAddTask);
    document.getElementById('taskInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterTasks(filter);
        });
    });
    
    // Bulk operation buttons
    document.getElementById('markAllDoneBtn').addEventListener('click', markAllTasksDone);
    document.getElementById('deleteCompletedBtn').addEventListener('click', deleteAllCompletedTasks);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllTasks);
    
    console.log("Event listeners initialized successfully!");
}

// Initialize application
function initializeApp() {
    console.log("Initializing Enhanced To-Do List application...");
    
    initializeEventListeners();
    updateDisplay();
    
    // Focus on input field
    document.getElementById('taskInput').focus();
    
    console.log("Application initialized successfully!");
    console.log("Try adding tasks with different priorities and using the filter/bulk operations!");
}

// Start the application
initializeApp();

// Display application info
document.getElementById("output").innerHTML = `
    <h3>Activity 6: Enhanced To-Do List Features</h3>
    <p>&#9989; Refactored code into organized functions</p>
    <p>&#9989; Delete functionality with confirmation</p>
    <p>&#9989; Task filtering (All/Pending/Completed)</p>
    <p>&#9989; Priority levels and bulk operations</p>
    <p>Check the console for function and scope demonstrations!</p>
`;

// Initialize application
console.log("To-Do List application initialized successfully!");
console.log("Try adding some tasks and clicking them to mark as complete!");

// Display initial demo content
const initialDemo = `
    <h3>DOM Manipulation Demonstrations</h3>
    <p>✅ Element creation examples loaded above</p>
    <p>✅ Styling and classList demonstrations complete</p>
    <p>✅ Ready to create and manage to-do tasks!</p>
`;