const firebaseConfig = {
  apiKey: "AIzaSyBBEdqprMjK8-8mAIi4TH8bFLe00VJsPgk",
  authDomain: "bible-quiz-game-3e67c.firebaseapp.com",
  projectId: "bible-quiz-game-3e67c",
  storageBucket: "bible-quiz-game-3e67c.appspot.com",
  messagingSenderId: "501651012341",
  appId: "1:501651012341:web:2bfaddab8cb5e8de9da3bc",
  measurementId: "G-BFXDT7YEKZ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
