function computerPlay() {
    const moves = ["ROCK","PAPER","SCISSORS"];

    const choice = Math.floor(Math.random() * moves.length);
    return moves[choice];
}

function playerWin(playerSelection,computerSelection) {
    
    return (playerSelection.toUpperCase() === "ROCK" && computerSelection === "SCISSORS" || 
    playerSelection.toUpperCase() === "PAPER" && computerSelection === "ROCK" || 
    playerSelection.toUpperCase() === "SCISSORS" && computerSelection === "PAPER");
 
}

function isTie(playerSelection,computerSelection) {
    
    return (playerSelection.toUpperCase() === computerSelection);
}

function playRound(playerSelection) {

    const newDiv = addRemoveChild('results', 'content');
    const parent = newDiv[0];
    const child = newDiv[1];

    let computerSelection = computerPlay();

    if (isTie(playerSelection,computerSelection)) {
            child.textContent = `It's a draw! Try again!\n\r\n\rYour Score: ${scores.playerScore}\n\rComputer Score: ${scores.computerScore}`;
    }
    else {
        if (playerWin(playerSelection,computerSelection)) {
            scores.addPlayerScore();
            child.textContent = `You win the round! ${playerSelection.toUpperCase()} beats ${computerSelection}!\n\r\n\rYour Score: ${scores.playerScore}\n\rComputer Score: ${scores.computerScore}`;
        }
        else {
            scores.addComputerScore();
            child.textContent = `You lose the round! ${computerSelection} beats ${playerSelection.toUpperCase()}!\n\r\n\rYour Score: ${scores.playerScore}\n\rComputer Score: ${scores.computerScore}`;
        }
    }
    parent.appendChild(child)
    return;
}

function addRemoveChild(parentName, childName) {
    
    const parent = document.querySelector(`#${parentName}`);

    let oldContent = parent.lastElementChild;

    if (oldContent) {
        parent.removeChild(parent.lastElementChild);
    }

    const child = document.createElement('div');
    child.setAttribute('style','white-space: pre;');
    child.classList.add(`${childName}`);

    return [parent, child];
}

function winCheck() {
    return (scores.playerScore === 5 || scores.computerScore === 5) 
}

function rockPaperScissors(playerSelection) {

    if (!winCheck()) {
        playRound(playerSelection);

        if (winCheck()) {
            const newDiv = addRemoveChild('winner', 'content');
            const parent = newDiv[0];
            const child = newDiv[1];
            const playAgain = document.createElement('button');
            
            playAgain.classList.add('playAgain');
            playAgain.textContent = "Play again";

            if (scores.playerScore === 5) {
                child.textContent = "Congratulations! You won!";
            }
            else {
                child.textContent = "Sorry, you lost. Better luck next time!";
            }
            parent.appendChild(child);
            parent.appendChild(playAgain);

            playAgain.addEventListener('click', restartGame);
        }
        return;
    }
    return;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function restartGame() {
    
    const oldResults = document.querySelector('#results');
    const oldWinner = document.querySelector('#winner');

    removeAllChildNodes(oldResults);
    removeAllChildNodes(oldWinner);
    scores.playerScore = 0;
    scores.computerScore = 0;
    return;
}

var scores = {
    playerScore: 0,
    computerScore: 0,
    addPlayerScore: function() {
        return this.playerScore += 1;
    },
    addComputerScore: function() {
        return this.computerScore += 1;
    },
};

const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', () => {
    rockPaperScissors(button.id);
}));