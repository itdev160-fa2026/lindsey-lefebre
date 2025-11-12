// Activity 7: Product Catalog Display
// This file demonstrates arrays, objects, and data manipulation

console.log("=== Activity 7: Product Catalog Display ===");

// Part A: Array and Object Demonstrations
console.log("\n=== ARRAY DEMONSTRATIONS ===");

// Creating arrays
const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8];
const colorsArray = new Array('red', 'green', 'blue');
const mixedArray = [42, 'hello', true, null, {name: 'John'}];
const emptyArray = new Array(3); // empty array constructor
const constructedArray = new Array('x', 'y', 'z'); //predefined array constructor

console.log("Numbers array:", numbersArray);
console.log("Colors array:", colorsArray);
console.log("Mixed array:", mixedArray);
console.log("Empty array constructor with 3 spaces for objects:", emptyArray);
console.log("Constructor array with defined elements:", constructedArray);

// Array methods demonstrations
console.log("\nArray Methods:");
const fruits = ['apple', 'banana'];
console.log("Original fruits:", fruits);

fruits.push('orange');
console.log("After push('orange'):", fruits);

const lastFruit = fruits.pop();
console.log("After pop():", fruits, "- removed:", lastFruit);

fruits.unshift('grape');
console.log("After unshift('grape'):", fruits);

const firstFruit = fruits.shift();
console.log("After shift():", fruits, "- removed:", firstFruit);

// Array iteration examples
console.log("\nArray Iteration Methods:");
const numbers = [1, 2, 3, 4, 5];

console.log("For loop:");
for (let i = 0; i < numbers.length; i++) {
    console.log(`Index ${i}: ${numbers[i]}`);
}

console.log("For...of loop:");
for (const number of numbers) {
    console.log(`Value: ${number}`);
}

console.log("forEach method:");
numbers.forEach((number, index) => {
    console.log(`forEach - Index ${index}: ${number}`);
});

console.log("map method (double values):");
const doubled = numbers.map(number => number * 2);
console.log("Doubled:", doubled);

console.log("filter method (even numbers only):");
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Object demonstrations
console.log("\n=== OBJECT DEMONSTRATIONS ===");

// Creating objects
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    city: 'New York',
    isEmployed: true
};

console.log("Person object:", person);

// Property access methods
console.log("Dot notation - firstName:", person.firstName);
console.log("Bracket notation - lastName:", person['lastName']);

// Dynamic property access
const propertyName = 'age';
console.log(`Dynamic access (${propertyName}):`, person[propertyName]);

// Adding and modifying properties
person.email = 'john.doe@email.com';
person['phone'] = '555-1234';
person.age = 31;

console.log("After adding/modifying properties:", person);

// Deleting properties
delete person.phone;
console.log("After deleting phone:", person);

// Part B: Product Data Structure
console.log("\n=== PRODUCT DATA STRUCTURE ===");

const products = [
    {
        id: 1,
        name: "Portable Tablet",
        description: "High-quality, lighweight work tablet with 30-hour battery life.",
        price: 199.99,
        category: "electronics",
        image: "https://picsum.photos/id/668/300/200"
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable 100% organic cotton t-shirt available in multiple colors.",
        price: 29.99,
        category: "clothing",
        image: "https://picsum.photos/id/804/300/200"
    },
    {
        id: 3,
        name: "JavaScript Programming Guide",
        description: "Comprehensive guide to modern JavaScript programming techniques and best practices.",
        price: 45.00,
        category: "books",
        image: "https://picsum.photos/id/20/300/200"
    },
    {
        id: 4,
        name: "Smart Home Security Camera",
        description: "WiFi-enabled security camera with night vision and mobile app integration.",
        price: 129.99,
        category: "electronics",
        image: "https://picsum.photos/id/687/300/200"
    },
    {
        id: 5,
        name: "Running Shoes",
        description: "Lightweight running shoes with advanced cushioning technology.",
        price: 89.99,
        category: "clothing",
        image: "https://picsum.photos/id/817/300/200"
    },
    {
        id: 6,
        name: "Motivational Essays",
        description: "Persoanlly essays to help keep you motivated and on task.",
        price: 45.00,
        category: "books",
        image: "https://picsum.photos/id/528/300/200"
    },
    {
        id: 7,
        name: "14in Laptop Pro",
        description: "Longest battery life ever in a Laptop, powered by M5.",
        price: 1500.00,
        category: "electronics",
        image: "https://picsum.photos/id/0/300/200"
    },
    {
        id: 8,
        name: "Everyday Heels",
        description: "Perfect pump to go from business casual to coctail party.",
        price: 79.99,
        category: "clothing",
        image: "https://picsum.photos/id/21/300/200"
    }
];

console.log(`Loaded ${products.length} products:`, products);

// Demonstrate array methods with products
console.log("\nProduct data manipulation examples:");

const electronicsProducts = products.filter(product => product.category === 'electronics');
console.log("Electronics products:", electronicsProducts);

const clothingProducts = products.filter(product => product.category === 'clothing');
console.log(`Clothing products: ${clothingProducts.length} found`);

const productNames = products.map(product => product.name);
console.log("All product names:", productNames);

const affordableProducts = products.filter(product => product.price < 100);
console.log("Products under $100:", affordableProducts);

const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;
console.log(`Average product price: $${averagePrice.toFixed(2)}`);

// Part C: Product Display Functions
console.log("\n=== PRODUCT DISPLAY FUNCTIONS ===");

// Application state
let appState = {
    displayedProducts: [...products],
    filters: {
        search: '',
        category: 'all'
    }
};

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <span class="product-category">${product.category}</span>
        </div>
    `;

    return card;
}

function displayProducts(productsToShow) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        `;
        return;
    }

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });

    updateResultsCount(productsToShow.length);
    console.log(`Displayed ${productsToShow.length} products`);
}

function updateResultsCount(count) {
    const totalProducts = products.length;
    const resultsCount = document.getElementById('resultsCount');

    if (count === totalProducts) {
        resultsCount.textContent = `Showing all ${totalProducts} products`;
    } else {
        resultsCount.textContent = `Showing ${count} of ${totalProducts} products`;
    }
}

// Part D: Search and Filter Functions
function searchProducts(searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    if (term === '') {
        return products;
    }

    return products.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
}

function filterByCategory(products, category) {
    if (category === 'all') {
        return products;
    }

    return products.filter(product => product.category === category);
}

function applyFilters() {
    console.log("Applying filters:", appState.filters);

    let filteredProducts = searchProducts(appState.filters.search);
    filteredProducts = filterByCategory(filteredProducts, appState.filters.category);

    appState.displayedProducts = filteredProducts;
    displayProducts(filteredProducts);
}

// Event handlers
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    appState.filters.search = searchInput.value;
    applyFilters();
}

function handleCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    appState.filters.category = categoryFilter.value;
    applyFilters();
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = 'all';

    appState.filters = {
        search: '',
        category: 'all'
    };

    applyFilters();
}

// Initialize application
function initializeApp() {
    console.log("Initializing Product Catalog application...");

    // Set up event listeners
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('categoryFilter').addEventListener('change', handleCategoryFilter);
    document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);

    // Display initial products
    displayProducts(products);

    console.log("Product Catalog application initialized successfully!");
    console.log("Try searching and filtering products!");
}

// Start the application
initializeApp();

// Display demo content
document.getElementById("output").innerHTML = `
    <div class="demo-content">
        <h3>Product Catalog Features</h3>
        <p>&#9989; Array and object demonstrations in console</p>
        <p>&#9989; Dynamic product grid with responsive design</p>
        <p>&#9989; Search functionality using filter() method</p>
        <p>&#9989; Category filtering</p>
        <p>&#9989; 5 products across 3 categories</p>
        <p>Check the console for detailed array and object examples!</p>
    </div>
`;
