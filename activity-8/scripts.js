// Activity 8: Quote of the day generator
// quote genertor application

console.log("\n=== Quote API Integration ===");

// Part A: Quote API Integration 
const QUOTE_API = 'https://dummyjson.com/quotes/random';

// app state
let appState = {
    currentQuote: null,
    isLoading: false
};

// fetch random quote using async/await
async function fetchQuote() {
    try {
        showLoading(true);
        hideError();

        console.log("Fetching random quote...");

        const response = await fetch(QUOTE_API);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched quote data:", data);
        return data;

        } catch (error) {

        console.error("Error fetching quote:", error);
        showError(`Failed to fetch quote: ${error.message}`);

        return null;
        } finally {

        showLoading(false);
    }
}

// get and display new quote
async function getNewQuote() {
    console.log("getting a new quote...");

    const quote = await fetchQuote();
    if (quote) {
        appState.currentQuote = quote;
        displayQuote(quote);

        console.log("successfully displayed a new quote.");
    }
}

// Part B: display functions
function displayQuote(quote) {
    const container = document.getElementById('quoteContainer');

    //HTML quote card
    const quoteCard = document.createElement('div');
    quoteCard.className = 'quote-card';

    // dummyJSON API format: { quote: "quote text", author: "author" }
    quoteCard.innerHTML = `
        <p class="quote-text">${quote.quote}</p>
        <p class="quote-author">&mdash; ${quote.author}</p>
    `;

    // clear container and add new quote
    container .innerHTML = '';
    container .appendChild(quoteCard);

    console.log('displayed quote by ${quote.author}');
}

// UI control functions
function showLoading(show) {
  const loadingIndicator = document.getElementById("loadingIndicator");
  const button = document.getElementById("getQuoteBtn");

  if (show) {
    loadingIndicator.classList.remove("hidden");
    button.disabled = true;
    appState.isLoading = true;

  } else {

    loadingIndicator.classList.add("hidden");
    button.disabled = false;
    appState.isLoading = false;
  }
}

function showError(message) {
  const errorDisplay = document.getElementById("errorDisplay");
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = message;
  errorDisplay.classList.remove("hidden");
}

function hideError() {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.classList.add("hidden");
}

// event handlers
function handleGetQuote() {
  getNewQuote();
}

function handleRetry() {
  getNewQuote();
}

// initialize app
function initializeApp() {
  console.log("Initializing Quote Generator application...");

  // event listeners
  document
    .getElementById("getQuoteBtn")
    .addEventListener("click", handleGetQuote);

  document.getElementById("retryBtn").addEventListener("click", handleRetry);

  console.log("quote generator app initialized successfully.");
  console.log("click 'Get New Quote' to get a new random quote.");
}

// start the app
initializeApp();

// display demo content
document.getElementById("output").innerHTML = `
    <h3>Quote Generator Features</h3>
    <p>&#9989; Asynchronous JavaScript with setTimeout and Promises</p>
    <p>&#9989; Fetch API for HTTP requests</p>
    <p>&#9989; Async/await syntax for cleaner code</p>
    <p>&#9989; Loading states and error handling</p>
    <p>&#9989; JSON data parsing and display</p>
    <p>&#9989; Smooth animations with CSS</p>
    <p>&#9989; Check the console for async JavaScript demos.</p>
`;
