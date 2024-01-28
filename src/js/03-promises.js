
import notiflix from "notiflix";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(form.elements['delay'].value);
    const step = parseInt(form.elements['step'].value);
    const amount = parseInt(form.elements['amount'].value);

    function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;

        setTimeout(() => {
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    }

    for (let i = 1; i <= amount; i++) {
      const promiseDelay = delay + (i - 1) * step;

      createPromise(i, promiseDelay)
        .then(({ position, delay }) => {
          notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });
});
