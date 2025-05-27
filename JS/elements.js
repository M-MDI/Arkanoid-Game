import { PHYSICS } from "./state.js";

export let gameArea = null,
  paddleElem,
  ballElem,
  bricksContainer,
  scoreElem,
  livesElem,
  gameOverModal,
  gameOverText,
  finalScore,
  playAgainBtn,
  pauseMenu,
  continueBtn,
  restartBtn,
  timerElem,
  elements,
  startMenu,
  startBtn;

export function createGameElements() {
  // Get game area first
  gameArea = document.getElementById("game-area");
  if (!gameArea) {
    throw new Error("Game area element not found");
  }

  // Creating start menu first
  startMenu = document.createElement("div");
  startMenu.id = "menu";
  startMenu.innerHTML = `
        <div class="content">
            <h2>ARKANOID</h2>
            <button id="start-btn">START GAME</button>
        </div>
    `;

  // Creating game state
  const gameStateElem = document.createElement("div");
  gameStateElem.id = "game-state";
  gameStateElem.innerHTML = `
        <span id="score">SCORE: 0</span>
        <span id="timer">TIME: 3:00</span>
        <span id="lives">LIVES: 3</span>
    `;

  // Creating game elements
  paddleElem = document.createElement("div");
  paddleElem.id = "paddle";
  const initialWidth = Math.min(
    Math.max(gameArea.offsetWidth * 0.12 + 20, 60),
    180
  );
  paddleElem.style.width = `${initialWidth}px`;

  bricksContainer = document.createElement("div");
  bricksContainer.id = "bricks-container";

  ballElem = document.createElement("div");
  ballElem.id = "ball";

  // Creating pause menu
  pauseMenu = document.createElement("div");
  pauseMenu.id = "pause-menu";
  pauseMenu.style.display = "none";
  pauseMenu.innerHTML = `
        <div class="pause-content">
            <h2>GAME PAUSED</h2>
            <button id="continue-btn">CONTINUE</button>
            <button id="restart-btn">RESTART</button>
        </div>
    `;

  // Creating game over modal
  gameOverModal = document.createElement("div");
  gameOverModal.id = "menu";
  gameOverModal.style.display = "none";
  gameOverModal.innerHTML = `
        <div class="content">
            <h2 id="game-over-text"></h2>
            <p id="final-score"></p>
            <button id="play-again-btn">PLAY AGAIN</button>
        </div>
    `;

  // Append all elements to game area
  gameArea.appendChild(startMenu);
  gameArea.appendChild(gameStateElem);
  gameArea.appendChild(paddleElem);
  gameArea.appendChild(bricksContainer);
  gameArea.appendChild(ballElem);
  gameArea.appendChild(pauseMenu);
  gameArea.appendChild(gameOverModal);

  // Geting references to other elements
  scoreElem = document.getElementById("score");
  timerElem = document.getElementById("timer");
  livesElem = document.getElementById("lives");
  gameOverText = document.getElementById("game-over-text");
  finalScore = document.getElementById("final-score");
  playAgainBtn = document.getElementById("play-again-btn");
  continueBtn = document.getElementById("continue-btn");
  restartBtn = document.getElementById("restart-btn");
  startBtn = document.getElementById("start-btn");

  return gameStateElem;
}

export function initializeGameElements(gameArea) {
  elements = {
    paddle: {
      x: (gameArea.offsetWidth - PHYSICS.PADDLE_WIDTH) / 2,
      width: PHYSICS.PADDLE_WIDTH,
      height: 20,
    },
    ball: {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0,
      radius: 10,
    },
  };
}
