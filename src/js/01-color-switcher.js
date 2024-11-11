const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

const onClickStart = () => {
  startBtn.disabled = true;
  const intervalId = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);
  timerId = intervalId;
};

const onClickStop = () => {
  startBtn.disabled = false;
  clearInterval(timerId);
};

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
