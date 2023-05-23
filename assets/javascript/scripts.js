// players

const player1 = {
    name: "",
    score: 0,
    scoreCard: [],
    choice: "",
};

const player2 = {
    name: "",
    score: 0,
    scoreCard: [],
    choice: "",
};

//game object 
document.getElementById("best-of-three-winner").hidden = true;
const game = {
    roundCounter: 1,
    winner: "",
    roundWinner: [],
    bestOfThreeWinner: "",
};

// timer 
let timerAllowed = true;
let timerName;

// buttons
let buttons = document.getElementsByTagName("button");
let buttonsAllowed = true;
let nextRoundButtonAllowed = false;
document.getElementById("next-round").hidden = true;
document.getElementById("next-round").disabled = true;

// lose conditions

const loseConditions = {
    rock: ["paper", "spock"],
    paper: ["scissors", "lizard"],
    scissors: ["rock", "spock"],
    lizard: ["rock", "scissors"],
    spock: ["paper", "lizard"]
};


document.addEventListener("DOMContentLoaded", function () {

    promptPlayerName();

    beginTimer();

    logPlayerChoice();
});

function promptPlayerName() {
    player1.name = prompt("player 1 Name:");
    console.log(player1.name);
    if (player1.name) {
        document.getElementById("p1name").innerHTML = player1.name;
    } else {
        player1.name = "Player 1";
    }
    player2.name = prompt("player 2 Name:")
    if (player2.name) {
        document.getElementById("p2name").innerHTML = player2.name;
    } else {
        player2.name = "Player 2";
    }
}

function logPlayerChoice() {
  for (let button of buttons) {
    button.addEventListener("click", function() {
      if (this.classList.contains("p1button")) {
        let p1Choice = this.getAttribute("value");
        player1.choice = p1Choice;
        // console.log(player1.choice);
        updatePlayerUIChoices();
      } else {
        let p2Choice = this.getAttribute("value");
        player2.choice = p2Choice;
        // console.log(player2.choice);
        updatePlayerUIChoices();
      };
    });

  };
};

function beginTimer() {
    for (let button of buttons) {
        button.addEventListener("click", function beginTimerCount() {
            // button.removeEventListener("click", beginTimerCount);
            if (timerAllowed) {
                timerAllowed = false;
                let currentTime = 5;
                // debugger
                timerName = setInterval(function () {
                    let timerElement = document.getElementById('timer');
                    timerElement.innerHTML = --currentTime;
                    if (currentTime === 0) {
                        clearInterval(timerName);
                        toggleButtons();
                        // console.log(player2.choice);
                        playAgainstAI();
                        winConditions();
                        getScoreCard();
                        updateScoreUI();
                        bestOfThreeCalc();
                        toggleNextRound();
                    };
                }, 1000);
            };
        });
    };
};

function toggleButtons() {
    for (button of buttons) button.disabled = buttonsAllowed;
    buttonsAllowed = !(buttonsAllowed);
};

function winConditions() {
    if (player1.choice === player2.choice) {
        game.winner = "DRAW";
        game.roundCounter++;
        game.roundWinner.push(0);

    } else if (loseConditions[player1.choice].includes(player2.choice)) {
        game.winner = "PLAYER 2 WINS";
        game.roundCounter++;
        player2.score++;
        game.roundWinner.push(2);

    } else {
        game.winner = "PLAYER 1 WINS";
        player1.score++;
        game.roundCounter++;
        game.roundWinner.push(1);
    };


};

function getScoreCard() {
    game.roundWinner.forEach(element => {
        if (element === 1) {
            player1.scoreCard.push("W");
            player2.scoreCard.push("L");
        } else if (element === 2) {
            player2.scoreCard.push("W");
            player1.scoreCard.push("L");
        } else {
            player2.scoreCard.push("D");
            player1.scoreCard.push("D");
        };
    });
};

function updatePlayerUIChoices() {
    if (player1.choice) {
        document.getElementById("p1Choice").innerHTML =`${player1.name} has chosen: ` + player1.choice;
    } else {
        document.getElementById("p1Choice").innerHTML = `${player1.name} has not chosen yet.`
    };

    if (player2.choice) {
        document.getElementById("p2Choice").innerHTML = `${player2.name} has chosen: ` + player2.choice;
    } else {
        document.getElementById("p2Choice").innerHTML = `${player2.name} has not chosen yet.`
    }
};

function updateScoreUI() {
    document.getElementById("round").innerHTML = game.roundCounter;
    document.getElementById("winner").innerHTML = game.winner;
    document.getElementById("p1score").innerHTML = player1.scoreCard.join("");
    document.getElementById("p2score").innerHTML = player2.scoreCard.join("");
    document.getElementById("best-of-three-winner").innerHTML = game.bestOfThreeWinner;
};

function toggleNextRound() {
    if (nextRoundButtonAllowed === false) {
        nextRoundButtonAllowed = true;
        document.getElementById("next-round").hidden = false;
        document.getElementById("next-round").disabled = false;
        document.getElementById("next-round").addEventListener("click", newRound);
    } else {
        nextRoundButtonAllowed = false;
        document.getElementById("next-round").hidden = true;
        document.getElementById("next-round").disabled = true;
    };
};

function newRound() {
    toggleButtons();
    timerAllowed = true;
    document.getElementById("p1Choice").innerHTML = "";
    player1.choice = undefined;
    document.getElementById("p2Choice").innerHTML = "";
    player2.choice = undefined;
    document.getElementById("winner").innerHTML = "";
    game.winner = "";
    toggleNextRound();
    player1.scoreCard = [];
    player2.scoreCard = [];
};

function bestOfThreeCalc() {
    if (game.roundCounter === 4) {
        document.getElementById("best-of-three-winner").hidden = false;

        if (player1.score === player2.score) {
            game.bestOfThreeWinner = "BEST OF THREE WINNER: DRAW!";
        } else if (player1.score > player2.score) {
            game.bestOfThreeWinner = "BEST OF THREE WINNER: PLAYER 1!"
        } else {
            game.bestOfThreeWinner = "BEST OF THREE WINNER: PLAYER 2!"
        };
        updateScoreUI()
        console.log(game.bestOfThreeWinner);
    };
};

function playAgainstAI() {
    if (!player2.choice) {
        let aiChoice = Math.floor(Math.random() * 4)

        switch (aiChoice) {
            case 0:
                player2.choice = "rock";
            break;
            case 1:
                player2.choice = "paper";
            break;
            case 2:
                player2.choice = "scissors";
            break;
            case 3:
                player2.choice = "lizard";
            break;
            case 4:
                player2.choice = "spock";
            break
        };
    };
    updatePlayerUIChoices();
};






// dynamic font refactor
// const myDiv = document.getElementById("myDiv");

// function adjustFontSize() {
//   const divWidth = myDiv.offsetWidth;
//   const fontSize = divWidth / 10; // Adjust the factor to your preference
//   myDiv.style.fontSize = `${fontSize}px`;
// }


// fontRefactor();
// window.addEventListener("resize", fontRefactor);
// })