const resultsContainer = document.querySelector('.game-results-container');
const chooseButtons = document.querySelectorAll('.game-controls__option');
const scoreBoard = document.querySelector('.game-score');
const scoreBoardLost = scoreBoard.querySelector('.game-score__lost');
const scoreBoardWon = scoreBoard.querySelector('.game-score__won');
const scoreBoardTie = scoreBoard.querySelector('.game-score__tie');
const matchResultContainer = document.querySelector('.game-match-results');
const matchResultTitle = document.querySelector('.game-match-results__title');
const matchResultClose = document.querySelector('.game-match-results__close');
const matchResultRestart = document.querySelector('.game-match-results__button');

chooseButtons.forEach(btn => btn.addEventListener('click', chooseOption));
matchResultClose.addEventListener('click', (event) => {
    event.preventDefault();
    matchResultContainer.close();
});
matchResultRestart.addEventListener('click', () => window.location.reload());

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
let score = {
    won: 0,
    lost: 0,
    tie: 0
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return possibleValues.at(randomIndex);
}

function playRound(playerSelection, computerSelection) {
    const playerSelectionClean = playerSelection.toLowerCase().trim();

    if (!possibleValues.includes(playerSelectionClean)) {
        throw new Error(`You should select ${possibleValues.join(' or ')}`);
    }

    const code = compareObject[playerSelectionClean][computerSelection];
    const roundScore = {
        won: 0,
        lost: 0,
        tie: 0
    }

    score[code]++;
    roundScore[code]++;

    return buildRoundCard(roundScore, playerSelectionClean,computerSelection);
}

function chooseOption(event) {
    event.preventDefault();
    if (score.won === 5 || score.lost === 5) return;

    const roundResult = playRound(event.target.dataset.option, getComputerChoice());
    resultsContainer.innerHTML = roundResult + resultsContainer.innerHTML;
    setTimeout(()=>{
        resultsContainer.firstElementChild.classList.add('round-result--visible');
    },100);
    updateScoreBoard();
    showResults();
}

function showResults() {
    if (score.won === 5) {
        matchResultTitle.innerHTML = 'You won the match!';
        matchResultContainer.showModal();
    } else if (score.lost === 5) {
        matchResultTitle.innerHTML = 'You lost the match!';
        matchResultContainer.showModal();
    }
}

function updateScoreBoard() {
    scoreBoardLost.textContent = score.lost;
    scoreBoardWon.textContent = score.won;
    scoreBoardTie.textContent = score.tie;
}

function titleCase(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function buildRoundCard(roundScore, playerSelection, computerSelection) {
    return `<article class="round-result" data-you-choose="${titleCase(playerSelection)}" 
                                          data-computer-choose="${titleCase(computerSelection)}">
                <div class="round-result__element">
                    <div>Lost</div>
                    <div class="round-result__marker">${roundScore.lost ? '&#10004;' : ''}</div>
                </div>
                <div class="round-result__element">
                    <div>Tie</div>
                    <div class="round-result__marker">${roundScore.tie ? '&#10004;' : ''}</div>
                </div>
                <div class="round-result__element">
                    <div>Won</div>
                    <div class="round-result__marker">${roundScore.won ? '&#10004;' : ''}</div>
                </div>
            </article>`;
}


