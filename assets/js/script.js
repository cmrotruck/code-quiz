// Get references to the #btnStart element
var headerEl = document.querySelector(".header");
var titleEl = document.querySelector(".title");
var buttonsEl = document.querySelector(".buttons");
var bodyEl = document.querySelector(".body");
var gradingEl = document.querySelector(".grading");
var quiz = [];
var currentQuestionAnswer = "";
var time = 75;
var answer = "";
var questionIndex = 0;
var gameOver = false;
var timer = "";
var finalScore = "";
var scoreString = "";
var highScores = [];

var loadQuiz = function () {

    var question1Obj = {
        question: "",
        answerOptions: "",
        correctAnswer: "",
        nameClass: ""
    };
    question1Obj.question = "Commonly used data types DO not \ninclude:";
    question1Obj.answerOptions = ["strings", "booleans", "alerts", "numbers"];
    question1Obj.correctAnswer = "alerts";
    question1Obj.nameClass = "answerOption";

    quiz.push(question1Obj);

    var question2Obj = {
        question: "",
        answerOptions: "",
        correctAnswer: "",
        nameClass: ""
    };
    question2Obj.question = "The condition in an if/else statement is \nenclosed with ___________.";
    question2Obj.answerOptions = ["quotes", "curly brackets", "parenthesis", "square brackets"];
    question2Obj.correctAnswer = "parenthesis";
    question2Obj.nameClass = "answerBigOption";


    quiz.push(question2Obj);


    var question3Obj = {
        question: "",
        answerOptions: "",
        correctAnswer: "",
        nameClass: ""
    };
    question3Obj.question = "Arrays in JavaScript can be used to store \n_________.";
    question3Obj.answerOptions = ["numbers and strings", "other arrays", "booleans", "all of the above"];
    question3Obj.correctAnswer = "all of the above";
    question3Obj.nameClass = "answerBigOption";

    quiz.push(question3Obj);

    var question4Obj = {
        question: "",
        answerOptions: "",
        correctAnswer: "",
        nameClass: ""
    };
    question4Obj.question = "String values must be enclosed within _______ \nwhen being assigned to variables.";
    question4Obj.answerOptions = ["commas", "curly brackets", "quotes", "parenthesis"];
    question4Obj.correctAnswer = "quotes";
    question4Obj.nameClass = "answerOption";

    quiz.push(question4Obj);

    var question5Obj = {
        question: "",
        answerOptions: "",
        correctAnswer: "",
        nameClass: ""
    };
    question5Obj.question = "A very useful tool used during development \nand debugging for printing content to the \mdebugger is:";
    question5Obj.answerOptions = ["JavaScript", "terminal/bash", "for loops", "console.log"];
    question5Obj.correctAnswer = "console.log";
    question5Obj.nameClass = "answerOption";

    quiz.push(question5Obj);
}

var highScoreLinkHandler = function (event) {
    event.preventDefault();

    var linkClick = event.target;

    if (linkClick.matches(".highScoresLink")) {
        console.log("it matches");
        showHighScore(event);
    }
}

var highScoreFormEventHandler = function (event) {
    event.preventDefault();
    buttonClickEl = event.target;
    if (buttonClickEl.matches(".goBackButton")) {
        console.log("Go back button clicked");
        removeElements();
        //formHome();
        location.reload();
    }

    if (buttonClickEl.matches(".clearButton")) {
        console.log("clear button clicked");
        localStorage.clear();
        var el;

        //remove final score header elements
        el = document.querySelector("ul");
        if (el) {
            el.remove();
        }
    }

}

var showHighScore = function (event) {
    //event.preventDefault();
    var scoreObj = {
        name: "",
        score: ""
    };
    buttonClickEl = event.target;


    if (buttonClickEl.matches(".initialsButton") || buttonClickEl.matches(".highScoresLink")) {
        // bodyEl.appendChild(spanEl);
        if (buttonClickEl.matches(".initialsButton")) {
            scoreObj.name = document.querySelector(".initialsInput").value;
            scoreObj.score = finalScore;
        }

        removeElements();

        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            if (JSON.parse(localStorage.getItem("scores")) != null) {
                highScores = JSON.parse(localStorage.getItem("scores"));
            }

        } else {
            // Sorry! No Web Storage support..
        }

        

        if (buttonClickEl.matches(".initialsButton")) {
            highScores.push(scoreObj);
            highScores.sort((a, b) => (a.score < b.score) ? 1 : -1);
            if (typeof (Storage) !== "undefined") {
                // Code for localStorage/sessionStorage.
                localStorage.setItem("scores", JSON.stringify(highScores));
            } else {
                // Sorry! No Web Storage support..
            }
        }

        //create high score header element
        var highScoreHeaderEl = document.createElement("h1");
        highScoreHeaderEl.className = "highScoreHeader";
        highScoreHeaderEl.textContent = "High scores";

        titleEl.appendChild(highScoreHeaderEl);

        var scoresEl = document.createElement("ul");
        scoresEl.className = "scoreList"

        for (let index = 0; index < highScores.length; index++) {
            scoreObj = highScores[index];
            var scoreEl = document.createElement("li")
            scoreEl.className = "scoreListItem";
            //scoreEl.textContent = finalScore;
            console.log(scoreObj);
            scoreEl.textContent = (index + 1) + ". " + scoreObj.name + " - " + scoreObj.score;
            console.log(scoreEl)
            scoresEl.appendChild(scoreEl);
            bodyEl.appendChild(scoresEl);

        }





        var goBackButtonEl = document.createElement("button")
        goBackButtonEl.className = "goBackButton";
        goBackButtonEl.textContent = "Go Back";
        buttonsEl.appendChild(goBackButtonEl);

        var clearScoresButtonEl = document.createElement("button")
        clearScoresButtonEl.className = "clearButton";
        clearScoresButtonEl.textContent = "Clear Scores";
        buttonsEl.appendChild(clearScoresButtonEl);

        //listen for button clicks
        buttonsEl.addEventListener("click", highScoreFormEventHandler)

    }
}

var showFinalScore = function (time) {
    clearInterval(timer);
    //display timer
    document.querySelector(".timer").innerHTML = "timer: 0";
    finalScore = time;

    //create status element
    var statusEl = document.createElement("h1");
    statusEl.className = "finalScoreHeader";
    statusEl.textContent = "All done!";

    titleEl.appendChild(statusEl);

    //create grade element
    var scoreEl = document.createElement("p");
    scoreEl.className = "finalScore";
    scoreEl.textContent = "Your final score is " + finalScore;

    bodyEl.appendChild(scoreEl);

    var enterInitialsEl = document.createElement("p");
    enterInitialsEl.className = "finalScore"
    enterInitialsEl.textContent = "Enter initials: ";

    var spanEl = document.createElement("span")

    var initialsInputEl = document.createElement("input");
    initialsInputEl.type = "text";
    initialsInputEl.className = "initialsInput";

    var initialsButtonEl = document.createElement("button")
    initialsButtonEl.className = "initialsButton";
    initialsButtonEl.textContent = "submit"

    spanEl.appendChild(initialsInputEl);
    spanEl.appendChild(initialsButtonEl);

    enterInitialsEl.appendChild(spanEl);

    bodyEl.appendChild(enterInitialsEl);

    //start listending for button click
    initialsButtonEl.addEventListener("click", showHighScore)
}

var startTimer = function () {

    timer = setInterval(function () {
        //if timer is zero, display game over and terminate timere
        if (time < 0) {
            //display timer
            document.querySelector(".timer").innerHTML = "timer: 0";
            clearInterval(timer);
            alert("GAME OVER!");

            //set gameOver to true so timer will stop
            gameOver = true;
        }
        else {
            //display timer
            document.querySelector(".timer").innerHTML = "timer: " + time;
        }

        //subtract a second from initial start time
        time = time - 1;
    }, 1000);
}

var getAnswer = function (event) {
    event.preventDefault();

    var answerEl = event.target;
    //console.log(answerEl.id);
    if ((answerEl.matches(".answerBigOption") || answerEl.matches(".answerOption")) && answerEl.id === currentQuestionAnswer) {
        //show grade for 1 second before loading next question
        setTimeout(function () {
            //load next quesiton
            loadQuestion();
        }, 1000);
        document.querySelector(".grade").innerHTML = "Correct!"
        //console.log("correct: " + answer);        
    }
    else if ((answerEl.matches(".answerBigOption") || answerEl.matches(".answerOption")) && answerEl.id !== currentQuestionAnswer) {

        //remove 10 seconds from time

        setTimeout(function () {
            //load next question
            loadQuestion();
        }, 1000);

        //show grading
        document.querySelector(".grade").innerHTML = "Wrong!";
        time = time - 10;
        //console.log("wrong: " + answer);

    }

}

var removeElements = function () {
    var el;

    //remove final score header elements
    el = document.querySelector(".finalScoreHeader")
    if (el) {
        el.remove();
    }

    //remove 1st final score text element
    el = document.querySelector(".finalScore");
    if (el) {
        el.remove()
    }

    //remove 2nd final score text element
    el = document.querySelector(".finalScore");
    if (el) {
        el.remove()
    }

    //remove intitials Input text elements
    el = document.querySelector(".initialsInput");
    if (el) {
        el.remove();
    }

    el = document.querySelector(".initialsButton");
    if (el) {
        el.remove();
    }

    //remove old question/title element
    el = document.querySelector(".question");

    if (el === null) {
        el = document.querySelector(".quizQuestion");
        if (el) {
            el.remove();
        }
    }
    else {
        el.remove();
    }

    //remove old intro text
    el = document.querySelector(".intro");
    if (el) {
        el.remove();
    }


    //remove old start quiz button
    el = document.querySelector(".btnStart");
    if (el) {
        el.remove();
    }

    //remove old quiz buttons
    el = document.querySelector(".answerOption");
    while (el) {
        el = document.querySelector(".answerOption");
        if (el) {
            el.remove();
        }
    }

    //remove old quiz big buttons
    el = document.querySelector(".answerBigOption");
    while (el) {
        el = document.querySelector(".answerBigOption");
        if (el) {
            el.remove();
        }
    }

    el = document.querySelector(".grade")
    if (el) {
        el.remove();
    }
}

var loadQuestion = function () {
    removeElements();
    if (questionIndex < quiz.length) {
        var questionsObj = {
            question: "",
            answerOptions: "",
            correctAnswer: "",
            nameClass: ""
        };

        //load questionObj from quiz array
        questionsObj = quiz[questionIndex];

        //create question element
        var questionEl = document.createElement("h1");
        questionEl.className = "quizQuestion";
        questionEl.textContent = questionsObj.question;
        currentQuestionAnswer = questionsObj.correctAnswer;
        titleEl.appendChild(questionEl);

        //run until all answerOptions in the questionObj have been created.
        for (var i = 0; i < questionsObj.answerOptions.length; i++) {
            //create answer option buttons
            var btnAnswer = document.createElement("button");
            btnAnswer.className = questionsObj.nameClass;
            btnAnswer.id = questionsObj.answerOptions[i];
            btnAnswer.textContent = (i + 1) + ". " + questionsObj.answerOptions[i];
            buttonsEl.appendChild(btnAnswer);
        }

        //TODO: create grade element
        var gradeEl = document.createElement("p");
        gradeEl.className = "grade";
        gradeEl.id = "grade";
        gradeEl.textContent = "";

        gradingEl.appendChild(gradeEl);


        questionIndex = questionIndex + 1;

    }
    else {
        //TODO: show final score
        //set gameOver to true so timer will stop
        gameOver = true;
        showFinalScore(time);
    }

    // console.log("startQuiz");
}

var quizStart = function () {

    //initialize question object
    var questionsObj = {
        question: "",
        answerOptions: "",
        correctAnswer: ""
    };

    //start timer
    startTimer();

    //load questions into quiz array
    loadQuiz();

    //load questions
    loadQuestion();

    // Add event listener to buttons
    buttonsEl.addEventListener("click", getAnswer);

}

function formHome() {

    //console.log("form home");

    //create high score link
    var highScoresLink = document.createElement("a");
    highScoresLink.className = "highScoresLink";
    highScoresLink.textContent = "View High Scores";
    headerEl.appendChild(highScoresLink);

    //create timer 
    var timerEl = document.createElement("p");
    timerEl.className = "timer";
    timerEl.id = "timer";
    timerEl.textContent = "Timer: 0";
    headerEl.appendChild(timerEl);

    //create header/title
    var titleTextEl = document.createElement("h1");
    titleTextEl.className = "question";
    titleTextEl.textContent = "Coding Quiz Challenge";
    titleEl.appendChild(titleTextEl);

    //create intro paragraph
    var startParagraphEl = document.createElement("p");
    startParagraphEl.className = "intro";
    startParagraphEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    bodyEl.appendChild(startParagraphEl);


    //create Start button
    var startButtonEl = document.createElement("button");
    startButtonEl.className = "btnStart";
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.id = "btnStart";
    buttonsEl.appendChild(startButtonEl);

    // Add event listener to buttons
    document.getElementById("btnStart").addEventListener("click", quizStart);
    headerEl.addEventListener("click", highScoreLinkHandler);
}
//showHighScore();
//showFinalScore();
formHome();