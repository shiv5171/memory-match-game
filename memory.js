const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let moves = 0;
let timer = 0;
let flippedCards = [];
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');
const moveCounter = document.getElementById('move-counter');
const timerDisplay = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');

function startGame() {
    moves = 0;
    timer = 0;
    flippedCards = [];
    matchedPairs = 0;
    moveCounter.textContent = moves;
    timerDisplay.textContent = timer;
    gameBoard.innerHTML = '';
    const shuffledCards = cards.sort(() => 0.5 - Math.random());
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        this.textContent = this.dataset.value;
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    moves++;
    moveCounter.textContent = moves;
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            clearInterval(timerInterval);
            alert(`Game Over! You completed the game in ${moves} moves and ${timer} seconds.`);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

let timerInterval;
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
}

restartButton.addEventListener('click', startGame);
startGame();
