// Activity 5: Simple Math Operations Widget
// Demonstrate addEventListener() and basic event handling

console.log("=== Activity 5: Simple Math Operations Widget ===");

// Part A: Event Handling Demonstrations
console.log("\n=== EVENT HANDLING DEMONSTRATIONS ===");

// Get elements for event handling
const number1Input = document.getElementById("number1");
const number2Input = document.getElementById("number2");
const opSymbolDiv = document.getElementById("op-shorthand");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.getElementById("clear");
const resultDiv = document.getElementById("result");

// match operations to their symbols
const operationShort = {
  add: "plus",
  subtract: "minus",
  multiply: "times",
  divide: "divided by"
};

console.log("Number1 input:", number1Input);
console.log("Number2 input:", number2Input);
console.log("Operation buttons:", operationButtons);
console.log("Result div:", resultDiv);

// Part B: Event Object Exploration
function logEventDetails(event) {
  console.log("Event Details:");
  console.log("- Type:", event.type);
  console.log("- Target:", event.target);
  console.log("- Target tagName:", event.target.tagName);
  console.log("- Target textContent:", event.target.textContent);
  console.log("- CurrentTarget:", event.currentTarget);
}

// Part C: Math Operation Functions
function addNumbers(num1, num2) {
  const result = num1 + num2;
  console.log(`Addition: ${num1} + ${num2} = ${result}`);
  return result;
}

function subtractNumbers(num1, num2) {
  const result = num1 - num2;
  console.log(`Subtraction: ${num1} - ${num2} = ${result}`);
  return result;
}

function multiplyNumbers(num1, num2) {
  const result = num1 * num2;
  console.log(`Multiplication: ${num1} × ${num2} = ${result}`);
  return result;
}

function divideNumbers(num1, num2) {
  if (num2 === 0) {
    console.error("Division by zero attempted!");
    return "Error: Cannot divide by zero";
  }
  const result = num1 / num2;
  console.log(`Division: ${num1} ÷ ${num2} = ${result}`);
  return result;
}

// Part D: Input Validation and Result Display
function validateInputs() {
  const num1 = parseFloat(number1Input.value);
  const num2 = parseFloat(number2Input.value);

  console.log(`Validating inputs: "${number1Input.value}" and "${number2Input.value}"`);

  if (isNaN(num1) || number1Input.value.trim() === "") {
    showError("Please enter a valid first number");
    return null;
  }

  if (isNaN(num2) || number2Input.value.trim() === "") {
    showError("Please enter a valid second number");
    return null;
  }

  console.log(`Validation successful: ${num1} and ${num2}`);
  return { num1, num2 };
}

//textContent targets text inside the element
function showResult(result, operation) {
  resultDiv.textContent = `Result: ${result}`;
  resultDiv.className = "result success";
  console.log(`Displaying result: ${result} for operation: ${operation}`);
}

function showError(message) {
  resultDiv.textContent = message;
  resultDiv.className = "result error";
  console.error(`Displaying error: ${message}`);
}

function clearAll() {
  number1Input.value = "";
  number2Input.value = "";
  resultDiv.textContent = "Result will appear here";
  resultDiv.className = "result";
  opSymbolDiv.textContent = "operation";
  console.log("All inputs and results cleared");
}

// Event handling functions
function handleOperationClick(event) {
  console.log("\n=== OPERATION BUTTON CLICKED ===");
  logEventDetails(event);

  const operation = event.target.dataset.operation;
  console.log(`Operation selected: ${operation}`);

// update operation sybmbol between numbers
  opSymbolDiv.textContent = operationShort[operation];

  const inputs = validateInputs();
  if (!inputs) {
    return; // Validation failed
  }

  const { num1, num2 } = inputs;
  let result;

  // Perform the calculation based on operation
  switch (operation) {
    case "add":
      result = addNumbers(num1, num2);
      showResult(result, "addition");
      break;
    case "subtract":
      result = subtractNumbers(num1, num2);
      showResult(result, "subtraction");
      break;
    case "multiply":
      result = multiplyNumbers(num1, num2);
      showResult(result, "multiplication");
      break;
    case "divide":
      result = divideNumbers(num1, num2);
      if (typeof result === "string") {
        showError(result);
      } else {
        showResult(result, "division");
      }
      break;
    default:
      console.error(`Unknown operation: ${operation}`);
      showError("Unknown operation");
  }
}

// Event Listeners Setup
console.log("\n=== SETTING UP EVENT LISTENERS ===");

// Method 1: Using addEventListener() for operation buttons
operationButtons.forEach(button => {
  button.addEventListener("click", handleOperationClick);
  console.log(`Added click listener to ${button.textContent} button`);
});

// Method 2: Using addEventListener() for clear button
clearButton.addEventListener("click", function(event) {
  console.log("\n=== CLEAR BUTTON CLICKED ===");
  logEventDetails(event);
  clearAll();
});

// Demonstrate different event types
number1Input.addEventListener("focus", function(event) {
  console.log("Number1 input focused");
  event.target.style.backgroundColor = "#e3f2fd";
});

number1Input.addEventListener("blur", function(event) {
  console.log("Number1 input lost focus");
  event.target.style.backgroundColor = "";
});

number2Input.addEventListener("focus", function(event) {
  console.log("Number2 input focused");
  event.target.style.backgroundColor = "#e3f2fd";
});

number2Input.addEventListener("blur", function(event) {
  console.log("Number2 input lost focus");
  event.target.style.backgroundColor = "";
});

// Add mouseover and mouseout events for visual feedback
operationButtons.forEach(button => {
  button.addEventListener("mouseover", function(event) {
    console.log(`Mouse over ${event.target.textContent} button`);
  });

  button.addEventListener("mouseout", function(event) {
    console.log(`Mouse left ${event.target.textContent} button`);
  });
});

console.log("All event listeners attached successfully!");
console.log("Math Operations Widget initialized!");
console.log("Try entering numbers and clicking operation buttons!");

// Display initial demo content
document.getElementById("output").innerHTML = `
    <h3>Event Handling Demo Loaded!</h3>
    <p>\u2713 addEventListener() used for all interactions</p>
    <p>\u2713 Input validation and error handling implemented</p>
    <p>\u2713 Mouse and focus events demonstrate different event types</p>
    <p>Check the console for detailed event logging!</p>
`;