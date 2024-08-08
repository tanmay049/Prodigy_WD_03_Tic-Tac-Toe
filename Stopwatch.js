let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsElement = document.getElementById('laps');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startPauseBtn.textContent = 'Start';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    laps = [];
    lapsElement.innerHTML = '';
    difference = 0;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    minutesElement.textContent = (minutes < 10 ? '0' + minutes : minutes);
    secondsElement.textContent = (seconds < 10 ? '0' + seconds : seconds);
    millisecondsElement.textContent = (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

function recordLap() {
    if (running) {
        const lapTime = minutesElement.textContent + ':' + secondsElement.textContent + ':' + millisecondsElement.textContent;
        laps.push(lapTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = 'Lap ' + laps.length + ': ' + lapTime;
        lapElement.className = 'lap';
        lapsElement.appendChild(lapElement);
    }
}