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