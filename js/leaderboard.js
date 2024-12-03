const db = firebase.firestore();

function saveLeaderboard(userId, score) {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  db.collection("leaderboard").add({
    userId: userId,
    score: score,
    timestamp: timestamp,
  });
}

function getLeaderboard() {
  db.collection("leaderboard")
    .orderBy("score", "desc")
    .limit(10)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
      });
    })
    .catch(error => {
      console.log("Error getting leaderboard: ", error);
    });
}
