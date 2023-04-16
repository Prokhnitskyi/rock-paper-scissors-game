const possibleValues = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleValues.at(randomIndex);
}

function playRound(playerSelection, computerSelection) {
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
        return 'Tie! You both picked ' + playerSelectionClean;
    }

    const won = isWin[playerSelectionClean][computerSelection];

    if (won) {
        return `You Won! ${playerSelectionClean} beats ${computerSelection}`;
    } else {
        return `You Lose! ${computerSelection} beats ${playerSelectionClean}`;
    }
}