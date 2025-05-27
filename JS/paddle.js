import { state, elements, PHYSICS } from './state.js';
import { gameArea, paddleElem } from './elements.js';

export function updatePaddle() {
    const nextX = elements.paddle.x + state.paddleDirection * PHYSICS.PADDLE_SPEED;
    const maxX = gameArea.clientWidth - elements.paddle.width;
    elements.paddle.x = Math.max(0, Math.min(nextX, maxX));
    paddleElem.style.transform = `translateX(${Math.floor(elements.paddle.x)}px)`;
}
