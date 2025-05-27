import { state, PHYSICS } from "./state.js";
import { gameArea, bricksContainer } from "./elements.js";

export function buildBricks() {
  bricksContainer.innerHTML = "";
  state.bricks = [];

  // Recalculate brick dimensions based on game area
  const gameWidth = gameArea.offsetWidth;
  const effectiveWidth = gameWidth * 0.9;
  const brickWidth =
    (effectiveWidth - (PHYSICS.BRICK_COLS - 1) * PHYSICS.BRICK_GAP) /
    PHYSICS.BRICK_COLS;

  const startX =
    (gameWidth - PHYSICS.BRICK_COLS * (brickWidth + PHYSICS.BRICK_GAP)) / 2;

  for (let row = 0; row < PHYSICS.BRICK_ROWS; row++) {
    for (let col = 0; col < PHYSICS.BRICK_COLS; col++) {
      const brick = document.createElement("div");
      brick.className = `brick brick-row-${row % 7}`; // Add row-specific color class

      // Add metallic gradient and 3D effect
      const colorClass = `brick-row-${row % 7}`;

      const x = startX + col * (brickWidth + PHYSICS.BRICK_GAP);
      const y = 100 + row * (PHYSICS.BRICK_HEIGHT + PHYSICS.BRICK_GAP);
      brick.style.left = `${x}px`;
      brick.style.top = `${y}px`;
      brick.style.width = `${brickWidth}px`;

      // Add metallic effect with CSS
      brick.style.borderTop = "2px solid rgba(255, 255, 255, 0.5)";
      brick.style.borderLeft = "2px solid rgba(255, 255, 255, 0.3)";
      brick.style.borderRight = "2px solid rgba(0, 0, 0, 0.2)";
      brick.style.borderBottom = "2px solid rgba(0, 0, 0, 0.4)";

      bricksContainer.appendChild(brick);

      state.bricks.push({
        element: brick,
        active: true,
        x: x,
        y: y,
        width: brickWidth,
      });
    }
  }
}
