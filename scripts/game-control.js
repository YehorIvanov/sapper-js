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
  return score;
};
function youWin() {
  console.log(`You win! \n ${JSON.stringify(getScore())}`);
  alert(`You win! \n ${JSON.stringify(getScore())}`);
  clearInterval(getItem('timerId'));
  removeGameFieldEventListener();
}

export function gameOver() {
  openAllBombs();
  console.log('GameOver');
  function sayGameOver() {
    alert('Game over');
  }
  clearInterval(getItem('timerId'));
  setTimeout(sayGameOver, 1000);
  clearInterval(getItem('timerId'));
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
