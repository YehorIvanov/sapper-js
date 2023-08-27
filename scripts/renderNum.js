/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import { getItem } from './storage.js';
import { gameOver } from './game-control.js';

function renderNum(row, colum) {
  const gameField = getItem('gameField');
  const boxElem = document.querySelector(
    `div[data-row="${row}"][data-colum="${colum}"].game-field__box`,
  );
  if (gameField[row][colum]) boxElem.innerHTML = gameField[row][colum];
  switch (gameField[row][colum]) {
    case '*':
      boxElem.style.backgroundColor = 'red';
      boxElem.style.backgroundImage = "url('img/mine.png')";
      gameOver();
      break;
    case 1:
      boxElem.style.color = 'blue';
      break;
    case 2:
      boxElem.style.color = 'green';
      break;
    case 3:
      boxElem.style.color = 'red';
      break;
    case 4:
      boxElem.style.color = 'darkblue';
      break;
    case 5:
      boxElem.style.color = 'darkred';
      break;
    case 6:
      boxElem.style.color = 'darkgreen';
      break;
    case 7:
      boxElem.style.color = 'purple';
      break;
    case 8:
      boxElem.style.color = 'black';
      break;
    default:
      break;
  }
}

export default renderNum;
