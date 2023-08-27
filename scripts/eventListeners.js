
import * as storageJs from './storage.js';
import { openEmptyBoxes } from './openEmptyBoxes.js';
import renderNum from './renderNum.js';
import { checkGameStatus } from './game-control.js';
import { renderBombCounter } from './game-bar.js';
import showModal from './modal.js';
import renderLevelsTable from './renderLevelsTable.js';

export function onBoxClick(event) {
  const gameField = storageJs.getItem('gameField');
  event.target.classList.add('game-field__box-open');

  if (!gameField[event.target.dataset.row][event.target.dataset.colum]) {
    storageJs.setItem('callStackTimeControl', new Date().getTime());
    openEmptyBoxes(event.target.dataset.row, event.target.dataset.colum);
  } else {
    renderNum(event.target.dataset.row, event.target.dataset.colum);
    checkGameStatus();
  }
}

export function onBoxContextMenu(event) {
  event.preventDefault();
  const eventElem = event.target;
  let bombCounter = storageJs.getItem('bombCounter');
  if (eventElem.style.backgroundImage === 'url("img/flag.png")') {
    eventElem.style.backgroundImage = '';
    if (bombCounter > 0) bombCounter += 1;
  } else {
    eventElem.style.backgroundImage = 'url("img/flag.png")';
    if (bombCounter > 0) bombCounter -= 1;
  }
  storageJs.setItem('bombCounter', bombCounter);
  renderBombCounter();
}
export function onMenuClick(event) {
  switch (event.target.dataset.buttonId) {
    case 'help':
      showModal(`<div class="window-modal__help">${storageJs.getItem('help')}</div>`, 'closeHelp');
      break;
    case 'game':
      renderLevelsTable();
      break;
    default:
  }
}
