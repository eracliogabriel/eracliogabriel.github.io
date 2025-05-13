// Elementos do DOM
const gameCards = document.querySelector('.game-cards');
const movesCount = document.querySelector('#moves-count');
const timeValue = document.querySelector('#time');
const restartButton = document.querySelector('#restart');

// Variáveis do jogo
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let moves = 0;
let seconds = 0;
let minutes = 0;

// Ícones para as cartas
const items = [
    'fa-heart', 'fa-heart',
    'fa-star', 'fa-star',
    'fa-bolt', 'fa-bolt',
    'fa-gem', 'fa-gem',
    'fa-moon', 'fa-moon',
    'fa-sun', 'fa-sun',
    'fa-cloud', 'fa-cloud',
    'fa-tree', 'fa-tree'
];

// Inicialização do jogo
const initializeGame = () => {
    moves = 0;
    seconds = 0;
    minutes = 0;
    let html = '';
    items.sort(() => Math.random() - 0.5);
    
    items.forEach((item, index) => {
        html += `
            <div class="card" data-card="${item}">
                <div class="card-front">
                    <i class="fas ${item}"></i>
                </div>
                <div class="card-back">
                    <i class="fas fa-question"></i>
                </div>
            </div>
        `;
    });
    
    gameCards.innerHTML = html;
    cards = document.querySelectorAll('.card');
    movesCount.innerText = moves;
    timeValue.innerText = '00:00';
    clearInterval(interval);
    interval = setInterval(timeGenerator, 1000);
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('flip')) {
                card.classList.add('flip');
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.dataset.card;
                } else {
                    moves++;
                    movesCount.innerText = moves;
                    secondCard = card;
                    let secondCardValue = card.dataset.card;
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        firstCard = false;
                        setTimeout(() => {
                            return firstCard.classList.remove('flip', 'matched'), secondCard.classList.remove('flip', 'matched');
                        }, 1000);
                    } else {
                        let tempFirst = firstCard;
                        let tempSecond = secondCard;
                        firstCard = false;
                        secondCard = false;
                        setTimeout(() => {
                            tempFirst.classList.remove('flip');
                            tempSecond.classList.remove('flip');
                        }, 900);
                    }
                }
            }
        });
    });
};

// Gerador de tempo
const timeGenerator = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `${minutesValue}:${secondsValue}`;
};

// Event Listeners
window.onload = initializeGame;
restartButton.addEventListener('click', initializeGame); 