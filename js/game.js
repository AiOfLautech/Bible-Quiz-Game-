let currentScore = 0;
let currentLevel = 1;
let questions = {
  1: [
    { question: "What is the first book of the Bible?", options: ["Genesis", "Exodus", "Leviticus"], answer: "Genesis" },
    // Add more questions for Level 1
  ],
  2: [
    { question: "Who led the Israelites out of Egypt?", options: ["Moses", "Abraham", "David"], answer: "Moses" },
    // Add more questions for Level 2
  ]
  // Add Levels 3-6
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestions(level) {
  let levelQuestions = questions[level];
  shuffle(levelQuestions);
  displayQuestion(levelQuestions[0]);
}

function displayQuestion(question) {
  document.getElementById("question").innerText = question.question;
  let optionsList = document.getElementById("options");
  optionsList.innerHTML = '';
  
  question.options.forEach(option => {
    let li = document.createElement('li');
    li.innerText = option;
    li.onclick = () => checkAnswer(option, question.answer);
    optionsList.appendChild(li);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) currentScore++;
  
  // Logic to move to next question or display score
  if (currentScore >= 15) {
    currentLevel++;
    if (currentLevel <= 6) {
      loadQuestions(currentLevel);
    } else {
      displayFinalScore();
    }
  } else {
    displayFinalScore();
  }
}

function displayFinalScore() {
  document.getElementById("score").innerText = `Your score: ${currentScore}`;
  // Save score to Firestore and update leaderboard
  db.collection('users').doc(auth.currentUser.uid).update({ score: currentScore });
    }
