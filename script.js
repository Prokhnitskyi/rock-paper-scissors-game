const possibleValues = ['rock', 'paper', 'scissors'];
const compareObject = {
    rock: {
        rock: 'tie',
        paper: 'lost',
        scissors: 'won'
    },
    paper: {
        paper: 'tie',
        rock: 'won',
        scissors: 'lost'
    },
    scissors: {
        scissors: 'tie',
        rock: 'lost',
        paper: 'won'
    }
};

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleValues.at(randomIndex);
}

function playRound(playerSelection, computerSelection) {
    const playerSelectionClean =  playerSelection.toLowerCase().trim();

    if(!possibleValues.includes(playerSelectionClean)) {
        throw new Error(`You should select ${possibleValues.join(' or ')}`);
    }

    const resultText = {
        won: `You Won! ${playerSelectionClean} beats ${computerSelection}`,
        lost: `You Lost! ${computerSelection} beats ${playerSelectionClean}`,
        tie: 'Tie! You both picked ' + playerSelectionClean

    }

    const code = compareObject[playerSelectionClean][computerSelection];

    return {
        code,
        text: resultText[code]
    }
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