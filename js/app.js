const subscribeBtn = document.getElementById('subscribe');
const dialog = document.querySelector('.dialog'); /* Dialog box wrapper */
const dialogBox = document.querySelector('.dialog__content'); /* Dialog box */
const dialogBackdrop = document.querySelector('.dialog__backdrop');
let elementWithPriorFocus;

subscribeBtn.addEventListener('click', openDialogBox);

function openDialogBox() {
  // Tracks the element having focus before the dialog box is opened
  elementWithPriorFocus = document.activeElement;

  const closeBtn = document.getElementById('closeBtn');

  dialogBox.addEventListener('keydown', keydownEvent);
  closeBtn.addEventListener('click', closeDialogBox);
  dialogBackdrop.addEventListener('click', closeDialogBox);

  const focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = dialogBox.querySelectorAll(focusableElementsString);
  focusableElements = Array.prototype.slice.call(focusableElements);

  let firstTabStop = focusableElements[0];
  let lastTabStop = focusableElements[focusableElements.length - 1];

  dialog.style.display = 'block';
  dialogBackdrop.style.display = 'block';

  firstTabStop.focus(); // Set the first element in the dialog box to focus

  function keydownEvent(event) {
    if (event.keyCode === 27) {
      // Check to see if the user pressed the 'ESC' key
      closeDialogBox();
    }

    if (event.keyCode === 9) {
      // Check to see if the user pressed the TAB key
      // Check to see if the user pressed TAB + Shift key
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
}

function closeDialogBox() {
  dialog.style.display = 'none';
  dialogBackdrop.style.display = 'none';
  elementWithPriorFocus.focus();
}
