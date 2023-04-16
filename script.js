const possibleValues = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleValues.at(randomIndex);
}

function playRound(playerSelection, computerSelection) {
    const winLoseConditions = {
        rock: {
            paper: 'lose',
            scissors: 'win'
        },
        paper: {
            rock: 'win',
            scissors: 'lose'
        },
        scissors: {
            rock: 'lose',
            paper: 'win'
        }
    }
    const playerSelectionClean =  playerSelection.toLowerCase().trim();

    if(!possibleValues.includes(playerSelectionClean)) {
        throw new Error(`You should select ${possibleValues.join(' or ')}`);
    }

    if (playerSelectionClean === computerSelection) {
        return 'tie';
    } else {
        return winLoseConditions[playerSelectionClean][computerSelection];
    }
}