function computerPlay() {
    const moves = ["ROCK","PAPER","SCISSORS"];

    const choice = Math.floor(Math.random() * moves.length);
    return moves[choice];
}

function playRound(playerSelection,computerSelection) {
    
    return (playerSelection.toUpperCase() === "ROCK" && computerSelection === "SCISSORS" || playerSelection.toUpperCase() === "PAPER" && computerSelection === "ROCK" || playerSelection.toUpperCase() === "SCISSORS" && computerSelection === "PAPER");
 
}

function isTie(playerSelection,computerSelection) {
    
    return (playerSelection.toUpperCase() === computerSelection);
}

function invalidInput(playerSelection) {
    
    return (playerSelection.toUpperCase() !== "ROCK" && playerSelection.toUpperCase() !== "PAPER" && playerSelection.toUpperCase() !== "SCISSORS");
}

function whoWins(playerScore) {

    if (playerScore >= 3) {
        alert(`Your score: ${playerScore}/5. Congratulations, you win the game!`);
        return;
    }
    else {
        alert(`Your score: ${playerScore}/5. Sorry, you lost. Better luck next time!`);
        return;
    }
}

function game() {

    let round = 1;
    let playerScore = 0;
    alert("Welcome to Rock Paper Scissors!");

    while (round <= 5) {

        console.log(`Round ${round}`);

        let computerSelection = computerPlay();
        let playerSelection = prompt("Please make a selection: rock, paper or scissors?");

        if (invalidInput(playerSelection)) {
            alert("Sorry, that\'s not a valid selection. Please try again.");
        }
        else if (isTie(playerSelection,computerSelection)) {
            console.log("It\'s a draw! Try again.");
        }
        else {
            let result = playRound(playerSelection,computerSelection);

            if (result) {
                console.log(`You win the round! ${playerSelection.toUpperCase()} beats ${computerSelection}!`);
            }
            else {
                console.log(`You lose the round! ${computerSelection} beats ${playerSelection.toUpperCase()}!`);
            }
            playerScore += result;
            round++;
        }
    }
    whoWins(playerScore);
    return;
}