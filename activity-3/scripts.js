// Activity 3: Dynamic Greeting Card

console.log("=== Activity 3: Dynamic Greeting Card ===");

// Part A: DOM Selection Demonstrations
console.log("\n=== DOM SELECTION DEMONSTRATIONS ===");

// getElementById examples
const greetingMessage = document.getElementById("greeting-message");
const greetingImage = document.getElementById("greeting-image");
const nameInput = document.getElementById("nameInput");

console.log("Selected greeting message element:", greetingMessage);
console.log("Selected greeting image element:", greetingImage);
console.log("Selected name input element:", nameInput);

// querySelector examples
const cardContainer = document.querySelector(".card-container");
const firstButton = document.querySelector("button");

console.log("Selected card container:", cardContainer);
console.log("First button found:", firstButton);

// querySelectorAll example
const allButtons = document.querySelectorAll("button");
console.log(`Found ${allButtons.length} buttons:`, allButtons);

// Part B: Content Modification Demonstrations
console.log("\n=== CONTENT MODIFICATION DEMONSTRATIONS ===");

console.log("Original message textContent:", greetingMessage.textContent);
console.log("Original image alt attribute:", greetingImage.getAttribute("alt"));

// Part C: Attribute Modification Demonstrations
console.log("\n=== ATTRIBUTE MODIFICATION DEMONSTRATIONS ===");

console.log("Current image src:", greetingImage.getAttribute("src"));
console.log("Image has 'src' attribute:", greetingImage.hasAttribute("src"));

// Greeting card data
const greetings = {
    birthday: {
        message: "🎉 Happy Birthday! 🎂",
        image: "https://picsum.photos/id/1/300/200?text=Happy+Birthday!",
        alt: "Happy birthday greeting"
    },
    holiday: {
        message: "🎄 Happy Holidays! ⭐",
        image: "https://picsum.photos/id/12/300/200?text=Happy+Holidays!",
        alt: "Holiday celebration greeting"
    },
    thankYou: {
        message: "🙏 Thank You! 💝",
        image: "https://picsum.photos/id/47/300/200?text=Thank+You!",
        alt: "Thank you greeting"
    },
    welcome: {
        message: "👋 Welcome! 🌟",
        image: "https://picsum.photos/id/237/200/300?text=Welcome",
        alt: "Welcome greeting"
    }
};

// Part D: Dynamic Greeting Card Functions
console.log("\n=== GREETING CARD FUNCTIONS ===");

function updateGreeting(type) {
    const greeting = greetings[type];
    
    if (greeting) {
        // Update message
        greetingMessage.textContent = greeting.message;
        
        // Update image
        greetingImage.setAttribute("src", greeting.image);
        greetingImage.setAttribute("alt", greeting.alt);
        
        console.log(`Updated greeting to: ${type}`);
        console.log(`Message: ${greeting.message}`);
        console.log(`Image: ${greeting.image}`);
    } else {
        console.error(`Greeting type "${type}" not found`);
    }
}

function setBirthdayGreeting() {
    updateGreeting("birthday");
}

function setHolidayGreeting() {
    updateGreeting("holiday");
}

function setThankYouGreeting() {
    updateGreeting("thankYou");
}

function setRandomGreeting() {
    const types = Object.keys(greetings);
    const randomType = types[Math.floor(Math.random() * types.length)];
    updateGreeting(randomType);
    console.log(`Random greeting selected: ${randomType}`);
}

// Part E: Interactive Features
function personalizeName() {
    const name = nameInput.value.trim();
    
    if (name === "") {
        alert("Please enter a name to personalize the greeting!");
        console.log("Personalization attempted with empty name");
        return;
    }
    
    // Get current message and add name
    const currentMessage = greetingMessage.textContent;
    const personalizedMessage = `Dear ${name}, 💖\n\n${currentMessage}`;
    
    greetingMessage.innerHTML = personalizedMessage.replace('\n\n', '<br><br>');
    
    console.log(`Personalized greeting for: ${name}`);
    console.log(`Full message: ${personalizedMessage}`);
    
    // Clear input
    nameInput.value = "";
}

// Display welcome message on page load
document.getElementById("output").innerHTML = `
    <h3>DOM Manipulation Demo Loaded!</h3>
    <p>✅ Successfully selected and ready to manipulate DOM elements</p>
    <p>Check the console for detailed demonstrations of DOM operations</p>
`;

console.log("Dynamic Greeting Card application loaded successfully!");
