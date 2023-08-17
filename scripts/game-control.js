/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { getItem, setItem } from './storage.js';
import { onBoxClick, onBoxContextMenu } from './eventListeners.js';

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
  // return score;
};
const onOkBtnEvent = (event) => {
  const { buttonId } = event.target.dataset;
  event.target.classList.remove('hidden');
  document.querySelector('.window-modal-overlay').classList.add('hidden');
  console.log(buttonId);
};

function showOkBtn(buttonId) {
  const okBtnElem = document.querySelector('.window-modal__btn');
  console.log(okBtnElem);

  okBtnElem.classList.remove('hidden');
  okBtnElem.addEventListener('click', onOkBtnEvent);
  okBtnElem.dataset.buttonId = buttonId;
}

function renderScore() {
  document.querySelector('.window-modal-overlay').classList.remove('hidden');
  const modalCcontentElem = document.querySelector('.window-modal__content');
  modalCcontentElem.innerHTML = `<div class="window-modal__score">Your Score: ${getItem('score')}</div>
  <div class="window-modal__best-score">Best Score: ${getItem('bestScore')}</div>`;
  showOkBtn('yourWin');
}

function renderGameOver() {
  document.querySelector('.window-modal-overlay').classList.remove('hidden');
  showOkBtn('gameOver');
  const modalCcontentElem = document.querySelector('.window-modal__content');
  modalCcontentElem.innerHTML = '<div class="window-modal__score">Game Over</div>';
}
function youWin() {
  getScore();
  console.log(`You win! \n ${getScore()} `);
  renderScore();

  clearInterval(getItem('timerId'));
  removeGameFieldEventListener();
}

export function gameOver() {
  openAllBombs();
  console.log('GameOver');
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
