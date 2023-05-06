import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const days = document.querySelector("[data-days]");
const hours = document.querySelector("[data-hours]");
const minutes = document.querySelector("[data-minutes]");
const seconds = document.querySelector("[data-seconds]");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure("Please choose a date in the future")
    } else {
      startBtn.disabled = false;
      input.value = convertMs(new Date(input.value) - Date.now())
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onStartClick() {
  const targetDate = new Date(input.value)

  const timerId = setInterval(()=>{
    const timeLeft = convertMs(targetDate - Date.now());
    days.textContent = timeLeft.days.toString().padStart(2,"0");
    hours.textContent = timeLeft.hours.toString().padStart(2,"0");
    minutes.textContent = timeLeft.minutes.toString().padStart(2,"0");
    seconds.textContent = timeLeft.seconds.toString().padStart(2,"0");

    if(!(targetDate - Date.now())){
      clearInterval(timerId);
    }
  }, 1000);
}

startBtn.addEventListener("click", onStartClick);