import { state, elements, PHYSICS } from './state.js';
import { gameArea, ballElem } from './elements.js';

export function updateBall() {
    elements.ball.x += elements.ball.dx * PHYSICS.BALL_SPEED;
    elements.ball.y += elements.ball.dy * PHYSICS.BALL_SPEED;
    updateBallPosition();
}

export function updateBallPosition() {
    ballElem.style.transform = `translate(${elements.ball.x - elements.ball.radius}px, ${elements.ball.y - elements.ball.radius}px)`;
}

export function resetBall() {
    state.ballLaunched = false;
    // Reset ball position to paddle
    elements.ball.x = elements.paddle.x + elements.paddle.width / 2;
    elements.ball.y = gameArea.offsetHeight - elements.paddle.height - 33;
    // Reset ball velocity
    elements.ball.dx = 0;
    elements.ball.dy = 0;
    updateBallPosition();
}

export function launchBall() {
    if (state.ballLaunched) return;
    state.ballLaunched = true;
    state.timerStarted = true;
    state.lastTimerUpdate = Date.now();
    
    // Set constant initial velocity
    elements.ball.dx = 0.707;
    elements.ball.dy = -0.707;
}
