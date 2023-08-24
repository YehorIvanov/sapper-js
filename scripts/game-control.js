/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { getItem, setItem } from './storage.js';
import { onBoxClick, onBoxContextMenu } from './eventListeners.js';
import showModal from './modal.js';

function openAllBombs() {
  const gameField = getItem('gameField');
  gameField.forEach((row, rowNumber) =>
    row.forEach((box, boxNumber) => {
      if (box === '*') {
        const boxWithBombElem = document.querySelector(
          `div[data-row="${rowNumber}"][data-colum="${boxNumber}"].game-field__box`
        );
        boxWithBombElem.classList.add('game-field__box-open');
        boxWithBombElem.style.backgroundColor = 'red';
        boxWithBombElem.style.backgroundImage = "url('img/mine.png')";
      }
    }));
}

function removeGameFieldEventListener() {
  const gameFieldElem = document.querySelector('.game__field');
  gameFieldElem.removeEventListener('click', onBoxClick);
  gameFieldElem.removeEventListener('contextmenu', onBoxContextMenu);
}
const getScore = () => {
  const bestScore = getItem('bestScore');
  const widthField = getItem('widthField');
  const heightField = getItem('heightField');
  const numberOfBombs = getItem('numberOfBombs');
  const startGameTime = getItem('startGameTime');
  const endGameTime = new Date().getTime();
  const score = Math.floor(
    (numberOfBombs * widthField * heightField) /
      (((endGameTime - startGameTime) / 1000) / numberOfBombs)
  );
  if (score > bestScore) setItem('bestScore', score);
  setItem('score', score);
};

function renderScore() {
  showModal(`<div class="window-modal__score">Your Score: ${getItem('score')}</div>
  <div class="window-modal__best-score">Best Score: ${getItem('bestScore')}</div>`, 'yourWin');
}

function renderGameOver() {
  showModal('<div class="window-modal__score">Game Over</div>', 'gameOver');
}

function youWin() {
  getScore();
  clearInterval(getItem('timerId'));
  removeGameFieldEventListener();
  renderScore();
  document.querySelector('.game-bar__smile').innerHTML = '&#128526;';
  const carrentLevel = getItem('level');
  const levelsTotal = getItem('levels').length - 1;
  const passedLevels = getItem('passedLevels');
  passedLevels.push(carrentLevel);
  setItem('passedLevels', passedLevels);
  if (carrentLevel < levelsTotal) {
    setItem('level', carrentLevel + 1);
  }
}

export function gameOver() {
  openAllBombs();
  clearInterval(getItem('timerId'));
  setTimeout(renderGameOver, 1000);
  removeGameFieldEventListener();
  document.querySelector('.game-bar__smile').innerHTML = '&#128577;';
}

export function checkGameStatus() {
  const openedBoxCount = document.querySelectorAll(
    '.game-field__box-open'
  ).length;
  const closedBoxCount =
    getItem('widthField') * getItem('heightField') - openedBoxCount;
  if (closedBoxCount === getItem('numberOfBombs')) youWin();
}
