// players

let player1 = {
    name: "";
    score: 0;
    choice: "";
}

let player2 = {
    name: "";
    score: 0;
    choice: "";
}

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
















// dynamic font refactor
// const myDiv = document.getElementById("myDiv");

// function adjustFontSize() {
//   const divWidth = myDiv.offsetWidth;
//   const fontSize = divWidth / 10; // Adjust the factor to your preference
//   myDiv.style.fontSize = `${fontSize}px`;
// }


// fontRefactor();
// window.addEventListener("resize", fontRefactor);

