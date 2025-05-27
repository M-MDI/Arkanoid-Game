import { state, elements } from './state.js';
import { createGameElements, initializeGameElements, paddleElem, gameArea } from './elements.js';
import { setupControls } from './controls.js';
import { updateBall, updateBallPosition } from './ball.js';
import { updatePaddle } from './paddle.js';
import { buildBricks } from './brick.js';
import { checkCollisions } from './collision.js';
import { updateUI, updateTimer } from './ui.js';
import { handleResize, debounce } from './utils.js';

function init() {
    // Initializing DOM elements
    const gameStateElem = createGameElements();

    // Initializing game elements with scaled paddle width
    initializeGameElements(gameArea);
    const gameContainer = document.querySelector('.game-container');
    const containerWidth = gameContainer.offsetWidth;
    const newPaddleWidth = Math.min(Math.max(containerWidth * 0.12 + 20, 60), 180);
    
    elements.paddle.width = newPaddleWidth;
    paddleElem.style.width = `${newPaddleWidth}px`;

    // Centering the paddle
    elements.paddle.x = (gameArea.offsetWidth - elements.paddle.width) / 2;
    elements.ball.x = elements.paddle.x + elements.paddle.width / 2;
    elements.ball.y = gameArea.offsetHeight - elements.paddle.height - 33;

    // Updating initial positions visually
    updatePaddle();
    updateBallPosition();

    state.gameStateHeight = gameStateElem.offsetHeight;
    buildBricks();
    setupControls();
    gameLoop();
    updateUI();
    updateTimer();

    // Resizing listener
    window.addEventListener('resize', debounce(handleResize, 250));
    handleResize();
}

// Main game loop
function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (!state.gameStarted || state.isGameOver || state.isPaused) return;

    // Update timer independently of frame timing
    const now = Date.now();
    if (state.timerStarted && now - state.lastTimerUpdate >= 1000) {
        state.timeLeft--;
        updateTimer();
        state.lastTimerUpdate = now;
        
        if (state.timeLeft <= 0) {
            gameOver('Oops, Time is out!');
            return;
        }
    }

    // Game physics updates - simplified timing
    updatePaddle();

    if (state.ballLaunched) {
        updateBall();
        checkCollisions();
    } else {
        elements.ball.x = elements.paddle.x + elements.paddle.width / 2;
        elements.ball.y = gameArea.offsetHeight - elements.paddle.height - 33;
        updateBallPosition();
    }
}

// Start the game...
init();