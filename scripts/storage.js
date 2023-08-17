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
};

export const setItem = (key, value) => {
  carrentGame[key] = value;
};
export const getItem = (key) => carrentGame[key];
