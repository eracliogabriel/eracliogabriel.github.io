// Elementos do DOM
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

// Configurações do jogo
const gridSize = 20;
const tileCount = 20;
let tileSize;

// Variáveis do jogo
let snake = [];
let food = {};
let direction = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameInterval;
let gameSpeed = 200; // Velocidade inicial mais lenta
let isGameRunning = false;
let isPaused = false;
let speedIncreaseInterval = 50; // Pontos necessários para aumentar a velocidade
let minSpeed = 50; // Velocidade máxima (mais rápida)
let lastDirection = 'right'; // Armazena a última direção para quando o jogo for pausado

// Inicialização
const init = () => {
    gameBoard.width = 400;
    gameBoard.height = 400;
    tileSize = gameBoard.width / tileCount;
    highScoreElement.textContent = highScore;
    resetGame();
};

// Reset do jogo
const resetGame = () => {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    direction = 'right';
    lastDirection = 'right';
    score = 0;
    gameSpeed = 200; // Reset da velocidade para o valor inicial
    scoreElement.textContent = score;
    generateFood();
};

// Geração de comida
const generateFood = () => {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // Evita gerar comida sobre a cobra
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            break;
        }
    }
};

// Desenho do jogo
const draw = () => {
    // Limpa o canvas
    const ctx = gameBoard.getContext('2d');
    ctx.fillStyle = '#1a2a6c';
    ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    
    // Desenha a cobra
    ctx.fillStyle = '#fdbb2d';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize - 2, tileSize - 2);
    });
    
    // Desenha a comida
    ctx.fillStyle = '#b21f1f';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize - 2, tileSize - 2);
    
    // Desenha mensagem de pausa
    if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSADO', gameBoard.width / 2, gameBoard.height / 2);
    }
};

// Movimento da cobra
const moveSnake = () => {
    if (isPaused) return;
    
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    
    // Verifica colisão com as paredes
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // Verifica colisão com a própria cobra
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // Verifica se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        generateFood();
        
        // Aumenta a velocidade a cada speedIncreaseInterval pontos
        if (score % speedIncreaseInterval === 0 && gameSpeed > minSpeed) {
            gameSpeed -= 10; // Diminui o intervalo (aumenta a velocidade)
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, gameSpeed);
        }
    } else {
        snake.pop();
    }
};

// Loop principal do jogo
const gameLoop = () => {
    moveSnake();
    draw();
};

// Game Over
const gameOver = () => {
    clearInterval(gameInterval);
    isGameRunning = false;
    isPaused = false;
    startButton.textContent = 'Iniciar Jogo';
    restartButton.style.display = 'none';
    alert(`Fim de jogo! Pontuação: ${score}`);
};

// Pausar/Continuar o jogo
const togglePause = () => {
    if (!isGameRunning) return;
    
    isPaused = !isPaused;
    
    if (isPaused) {
        startButton.textContent = 'Continuar';
        lastDirection = direction; // Armazena a direção atual
        restartButton.style.display = 'inline-block'; // Mostra o botão de reiniciar
    } else {
        startButton.textContent = 'Pausar';
        direction = lastDirection; // Restaura a direção
        restartButton.style.display = 'none'; // Esconde o botão de reiniciar
    }
};

// Controles
const handleKeyPress = (e) => {
    if (!isGameRunning) return;
    
    // Tecla de pausa (Espaço)
    if (e.key === ' ') {
        togglePause();
        return;
    }
    
    if (isPaused) return; // Não processa outros controles se estiver pausado
    
    switch (e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
};

// Controles de botão
document.getElementById('up').addEventListener('click', () => {
    if (isPaused) return;
    if (direction !== 'down') direction = 'up';
});

document.getElementById('down').addEventListener('click', () => {
    if (isPaused) return;
    if (direction !== 'up') direction = 'down';
});

document.getElementById('left').addEventListener('click', () => {
    if (isPaused) return;
    if (direction !== 'right') direction = 'left';
});

document.getElementById('right').addEventListener('click', () => {
    if (isPaused) return;
    if (direction !== 'left') direction = 'right';
});

// Início do jogo
startButton.addEventListener('click', () => {
    if (isGameRunning) {
        if (isPaused) {
            // Continuar o jogo
            isPaused = false;
            startButton.textContent = 'Pausar';
            direction = lastDirection;
            restartButton.style.display = 'none'; // Esconde o botão de reiniciar
        } else {
            // Pausar o jogo
            isPaused = true;
            startButton.textContent = 'Continuar';
            lastDirection = direction;
            restartButton.style.display = 'inline-block'; // Mostra o botão de reiniciar
        }
    } else {
        // Iniciar novo jogo
        resetGame();
        isGameRunning = true;
        isPaused = false;
        startButton.textContent = 'Pausar';
        restartButton.style.display = 'none'; // Esconde o botão de reiniciar
        gameInterval = setInterval(gameLoop, gameSpeed);
    }
});

// Reiniciar o jogo
restartButton.addEventListener('click', () => {
    if (isGameRunning && isPaused) {
        resetGame();
        isPaused = false;
        startButton.textContent = 'Pausar';
        restartButton.style.display = 'none';
        direction = 'right';
        lastDirection = 'right';
    }
});

// Event Listeners
window.addEventListener('keydown', handleKeyPress);
window.addEventListener('load', init); 