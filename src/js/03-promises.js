import Notiflix from 'notiflix';
const form = document.querySelector(".form")

form.addEventListener("submit", onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  console.log(Number(form.delay.value));
  let delay = Number(form.delay.value);
  let step = Number(form.step.value);
  let amount = form.amount.value;

  for (let i = 0; i < amount; i++) {
    let position = i;
    delay += step;
    console.log(delay);

    createPromise(position, delay)
    .then(( response ) => {
      Notiflix.Notify.success(response);
    })
    .catch((err) => {
      Notiflix.Notify.failure(err);
    });
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3; 
    setTimeout(()=>{
      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    },delay)
  })
}
