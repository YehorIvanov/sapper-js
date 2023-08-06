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
import { getNeighboringBoxes } from './getNeighboringBoxes.js';
import { onBoxClick, onBoxContextMenu } from './eventListeners.js';
import { renderBombCounter, renderTimer } from './game-bar.js';
// import { openEmptyBoxes } from './openEmptyBoxes.js';
// import { renderNum } from './renderNum.js';
// import { gameOver } from './game-control.js';

function getNewGameField(
  widthField = 10,
  heightField = 20,
  numberOfBombs = 30,
) {
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
      xLoc = Math.floor(Math.random() * widthField);
      yLoc = Math.floor(Math.random() * heightField);
    } while (array[yLoc][xLoc] === '*');
    array[yLoc][xLoc] = '*';
  }

  setItem('gameField', array);
  addNumbersToGameField();
}

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

function newGame() {
  getNewGameField();
  logGameFieldToConsole();
  renderGameField();
  renderBombCounter();
  setItem('startGameTime', new Date().getTime());
  renderTimer();
  const timerId = setInterval(renderTimer, 1000);
  setItem('timerId', timerId);
}

function onSmileClick() {
  newGame();
}
newGame();

document
  .querySelector('.game-bar__smile')
  .addEventListener('click', onSmileClick);
console.log(window.innerWidth);

document.querySelector('.footer').innerHTML = window.innerWidth;
