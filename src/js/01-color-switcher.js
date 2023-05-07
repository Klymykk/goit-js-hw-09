const body = document.querySelector("body")
const start = document.querySelector("[data-start]");
const stop = document.querySelector("[data-stop]");

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

start.addEventListener("click", ()=>{
    const onStartClick = setInterval(()=> {
        body.style.backgroundColor=`${getRandomHexColor()}`
    },1000);
    start.disabled = true;
    stop.disabled = false;

    stop.addEventListener("click", () =>{
        clearInterval(onStartClick);
        start.disabled = false;
        stop.disabled = true;
    });
});

