// Activity 4: Interactive To-Do List (Part 1)
// This file demonstrates element creation, styling, and DOM manipulation

console.log("=== Activity 4: Interactive To-Do List (Part 1) ===");

// Global variables for task management
let tasks = []; //array to store data
let taskIdCounter = 1; //tracks IDs to identify each task

// Part A: Element Creation Demonstrations
console.log("\n=== ELEMENT CREATION DEMONSTRATIONS ===");

// Create different types of elements
const demoH1 = document.createElement("h1");
const demoDiv = document.createElement("div");
const demoSpan = document.createElement("span");
const demoButton = document.createElement("button");

console.log("Created h1 element:", demoH1);
console.log("Created div element:", demoDiv);
console.log("Created span element:", demoSpan);
console.log("Created button element:", demoButton);

// Set properties on created elements
demoH1.textContent = "This is a demo h1"
demoDiv.textContent = "This is a demo div";
demoDiv.id = "demo-div";
demoSpan.innerHTML = "<strong>Demo span with HTML</strong>";
demoButton.textContent = "Demo Button";

console.log("Div after setting properties:", demoDiv);
console.log("Div textContent:", demoDiv.textContent);
console.log("Div id:", demoDiv.id);

// Part B: Element Styling Demonstrations
console.log("\n=== ELEMENT STYLING DEMONSTRATIONS ===");

// Direct style modification
demoDiv.style.backgroundColor = "lightblue";
demoDiv.style.padding = "10px";
demoDiv.style.border = "1px solid blue";

console.log("Applied direct styles to demo div");

demoH1.style.padding = "15px 0px";
demoH1.style.margin = "10px auto";
demoH1.style.fontSize = "24px";

console.log("Applied direct styles to demo h1")

// ClassList demonstrations
demoDiv.classList.add("demo-class");
demoDiv.classList.add("highlighted");
console.log("Added classes. ClassList:", demoDiv.classList);
console.log("Has 'demo-class':", demoDiv.classList.contains("demo-class"));

demoDiv.classList.remove("highlighted");
console.log("After removing 'highlighted':", demoDiv.classList);

demoDiv.classList.toggle("active");
console.log("After toggling 'active':", demoDiv.classList);

// Add spacing styles for demo elements
demoSpan.style.marginTop = "20px";
demoSpan.style.display = "block";
demoButton.style.marginTop = "20px";
demoButton.style.display = "block";

console.log("Applied spacing styles to demo span and button");

// Part C: Element Appending Demonstrations
console.log("\n=== ELEMENT APPENDING DEMONSTRATIONS ===");

const outputDiv = document.getElementById("output");
console.log("Output div before appending:", outputDiv.children.length, "children");

// Append demo elements
outputDiv.append(demoH1)
outputDiv.appendChild(demoDiv);
outputDiv.appendChild(demoSpan);
outputDiv.appendChild(demoButton);

console.log("Output div after appending:", outputDiv.children.length, "children");

// Part D: To-Do List Core Functionality
console.log("\n=== TO-DO LIST FUNCTIONALITY ===");

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim(); //trims whitespace
    
    console.log(`Attempting to add task: "${taskText}"`);
    
    // Validate input
    if (taskText === "") {
        alert("No task entered. Must enter task before submitting.");
        console.log("Add task function failed: empty input");
        return;
    }
    
    if (taskText.length > 75) {
        alert("Task is too long! Please keep it under 75 characters.");
        console.log("Add task function failed: too many characters");
        return;
    }
    
    // Create task object
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date() //timestamp
    };
    
    // Add to tasks array
    tasks.push(task);
    console.log("Task added to array:", task);
    
    // Create list item element
    const listItem = createTaskElement(task);
    
    // Append to list
    const todoList = document.getElementById("todo-list");
    todoList.appendChild(listItem);
    
    // Clear input so user can enter a new value
    taskInput.value = ""; 
    
    // Update statistics
    updateTaskStats();
    
    console.log(`Task "${taskText}" added successfully. Total tasks: ${tasks.length}`);
}

function createTaskElement(task) {
    // Create list item, takes object and creates corresponding HTML
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.setAttribute("data-task-id", task.id);
    
    // Create task text span
    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text";
    taskTextSpan.textContent = task.text;
    
    // Create status span
    const statusSpan = document.createElement("span");
    statusSpan.className = "task-status";
    
    // Set initial state
    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2714 Done";
        statusSpan.className += " status-done";
    } else {
        statusSpan.textContent = "\u23F1 Pending";
        statusSpan.className += " status-pending";
    }
    
    // Append spans to list item
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(statusSpan);
    
    // Add click event for toggling completion
    listItem.onclick = function() {
        toggleTaskCompletion(task.id);
    };
    
    console.log("Created task element:", listItem);
    return listItem;
}

// Part E: Task State Management
function toggleTaskCompletion(taskId) {
    console.log(`Toggling completion for task ID: ${taskId}`);
    
    // Find task in array
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        console.error(`Task with ID ${taskId} not found`);
        return;
    }
    
    // Toggle completion status
    task.completed = !task.completed;
    console.log(`Task "${task.text}" is now ${task.completed ? 'completed' : 'pending'}`);
    
    // Find and update DOM element
    const listItem = document.querySelector(`[data-task-id="${taskId}"]`);
    const statusSpan = listItem.querySelector(".task-status");
    
    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2714 Done";
        statusSpan.className = "task-status status-done";
    } else {
        listItem.classList.remove("done");
        statusSpan.textContent = "\u23F1 Pending";
        statusSpan.className = "task-status status-pending";
    }
    
    // Update statistics
    updateTaskStats();
}

function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    // Update DOM elements
    document.getElementById("taskCount").textContent = `(${totalTasks} task${totalTasks !== 1 ? 's' : ''})`;
    document.getElementById("pendingTasks").textContent = `Pending: ${pendingTasks}`;
    document.getElementById("completedTasks").textContent = `Completed: ${completedTasks}`;
    document.getElementById("totalTasks").textContent = `Total: ${totalTasks}`;
    
    console.log(`Stats updated - Total: ${totalTasks}, Completed: ${completedTasks}, Pending: ${pendingTasks}`);
}

// can hit enter to add task rather than the button
document.getElementById("taskInput").onkeydown = function(event) {
    if (event.key === "Enter") {
        addTask();
    }
};

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

setTimeout(() => {
    document.getElementById("output").innerHTML = initialDemo + document.getElementById("output").innerHTML;
}, 100);