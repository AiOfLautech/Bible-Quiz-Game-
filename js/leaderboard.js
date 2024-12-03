// Display Leaderboard
function fetchLeaderboard() {
  const leaderboardList = document.getElementById("leaderboard");
  leaderboardList.innerHTML = ""; // Clear previous leaderboard

  db.collection("leaderboard")
    .orderBy("score", "desc")
    .limit(10) // Top 10 players
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.user}: ${data.score}`;
        leaderboardList.appendChild(li);
      });
    })
    .catch(error => console.error("Error fetching leaderboard:", error));
}

// Initialize Leaderboard
document.getElementById("view-leaderboard-btn").addEventListener("click", fetchLeaderboard);
