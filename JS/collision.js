import { state, elements, PHYSICS } from './state.js';
import { gameArea } from './elements.js';
import { gameOver } from './game-management.js';
import { updateUI } from './ui.js';
import { loseLife } from './game-management.js';

export function checkCollisions() {
    // Top collision (adjusted for game-state height)
    if (elements.ball.y < elements.ball.radius + state.gameStateHeight) {
        elements.ball.dy *= -1;
        elements.ball.y = elements.ball.radius + state.gameStateHeight;
    }

    // Wall collisions
    if (elements.ball.x < elements.ball.radius || 
        elements.ball.x > gameArea.offsetWidth - elements.ball.radius) {
        elements.ball.dx *= -1;
        elements.ball.x = Math.max(elements.ball.radius, 
            Math.min(gameArea.offsetWidth - elements.ball.radius, elements.ball.x));
    }
    
    // Bottom collision
    if (elements.ball.y < elements.ball.radius) {
        elements.ball.dy *= -1;
        elements.ball.y = elements.ball.radius;
    }
    
    // Lose life if ball goes below the paddle
    if (elements.ball.y > gameArea.offsetHeight - elements.ball.radius) {
        loseLife();
        return;
    }

    // Improved paddle collision logic
    const paddleTop = gameArea.offsetHeight - elements.paddle.height - 30;
    const paddleRight = elements.paddle.x + elements.paddle.width + 10;
    const paddleLeft = elements.paddle.x - 10;
    const ballBottom = elements.ball.y + elements.ball.radius;
    const ballTop = elements.ball.y - elements.ball.radius;
    const ballRight = elements.ball.x + elements.ball.radius;
    const ballLeft = elements.ball.x - elements.ball.radius;
    
    // Only check for paddle collision if ball is moving downward
    if (elements.ball.dy > 0) {
        // Check if ball is at paddle height and within paddle width
        if (ballBottom >= paddleTop && ballTop <= paddleTop &&
            ballRight >= paddleLeft && ballLeft <= paddleRight) {
            
            // Calculate bounce angle based on where ball hits paddle
            const paddleCenter = paddleLeft + elements.paddle.width / 2;
            const hitPosition = (elements.ball.x - paddleCenter) / (elements.paddle.width / 2);
            const maxAngle = Math.PI / 3; // 60 degrees
            const bounceAngle = hitPosition * maxAngle;
            
            // Calculate new velocity while maintaining speed
            const speed = Math.sqrt(elements.ball.dx * elements.ball.dx + elements.ball.dy * elements.ball.dy);
            elements.ball.dx = Math.sin(bounceAngle) * speed;
            elements.ball.dy = -Math.abs(Math.cos(bounceAngle) * speed);
            
            // Ensure ball is above paddle
            elements.ball.y = paddleTop - elements.ball.radius;
            return;
        }
    }

    state.bricks.forEach((brick, index) => {  // Brick collisions
        if (!brick.active) return;
        const brickLeft = brick.x;
        const brickRight = brick.x + brick.width;
        const brickTop = brick.y;
        const brickBottom = brick.y + PHYSICS.BRICK_HEIGHT;

        // Calculate the ball's previous position
        const prevBallX = elements.ball.x - elements.ball.dx * PHYSICS.BALL_SPEED;
        const prevBallY = elements.ball.y - elements.ball.dy * PHYSICS.BALL_SPEED;
        
        // Check if collision occurred
        if (elements.ball.x + elements.ball.radius > brickLeft &&
            elements.ball.x - elements.ball.radius < brickRight &&
            elements.ball.y + elements.ball.radius > brickTop &&
            elements.ball.y - elements.ball.radius < brickBottom) {

            // Determine collision side based on previous position
            const fromBottom = prevBallY - elements.ball.radius >= brickBottom;
            const fromTop = prevBallY + elements.ball.radius <= brickTop;
            const fromLeft = prevBallX + elements.ball.radius <= brickLeft;
            const fromRight = prevBallX - elements.ball.radius >= brickRight;

            // Apply appropriate bounce
            if (fromTop || fromBottom) {
                elements.ball.dy *= -1;
                elements.ball.y = fromTop ? brickTop - elements.ball.radius : brickBottom + elements.ball.radius;
            } else if (fromLeft || fromRight) {
                elements.ball.dx *= -1;
                elements.ball.x = fromLeft ? brickLeft - elements.ball.radius : brickRight + elements.ball.radius;
            }

            // Remove brick and update score
            brick.element.remove();
            state.bricks[index].active = false;
            state.score += 10;
            updateUI();
            if (state.bricks.every(brick => !brick.active)) {  // Check for game win
                gameOver('You Win!');
            }

            return; // Exit after collision to prevent multiple brick hits
        }
    });
}