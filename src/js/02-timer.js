import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const spanDaysEl = document.querySelector('[data-days]');
const spanHoursEl = document.querySelector('[data-hours]');
const spanMinutesEl = document.querySelector('[data-minutes]');
const spanSecondsEl = document.querySelector('[data-seconds]');

let time = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  const timerId = setInterval(() => {
    if (time <= 1000) {
      return clearInterval(timerId);
    }
    time -= 1000;
    const dataTime = convertMs(time);
    const newData = addLeadingZero(dataTime);
    const { newDays, newHours, newMinutes, newSeconds } = newData;

    spanDaysEl.textContent = newDays;
    spanHoursEl.textContent = newHours;
    spanMinutesEl.textContent = newMinutes;
    spanSecondsEl.textContent = newSeconds;
  }, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0] < date) {
      startBtn.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    startBtn.disabled = false;
    time = selectedDates[0].getTime() - date.getTime();
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  const { days, hours, minutes, seconds } = value;

  const newDays = makeString(days);
  const newHours = makeString(hours);
  const newMinutes = makeString(minutes);
  const newSeconds = makeString(seconds);

  return { newDays, newHours, newMinutes, newSeconds };
}

function makeString(number) {
  return String(number).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
