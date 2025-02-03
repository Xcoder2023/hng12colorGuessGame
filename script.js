const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

const colorBox = document.getElementById("colorBox");
const colorOptionsContainer = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const failedCounterDisplay = document.getElementById("failedCounter");
const newGameButton = document.getElementById("newGameButton");

let targetColor = "";


let score = localStorage.getItem("score")
  ? parseInt(localStorage.getItem("score"))
  : 0;
let failedAttempts = localStorage.getItem("failedAttempts")
  ? parseInt(localStorage.getItem("failedAttempts"))
  : 0;


scoreDisplay.textContent = `Score: ${score}`;
failedCounterDisplay.textContent = `Failed: ${failedAttempts}`;


function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


function startNewGame() {
  let shuffledColors = shuffleArray([...COLORS]);

  
  const correctIndex = Math.floor(Math.random() * shuffledColors.length);
  targetColor = shuffledColors[correctIndex];

  
  colorBox.style.backgroundColor = targetColor;

  gameStatus.textContent = "Guess the correct color from the options Above!";
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

  
  localStorage.setItem("score", score);
  localStorage.setItem("failedAttempts", failedAttempts);

  
  setTimeout(startNewGame, 1000);
}


newGameButton.addEventListener("click", () => {
  score = 0;
  failedAttempts = 0;
  localStorage.setItem("score", score);
  localStorage.setItem("failedAttempts", failedAttempts);
  scoreDisplay.textContent = `Score: ${score}`;
  failedCounterDisplay.textContent = `Failed: ${failedAttempts}`;
  startNewGame();
});


startNewGame();
