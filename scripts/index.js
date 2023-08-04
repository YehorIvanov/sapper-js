/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable default-case */
/* eslint-disable import/extensions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import { getItem, setItem } from './storage.js';
// eslint-disable-next-line import/extensions
import { getNeighboringBoxes } from './getNeighboringBoxes.js';
import { openEmptyBoxes } from './openEmptyBoxes.js';

const getNewGameField = (
  widthField = 10,
  heightField = 10,
  numberOfBombs = 15,
) => {
  setItem('widthField', widthField);
  setItem('heightField', heightField);
  setItem('numberOfBombs', numberOfBombs);
  setItem('bombCounter', numberOfBombs);
  const array = new Array(heightField)
    .fill(null)
    .map(() => new Array(widthField).fill(null));

  for (let i = 0; i < numberOfBombs; i += 1) {
    let xLoc;
    let yLoc;
    do {
      xLoc = Math.floor(Math.random() * 10);
      yLoc = Math.floor(Math.random() * 10);
    } while (array[xLoc][yLoc] === '*');
    array[xLoc][yLoc] = '*';
  }

  setItem('gameField', array);
  addNumbersToGameField();
};

function addNumbersToGameField() {
  const gameField = getItem('gameField');
  gameField.forEach((row, rowNumber) =>
    row.forEach((box, boxNumber) => {
      if (box !== '*') {
        gameField[rowNumber][boxNumber] = getNeighboringBoxes(
          rowNumber,
          boxNumber,
          '*',
        ).length;
      }
    }),
  );
  setItem('gameField', gameField);
}

const logGameFieldToConsole = () => {
  const gameField = getItem('gameField');
  console.log('\n');
  gameField.forEach((line) => {
    console.log(line.reduce((acc, cell) => `${acc}| ${cell} `, ''));
  });
};
function renderBombCounter() {
  const bombCounter = getItem('bombCounter').toString().padStart(3, '0');
  document.querySelector('.game-bar__bomb-counter').innerHTML = bombCounter;
  if (+bombCounter < 0) youWin();
}

function onBoxClick(event) {
  const gameField = getItem('gameField');
  console.log(event.target.dataset.row, event.target.dataset.colum);
  event.target.classList.add('game-field__box-open');

  if (!gameField[event.target.dataset.row][event.target.dataset.colum]) {
    setItem('callStackTimeControl', new Date().getTime());
    openEmptyBoxes(event.target.dataset.row, event.target.dataset.colum);
  } else {
    event.target.innerHTML =
      gameField[event.target.dataset.row][event.target.dataset.colum];
    switch (gameField[event.target.dataset.row][event.target.dataset.colum]) {
      case '*':
        event.target.style.backgroundColor = 'red';
        gameOver();
        break;
      case 1:
        event.target.style.color = 'blue';
        break;
      case 2:
        event.target.style.color = 'green';
        break;
      case 3:
        event.target.style.color = 'red';
        break;
      case 4:
        event.target.style.color = 'darkblue';
        break;
      case 5:
        event.target.style.color = 'darkred';
        break;
      case 6:
        event.target.style.color = 'darkgreen';
        break;
      case 7:
        event.target.style.color = 'purple';
        break;
      case 8:
        event.target.style.color = 'black';
        break;
    }
  }
}
function onBoxContextMenu(event) {
  console.log('onBoxContextMenu');
  event.preventDefault();
  event.target.innerHTML = '&#128681';
  let bombCounter = getItem('bombCounter');
  if (bombCounter > 0) bombCounter -= 1;
  setItem('bombCounter', bombCounter);
  renderBombCounter();
}
function renderGameField() {
  const gameField = getItem('gameField');
  const numberOfRows = gameField.length;
  const numberOfColums = gameField[0].length;
  const gameFieldElem = document.querySelector('.game__field');
  gameFieldElem.innerHTML = '';
  gameFieldElem.removeEventListener('click', onBoxClick);
  gameFieldElem.addEventListener('click', onBoxClick);
  gameFieldElem.addEventListener('contextmenu', onBoxContextMenu);
  for (let carrentRow = 0; carrentRow < numberOfRows; carrentRow += 1) {
    const carrentRowElem = document.createElement('div');
    carrentRowElem.dataset.row = carrentRow;
    carrentRowElem.classList.add('game-field__row');

    for (
      let carrentColum = 0;
      carrentColum < numberOfColums;
      carrentColum += 1
    ) {
      const carrentColumElem = document.createElement('div');
      // if (gameField[carrentRow][carrentColum]) {
      //   carrentColumElem.innerHTML = gameField[carrentRow][carrentColum];
      // }
      carrentColumElem.dataset.row = carrentRow;
      carrentColumElem.dataset.colum = carrentColum;
      carrentColumElem.classList.add('game-field__box');
      carrentRowElem.append(carrentColumElem);
    }
    gameFieldElem.append(carrentRowElem);
  }
}
function renderTimer() {
  const gameStartTime = getItem('startGameTime');
  let gameTimer = '000';
  if (gameStartTime) {
    gameTimer = ((new Date().getTime() - gameStartTime) / 1000)
      .toFixed()
      .toString()
      .padStart(3, '0');
  }
  if (+gameTimer > 998) gameOver();
  document.querySelector('.game-bar__timer').innerHTML = gameTimer;
}

function newGame() {
  getNewGameField();
  logGameFieldToConsole();
  renderGameField();
  renderBombCounter();
  setItem('startGameTime', new Date().getTime());
  renderTimer();
  const timerId = setInterval(renderTimer, 1000);
  setItem('timerId', timerId);
  // console.log(`timerId: ${timerId}`);
}
function youWin() {
  console.log('You win!');
  alert('You win!');
  clearInterval(getItem('timerId'));
  const gameFieldElem = document.querySelector('.game__field');
  gameFieldElem.removeEventListener('click', onBoxClick);
  gameFieldElem.removeEventListener('contextmenu', onBoxContextMenu);
}
function gameOver() {
  console.log('GameOver');
  alert('Game over');
  clearInterval(getItem('timerId'));
  const gameFieldElem = document.querySelector('.game__field');
  gameFieldElem.removeEventListener('click', onBoxClick);
  gameFieldElem.removeEventListener('contextmenu', onBoxContextMenu);
}
function onSmileClick() {
  newGame();
}
newGame();
// getNewGameField();
// logGameFieldToConsole();
// renderGameField();
document
  .querySelector('.game-bar__smile')
  .addEventListener('click', onSmileClick);
