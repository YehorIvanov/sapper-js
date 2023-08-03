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
  console.log('1');
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

const onBoxClick = (event) => {
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
};
const onBoxContextMenu = (event) => {
  console.log('onBoxContextMenu');
  event.preventDefault();
  event.target.innerHTML = '&#128681';
};

const renderGameField = () => {
  // console.log('renderGameField');
  const gameField = getItem('gameField');
  const numberOfRows = gameField.length;
  const numberOfColums = gameField[0].length;
  const gameFieldElem = document.querySelector('.game__field');
  gameFieldElem.addEventListener('click', onBoxClick);
  gameFieldElem.addEventListener('contextmenu', onBoxContextMenu);
  for (let carrentRow = 0; carrentRow < numberOfRows; carrentRow += 1) {
    // console.log(carrentRow);
    const carrentRowElem = document.createElement('div');
    carrentRowElem.dataset.row = carrentRow;
    carrentRowElem.classList.add('game-field__row');

    for (
      let carrentColum = 0;
      carrentColum < numberOfColums;
      carrentColum += 1
    ) {
      // console.log(carrentColum);
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

  // console.log(gameFieldElem, numberOfRows, numberOfColums);
};

getNewGameField();
logGameFieldToConsole();
renderGameField();
