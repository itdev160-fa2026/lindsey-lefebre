// Acitivity 8
// Demo of async concepts to be used in scripts.js

console.log("=== Activity 8: Quote of the Day Generator ===");

//Part A: Asynchronous JavaScript Demo
console.log("\n=== Asynchronous JavaScript Demos ===");

//setTimeout
console.log("Starting setTimeout Demos...");
console.log("1. This logs imediately");

setTimeout(() => {
    console.log("3. This logs after 1 second (setTimeout)");
}, 1000);

console.log("2. This also logs immediately (before setTimeout callback)");

// additional setTimeout
console.log("\nadditional setTimeout demo:");

setTimeout(() => {
  console.log("Additoinal setTimeout: timeout finished");
}, 500);

console.log("Additional setTimeout: outputs before timeout completes");


// Demo event loop
console.log("\nEvent loop demonstration:");
console.log("A. synchronous code");

setTimeout(() => {
    console.log("C. asynchronous callback (0ms timeout)");
}, 0);

console.log("B. more synchronous code");

// synchronous vs asynchronous
console.log("\nSynchronous vs Asynchronous:");

function syncTask() {
  console.log("Sync task: finished right away");
}

function asyncTask() {
  setTimeout(() => {
    console.log("Async task: finished later");
  }, 300);
}

syncTask();
asyncTask();


// Promise demo
console.log("\nPromise demonstration:");

const simplePromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.3; // 70 percent success rate
  setTimeout(() => {
    if (success) {
      resolve("Promise resolved successfully!");
    } else {
      reject("Promise rejected!");
    }
  }, 500);
});

// promise with .then/.catch
function demonstratePromise() {
  console.log("Demo promise with .then/.catch");

  simplePromise
    .then((result) => {
      console.log("Promise success:", result);
    })
    .catch((error) => {
      console.log("Promise error:", error);
    });
}

// promise with async/await
async function demonstrateAsyncAwait() {
  console.log("Demo promise with async/await");

  try {
    const result = await simplePromise;
    console.log("Async/await success:", result);
  } catch (error) {
    console.log("Async/await error:", error);
  }
}

// call both demos
demonstratePromise();
demonstrateAsyncAwait();

// Part B: Fetch API Intro
console.log("\n=== Fest API Introduction ===");

// fetch demo with .then/.catch
function demonstrateFetch() {
  console.log("Demo basic fetch with .then/.catch...");

  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      console.log("Response object:", response);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      return response.json();
    })
    .then((data) => {
      console.log("JSON data:", data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Async/await version of fetch
async function demonstrateFetchAsync() {
  console.log("Demo fetch with async/await...");

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/2"
    );
    console.log("Async response object:", response);
    console.log("Async response status:", response.status);

    const data = await response.json();
    console.log("Async JSON data:", data);
  } catch (error) {
    console.error("Async fetch error:", error);
  }
}

// Call both demos
demonstrateFetch();
demonstrateFetchAsync();
