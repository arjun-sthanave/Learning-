let totalSeconds = 10 * 60;

const interval = setInterval(() => {

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;


    console.log(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

    if (totalSeconds <= 0) {
        clearInterval(interval);
    }
    totalSeconds--;
}, 1000);
