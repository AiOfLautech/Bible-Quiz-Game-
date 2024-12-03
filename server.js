const express = require('express');
const app = express();
const path = require('path');

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API routes for user authentication, password reset, leaderboard handling
app.get('/api/leaderboard', (req, res) => {
  res.json({ message: "Leaderboard data coming from Firebase" });
});

// Send a welcome message on root route
app.get('/', (req, res) => {
  res.send("Bible Quiz Game Backend");
});

// Start server on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
