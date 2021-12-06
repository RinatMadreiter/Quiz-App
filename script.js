/**
 * Json with questions, each question consists of 5 strings and one integer
 */

let questions = [
    {
        "question": "What is the most sold boardgame of all time?", 
        "answer_1": "Monopoly",
        "answer_2": "Chess",
        "answer_3": "Risk",
        "answer_4": "Scrabble",
        "right_answer": 2
    },
    {
        "question": "Since when does the \"Spiel des Jahres\" award exist?", 
        "answer_1": "1979",
        "answer_2": "1985",
        "answer_3": "1993",
        "answer_4": "2000",
        "right_answer": 1
    },
    {
        "question": "What is the most famous german boardgame so far?", 
        "answer_1": "Scotland Yard",
        "answer_2": "Tabu",
        "answer_3": "Catan",
        "answer_4": "Mensch ärgere dich nicht",
        "right_answer": 4
    },
    {
        "question": "How many million copies of \"Mensch ärgere dich nicht\" were sold?", 
        "answer_1": "25",
        "answer_2": "55",
        "answer_3": "75",
        "answer_4": "95",
        "right_answer": 4
    },
    {
        "question": "In which german city the biggest yearly boardgame convention takes place?", 
        "answer_1": "Munich",
        "answer_2": "Berlin",
        "answer_3": "Essen",
        "answer_4": "Hamburg",
        "right_answer": 3
    },
    {
        "question": "What is the best family boardgame according to \"Boardgamegeeks.com\"?", 
        "answer_1": "Wingspan",
        "answer_2": "Lost Ruins of Arnak",
        "answer_3": "Everdell",
        "answer_4": "Die Crew",
        "right_answer": 1
    },
    {
        "question": "Which game won the \"Spiel des Jahres\" award this year?", 
        "answer_1": "The Adventures of Robin Hood",
        "answer_2": "Point Salad",
        "answer_3": "Micro Macro: Crime City",
        "answer_4": "Paleo",
        "right_answer": 3
    }
];


let currentQuestion = 0;

function init() {
    let amountOfQuestions = questions.length;
    document.getElementById('questionsAmount').innerHTML = `${amountOfQuestions}
    `;
    showQuestion();
  
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('question-text').innerHTML =  question['question'];
    document.getElementById('answer_1').innerHTML =  question['answer_1'];
    document.getElementById('answer_2').innerHTML =  question['answer_2'];
    document.getElementById('answer_3').innerHTML =  question['answer_3'];
    document.getElementById('answer_4').innerHTML =  question['answer_4'];
}

function answer(clickedAnswer) {
    let rightAnswerNumber = questions[currentQuestion].right_answer;
    let rightAnswerText = "answer_" + rightAnswerNumber;
    console.log(rightAnswerText); 
    if (rightAnswerText == clickedAnswer) {
        document.getElementById(`${rightAnswerText}`).classList.add('right-answer-style');
    } else {
        document.getElementById(`${clickedAnswer}`).classList.add('wrong-answer-style');
    }
}

