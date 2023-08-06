/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { setItem, getItem } from './storage.js';
import { openEmptyBoxes } from './openEmptyBoxes.js';
import { renderNum } from './renderNum.js';
import { checkGameStatus } from './game-control.js';
import { renderBombCounter } from './game-bar.js';

export function onBoxClick(event) {
  const gameField = getItem('gameField');
  event.target.classList.add('game-field__box-open');

  if (!gameField[event.target.dataset.row][event.target.dataset.colum]) {
    setItem('callStackTimeControl', new Date().getTime());
    openEmptyBoxes(event.target.dataset.row, event.target.dataset.colum);
  } else {
    renderNum(event.target.dataset.row, event.target.dataset.colum);
    // event.target.innerHTML =
    //   gameField[event.target.dataset.row][event.target.dataset.colum];
    // switch (gameField[event.target.dataset.row][event.target.dataset.colum]) {
    //   case '*':
    //     event.target.style.backgroundColor = 'red';
    //     event.target.style.backgroundImage = "url('img/mine.png')";
    //     gameOver();
    //     break;
    //   case 1:
    //     event.target.style.color = 'blue';
    //     break;
    //   case 2:
    //     event.target.style.color = 'green';
    //     break;
    //   case 3:
    //     event.target.style.color = 'red';
    //     break;
    //   case 4:
    //     event.target.style.color = 'darkblue';
    //     break;
    //   case 5:
    //     event.target.style.color = 'darkred';
    //     break;
    //   case 6:
    //     event.target.style.color = 'darkgreen';
    //     break;
    //   case 7:
    //     event.target.style.color = 'purple';
    //     break;
    //   case 8:
    //     event.target.style.color = 'black';
    //     break;
    // }
    checkGameStatus();
  }
}

export function onBoxContextMenu(event) {
  event.preventDefault();
  console.log(event.target.style.backgroundImage);
  if (event.target.style.backgroundImage === 'url("img/flag.png")') {
    event.target.style.backgroundImage = '';
  } else {
    event.target.style.backgroundImage = 'url("img/flag.png")';
  }
  let bombCounter = getItem('bombCounter');
  if (bombCounter > 0) bombCounter -= 1;
  setItem('bombCounter', bombCounter);
  renderBombCounter();
}
