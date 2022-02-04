const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffleQuestions, currentQuestionIndex;

const questions = [
  {
    question: "Which club has won most Premier league title?",
    answers: [
      { text: "Liverpool", correct: false },
      { text: "Manchester United", correct: true },
      { text: "Arsenal", correct: false },
      { text: "Chelsea", correct: false },
    ],
  },
  {
    question: "Which english club has won more UCL?",
    answers: [
      { text: "Liverpool", correct: true },
      { text: "Manchester United", correct: false },
      { text: "Arsenal", correct: false },
      { text: "Chelsea", correct: false },
    ],
  },
  {
    question: "Which club has won most FA cup title ?",
    answers: [
      { text: "Liverpool", correct: false },
      { text: "Manchester United", correct: false },
      { text: "Arsenal", correct: true },
      { text: "Chelsea", correct: false },
    ],
  },
  {
    question: "Which club stadium has the highest capacity?",
    answers: [
      { text: "Liverpool", correct: false },
      { text: "Manchester United", correct: true },
      { text: "Arsenal", correct: false },
      { text: "Chelsea", correct: false },
    ],
  },
];

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  setNextQuestion();
});

function startGame() {
  console.log("game started");
  startButton.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
