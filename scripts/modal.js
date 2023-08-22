function onOkBtnEvent(event) {
  event.target.classList.remove('hidden');
  document.querySelector('.window-modal-overlay').classList.add('hidden');
}

function showOkBtn(buttonId) {
  const okBtnElem = document.querySelector('.window-modal__btn');
  okBtnElem.classList.remove('hidden');
  okBtnElem.addEventListener('click', onOkBtnEvent);
  okBtnElem.dataset.buttonId = buttonId;
}

function showModal(innerHtml, okButtonId) {
  document.querySelector('.window-modal-overlay').classList.remove('hidden');
  showOkBtn(okButtonId);
  const modalCcontentElem = document.querySelector('.window-modal__content');
  modalCcontentElem.innerHTML = innerHtml;
}
export default showModal;
