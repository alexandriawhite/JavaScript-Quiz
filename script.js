const quizData = [
    {
        question: "Commonly used data types DO NOT include?",
            a: "1. Strings",
            b: "2. Booleans",
            c: "3. Alerts",
            d: "4. Numbers",
        correct: "c",
    },
    {
        question: "The condition in an if / else statement is enclosed within ____.",
            a: "1. Quotes",
            b: "2. Curley brackets",
            c: "3. Parentheses",
            d: "4. Square Brackets",
        correct: "c",
    },
    {
        question: "Arrays in JavaScript can be used to store",
            a: "1. Numbers and strings",
            b: "2. Other arrays",
            c: "3. Booleans",
            d: "4. All of the above",
        correct: "d",
    },
      {
        question: "String values must be enclosed within ______ when being assigned to variables",
            a: "1. Commas",
            b: "2. Curley brackets",
            c: "3. Quotes",
            d: "4. Parentheses",
        correct: "a",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
            a: "1. JavaScript",
            b: "2. terminal / bash",
            c: "3. for Loops",
            d: "4. console.log",
        correct: "d",
    },
];


const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
var time = 50
var timer = document.querySelector(".timer");
let currentQuiz = 0
let score = 0




loadQuiz()
function loadQuiz() {
deselectAnswers()

    const currentQuizData = quizData[currentQuiz]
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    questionEl.innerText = currentQuizData.question
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected(){
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        if(answer === quizData[currentQuiz].correct){
            score++
        }
        currentQuiz++

        if(currentQuiz < quizData.length){
            loadQuiz()
        } else {
            quiz.innerHTML =`
            <h2>You answered ${score}
            /${quizData.length} questions correctly</h2>
            <button onclick="location.reload()".Reload</button>
            `
        }
    }
   })

/*
   function countdown_start() {
    time = 50;
    var gameTimer = setInterval(function(){
        time--;
        timer.textContent= "Time: " + time; 
//If time hits 0, it will take you to the final page
    if (time === 0){
        clearInterval(gameTimer);
        /*final_score();
    }
}, 1000);*/