/* eslint-disable import/extensions */
import { getItem } from './storage.js';

// eslint-disable-next-line import/prefer-default-export
export const getNeighboringBoxes = (row, column, contain = null) => {
  const neighbouringBoxes = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  const heightField = getItem('heightField');
  const widthField = getItem('widthField');
  const gameField = getItem('gameField');
  const neighbourBoxChecked = neighbouringBoxes
    .map((box) => {
      const neighbourBox = [box[0] + +row, box[1] + +column];
      return neighbourBox;
    })
    .filter(
      (box) => box[0] >= 0
        && box[0] <= heightField - 1
        && box[1] >= 0
        && box[1] <= widthField - 1,
    );
  if (contain !== null) {
    return neighbourBoxChecked.filter(
      (box) => gameField[box[0]][box[1]] === contain,
    );
  }
  return neighbourBoxChecked;
};
