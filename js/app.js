const subscribeBtn = document.getElementById('subscribeBtn');
const modal = document.querySelector('.modal'); /* modal wrapper */
const modalContent = document.querySelector('.modal__content');
const modalBackdrop = document.querySelector('.modal__backdrop');
let elementWithPriorFocus;

subscribeBtn.addEventListener('click', openModal);

function openModal() {
  const closeBtn = document.getElementById('closeBtn');
  const {
    firstFocusableElement: firstTabbedElement,
    lastFocusableElement: lastTabbedElement,
  } = getFirstAndLastFocusableElements(modalContent);
  elementWithPriorFocus = document.activeElement;

  modal.style.display = 'block';
  modalBackdrop.style.display = 'block';
  firstTabbedElement.focus();

  modal.addEventListener('keydown', (event) =>
    handleKeyDown(event, firstTabbedElement, lastTabbedElement)
  );
  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
}

function closeModal() {
  modal.style.display = 'none';
  modalBackdrop.style.display = 'none';
  elementWithPriorFocus.focus();
}

const getFirstAndLastFocusableElements = (wrapper) => {
  const focusableElements =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  const wrapperFocusableElements = wrapper.querySelectorAll(focusableElements);
  const wrapperFocusableElementsList = Array.prototype.slice.call(
    wrapperFocusableElements
  );

  return {
    firstFocusableElement: wrapperFocusableElementsList[0],
    lastFocusableElement:
      wrapperFocusableElementsList[wrapperFocusableElementsList.length - 1],
  };
};

function handleKeyDown(event, firstFocusableElement, lastFocusableElement) {
  const ESC_KEY = 27;
  const TAB_KEY = 9;

  switch (event.keyCode) {
    case TAB_KEY:
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          event.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          event.preventDefault();
          firstFocusableElement.focus();
        }
      }
      break;
    case ESC_KEY:
      closeModal();
      break;
    default:
      break;
  }
}
