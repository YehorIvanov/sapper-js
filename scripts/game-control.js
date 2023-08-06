/* eslint-disable operator-linebreak */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import { getItem } from './storage.js';
import { onBoxClick, onBoxContextMenu } from './eventListeners.js';

function openAllBombs() {
  const gameField = getItem('gameField');
  gameField.forEach((row, rowNumber) => row.forEach((box, boxNumber) => {
    if (box === '*') {
      const boxWithBombElem = document.querySelector(
        `div[data-row="${rowNumber}"][data-colum="${boxNumber}"].game-field__box`,
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

function youWin() {
  console.log('You win!');
  alert('You win!');
  clearInterval(getItem('timerId'));
  removeGameFieldEventListener();
}

export function gameOver() {
  openAllBombs();
  console.log('GameOver');
  function sayGameOver() {
    alert('Game over');
  }
  setTimeout(sayGameOver, 1000);
  clearInterval(getItem('timerId'));
  removeGameFieldEventListener();
}

export function checkGameStatus() {
  const openedBoxCount = document.querySelectorAll(
    '.game-field__box-open',
  ).length;
  const closedBoxCount =
    getItem('widthField') * getItem('heightField') - openedBoxCount;
  if (closedBoxCount === getItem('numberOfBombs')) youWin();
}
