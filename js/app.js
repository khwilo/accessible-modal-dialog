const subscribeBtn = document.getElementById('subscribeBtn');
const modal = document.querySelector('.modal'); /* modal wrapper */
const modalContent = document.querySelector('.modal__content');
const modalBackdrop = document.querySelector('.modal__backdrop');
let elementWithPriorFocus;

subscribeBtn.addEventListener('click', openDialogBox);

function openDialogBox() {
  const closeBtn = document.getElementById('closeBtn');
  const { firstTabStop, lastTabStop } = getFirstAndLastTabAbleElement(
    modalContent
  );
  elementWithPriorFocus = document.activeElement;

  modal.style.display = 'block';
  modalBackdrop.style.display = 'block';
  firstTabStop.focus();

  modal.addEventListener('keydown', (event) =>
    keyDown(event, firstTabStop, lastTabStop)
  );
  closeBtn.addEventListener('click', closeDialogBox);
  modalBackdrop.addEventListener('click', closeDialogBox);
}

function keyDown(event, firstTabStop, lastTabStop) {
  // Check if the keyboard key is the ESC key
  if (event.keyCode === 27) {
    closeDialogBox();
  }

  // Check if the keyboard key is the TAB key
  if (event.keyCode === 9) {
    if (event.shiftKey) {
      if (document.activeElement === firstTabStop) {
        event.preventDefault();
        lastTabStop.focus();
      }
    } else {
      if (document.activeElement === lastTabStop) {
        event.preventDefault();
        firstTabStop.focus();
      }
    }
  }
}

function closeDialogBox() {
  modal.style.display = 'none';
  modalBackdrop.style.display = 'none';
  elementWithPriorFocus.focus();
}

const getFirstAndLastTabAbleElement = (wrapper) => {
  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = wrapper.querySelectorAll(focusableElementsString);
  focusableElements = Array.prototype.slice.call(focusableElements);

  return {
    firstTabStop: focusableElements[0],
    lastTabStop: focusableElements[focusableElements.length - 1],
  };
};
