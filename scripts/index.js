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

// function onBoxClick(event) {
//   const gameField = getItem('gameField');
//   event.target.classList.add('game-field__box-open');

//   if (!gameField[event.target.dataset.row][event.target.dataset.colum]) {
//     setItem('callStackTimeControl', new Date().getTime());
//     openEmptyBoxes(event.target.dataset.row, event.target.dataset.colum);
//   } else {
//     renderNum(event.target.dataset.row, event.target.dataset.colum);
//     // event.target.innerHTML =
//     //   gameField[event.target.dataset.row][event.target.dataset.colum];
//     // switch (gameField[event.target.dataset.row][event.target.dataset.colum]) {
//     //   case '*':
//     //     event.target.style.backgroundColor = 'red';
//     //     event.target.style.backgroundImage = "url('img/mine.png')";
//     //     gameOver();
//     //     break;
//     //   case 1:
//     //     event.target.style.color = 'blue';
//     //     break;
//     //   case 2:
//     //     event.target.style.color = 'green';
//     //     break;
//     //   case 3:
//     //     event.target.style.color = 'red';
//     //     break;
//     //   case 4:
//     //     event.target.style.color = 'darkblue';
//     //     break;
//     //   case 5:
//     //     event.target.style.color = 'darkred';
//     //     break;
//     //   case 6:
//     //     event.target.style.color = 'darkgreen';
//     //     break;
//     //   case 7:
//     //     event.target.style.color = 'purple';
//     //     break;
//     //   case 8:
//     //     event.target.style.color = 'black';
//     //     break;
//     // }
//     checkGameStatus();
//   }
// }

// function onBoxContextMenu(event) {
//   event.preventDefault();
//   console.log(event.target.style.backgroundImage);
//   if (event.target.style.backgroundImage === 'url("img/flag.png")') {
//     event.target.style.backgroundImage = '';
//   } else {
//     event.target.style.backgroundImage = 'url("img/flag.png")';
//   }
//   let bombCounter = getItem('bombCounter');
//   if (bombCounter > 0) bombCounter -= 1;
//   setItem('bombCounter', bombCounter);
//   renderBombCounter();
// }
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
  // console.log(`timerId: ${timerId}`);
}

// function youWin() {
//   console.log('You win!');
//   alert('You win!');
//   clearInterval(getItem('timerId'));
//   removeGameFieldEventListener();
// }
// function openAllBombs() {
//   const gameField = getItem('gameField');
//   gameField.forEach((row, rowNumber) =>
//     row.forEach((box, boxNumber) => {
//       if (box === '*') {
//         const boxWithBombElem = document.querySelector(
//           `div[data-row="${rowNumber}"][data-colum="${boxNumber}"].game-field__box`,
//         );
//         boxWithBombElem.classList.add('game-field__box-open');
//         boxWithBombElem.style.backgroundColor = 'red';
//         boxWithBombElem.style.backgroundImage = "url('img/mine.png')";
//       }
//     }),
//   );
// }
// function gameOver() {
//   openAllBombs();
//   console.log('GameOver');
//   function sayGameOver() {
//     alert('Game over');
//   }
//   setTimeout(sayGameOver, 1000);
//   clearInterval(getItem('timerId'));
//   removeGameFieldEventListener();
// }
function onSmileClick() {
  newGame();
}
newGame();

document
  .querySelector('.game-bar__smile')
  .addEventListener('click', onSmileClick);
console.log(window.innerWidth);
