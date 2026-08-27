// Simple quiz about AI basics. No external libraries, no build step.

var quizData = [
  {
    question: "Which field studies how computers learn patterns from data instead of following fixed rules?",
    options: ["Machine Learning", "Web Design", "Accounting"],
    correctIndex: 0
  },
  {
    question: "What technology lets computers understand and generate human language?",
    options: ["Computer Vision", "Natural Language Processing", "Robotics"],
    correctIndex: 1
  },
  {
    question: "In what year was the term 'Artificial Intelligence' coined?",
    options: ["1956", "1997", "2012"],
    correctIndex: 0
  },
  {
    question: "Which AI milestone involved a computer beating the world chess champion?",
    options: ["Deep Blue vs Kasparov (1997)", "The Turing Test (1950)", "Dartmouth Conference (1956)"],
    correctIndex: 0
  },
  {
    question: "Which type of AI helps self-driving cars recognize street signs and pedestrians?",
    options: ["Natural Language Processing", "Computer Vision", "Robotics"],
    correctIndex: 1
  }
];

var currentQuestion = 0;
var score = 0;
var answered = false;

var questionEl = document.getElementById("quiz-question");
var optionsEl = document.getElementById("quiz-options");
var feedbackEl = document.getElementById("quiz-feedback");
var nextButton = document.getElementById("quiz-next");
var scoreEl = document.getElementById("quiz-score");

function loadQuestion() {
  answered = false;
  feedbackEl.textContent = "";
  nextButton.style.display = "none";

  var q = quizData[currentQuestion];
  questionEl.textContent = (currentQuestion + 1) + ". " + q.question;

  optionsEl.innerHTML = "";
  for (var i = 0; i < q.options.length; i++) {
    var btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = q.options[i];
    btn.setAttribute("data-index", i);
    btn.addEventListener("click", handleAnswer);
    optionsEl.appendChild(btn);
  }
}

function handleAnswer(event) {
  if (answered) return;
  answered = true;

  var chosenIndex = parseInt(event.target.getAttribute("data-index"), 10);
  var q = quizData[currentQuestion];
  var allButtons = optionsEl.querySelectorAll(".quiz-option");

  for (var i = 0; i < allButtons.length; i++) {
    var idx = parseInt(allButtons[i].getAttribute("data-index"), 10);
    if (idx === q.correctIndex) {
      allButtons[i].classList.add("correct");
    } else if (idx === chosenIndex) {
      allButtons[i].classList.add("incorrect");
    }
  }

  if (chosenIndex === q.correctIndex) {
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    feedbackEl.textContent = "Not quite. The correct answer is highlighted.";
  }

  if (currentQuestion < quizData.length - 1) {
    nextButton.textContent = "Next question";
    nextButton.style.display = "inline-block";
  } else {
    nextButton.textContent = "See final score";
    nextButton.style.display = "inline-block";
  }

  updateScore();
}

function updateScore() {
  scoreEl.textContent = "Score: " + score + " / " + quizData.length;
}

nextButton.addEventListener("click", function () {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Quiz complete!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextButton.style.display = "none";
    scoreEl.textContent = "Final score: " + score + " / " + quizData.length;
  }
});

loadQuestion();
updateScore();
