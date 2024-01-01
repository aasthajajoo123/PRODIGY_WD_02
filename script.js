let startTime;
let isRunning = false;
let lapNumber = 1;

function startStop() {
    if (isRunning) {
        pause();
    } else {
        start();
    }
}

function start() {
    startTime = new Date().getTime();
    isRunning = true;
    update();
    document.querySelector('button:nth-of-type(1)').innerHTML = 'Pause';
}

function pause() {
    isRunning = false;
    document.querySelector('button:nth-of-type(1)').innerHTML = 'Resume';
}

function reset() {
    isRunning = false;
    document.querySelector('button:nth-of-type(1)').innerHTML = 'Start';
    document.getElementById('display').innerHTML = '00:00:00';
    lapNumber = 1;
    document.getElementById('laps').innerHTML = '';
}

function lap() {
    if (isRunning) {
        const lapTime = calculateElapsedTime();
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapNumber++}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapItem);
    }
}

function update() {
    if (isRunning) {
        const elapsedTime = calculateElapsedTime();
        document.getElementById('display').innerHTML = formatTime(elapsedTime);
        setTimeout(update, 10);
    }
}

function calculateElapsedTime() {
    const currentTime = new Date().getTime();
    return currentTime - startTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(millisecondsFormatted)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

// Initial setup
reset();
