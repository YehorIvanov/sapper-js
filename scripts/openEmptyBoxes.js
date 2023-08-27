import { getNeighboringBoxes } from './getNeighboringBoxes.js';
import renderNum from './renderNum.js';
import { getItem } from './storage.js';

function openBox(row, colum) {
  document
    .querySelector(
      `div[data-row="${row}"][data-colum="${colum}"].game-field__box`,
    )
    .classList.add('game-field__box-open');
}

export let callStackTimeControl = null;
export const openEmptyBoxes = (row, colum) => {
  const neighbouringBoxes = getNeighboringBoxes(row, colum, 0);
  if (neighbouringBoxes.length) {
    neighbouringBoxes.forEach((box) => {
      openBox(box[0], box[1]);
      const neighbouringBoxesL2 = getNeighboringBoxes(box[0], box[1]);
      neighbouringBoxesL2.forEach((el) => {
        openBox(el[0], el[1]);
        renderNum(el[0], el[1]);
      });
    });
    if (new Date().getTime() - getItem('callStackTimeControl') < 15) {
      neighbouringBoxes.forEach((box) => {
        openEmptyBoxes(box[0], box[1]);
      });
    }
  }
};

