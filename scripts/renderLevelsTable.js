import { getItem, setItem } from './storage.js';
import showModal from './modal.js';

function onlevelSelect(event) {
  setItem('level', +event.target.dataset.level);
  document.querySelector('.window-modal__btn').dispatchEvent(new Event('click'));
  document.querySelector('.game-bar__smile').dispatchEvent(new Event('click'));
}

function renderLevelsTable() {
  const levelsDivElem = document.createElement('div');
  levelsDivElem.classList.add('window-modal__levels');
  const levels = getItem('levels');
  const passedLevels = getItem('passedLevels');
  levels.forEach((elem) => {
    const levelElem = document.createElement('div');
    levelElem.innerHTML = elem.level;
    levelElem.classList.add('window-modal__level');
    levelElem.dataset.level = elem.level;
    if (passedLevels.includes(elem.level)) {
      levelElem.classList.add('window-modal__level-passed');
    }
    levelsDivElem.append(levelElem);
  });
  showModal(levelsDivElem.outerHTML, 'levelSelect');
  document.querySelector('.window-modal__levels').addEventListener('click', onlevelSelect);
}

export default renderLevelsTable;
