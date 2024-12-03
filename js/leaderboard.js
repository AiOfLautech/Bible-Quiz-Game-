function saveScoreToLeaderboard(username, score) {
  db.collection("leaderboard").add({
    username: username,
    score: score,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
    .then(() => {
      console.log("Score added to leaderboard.");
    })
    .catch((error) => {
      console.error("Error adding score:", error.message);
    });
}

function getLeaderboard() {
  db.collection("leaderboard")
    .orderBy("score", "desc")
    .limit(10) // Top 10 scores
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    })
    .catch((error) => {
      console.error("Error fetching leaderboard:", error.message);
    });
}
