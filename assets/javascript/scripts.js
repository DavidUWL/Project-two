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


document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("value") === "rock1" || "paper1" || "scissors1" || "lizard1" || "spock1")
            {
                let player1Choice = this.getAttribute("value");
                switch(player1Choice) {
                    case rock:
                        this.getAttribute("value") = "rock1";
                        break;
                    case scissors:
                        this.getAttribute("value") = "scissors1";
                        break;
                    case paper:
                        this.getAttribute("value") = "paper1";
                        break
                    case lizard:
                        this.getxAttribute("value") = "lizard1";
                        break;
                    case spock:
                        this.getAttribute("value") = "spock1";
                        break;
                };
            };
        });
    };
})













// dynamic font refactor
// const myDiv = document.getElementById("myDiv");

// function adjustFontSize() {
//   const divWidth = myDiv.offsetWidth;
//   const fontSize = divWidth / 10; // Adjust the factor to your preference
//   myDiv.style.fontSize = `${fontSize}px`;
// }


// fontRefactor();
// window.addEventListener("resize", fontRefactor);

