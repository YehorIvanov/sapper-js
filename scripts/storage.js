// storage
const carrentGame = {
  widthField: 10,
  heightField: 10,
  numberOfBombs: 10,
  emptyBox: null,
  gameField: [],
  bombCounter: 0,
  startGameTime: null,
  timerId: null,
  bestScore: null,
  score: null,
  level: null,
  help: `Rules:
The game is played on a square grid divided into cells. The number of cells can vary depending on the difficulty level of the game.
Some cells on the grid contain mines. The objective of the player is to uncover all cells except those containing mines.
Each cell can have one of three states: closed, open, or flagged. Initially, all cells are closed.
The player can uncover cells by clicking on them. If a cell contains a mine, the player loses the game.
If a cell does not contain a mine, it reveals a number indicating the number of mines in the adjacent cells. This number helps the player determine the locations of the mines.
If the player is confident that a cell contains a mine, they can flag it by right-clicking on it or using the appropriate gesture on a touch device.
The player can uncover cells if all adjacent cells are free of mines. This allows for the automatic uncovering of safe areas of the grid.
The game is won when all cells, except those containing mines, are uncovered. The game is lost if the player uncovers a cell with a mine.
Typically, the game offers multiple difficulty levels based on the size of the grid and the number of mines. Larger grids and more mines make the game more challenging.`,
};

// export function setItem(key, value) {
//   carrentGame[key] = value;
// }
// export function getItem(key) {
//   return carrentGame[key];
// }
export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify({ [key]: value }));
};

export const getItem = (key) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    const parsedValue = JSON.parse(storedValue);
    return parsedValue[key];
  }
  setItem(key, carrentGame[key]);
  return getItem(key);
};
