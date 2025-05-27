import { state, elements } from './state.js';
import { resetBall } from './ball.js';
import { buildBricks } from './brick.js';
import { updateUI, updateTimer } from './ui.js';
import { gameOverText, finalScore, gameOverModal, startMenu, pauseMenu, gameArea } from './elements.js';
import { updatePaddle } from './paddle.js';

export function gameOver(message) {
    gameOverText.textContent = message;
    finalScore.textContent = `Final Score: ${state.score}`;
    gameOverModal.style.display = 'flex';
    resetTheGame();
}

export function resetTheGame() {
    state.isGameOver = true;
    state.ballLaunched = false;
    state.isPaused = false;
    state.paddleDirection = 0;
    state.timerStarted = false;
    state.lastTime = null;
    state.gameStarted = false;
    startMenu.style.display = 'flex';
    pauseMenu.style.display = 'none';
    state.lives = 3;
    state.score = 0;
    state.timeLeft = 180;
    
    // Reset paddle position
    elements.paddle.x = (gameArea.offsetWidth - elements.paddle.width) / 2;
    updatePaddle();
    resetBall();
    buildBricks();
    updateUI();
    updateTimer();
}

export function togglePause() {
    if (state.isGameOver) return;

    state.isPaused = !state.isPaused;
    pauseMenu.style.display = state.isPaused ? 'flex' : 'none';
    state.lastTime = null;
}

export function loseLife() {
    state.lives--;
    updateUI();
    
    if (state.lives <= 0) {
        gameOver('Game Over! Your score: ' + state.score);
    } else {
        resetBall();
    }
}

export function startGame() {
    state.gameStarted = true;
    state.isGameOver = false;
 
    state.lastTime = Date.now();
    startMenu.style.display = 'none';
    
    buildBricks();
    updateUI();
    updateTimer();
}





