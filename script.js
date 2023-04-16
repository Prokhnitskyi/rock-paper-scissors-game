const possibleValues = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleValues.at(randomIndex);
}

function playRound(playerSelection, computerSelection) {
    const result = { code: null, text: null };
    const isWin = {
        rock: {
            paper: false,
            scissors: true
        },
        paper: {
            rock: true,
            scissors: false
        },
        scissors: {
            rock: false,
            paper: true
        }
    };

    const playerSelectionClean =  playerSelection.toLowerCase().trim();

    if(!possibleValues.includes(playerSelectionClean)) {
        throw new Error(`You should select ${possibleValues.join(' or ')}`);
    }

    if (playerSelectionClean === computerSelection) {
        result.code = 'tie';
        result.text = 'Tie! You both picked ' + playerSelectionClean;
        return result;
    }

    const won = isWin[playerSelectionClean][computerSelection];

    if (won) {
        result.code = 'won';
        result.text = `You Won! ${playerSelectionClean} beats ${computerSelection}`;
    } else {
        result.code = 'lost';
        result.text = `You Lost! ${computerSelection} beats ${playerSelectionClean}`;
    }

    return result;
}

function game(){
    let roundsPlayed = 0;
    const score = {
        won: 0,
        lost: 0,
        tie: 0
    }

    for (roundsPlayed; roundsPlayed < 5; roundsPlayed++) {
        const userPrompt = prompt(`Choose between: ${possibleValues.join(', ')}`);
        const roundResults = playRound(userPrompt, getComputerChoice());
        score[roundResults.code]++;
        alert(roundResults.text);
    }

    if (score.won > score.lost) {
        alert('You won the game!');
    } else if (score.won < score.lost) {
        alert('You lost the game!');
    } else {
        alert('Game was ended with a tie');
    }
    console.table(score);
}