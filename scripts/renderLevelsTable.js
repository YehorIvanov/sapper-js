/* eslint-disable import/extensions */
import { getItem, setItem } from './storage.js';
import showModal from './modal.js';

function onlevelSelect(event) {
  setItem('level', +event.target.dataset.level);
  console.log(getItem('level'));
  document.querySelector('.window-modal__btn').dispatchEvent(new Event('click'));
}

function renderLevelsTable() {
  const levelsDivElem = document.createElement('div');
  levelsDivElem.classList.add('window-modal-levels');
  const levels = getItem('levels');
  levels.forEach((elem) => {
    const levelElem = document.createElement('div');
    levelElem.innerHTML = elem.level;
    levelElem.classList.add('window-modal-level');
    levelElem.dataset.level = elem.level;
    levelsDivElem.append(levelElem);
  });
  showModal(levelsDivElem.outerHTML, 'levelSelect');
  document.querySelector('.window-modal-levels').addEventListener('click', onlevelSelect);
  console.log(levelsDivElem.outerHTML);
}

export default renderLevelsTable;
