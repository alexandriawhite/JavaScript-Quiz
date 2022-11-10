//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
let timeCount = document.querySelector(".timer .timer_sec");
const initials = document.querySelector(".initials");
const initialsbutton = document.querySelector(".initialsbutton");
const userinput = document.querySelector("#userinput");
let highscores = document.querySelector(".highscores");
let submit = document.querySelector(".submit");
const storageInput = document.querySelector(".storage");
const text = document.querySelector(".text");
const keyuserScore = localStorage.getItem("userScore");
const keyallscores = JSON.parse(localStorage.getItem("allscores")) || [];
const keyuserinitials = localStorage.getItem("userinitials");


// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(50); //calling startTimer function
}

let timeValue =  50;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 50; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQuestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    startTimer(timeValue); //calling startTimer function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
    localStorage.clear();
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


// if Next Que button clicked
//changing next_btn.onclick to option_list
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQuestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//if user clicked on option
function optionSelected(answer){
    /*clearInterval(counter); //clear counter*/
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        localStorage.setItem("userScore", JSON.stringify(userScore));
                answer.classList.add("correct"); //adding green color to correct selected option
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        timeValue -=5;
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
            }
        }
    }
    for (var i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    initials.classList.remove("hide"); //shows initials form
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");

    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>Congrats! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>Good job! You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>Sorry, you scored <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = timeValue; //changing the value of timeCount with time value
        timeValue--; //decrement the time value
        if(timeValue < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(timeValue < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

initialsbutton.addEventListener("click", function(event){
event.preventDefault()
    const userinitials = userinput.value;
    let userScore = JSON.parse(localStorage.getItem("userScore")); /*getting user score*/
    let allscores = JSON.parse(localStorage.getItem("allscores")) || []; /*getting all user score*/
    allscores.push({
        initials:userinitials,score:userScore
    })
    localStorage.setItem("allscores", JSON.stringify(allscores));
    localStorage.setItem("userinitials", userinput.value)
    userinitials.textContent = userinitials;
        var li=document.createElement("li")
        li.textContent = userScore
        text.append(li)
})


if(keyallscores){
    for (var i=0; i < keyallscores.length; i++){
        var li=document.createElement("li")
        li.textContent = keyallscores[i].score
        text.append(li)
    }
}


/*
if(keyuserinitials){
    keyuserinitials.textContent = keyuserinitials
}

/*
function updateUI() {
    var values = [], keys = object.keys(localStorage), i = keys.length;
    while (i--) {values.push(localStorage.getItem(keys[i]));}
    document.getElementById('highscores').textcontent = values;
    }*/

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}


















/*
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