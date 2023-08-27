import { getItem, setItem } from './storage.js';
import { gameOver } from './game-control.js';

export function renderTimer() {
  const gameStartTime = getItem('startGameTime');
  let gameTimer = '000';
  if (gameStartTime) {
    gameTimer = ((new Date().getTime() - gameStartTime) / 1000)
      .toFixed()
      .toString()
      .padStart(3, '0');
  }
  if (+gameTimer > 998) gameOver();
  document.querySelector(
    '.game-bar__timer',
  ).innerHTML = `<div class="game-bar__bomb-num" style="background-image: url('img/d${gameTimer[0]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('img/d${gameTimer[1]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('img/d${gameTimer[2]}.svg');"></div>`;
  setItem('gameTimer', gameTimer);
}
export function renderBombCounter() {
  const bombCounter = getItem('bombCounter').toString().padStart(3, '0');
  document.querySelector(
    '.game-bar__bomb-counter',
  ).innerHTML = `<div class="game-bar__bomb-num" style="background-image: url('img/d${bombCounter[0]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('img/d${bombCounter[1]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('img/d${bombCounter[2]}.svg');"></div>`;
}
