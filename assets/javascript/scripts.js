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
    player1.name = window.prompt("player 1 Name:");
    if (player1.name != null) {
       player1.name = player1.name.trim();
        document.getElementById("p1name").innerHTML = player1.name;
    } else {
        player1.name = "player 1";
        document.getElementById("p1name").innerHTML = player1.name;
    }

    player2.name = window.prompt("player 2 Name:");
    if (player2.name != null) {
        player2.name = player2.name.trim();
        document.getElementById("p2name").innerHTML = player2.name;
    } else {
        player2.name = "Player 2";
        document.getElementById("p2name").innerHTML = player2.name;
    }
}


function logPlayerChoice() {
  for (let button of buttons) {
    button.addEventListener("click", function() {
      if (this.classList.contains("p1button")) {
        let p1Choice = this.getAttribute("value");
        player1.choice = p1Choice;
        updatePlayerUIChoices();
      } else {
        let p2Choice = this.getAttribute("value");
        player2.choice = p2Choice;
        updatePlayerUIChoices();
      }
    });

  }
}

function beginTimer() {
    disableButtonsP2AI();
    for (let button of buttons) {
        button.addEventListener("click", function beginTimerCount() {
            if (timerAllowed) {
                timerAllowed = false;
                let currentTime = 5;
                timerName = setInterval(function () {
                    let timerElement = document.getElementById('timer');
                    timerElement.innerHTML = --currentTime;
                    if (currentTime === 0) {
                        clearInterval(timerName);
                        toggleButtons();
                        playAgainstAI();
                        winConditions();
                        getScoreCard();
                        updateScoreUI();
                        bestOfThreeCalc();
                        toggleNextRound();
                    }
                }, 1000);
            }
        });
    }
}

function toggleButtons() {
    for (let button of buttons) button.disabled = buttonsAllowed;
    buttonsAllowed = !(buttonsAllowed);
}

function winConditions() {
    if (player1.choice === player2.choice) {
        game.winner = "DRAW";
        game.roundCounter++;
        game.roundWinner.push(0);

    } else if (loseConditions[player1.choice].includes(player2.choice)) {
        game.winner = `${player2.name} wins!`;
        game.roundCounter++;
        player2.score++;
        game.roundWinner.push(2);

    } else {
        game.winner = `${player1.name} wins!`;
        player1.score++;
        game.roundCounter++;
        game.roundWinner.push(1);
    }
}

function getScoreCard() {
    game.roundWinner.forEach(element => {
        if (element === 1) {
            player1.scoreCard.push("✓");
            player2.scoreCard.push("X");
        } else if (element === 2) {
            player2.scoreCard.push("✓");
            player1.scoreCard.push("X");
        } else {
            player2.scoreCard.push("~");
            player1.scoreCard.push("~");
        }
    });
}

function updatePlayerUIChoices() {
    if (player1.choice) {
        document.getElementById("p1choice").innerHTML =`${player1.name} has chosen: ` + player1.choice;
    } else {
        document.getElementById("p1choice").innerHTML = `${player1.name} has not chosen yet.`;
    }

    if (player2.choice) {
        document.getElementById("p2choice").innerHTML = `${player2.name} has chosen: ` + player2.choice;
    } else {
        document.getElementById("p2choice").innerHTML = `${player2.name} has not chosen yet.`;
    }
}

function updateScoreUI() {
    document.getElementById("round").innerHTML = game.roundCounter;
    document.getElementById("winner").innerHTML = game.winner;
    document.getElementById("p1score").innerHTML = player1.scoreCard.join("");
    document.getElementById("p2score").innerHTML = player2.scoreCard.join("");
    document.getElementById("best-of-three-winner").innerHTML = game.bestOfThreeWinner;
}

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
    }
}

function newRound() {
    toggleButtons();
    timerAllowed = true;
    document.getElementById("p1choice").innerHTML = "";
    player1.choice = undefined;
    document.getElementById("p2choice").innerHTML = "";
    player2.choice = undefined;
    document.getElementById("winner").innerHTML = "";
    game.winner = "";
    toggleNextRound();
    player1.scoreCard = [];
    player2.scoreCard = [];
    disableButtonsP2AI();
}

function reset() {
    if (game.roundCounter === 4) {
        game.roundCounter = 1;
        document.getElementById("round").innerHTML = game.roundCounter;
        player1.score = 0;
        player2.score = 0;
        player1.scoreCard = [];
        player2.scoreCard = [];
        document.getElementById("best-of-three-winner").hidden = true;
        document.getElementById("next-round").innerHTML = "NEXT-ROUND";
        game.roundWinner = [];
        updateScoreUI();
    }
}

function bestOfThreeCalc() {
    if (game.roundCounter === 4) {
        document.getElementById("best-of-three-winner").hidden = false;
        document.getElementById("next-round").innerHTML = "RESET";
        document.getElementById("next-round").removeEventListener("click", newRound);
        document.getElementById("next-round").addEventListener("click", reset);

        if (player1.score === player2.score) {
            game.bestOfThreeWinner = "BEST OF THREE WINNER: DRAW!";
        } else if (player1.score > player2.score) {
            game.bestOfThreeWinner = "BEST OF THREE WINNER: PLAYER 1!";
        } else {
            game.bestOfThreeWinner = "BEST OF THREE WINNER: PLAYER 2!";
        }
        updateScoreUI();
        updatePlayerUIChoices();
    }
}

function disableButtonsP2AI() {
    if (player2.name.toLocaleLowerCase().trim() === "computer") {
        let aiButtons = document.getElementsByClassName("p2button");
        for (let button of aiButtons) {
            button.disabled = true;
        }
    }
}

function playAgainstAI() {

    if (!player2.choice) {
    let aiChoice = Math.floor(Math.random() * 5);
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
            break;
        }
        updatePlayerUIChoices();
    }
}

