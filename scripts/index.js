import { getItem, setItem } from './storage.js';
import { getNeighboringBoxes } from './getNeighboringBoxes.js';
import { onBoxClick, onBoxContextMenu, onMenuClick } from './eventListeners.js';
import { renderBombCounter, renderTimer } from './game-bar.js';

function getNewGameField(widthField = 9, heightField = 9, numberOfBombs = 9) {
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

// const logGameFieldToConsole = () => {
//   const gameField = getItem('gameField');
//   console.log('\n');
//   gameField.forEach((line) => {
//     console.log(line.reduce((acc, cell) => `${acc}| ${cell} `, ''));
//   });
// };

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
      carrentColumElem.dataset.row = carrentRow;
      carrentColumElem.dataset.colum = carrentColum;
      carrentColumElem.classList.add('game-field__box');
      carrentRowElem.append(carrentColumElem);
    }
    gameFieldElem.append(carrentRowElem);
  }

  document.querySelector('.header__level').innerHTML = `(Level: ${getItem('level')})`;
  document.querySelector('.game-bar__smile').innerHTML = '&#128526;';
}
const renderStartPosition = () => {
  const gameField = getItem('gameField');
  const widthField = getItem('widthField');
  const heightField = getItem('heightField');
  let row;
  let column;
  do {
    column = Math.floor(Math.random() * widthField);
    row = Math.floor(Math.random() * heightField);
  } while (gameField[row][column]);
  document.querySelector(
    `div[data-row="${row}"][data-colum="${column}"].game-field__box`,
  ).style.backgroundImage = 'url("img/start.png")';
};

function newGame(widthField, heightField, numberOfBombs) {
  getNewGameField(widthField, heightField, numberOfBombs);
  // logGameFieldToConsole();
  renderGameField();
  renderStartPosition();
  renderBombCounter();
  setItem('startGameTime', new Date().getTime());
  renderTimer();
  const timerId = setInterval(renderTimer, 1000);
  setItem('timerId', timerId);
}

function onSmileClick() {
  const level = +getItem('level');
  const { widthField } = getItem('levels')[level];
  const { heightField } = getItem('levels')[level];
  const { numberOfBombs } = getItem('levels')[level];
  if (window.innerWidth > window.innerHeight) {
    newGame(+heightField, +widthField, +numberOfBombs);
  } else {
    newGame(+widthField, +heightField, +numberOfBombs);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('levels');

  document
    .querySelector('.game-bar__smile')
    .addEventListener('click', onSmileClick);

  document.querySelector('.navbar')
    .addEventListener('click', onMenuClick);

  document.querySelector('.game-bar__smile').dispatchEvent(new Event('click'));
});
