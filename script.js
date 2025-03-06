const questions = [
    {
        question: "गेहूँ के उत्पादन में भारत का विश्व में कौनसा स्थान है ?",
        answers: [
            { text: "तीसरा", correct: false},
            { text: "पहला", correct: false},
            { text: "दूसरा", correct: true},
            { text: "चौथा", correct: false},
        ]
    },
    {
        question: "निम्नलिखित में से किस शहर में भारतीय रेलवे ने पहला कम्प्यूटरीकृत आरक्षण कार्यालय प्रारम्भ किया ?",
        answers: [
            { text: "मुम्बई", correct: false},
            { text: "नई दिल्ली", correct: true},
            { text: "चेन्नई", correct: false},
            { text: "कोलकाता", correct: false},
        ]
    },
    {
        question: "'ब्ल्यू बुक' (Blue Book) क्या है ?",
        answers: [
            { text: "राष्ट्रपति तथा प्रधानमन्त्री की सुरक्षा के लिए सरकारी निर्देशिका", correct: true},
            { text: "आर्थिक समीक्षा के लिए सरकारी रिपोर्ट", correct: false},
            { text: "पर्यावरण सुधार के लिए सरकारी निर्देशिका", correct: false},
            { text: "मछली उत्पादन में वृद्धि के लिए प्रस्तावित योजना", correct: false},
        ]
    },
    {
        question: "भारत में केन्द्र सरकार ने सार्वजनिक स्थलों पर धूम्रपान करने पर प्रतिबन्ध कब से लगा दिया है ?",
        answers: [
            { text: "21 अक्टूबर 2008 से", correct: false},
            { text: "2 नवम्बर 2008 से", correct: false},
            { text: "2 सितम्बर 2008 से", correct: false},
            { text: "2 अक्टूबर 2008 से", correct: true},
        ]
    },
    {
        question: "वर्तमान में भारतीय रिजर्व बैंक के गवर्नर कौन हैं ?",
        answers: [
            { text: "शक्तिकांत दास", correct: false},
            { text: "सी० रंगराजन", correct: false},
            { text: "संजय मल्होत्रा", correct: true},
            { text: "उर्जित पटेल", correct: false},
        ]
    },
    {
        question: "नोबेल पुरस्कार किस विषय में नहीं दिया जाता है ?",
        answers: [
            { text: "गणित (Mathematics)", correct: true},
            { text: "चिकित्सालय (Medicine)", correct: false},
            { text: "भौतिकी (Physics)", correct: false},
            { text: "रसायन (Chemistry)", correct: false},
        ]
    },
    {
        question: "भारत में टेलीविजन की शुरूआत कब हुई?",
        answers: [
            { text: "1976 में", correct: false},
            { text: "1957 में", correct: false},
            { text: "1959 में", correct: true},
            { text: "1978 में", correct: false},
        ]
    },
    {
        question: "'गाइडिंग सोल्स' नाम की पुस्तक किसके द्वारा लिखी गई है?",
        answers: [
            { text: "ए० पी० जे० अब्दुल कलाम", correct: true},
            { text: "पीटर कैरी", correct: false},
            { text: "अनिता देसाई", correct: false},
            { text: "अमिताभ घोष", correct: false},
        ]
    },
    {
        question: "मानव संसाधन एवं विकास मंत्रालय द्वारा किसके जन्म दिवस (11 नवम्बर) को राष्ट्रीय शिक्षा दिवस के रूप में मनाने की घोषणा की है ?",
        answers: [
            { text: "सर्वपल्ली राधाकृष्णन", correct: false},
            { text: "बाल गंगाधर तिलक", correct: false},
            { text: "मौलाना अबुल कलाम आजाद", correct: true},
            { text: "जाकिर हुसैन", correct: false},
        ]
    },
    {
        question: "पंचतंत्र के लेखक थे",
        answers: [
            { text: "विष्णु शर्मा", correct: true},
            { text: "पतंजलि", correct: false},
            { text: "रघुवंश", correct: false},
            { text: "अश्वघोष", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 😊`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();