// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);

let currentUser;
let currentScore = 0;
let currentQuestionIndex = 0;
let questions = []; // Store shuffled questions

const questionContainer = document.getElementById("question-container");
const optionsList = document.getElementById("options");
const scoreBoard = document.getElementById("score-board");
const userNameElement = document.getElementById("user-name");

document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("next-btn").addEventListener("click", nextQuestion);

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(username, password)
    .then(userCredential => {
      currentUser = userCredential.user;
      document.getElementById("login-section").style.display = "none";
      document.getElementById("game-section").style.display = "block";
      userNameElement.textContent = username;
      loadQuestions();
    })
    .catch(error => {
      alert(error.message);
    });
}

function loadQuestions() {
  // Fetch questions from Firebase or locally
  questions = shuffle([
    { question: "What is the first book of the Bible?", options: ["Genesis", "Exodus", "Leviticus"], answer: "Genesis" },
    { question: "Who led the Israelites out of Egypt?", options: ["Moses", "Abraham", "David"], answer: "Moses" },
    // ... add more questions here
  ]);
  showQuestion();
}

function shuffle(array) {
  let currentIndex = array.length, randomIndex, temporaryValue;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").textContent = currentQuestion.question;
  
  optionsList.innerHTML = "";
  currentQuestion.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => checkAnswer(option));
    optionsList.appendChild(li);
  });
}

function checkAnswer(selectedOption) {
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
    currentScore++;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    displayScore();
  }
}

function displayScore() {
  scoreBoard.textContent = `Your score is: ${currentScore} / ${questions.length}`;
}
