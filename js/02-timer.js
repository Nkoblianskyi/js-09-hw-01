import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "../node_modules/flatpickr/dist/";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            window.alert("Please choose a date in the future");
            document.querySelector('[data-start]').setAttribute('disabled', true);
        } else {
            document.querySelector('[data-start]').removeAttribute('disabled');
        }
    },
};

flatpickr("#datetime-picker", options); // зв'язуємо інпут з опцією перевірки

document.querySelector('[data-start]').addEventListener('click', startTimer);

let countdownInterval;

// Функція вираховує різницю поточної дати до вибраної та оновлює таймер
function startTimer() {
    const selectedDate = new Date(document.querySelector('#datetime-picker').value);
    const currentDate = new Date();
    let timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        return;
    }

    updateTimerDisplay(timeDifference);

    countdownInterval = setInterval(() => {
        const currentTime = new Date();
        const newTimeDifference = selectedDate - currentTime;

        if (newTimeDifference <= 0) {
            clearInterval(countdownInterval);
        } else {
            updateTimerDisplay(newTimeDifference);
        }
    }, 1000);
}

function updateTimerDisplay(ms) {
    const time = convertMs(ms);
    console.log(time);
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

  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}