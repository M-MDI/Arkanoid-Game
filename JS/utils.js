import { state, elements, PHYSICS } from './state.js';
import { gameArea, paddleElem } from './elements.js';
import { updatePaddle } from './paddle.js';
import { updateBallPosition } from './ball.js';
import { buildBricks } from './brick.js';
import { updateUIScale } from './ui.js';

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function handleResize() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    
    if (newWidth === state.windowWidth && newHeight === state.windowHeight) return;

    state.windowWidth = newWidth;
    state.windowHeight = newHeight;

    // Recalculating game dimensions
    const gameContainer = document.querySelector('.game-container');
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    
    // Calculating scale for UI only
    const scale = Math.min(containerWidth / 1400, containerHeight / 800);
    state.scale = scale;

    // Updating game dimensions
    gameArea.style.width = `${containerWidth}px`;
    gameArea.style.height = `${containerHeight}px`;
    
    // Calculating new paddle width
    const newPaddleWidth = Math.min(Math.max(containerWidth * 0.12 + 20, 60), 180);
    elements.paddle.width = newPaddleWidth;
    paddleElem.style.width = `${newPaddleWidth}px`;
    
    // Updating paddle position
    const paddlePosition = elements.paddle.x / gameArea.offsetWidth;
    elements.paddle.x = Math.min(
        Math.max(0, paddlePosition * gameArea.offsetWidth),
        gameArea.offsetWidth - newPaddleWidth
    );
    
    // Keep ball speed constant
    PHYSICS.BALL_SPEED = 15;
    PHYSICS.PADDLE_SPEED = 15;
    
    // Updating positions
    updatePaddle();
    if (!state.ballLaunched) {
        elements.ball.x = elements.paddle.x + elements.paddle.width / 2;
        elements.ball.y = gameArea.offsetHeight - elements.paddle.height - 33;
    }
    updateBallPosition();
    
    // Updating game state height for ball collisions
    const gameStateElem = document.getElementById('game-state');
    state.gameStateHeight = gameStateElem.offsetHeight;
    
    buildBricks();
    updateUIScale();
}