// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBBEdqprMjK8-8mAIi4TH8bFLe00VJsPgk", // Replace with your Web API Key
  projectId: "bible-quiz-game-3e67c", // Replace with your Project ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Global Variables
let currentUser;
let currentScore = 0;
let currentQuestionIndex = 0;
let questions = [];

// DOM Elements
const questionContainer = document.getElementById("question-container");
const optionsList = document.getElementById("options");
const scoreBoard = document.getElementById("score-board");
const userNameElement = document.getElementById("user-name");

// User Registration
function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      currentUser = userCredential.user;
      alert("Registration successful!");
    })
    .catch(error => alert(error.message));
}

// User Login
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      currentUser = userCredential.user;
      document.getElementById("login-section").style.display = "none";
      document.getElementById("game-section").style.display = "block";
      userNameElement.textContent = currentUser.email;
      loadQuestions();
    })
    .catch(error => alert(error.message));
}

// Reset Password
function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => alert("Password reset email sent."))
    .catch(error => alert(error.message));
}

// Load Questions
function loadQuestions() {
  questions = shuffle([
    { question: "What is the first book of the Bible?", options: ["Genesis", "Exodus", "Leviticus"], answer: "Genesis" },
    { question: "Who led the Israelites out of Egypt?", options: ["Moses", "Abraham", "David"], answer: "Moses" },
    // Add more questions here...
  ]);
  showQuestion();
}

// Shuffle Questions
function shuffle(array) {
  let currentIndex = array.length, randomIndex, tempValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

// Display Question
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

// Check Answer
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
    saveToLeaderboard();
  }
}

// Display Score
function displayScore() {
  scoreBoard.textContent = `Your score: ${currentScore} / ${questions.length}`;
}

// Save to Leaderboard
function saveToLeaderboard() {
  if (currentUser) {
    db.collection("leaderboard").add({
      user: currentUser.email,
      score: currentScore,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
}

// Event Handlers
function handleRegister() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  registerUser(email, password);
}

function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  loginUser(email, password);
}

function handlePasswordReset() {
  const email = document.getElementById("resetEmail").value;
  resetPassword(email);
  }
