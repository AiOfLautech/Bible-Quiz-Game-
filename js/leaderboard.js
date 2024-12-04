function loadLeaderboard() {
  db.collection('users').orderBy('score', 'desc').limit(10).get().then(querySnapshot => {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = '';

    querySnapshot.forEach(doc => {
      let data = doc.data();
      let li = document.createElement('li');
      li.textContent = `${data.username}: ${data.score}`;
      leaderboard.appendChild(li);
    });
  });
}

function claimPrize() {
  // Implement prize claim logic
  alert('Prize claimed if you are on top!');
  }
