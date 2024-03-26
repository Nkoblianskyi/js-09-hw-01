
const refs = {
    bodyElements: document.querySelector('body'),
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),

};

let timer = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    };

const changeColorBack = () => { 
    refs.bodyElements.style.background = getRandomHexColor();
};

refs.startBtn.addEventListener('click', () => {
    timer = setInterval(changeColorBack, 1000);
    refs.startBtn.disabled = true;
});

refs.stopBtn.addEventListener('click', () => {
    clearInterval(timer);
    refs.startBtn.disabled = false;
});