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


let currentQuiz = 0
let score = 0

loadQuiz()
function loadQuiz() {


    const currentQuizData = quizData[currentQuiz]
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    questionEl.innerText = currentQuizData.question
}

