const game = document.getElementById('game');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const bricks = document.querySelectorAll('.brick');


let ballX = 300;
let ballY = 200;
let ballDX = 2; // Ball speed X
let ballDY = 2; // Ball speed Y
let paddleX = 250; 
const paddleWidth = 100;

let keys = {};

document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

function gameLoop() {

    if (keys['ArrowLeft'] && paddleX > 0) {
        paddleX -= 5;
    }
    if (keys['ArrowRight'] && paddleX < game.clientWidth - paddleWidth) {
        paddleX += 5;
    }
    paddle.style.left = `${paddleX}px`;

    ballX += ballDX;
    ballY += ballDY;

    if (ballX <= 0 || ballX >= game.clientWidth - ball.clientWidth) ballDX *= -1;
    if (ballY <= 0) ballDY *= -1;

    if (
        ballY + ball.clientHeight >= game.clientHeight - paddle.clientHeight &&
        ballX + ball.clientWidth >= paddleX &&
        ballX <= paddleX + paddleWidth
    ) {
        ballDY *= -1; 
    }

    if (ballY > game.clientHeight) {
        alert('Game Over!');
        return;
    }

    bricks.forEach((brick) => {
        const rect = brick.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();
        if (
            ballRect.left < rect.right &&
            ballRect.right > rect.left &&
            ballRect.top < rect.bottom &&
            ballRect.bottom > rect.top
        ) {
            brick.remove(); 
            ballDY *= -1; 
        }
    });

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(gameLoop);
}

gameLoop();
