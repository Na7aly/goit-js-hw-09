
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import * as notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (ms < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

document.addEventListener("DOMContentLoaded", function () {
  const startDateElement = document.getElementById('datetime-picker');
  const startButton = document.querySelector('button[data-start]');
  const daysElement = document.querySelector('.value[data-days]');
  const hoursElement = document.querySelector('.value[data-hours]');
  const minutesElement = document.querySelector('.value[data-minutes]');
  const secondsElement = document.querySelector('.value[data-seconds]');

  let countdownInterval;

  startButton.addEventListener('click', function () {
    const startDate = new Date(startDateElement.value).getTime();
    const currentDate = new Date().getTime();

    if (startDate > currentDate) {
      countdownInterval = setInterval(function () {
        const remainingTime = startDate - new Date().getTime();
        if (remainingTime > 0) {
          const { days, hours, minutes, seconds } = convertMs(remainingTime);
          daysElement.textContent = addLeadingZero(days);
          hoursElement.textContent = addLeadingZero(hours);
          minutesElement.textContent = addLeadingZero(minutes);
          secondsElement.textContent = addLeadingZero(seconds);
        } else {
          clearInterval(countdownInterval);
          notiflix.notify('Countdown reached!');
        }
      }, 1000);
    }
  });

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

     

      if (selectedDate < new Date()) {
        notiflix.Notify.failure('Please choose a date in the future');
        document.querySelector('button[data-start]').disabled = true;
      } else {
        document.querySelector('button[data-start]').disabled = false;
      }
    },
  };

  flatpickr("#datetime-picker", options);
});
