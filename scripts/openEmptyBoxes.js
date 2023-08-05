/* eslint-disable prefer-const */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/extensions */
import { getNeighboringBoxes } from './getNeighboringBoxes.js';
import { getItem } from './storage.js';

export let callStackTimeControl = null;
export const openEmptyBoxes = (row, colum) => {
  const neighbouringBoxes = getNeighboringBoxes(row, colum, 0);
  if (neighbouringBoxes.length) {
    neighbouringBoxes.forEach((box) => {
      document
        .querySelector(
          `div[data-row="${box[0]}"][data-colum="${box[1]}"].game-field__box`,
        )
        .classList.add('game-field__box-open');
    });
    if (new Date().getTime() - getItem('callStackTimeControl') < 15) {
      neighbouringBoxes.forEach((box) => openEmptyBoxes(box[0], box[1]));
    }
  }
};
// export default openEmptyBoxes;
