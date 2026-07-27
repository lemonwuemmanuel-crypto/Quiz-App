const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language"
        ],
        answer: "HyperText Markup Language"
    },

    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
             "CSS",
             "JavaScript"
        ],
        answer: "CSS"
    },

    {
        question: "Which keyword declares a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const"
        ],
        answer: "const"
    }
];

const questionElement = document.querySelector("#question");
const optionsElement = document.querySelector("#options");
const nextBtn = document.querySelector("#nextBtn");
const restartBtn = document.querySelector("#restartBtn");
const resultElement = document.querySelector("#result");
const progressElement = document.querySelector("#progress");
const timerElement = document.querySelector("#timer");

let currentQuestion = 0;
let score = 0;

let timeLeft = 10;
let timer;

restartBtn.style.display = "none";

showQuestions();

nextBtn.addEventListener("click", function(){

    clearInterval(timer);

    const selectedAnswer = document.querySelector('input[name="quiz"]:checked');

    if(selectedAnswer){

        const question = questions[currentQuestion];

        if(selectedAnswer.value === question.answer){

            score++;
        }

        nextQuestion();
    }

});



restartBtn.addEventListener("click", function(){

    currentQuestion = 0;
    score = 0;

    restartQuiz();

    showQuestions();
    

});




function endQuiz() {
    
    resultElement.textContent =
    "Quiz Finished! Your Score: " + score + "/" + questions.length;

    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    nextBtn.style.display = "none";

    restartBtn.style.display = "inline-block";
}



function restartQuiz(){

    resultElement.textContent = "";

    questionElement.style.display = "block";
    optionsElement.style.display = "block";
    nextBtn.style.display = "block";

    restartBtn.style.display = "none";

}




function showQuestions(){
    
    const question = questions[currentQuestion];

    progressElement.textContent =
    "Question " + (currentQuestion + 1) + " of " + questions.length;

    questionElement.textContent = question.question;

    optionsElement.innerHTML = "";

    for(let i = 0; i < question.options.length;i++){

        const option = question.options[i];

        const radio = document.createElement("input");
        radio.type= "radio";
        radio.name = "quiz";
        radio.value = option;

        const label = document.createElement("label");
        label.textContent = option;

        optionsElement.appendChild(radio);
        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement("br"));
    }   

    startTimer();
}



function nextQuestion(){

    currentQuestion++;

    if(currentQuestion < questions.length){

        showQuestions();
    }
    else{
        endQuiz();
    }

}



function startTimer(){

     clearInterval(timer);

     timeLeft = 10;

     timerElement.textContent = "Time: " + timeLeft;

     timer = setInterval(function(){

        timeLeft--;

        timerElement.textContent = "Time: " + timeLeft;

        if(timeLeft === 0){

            clearInterval(timer);

            nextQuestion()
        }
     }, 1000);
}

