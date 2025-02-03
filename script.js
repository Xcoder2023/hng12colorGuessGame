const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const failedCounterDisplay = document.getElementById("failedCounter");
const newGameButton = document.getElementById("newGameButton");

let targetColor = "";
let score = 0;
let failedAttempts = 0;

// Function to shuffle an array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Function to start a new game
function startNewGame() {
  let shuffledColors = shuffleArray([...COLORS]);

  const correctIndex = Math.floor(Math.random() * shuffledColors.length);
  targetColor = shuffledColors[correctIndex];

  colorBox.style.backgroundColor = targetColor;

  gameStatus.textContent = "Select the correct color option!";
  gameStatus.style.color = "#333";

  colorOptionsContainer.innerHTML = "";
  shuffledColors.forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("color-btn");
    button.style.backgroundColor = color;
    button.setAttribute("data-testid", "colorOption");

    button.addEventListener("click", () => checkGuess(color));
    colorOptionsContainer.appendChild(button);
  });
}

// Function to check the user's guess
function checkGuess(selectedColor) {
  if (selectedColor === targetColor) {
    score++;
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.style.color = "green";
  } else {
    failedAttempts++;
    gameStatus.textContent = "Wrong! ❌ Try Again!";
    gameStatus.style.color = "red";
  }

  // Update counters
  scoreDisplay.textContent = `Score: ${score}`;
  failedCounterDisplay.textContent = `Failed: ${failedAttempts}`;

  // Wait 1 second before starting a new round so player sees result
  setTimeout(startNewGame, 1500);
}

// New Game Button Event Listener
newGameButton.addEventListener("click", () => {
  score = 0;
  failedAttempts = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  failedCounterDisplay.textContent = `Failed: ${failedAttempts}`;
  startNewGame();
});

// Start the game on page load
startNewGame();
