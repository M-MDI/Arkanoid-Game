export const PHYSICS = {
    BALL_SPEED: 15,
    PADDLE_SPEED: 15,
    BRICK_ROWS: 5,
    BRICK_COLS: 10,
    BRICK_HEIGHT: 40,
    BRICK_GAP: 10,
    PADDLE_WIDTH: 180
};

export const state = {
    score: 0,
    lives: 3,
    ballLaunched: false,
    isPaused: false,
    lastTime: 0,
    gameStateHeight: 0,
    paddleDirection: 0,
    bricks: [],
    timeLeft: 180,
    lastTimerUpdate: 0,
    timerStarted: false,
    isGameOver: false,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    scale: 1,
    gameStarted: false
};

export const elements = {
    paddle: {
        x: 0,
        width: PHYSICS.PADDLE_WIDTH,
        height: 20
    },
    ball: {
        x: 0,
        y: 0,
        dx: 0,
        dy: 0,
        radius: 10
    }
};