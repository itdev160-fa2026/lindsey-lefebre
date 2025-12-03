// Activity 10: Tic-Tac-Toe
// Domonstraiting local storage, game state management, and data persistence, which is a key feature of local storage

console.log("=== Activity 10: Tic-Tac-Toe with localStorage ===");

// Part A: localStorage demos
console.log("\n=== LocalStorge Demos ===");

// Check localStorage support
function checkLocalStorageSupport() {
    try {
        const test = "localStorage-test";
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        console.log("\u2713 localStorage is supported and available");
        return true;
    } catch (error) {
        console.error("\u2712 localStorage is not available:", error);
    }
}

const isLocalStorageSupported = checkLocalStorageSupport();

// Demo basic local storage operations
console.log("\nBasic localStorage operations:");

// string storge
localStorage.setItem("demo-string", "Oh hey there localStorage, ol buddy!");
console.log("Stored string:", localStorage.getItem("demo-string"));

// number storage
localStorage.setItem("demo-number", "11");
console.log("stored number:", localStorage.getItem("demo-number"));

//object storage - requires JSON serialization (convert object state to JSON string)
const demoObject = { player: "X", score: 3};
localStorage.setItem("demo-object", JSON.stringify(demoObject));
const retrievedObject = JSON.parse(localStorage.getItem("demo-object"));
console.log("stored object:", retrievedObject);

// Array storage - 2D array (grid) like game board
const demoBoard = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["", "", "X"],
];

localStorage.setItem("demo-board", JSON.stringify(demoBoard));
const retrievedBoard = JSON.parse(localStorage.getItem("demo-board"));
console.log("stored 2D array:", retrievedBoard);

// clean demo items
localStorage.removeItem("demo-string");
localStorage.removeItem("demo-number");
localStorage.removeItem("demo-object");
localStorage.removeItem("demo-board");
console.log("Demo items cleaned up");


// Part B: Game state Management
console.log("\n=== Game State Management ===");

// storage keys for the game
const STORAGE_KEYS = {
    GAME_STATE: "tictactoe-game-state",
    STATISTICS: "tictactoe-statistics",
};

// game state
let gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameActive: true,
    winner: null,
    winningCombination: null,
};

// game stats
let statistics = {
    totalGames: 0,
    xWins: 0,
    oWins: 0,
    draws: 0,
};

// winning combinations
const WINNING_COMBINATIONS = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
];

console.log("Winning combinations:", WINNING_COMBINATIONS);

// initialize new game
function initializeGame() {
    console.log("starting new game");

    gameState = {
        board: ["", "", "", "", "", "", "", "", ""],
        currentPlayer: "X",
        gameActive: true,
        winner: null,
        winningCombination: null,
    };

    updateBoard();
    updateStatus();
    saveGameState();

    console.log("New game initialized:", gameState);
}

// make a move
function makeMove(index) {
    console.log(`Attempting move at index ${index} by player ${gameState.currentPlayer}`);

    // Check if move is valid
    if (!gameState.gameActive || gameState.board[index] !== "") {
        console.log("Invalid move - cell already taken or game over");
        return;
    }

    // Update board
    gameState.board[index] = gameState.currentPlayer;
    console.log("Move made, updated board:", gameState.board);

    // Check for a winner
    const result = checkWinner();

    if (result.winner) {
        gameState.gameActive = false;
        gameState.winner = result.winner;
        gameState.winningCombination = result.combination;
        handleGameEnd(result.winner);

        console.log(`Game over! Winner: ${result.winner}`, result.combination);

    } else if (checkDraw()) {
        gameState.gameActive = false;
        handleGameEnd("draw");

        console.log("Game Over! Players Tie");

    } else {
        // switch player
        gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";

        console.log(`Switched to player ${gameState.currentPlayer}`);
    }

    updateBoard();
    updateStatus();
    saveGameState();
}

// check for winner
function checkWinner() {
    console.log("Checking for winner...");

    for (let combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        const board = gameState.board;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log(`Winner found: ${board[a]} with combination`, combination);
        return { winner: board[a], combination: combination };
    }
  }

    console.log("No winner found");
    return { winner: null, combination: null };
}

// check for draw
function checkDraw() {
    const isDraw = gameState.board.every((cell) => cell !== "");
    console.log("Checking for draw:", isDraw);
    return isDraw;
}

// handle game end
function handleGameEnd(result) {
    console.log("Handling game end, result:", result);

    // update stats
    statistics.totalGames++;
        if (result === "X") {
            statistics.xWins++;
        } else if (result === "O") {
        statistics.oWins++;
        } else {
        statistics.draws++;
    }

    console.log("Updated statistics:", statistics);

    saveStatistics();
    updateStatisticsDisplay();
}

// Part C: localStorage integration (data presists arrcoss sessions)
console.log("\n=== LOCALSTORAGE INTEGRATION ===");

// Save game state
function saveGameState() {
    if (!isLocalStorageSupported) return;

    try {
        localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState));
        console.log("Game state saved to localStorage");

    } catch (error) {
        console.error("Failed to save game state:", error);
    }
}

// load game state
function loadGameState() {
    if (!isLocalStorageSupported) return false;

    try {
        const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE);
    
    if (saved) {
        gameState = JSON.parse(saved);
        console.log("Game state loaded from localStorage:", gameState);
        return true;
    }

    } catch (error) {
        console.error("Failed to load game state:", error);
    }

    return false;
}

// save stats
function saveStatistics() {
    if (!isLocalStorageSupported) return;
    try {
        localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
        console.log("Statistics saved to localStorage");

    } catch (error) {
        console.error("Failed to save statistics:", error);
    }
}

// Load statistics
function loadStatistics() {
    if (!isLocalStorageSupported) return;
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.STATISTICS);

    if (saved) {
        statistics = JSON.parse(saved);
        console.log("Statistics loaded from localStorage:", statistics);
    }

    } catch (error) {
        console.error("Failed to load statistics:", error);
    }
}

// reset statistics
function resetStatistics() {
    if (confirm("Are you sure you want to reset all statistics?")) {
        console.log("resetting statistics...");

        statistics = {
        totalGames: 0,
        xWins: 0,
        oWins: 0,
        draws: 0,
        };

        saveStatistics();
        updateStatisticsDisplay();

        console.log("statistics are reset");
  }
}

// Part D: UI udpates for game results
function updateBoard() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
        const value = gameState.board[index];

    // Update cell content
    cell.textContent = value;

    // Update cell classes
    cell.classList.remove("taken", "x", "o", "winning");

    if (value) {
      cell.classList.add("taken");
      cell.classList.add(value.toLowerCase());
    }

    // Highlight winning combination
    if (
      gameState.winningCombination &&
      gameState.winningCombination.includes(index)
    ) {
      cell.classList.add("winning");
    }
  });

    console.log("board display updated");
}

function updateStatus() {
    const statusElement = document.getElementById("statusMessage");

    statusElement.classList.remove("winner", "draw");

    if (gameState.winner) {
        statusElement.textContent = `Player ${gameState.winner} Wins! \uD83C\uDFC6`;
        statusElement.classList.add("winner");
    } else if (!gameState.gameActive) {
        statusElement.textContent = "It's a Tie! \uD83E\uDD1D";
        statusElement.classList.add("draw");
    } else {
        statusElement.textContent = `It's player ${gameState.currentPlayer}'s Move`;
    }

    console.log("Status display updated");
}

function updateStatisticsDisplay() {
    document.getElementById("totalGames").textContent = statistics.totalGames;
    document.getElementById("xWins").textContent = statistics.xWins;
    document.getElementById("oWins").textContent = statistics.oWins;
    document.getElementById("draws").textContent = statistics.draws;

    console.log("Statistics display updated");
}

// event handlers
function handleCellClick(event) {
    const cell = event.target;
    if (!cell.classList.contains("cell")) return;

    const index = parseInt(cell.getAttribute("data-index"));
    makeMove(index);
}

function handleNewGame() {
    console.log("new game button clicked");
    initializeGame();
}

function handleResetStats() {
    console.log("stats reset button clicked");
    resetStatistics();
}

// initialize app
function initializeApp() {
    console.log("Initializing tic-tac-toe application...");

    // load saved data
    loadStatistics();

    const hasGameState = loadGameState();

    if (!hasGameState) {
        console.log("No saved game found, starting new game");
        initializeGame();
    } else {
        console.log("Saved game loaded successfully from localStorage");

        updateBoard();
        updateStatus();
  }

    // update displays
    updateStatisticsDisplay();

    // set up event listeners
    document
        .getElementById("gameBoard")
        .addEventListener("click", handleCellClick);
    document.getElementById("newGameBtn").addEventListener("click", handleNewGame);
    document
        .getElementById("resetStatsBtn")
        .addEventListener("click", handleResetStats);

    console.log("Tic-Tac-Toe application initialized successfully!");
}

// Start the application
if (isLocalStorageSupported) {
    initializeApp();
} else {
    alert(
        "localStorage is not supported in your browser. The game will work but NO data will persist."
  );

    initializeApp();
}

// Display demo content
document.getElementById("output").innerHTML = `
    <h3>Tic-Tac-Toe Features</h3>
    <p>&#9989; localStorage integration for game state persistence</p>
    <p>&#9989; Save and load game automatically</p>
    <p>&#9989; Track game statistics (wins, losses, draws)</p>
    <p>&#9989; Winner detection for all combinations</p>
    <p>&#9989; JSON serialization and parsing</p><br>
    <p>Check the console for localStorage demonstrations!</p>
`;