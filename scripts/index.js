/* eslint-disable no-console */
// Создание массива размером 10 на 10, заполненного значениями null

const getNewGameField = (
  widthField = 10,
  heightField = 10,
  numberOfBombs = 10,
) => {
  const array = new Array(widthField)
    .fill(null)
    .map(() => new Array(heightField).fill(null));

  // Вставка 10 случайных символов '*' в массив
  for (let i = 0; i < numberOfBombs; i += 1) {
    let xLoc;
    let yLoc;
    do {
      xLoc = Math.floor(Math.random() * 10);
      yLoc = Math.floor(Math.random() * 10);
    } while (array[xLoc][yLoc] === '*');
    array[xLoc][yLoc] = '*';
  }
  return array;
};

function addNumbersToGameField(array) {
  const x = array.length;
  const y = array[0].length;

  for (let i = 0; i < x; i += 1) {
    for (let j = 0; j < y; j += 1) {
      if (array[i][j] !== '*') {
        let count = 0;
        if (i > 0 && j > 0 && array[i - 1][j - 1] === '*') {
          count += 1;
        }
        if (i > 0 && array[i - 1][j] === '*') count += 1;
        if (i > 0 && j < y - 1 && array[i - 1][j + 1] === '*') {
          count += 1;
        }
        if (j > 0 && array[i][j - 1] === '*') count += 1;
        if (j < y - 1 && array[i][j + 1] === '*') count += 1;
        if (i < x - 1 && j > 0 && array[i + 1][j - 1] === '*') {
          count += 1;
        }
        if (i < x - 1 && array[i + 1][j] === '*') count += 1;
        if (i < x - 1 && j < y - 1 && array[i + 1][j + 1] === '*') {
          count += 1;
        }
        // eslint-disable-next-line no-param-reassign
        array[i][j] = count;
      }
    }
  }

  return array;
}

const logGameFieldToConsole = (gameField) => {
  console.log('\n');
  gameField.forEach((line) => {
    console.log(line.reduce((acc, cell) => `${acc}| ${cell} `, ''));
  });
};

const renderGameField = (gameField) => {
  console.log('renderGameField');
  const numberOfRows = gameField.length;
  const numberOfColums = gameField[0].length;
  const gameFieldElem = document.querySelector('.game__field');
  for (
    let carrentRow = 0;
    carrentRow < numberOfRows;
    carrentRow += 1
  ) {
    console.log(carrentRow);
    const carrentRowElem = document.createElement('div');
    carrentRowElem.dataset.row = carrentRow;
    carrentRowElem.classList.add('game-field__row');
    carrentRowElem.innerHTML = carrentRow;

    for (
      let carrentColum = 0;
      carrentColum < numberOfColums;
      carrentColum += 1
    ) {
      console.log(carrentColum);
      const carrentColumElem = document.createElement('button');
      carrentColumElem.innerHTML = gameField[carrentRow][carrentColum];
      carrentColumElem.dataset.row = carrentRow;
      carrentColumElem.dataset.colum = carrentColum;
      carrentColumElem.classList.add('game-field__cell');
      carrentRowElem.append(carrentColumElem);
    }

    gameFieldElem.append(carrentRowElem);
  }

  console.log(gameFieldElem, numberOfRows, numberOfColums);
};

const gameField = addNumbersToGameField(getNewGameField());

logGameFieldToConsole(gameField);
renderGameField(gameField);

// Вывод результата в консоль
// console.log(result);
