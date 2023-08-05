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
      xLoc = Math.floor(Math.random() * widthField);
      yLoc = Math.floor(Math.random() * heightField);
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
  document.querySelector(
    '.game-bar__bomb-counter',
  ).innerHTML = `<div class="game-bar__bomb-num" style="background-image: url('/img/d${bombCounter[0]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('/img/d${bombCounter[1]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('/img/d${bombCounter[2]}.svg');"></div>`;
}
const checkGameStatus = () => {
  const openedBoxCount = document.querySelectorAll(
    '.game-field__box-open',
  ).length;
  const closedBoxCount =
    getItem('widthField') * getItem('heightField') - openedBoxCount;
  if (closedBoxCount === getItem('numberOfBombs')) youWin();
};
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
        event.target.style.backgroundImage = "url('img/mine.png')";
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
    checkGameStatus();
  }
}
function onBoxContextMenu(event) {
  event.preventDefault();
  console.log(event.target.style.backgroundImage);
  console.log('flag');
  if (event.target.style.backgroundImage === 'url("img/flag.png")') {
    event.target.style.backgroundImage = '';
    console.log('off');
  } else {
    event.target.style.backgroundImage = 'url("img/flag.png")';
    console.log('on');
  }
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
  document.querySelector(
    '.game-bar__timer',
  ).innerHTML = `<div class="game-bar__bomb-num" style="background-image: url('/img/d${gameTimer[0]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('/img/d${gameTimer[1]}.svg');"></div><div class="game-bar__bomb-num" style="background-image: url('/img/d${gameTimer[2]}.svg');"></div>`;
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
function openAllBombs() {
  const gameField = getItem('gameField');
  gameField.forEach((row, rowNumber) =>
    row.forEach((box, boxNumber) => {
      if (box === '*') {
        const boxWithBombElem = document.querySelector(
          `div[data-row="${rowNumber}"][data-colum="${boxNumber}"].game-field__box`,
        );
        boxWithBombElem.classList.add('game-field__box-open');
        boxWithBombElem.style.backgroundColor = 'red';
        boxWithBombElem.style.backgroundImage = "url('img/mine.png')";
      }
    }),
  );
}
function gameOver() {
  openAllBombs();
  console.log('GameOver');
  function sayGameOver() {
    alert('Game over');
  }
  setTimeout(sayGameOver, 1000);
  clearInterval(getItem('timerId'));
  removeGameFieldEventListener();
}
function onSmileClick() {
  newGame();
}
newGame();

document
  .querySelector('.game-bar__smile')
  .addEventListener('click', onSmileClick);
console.log(window.innerWidth);
