// storage
const carrentGame = {
  widthField: 10,
  heightField: 10,
  numberOfBombs: 10,
  emptyBox: null,
  gameField: [],
};

export const setItem = (key, value) => {
  carrentGame[key] = value;
};
export const getItem = (key) => carrentGame[key];
