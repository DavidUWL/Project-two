// timer
function timerBegin(){
    let countdown = setInterval(function() {
        let timerElement = document.getElementById('timer');
        let currentTime = timerElement.innerHTML;
        currentTime--;
        timerElement.innerHTML = currentTime;
        if (currentTime < 1) {
            clearInterval(countdown)
        }
    }, 1000);
}
