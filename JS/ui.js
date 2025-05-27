import { state } from "./state.js";
import { scoreElem, livesElem, timerElem } from "./elements.js";

export function updateUI() {
  const fontSize = Math.max(14, Math.min(20, 14 + state.scale * 6));
  const style = `font-size: ${fontSize}px`;

  scoreElem.style = style;
  livesElem.style = style;
  timerElem.style = style;

  scoreElem.textContent = `SCORE: ${state.score}`;
  livesElem.textContent = `LIVES: ${state.lives}`;
}

export function updateTimer() {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  timerElem.textContent = `TIME: ${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function updateUIScale() {
  // Scale font sizes based on game container size
  const fontSize = Math.max(14, Math.min(20, 14 + state.scale * 6));
  const style = `font-size: ${fontSize}px`;

  // Apply styles to game state elements
  scoreElem.style.cssText = style;
  livesElem.style.cssText = style;
  timerElem.style.cssText = style;

  // Scale menu text sizes
  const menuFontSize = Math.max(20, Math.min(28, 20 + state.scale * 8));
  const menuStyle = `font-size: ${menuFontSize}px`;

  // Update menu text sizes
  document.querySelectorAll(".content h2, .pause-content h2").forEach((el) => {
    el.style.cssText = menuStyle;
    if (!el.textContent.includes("GAME OVER")) {
      el.textContent = el.textContent.toUpperCase();
    }
  });

  document
    .querySelectorAll(".content p, .pause-content p")
    .forEach((el) => (el.style.cssText = `font-size: ${menuFontSize * 0.5}px`));

  // Update content
  updateUI();
  updateTimer();
}
