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


function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


function startNewGame() {
  let shuffledColors = shuffleArray([...COLORS]);

 
  const correctIndex = Math.floor(Math.random() * shuffledColors.length);
  targetColor = shuffledColors[correctIndex];

  
  colorBox.style.opacity = "0";
  colorBox.style.visibility = "hidden";

  gameStatus.textContent = "Guess the correct color!";
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


function checkGuess(selectedColor) {
  
  colorBox.style.backgroundColor = targetColor;
  colorBox.style.opacity = "1";
  colorBox.style.visibility = "visible";

  if (selectedColor === targetColor) {
    score++;
    gameStatus.textContent = "Correct! 🎉";
    gameStatus.style.color = "green";
  } else {
    failedAttempts++;
    gameStatus.textContent = "Wrong! ❌ Try Again!";
    gameStatus.style.color = "red";
  }

  
  scoreDisplay.textContent = `Score: ${score}`;
  failedCounterDisplay.textContent = `Failed: ${failedAttempts}`;

  
  setTimeout(startNewGame, 1500);
}


newGameButton.addEventListener("click", () => {
  score = 0;
  failedAttempts = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  failedCounterDisplay.textContent = `Failed: ${failedAttempts}`;
  startNewGame();
});


startNewGame();
