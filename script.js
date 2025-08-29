/**
 * Json filled with questions, each question consists of 5 strings and one number of the right answer
 */

let questions = [
    {
        "question": "Was ist das am meisten verkaufte Brettspiel aller Zeiten?",
        "answer_1": "Monopoly",
        "answer_2": "Schach",
        "answer_3": "Risiko",
        "answer_4": "Scrabble",
        "right_answer": 2
    },
    {
        "question": "Seit wann gibt es den \"Spiel des Jahres\" Preis?",
        "answer_1": "1979",
        "answer_2": "1985",
        "answer_3": "1993",
        "answer_4": "2000",
        "right_answer": 1
    },
    {
        "question": "Was ist das bekannteste deutsche Brettspiel?",
        "answer_1": "Scotland Yard",
        "answer_2": "Tabu",
        "answer_3": "Catan",
        "answer_4": "Mensch ärgere dich nicht",
        "right_answer": 4
    },
    {
        "question": "Wie viele Millionen Exemplare von \"Mensch ärgere dich nicht\" wurden bis heute weltweit verkauft?",
        "answer_1": "25",
        "answer_2": "55",
        "answer_3": "75",
        "answer_4": "95",
        "right_answer": 4
    },
    {
        "question": "In welcher deutschen Stadt findet die größte Brettspielmesse statt?",
        "answer_1": "München",
        "answer_2": "Berlin",
        "answer_3": "Essen",
        "answer_4": "Hamburg",
        "right_answer": 3
    },
    {
        "question": "Was ist das aktuell am besten bewertete Familien-Brettspiel laut \"Boardgamegeeks.com\"?",
        "answer_1": "Flügelschlag",
        "answer_2": "Sky Team",
        "answer_3": "Everdell",
        "answer_4": "Die Crew",
        "right_answer": 2
    },
    {
        "question": "Welches Spiel ist dieses Jahr zum \"Spiel des Jahres\" nominiert worden?",
        "answer_1": "Bomb Busters",
        "answer_2": "Punktesalat",
        "answer_3": "Micro Macro: Crime City",
        "answer_4": "Paleo",
        "right_answer": 1
    }
];


/**
 * define variables: numbers & strings
 */
let rightAnsweredQuestions = 0;
let currentQuestion = 0;
let currentAmountOfQuestions = currentQuestion + 1;
let rightAnswerNumber = 0;
let rightAnswerText = "";
let amountOfQuestions = questions.length;


/**
 * define variables: audios
 * lower the volume of all audios to 20% and 10%
 */
let audioSuccess = new Audio('./audio/success.mp3');
audioSuccess.volume = 0.2;
let audioFailure = new Audio('./audio/failure.mp3');
audioFailure.volume = 0.1;
let audioEndGame = new Audio('./audio/endgame.mp3');
audioEndGame.volume = 0.8;


/**
 * initialise quiz at body=onload
 */
function init() {
    displayAmountOfAllQuestions();
    showQuestion();
}


/**
 * Show questions until all questions answered, then showEndScreen
 */
function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


/**
 * 1) Check if clicked answer is right
 * 2) actives when any answer clicked 
 * 3) audio response if wrong or right answer
 * 4) CSS response if wrong or right answer
 * 5) update number "rightAnsweredQuestions" for endscreen if right
 * 6) reset CSS and animation for next question
 * @param {string} clickedAnswer 
 */
function answer(clickedAnswer) {
    assignString_rightAnswerText_rightAnswerValue();
    if (rightAnswerSelected(clickedAnswer)) {
        playSuccesSoundAndCSSFeedback(clickedAnswer);
    } else {
        PlayFailureSoundAndCSSFeedback(clickedAnswer);
    }
    updateCSSandAnimationsAfterClickedAnswer();
}


/**
 * 1) play audioFailure
 * 2) update CSS to see the clickedAnswer is wrong and highlight right answer too
 * @param {string} clickedAnswer 
 */
function PlayFailureSoundAndCSSFeedback(clickedAnswer) {
    audioFailure.play();
    document.getElementById(clickedAnswer).parentNode.classList.add('wrong-answer-style');
    document.getElementById(rightAnswerText).parentNode.classList.add('right-answer-style');
    setTimeout(removeAnswerStyle, 600, clickedAnswer);
}


/**
 * 1) play audioSuccess
 * 2) update CSS to see if the clickedAnswer is right
 * 3) update number "rightAnsweredQuestions" for endscreen
 * @param {string} clickedAnswer  
 */
function playSuccesSoundAndCSSFeedback(clickedAnswer) {
    audioSuccess.play();
    document.getElementById(clickedAnswer).parentNode.classList.add('right-answer-style');
    setTimeout(removeAnswerStyle, 600, clickedAnswer);
    rightAnsweredQuestions++; //increases the amont of the rightAnsweredQuestions for the endscreen
}


/**
 * update general CSS and animations after clicked answer
 */
function updateCSSandAnimationsAfterClickedAnswer() {
    displayArrow();
    enableButton();
    removeOnclickAttributefromAnswers();
    removeHoverStylePointerFromQuizAnswerCard();
    addHoverStyleNotAllowedToQuizAnswerCard();
}


/**
 * Assign the string "rightAnswerText" value of RightAnswer
 */
function assignString_rightAnswerText_rightAnswerValue() {
    rightAnswerNumber = questions[currentQuestion].right_answer;
    rightAnswerText = "answer_" + rightAnswerNumber;
}


/**
 * Function which removes the "wrong-answer-style" & "right-answer-style"
 * @param {string} clickedAnswer  
 */
function removeAnswerStyle(clickedAnswer) {
    document.getElementById(clickedAnswer).parentNode.classList.remove('right-answer-style');
    document.getElementById(clickedAnswer).parentNode.classList.remove('wrong-answer-style');
    document.getElementById(rightAnswerText).parentNode.classList.remove('right-answer-style');
    document.getElementById(rightAnswerText).parentNode.classList.remove('wrong-answer-style');
}


/**
 * 1) display next question
 * 2) update styles
 * 3) Check if all questions answered, if yes then Endgame
 */
function nextQuestion() {
    currentQuestion++; // die Frage wird  z.Bsp von 0 auf 1 erhöht
    currentAmountOfQuestions++;
    disableButton(); //disable button at the beginning of the next question
    addOnclickAttributeToAnswers();
    removeHoverStyleNotAllowedFromQuizAnswerCard();
    addHoverStylePointerToQuizAnswerCard();
    hideArrow();
    updateCurrentAmountOfQuestions();
    showQuestion();
}


/**
 * restart Game and reset everything
 */
function restartGame() {
    replaceHeaderImgAndRemoveAnimation();
    resetNumbersForNewGame();
    init();
    hideEndScreenAndDisplayQuestionBody();
    updateCurrentAmountOfQuestions();
}


/**
 * replace headerImg with quizImg and remove animation
 */
function replaceHeaderImgAndRemoveAnimation() {
    document.getElementById('headerImg').classList.remove('d-none');
    document.getElementById('headerImg2').classList.add('d-none');
    document.getElementById('endScreen').classList.remove('w3-animate-zoom');
}


/**
 * hide endScreen and display questionbody for restartGame function
 */
function hideEndScreenAndDisplayQuestionBody() {
    document.getElementById('endScreen').classList.add('d-none'); //End-screen verstecken
    document.getElementById('questionBody').style = ''; // Question Body wieder anzeigen
    document.getElementById('endScreen').classList.remove('w3-animate-zoom');
    document.getElementById('endScreen').classList.add('d-none');
}


/**
 * END-Game-Screen
 * Hide Questions and display endscreen-img with zoom in animation 
 * after endscreen-img load QuizResult with zoom in animation
 */
function showEndScreen() {
    updateEndScreenImage();
    playEndGameSound();
    hideQuestionBody();
    setTimeout(animateQuizResult, 400);
    displayQuizResult();
}


/**
 * Play EndGameSound
 */
function playEndGameSound() {
    audioEndGame.play();
}


/**
 * hide questionBody and adjust CSS properties
 */
function hideQuestionBody() {

    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('textQuizEnd').style = 'font-size: 32px; margin-bottom: 10px;';
    document.getElementById('restartButtonDiv').classList.add('margin-bottom20px');
}

/**
 * Display right answered questions
 */
function displayQuizResult() {
    document.getElementById('questionsAmountEnd').innerHTML = questions.length;
    document.getElementById('amountOfRightQuestions').innerHTML = rightAnsweredQuestions;
}


/**
 * Replace HeaderImage and Credits and add animation to HeaderImage
 */
function updateEndScreenImage() {
    document.getElementById('headerImg').classList.add('d-none');
    document.getElementById('headerImg2').classList.remove('d-none');
    document.getElementById('credit').innerHTML = `
        Illustration by <a href="https://icons8.com/illustrations/author/5c07e68d82bcbc0092519bb6">Icons 8</a> from <a href="https://icons8.com/illustrations">Ouch!</a>
        `;
}


/**
 *  Display quiz result and add zoom-in animation
 */
function animateQuizResult() {
    document.getElementById('endScreen').classList.add('w3-animate-zoom');
    document.getElementById('endScreen').classList.remove('d-none');
}


/**
 * update innerHTML of Questions
 */
function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML = question['question'];
    for (let index = 1; index <= 4; index++) {
        document.getElementById(`answer_${index}`).innerHTML = question[`answer_${index}`];
    }
}


/**
 * updates updateProgressBar
 */
function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length * 100;
    document.getElementById('progress-bar').innerHTML = `${percent.toFixed(0)} %`;
    document.getElementById('progress-bar').style = `width: ${percent.toFixed(0)}%`;
    document.getElementById('progress-bar').style.width = `${percent} %`;
}


/**
 * @returns if Game is over
 */
function gameIsOver() {
    return currentQuestion >= questions.length
}


/**
 * check if strings 1) "clickedAnswer" and 2) "rightAnswerText" are identical 
 * @param {string} clickedAnswer 
 * @returns true or false
 */
function rightAnswerSelected(clickedAnswer) {
    return rightAnswerText == clickedAnswer
}

/**
 * remove onclick attribute from all quiz-answer-cards
 */
function removeOnclickAttributefromAnswers() {
    for (let index = 0; index <= 3; index++) {
        document.getElementsByClassName("quiz-answer-card")[index].removeAttribute("onclick");
    }
}


/**
 * add onclick attribute answer_(1-4) to all quiz-answer-cards
 */
function addOnclickAttributeToAnswers() {
    for (let index = 0; index <= 3; index++) {
        document.getElementsByClassName("quiz-answer-card")[index].setAttribute("onclick", `answer('answer_${index + 1}')`);
    }
}


/**
 * add hover style pointer to all quiz-answer-cards
 */
function addHoverStylePointerToQuizAnswerCard() {
    for (let index = 0; index <= 3; index++) {
        document.getElementsByClassName("quiz-answer-card")[index].classList.add('hover-style-pointer');
    }
}


/**
 * remove  hover style pointer from all quiz-answer-cards
 */
function removeHoverStylePointerFromQuizAnswerCard() {
    for (let index = 0; index <= 3; index++) {
        document.getElementsByClassName("quiz-answer-card")[index].classList.remove('hover-style-pointer');
    }
}


/**
 * add hover style not-allowed to all quiz-answer-cards
 */
function addHoverStyleNotAllowedToQuizAnswerCard() {
    for (let index = 0; index <= 3; index++) {
        document.getElementsByClassName("quiz-answer-card")[index].classList.add('hover-style-not-allowed');
    }
}


/**
 * remove hover style not-allowed from all quiz-answer-cards
 */
function removeHoverStyleNotAllowedFromQuizAnswerCard() {
    for (let index = 0; index <= 3; index++) {
        document.getElementsByClassName("quiz-answer-card")[index].classList.remove('hover-style-not-allowed');
    }
}


/**
 * diplay animated right-arrow >>
 */
function displayArrow() {
    document.getElementById('arrow').classList.remove('d-none');
}


/**
 * hide animated right-arrow >>
 */
function hideArrow() {
    document.getElementById('arrow').classList.add('d-none');
}


/**
 * enable Button (NextQuestion) after first try
 */
function enableButton() {
    document.getElementById('next-button').disabled = false;
}


/**
 * disable Button (NextQuestion) after first try
 */
function disableButton() {
    document.getElementById('next-button').disabled = true;
}


/**
 * Updates the number of current displayed question
 */
function updateCurrentAmountOfQuestions() {
    document.getElementById('questionCurrentAmount').innerHTML = `${currentAmountOfQuestions}`;
}


/**
 * reset following numbers for restart:
 * 1) rightAnsweredQuestions
 * 2) currentQuestion
 * 3) currentAmountOfQuestions
 */
function resetNumbersForNewGame() {
    rightAnsweredQuestions = 0;
    currentQuestion = 0;
    currentAmountOfQuestions = 1;
}

/**
 * display amount of all questions according to the lenght of ""questions" JSON
 */
function displayAmountOfAllQuestions() {
    document.getElementById('questionsAmount').innerHTML = `${amountOfQuestions}`;
}
/**
 * ✔
 * todo: lautstärke anpassen ✔
 * todo: frage nur ein mal beantwortbar ✔
 * todo: show end-screen ✔
 * todo: right timing of headerImg ✔
 *
 */
