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
    checkGameStatus();
  }
}

export function onBoxContextMenu(event) {
  event.preventDefault();
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
