/* eslint-disable no-console */
// Создание массива размером 10 на 10, заполненного значениями null

const getNewArray = (widthField, heightField, numberOfBombs) => {
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
// const array = new Array(10)
//   .fill(null)
//   .map(() => new Array(10).fill(null));

// // Вставка 10 случайных символов '*' в массив
// for (let i = 0; i < 10; i += 1) {
//   let x;
//   let y;
//   do {
//     x = Math.floor(Math.random() * 10);
//     y = Math.floor(Math.random() * 10);
//   } while (array[x][y] === '*');
//   array[x][y] = '*';
// }

// Добавление чисел в таблицу для указания количества соседних ячеек, содержащих символ '*'
function addNumbers(array) {
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

// Вызов функции addNumbers() для добавления чисел в таблицу
const result = addNumbers(getNewArray(10, 10, 10));

result.forEach((line) => {
  console.log(line.reduce((acc, cell) => `${acc}| ${cell} `, ''));
});

// Вывод результата в консоль
// console.log(result);
