const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://bible-quiz-game-3e67c.firebaseio.com"
});

const db = admin.firestore(); // Firestore database instance

module.exports = db; // Export Firestore instance
