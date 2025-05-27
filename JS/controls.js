import { state } from './state.js';
import { launchBall } from './ball.js';
import { togglePause, resetTheGame, startGame } from './game-management.js';
import { startBtn, continueBtn, playAgainBtn, restartBtn, gameOverModal, pauseMenu } from './elements.js';

export function setupControls() {
    // Add start button listener
    startBtn.addEventListener('click', startGame);

    // Only allow controls if game has started
    document.addEventListener('keydown', (e) => {
        if (!state.gameStarted) return;
        
        if (e.key === 'ArrowLeft') {
            state.paddleDirection = -1;
        } else if (e.key === 'ArrowRight') {
            state.paddleDirection = 1;
        } else if (e.key === ' ' && !state.ballLaunched) {
            launchBall();
        } else if (e.key === 'Escape') {
            togglePause();
        }
    });

    // Stop paddle movement when key is released
    document.addEventListener('keyup', (e) => {
        if ((e.key === 'ArrowLeft' && state.paddleDirection === -1) ||
            (e.key === 'ArrowRight' && state.paddleDirection === 1)) {
            state.paddleDirection = 0;
        }
    });

    // Add button listeners
    continueBtn.addEventListener('click', () => {
        togglePause();
    });

    playAgainBtn.addEventListener('click', () => {
        resetTheGame();
        gameOverModal.style.display = 'none';
        pauseMenu.style.display = 'none';
    });

    restartBtn.addEventListener('click', () => {
        resetTheGame();
    });
}