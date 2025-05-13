console.log("Script do Quiz App carregado");

// Elementos do DOM
const startScreen = document.querySelector('.start-screen');
const quizContainer = document.querySelector('.quiz-container');
const resultBox = document.querySelector('.result-box');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.querySelector('.next_btn');
const queText = document.querySelector('.que_text');
const optionList = document.querySelector('.option_list');
const totalQue = document.querySelector('.total_que');
const timeText = document.querySelector('.time-text');
const timeSec = document.querySelector('.time-sec');
const scoreText = document.querySelector('.score_text');
const restartBtn = document.querySelector('.restart');
const quitBtn = document.querySelector('.quit');

// Verificar se os elementos foram encontrados
console.log("Elementos do DOM:", {
    startScreen: startScreen,
    quizContainer: quizContainer,
    resultBox: resultBox,
    startBtn: startBtn,
    nextBtn: nextBtn,
    queText: queText,
    optionList: optionList,
    totalQue: totalQue,
    timeText: timeText,
    timeSec: timeSec,
    scoreText: scoreText,
    restartBtn: restartBtn,
    quitBtn: quitBtn
});

// Vari�veis do jogo
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let timeValue = 30;
let timer;

// Banco de quest�es
const questions = [
    {
        numb: 1,
        question: "Qual � a capital do Brasil?",
        answer: "Bras�lia",
        options: [
            "S�o Paulo",
            "Rio de Janeiro",
            "Bras�lia",
            "Salvador"
        ]
    },
    {
        numb: 2,
        question: "Qual � o maior planeta do sistema solar?",
        answer: "J�piter",
        options: [
            "Saturno",
            "J�piter",
            "Urano",
            "Netuno"
        ]
    },
    {
        numb: 3,
        question: "Quem pintou a Mona Lisa?",
        answer: "Leonardo da Vinci",
        options: [
            "Pablo Picasso",
            "Vincent van Gogh",
            "Leonardo da Vinci",
            "Michelangelo"
        ]
    },
    {
        numb: 4,
        question: "Qual � o elemento qu�mico mais abundante no universo?",
        answer: "Hidrog�nio",
        options: [
            "Oxig�nio",
            "Carbono",
            "Hidrog�nio",
            "H�lio"
        ]
    },
    {
        numb: 5,
        question: "Em que ano foi a primeira Copa do Mundo de futebol?",
        answer: "1930",
        options: [
            "1930",
            "1950",
            "1962",
            "1970"
        ]
    }
];

// Inicializa��o
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado");
    startScreen.classList.add("activeInfo");
    quizContainer.classList.remove("activeQuiz");
    resultBox.classList.remove("activeResult");
});

// Iniciar Quiz
if (startBtn) {
    startBtn.addEventListener('click', () => {
        console.log("Bot�o de in�cio clicado");
        startScreen.classList.remove("activeInfo");
        quizContainer.classList.add("activeQuiz");
        showQuestions(0);
        queCounter(1);
        startTimer(30);
    });
}

// Pr�xima quest�o
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        if (queCount < questions.length - 1) {
            queCount++;
            queNumb++;
            showQuestions(queCount);
            queCounter(queNumb);
            clearInterval(counter);
            startTimer(timeValue);
            nextBtn.classList.remove("show");
        } else {
            clearInterval(counter);
            showResult();
        }
    });
}

// Mostrar quest�es
function showQuestions(index) {
    const queData = questions[index];
    queText.innerHTML = queData.question;
    
    let optionTag = '';
    for (let i = 0; i < queData.options.length; i++) {
        optionTag += `<div class="option" data-index="${i}">${queData.options[i]}</div>`;
    }
    optionList.innerHTML = optionTag;
    
    // Adicionar event listeners para as op��es
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            optionSelected(this);
        });
    });
}

// Sele��o de op��o
function optionSelected(answer) {
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    const allOptions = optionList.children.length;
    
    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
    } else {
        answer.classList.add("incorrect");
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].classList.add("correct");
            }
        }
    }
    
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
}

// Contador de quest�es
function queCounter(index) {
    const totalQueCounTag = `<span><p>${index}</p> de <p>${questions.length}</p> Quest�es</span>`;
    totalQue.innerHTML = totalQueCounTag;
}

// Timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeSec.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            const allOptions = optionList.children.length;
            let correctAns = questions[queCount].answer;
            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].classList.add("correct");
                }
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.classList.add("show");
        }
    }
}

// Mostrar resultado
function showResult() {
    startScreen.classList.remove("activeInfo");
    quizContainer.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scorePercentage = (userScore / questions.length) * 100;
    scoreText.innerHTML = `<span>Voc� acertou <p>${userScore}</p> de <p>${questions.length}</p> quest�es</span>`;
}

// Reiniciar Quiz
if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        startScreen.classList.add("activeInfo");
        quizContainer.classList.remove("activeQuiz");
        resultBox.classList.remove("activeResult");
        queCount = 0;
        queNumb = 1;
        userScore = 0;
        showQuestions(queCount);
        queCounter(queNumb);
        nextBtn.classList.remove("show");
    });
}

// Sair do Quiz
if (quitBtn) {
    quitBtn.addEventListener('click', () => {
        window.location.reload();
    });
} 