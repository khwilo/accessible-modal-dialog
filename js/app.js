const subscribeBtn = document.getElementById('subscribe');
const closeBtn = document.getElementById('closeBtn');
const dialogBox = document.querySelector('.dialog');

subscribeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  dialogBox.style.display = 'block';
});

closeBtn.addEventListener('click', (event) => {
  event.preventDefault();
  dialogBox.style.display = 'none';
});
