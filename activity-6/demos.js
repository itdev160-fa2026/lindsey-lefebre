// Activity 6: Function and Scope Demonstrations
// This file contains learning demonstrations separate from the main application

console.log("=== Activity 6: Function and Scope Demonstrations ===");

// Part A: Function Demonstrations
console.log("\n=== FUNCTION DEMONSTRATIONS ===");

// Function declaration
function demonstrateDeclaration(message) {
    console.log("Function declaration:", message);
    return `Processed: ${message}`;
}

// Function expression
const demonstrateExpression = function(message) {
    console.log("Function expression:", message);
    return `Processed: ${message}`;
};

// Arrow function (brief introduction)
const demonstrateArrow = (message) => {
    console.log("Arrow function:", message);
    return `Processed: ${message}`;
};

console.log("Testing different function types:");
console.log(demonstrateDeclaration("Hello from declaration"));
console.log(demonstrateExpression("Hello from expression"));
console.log(demonstrateArrow("Hello from arrow"));

// Scope demonstrations
console.log("\n=== SCOPE DEMONSTRATIONS ===");

let globalVariable = "I'm global";

function scopeDemo() {
    let localVariable = "I'm local";

    console.log("Inside function:");
    console.log("- Can access global:", globalVariable);
    console.log("- Can access local:", localVariable);

    function nestedFunction() {
        let nestedVariable = "I'm nested";
        console.log("Inside nested function:");
        console.log("- Can access global:", globalVariable);
        console.log("- Can access local:", localVariable);
        console.log("- Can access nested:", nestedVariable);
    }

    nestedFunction();
    // console.log(nestedVariable); // This would cause an error
}

scopeDemo();
console.log("Outside function:");
console.log("- Can access global:", globalVariable);
// console.log(localVariable); // This would cause an error

console.log("\n=== Function demonstrations complete! ===");
console.log("Check the to-do list below for the enhanced application.");