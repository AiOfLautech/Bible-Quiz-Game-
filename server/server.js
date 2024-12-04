const express = require('express');
const app = express();
const path = require('path');
const firebaseAdmin = require('./firebaseAdmin');
const { sendLoginNotification, exportUsersToPDF } = require('./routes');
const routes = require('./routes');
app.use('/api', routes);
// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes for leaderboard and notifications
app.get('/api/leaderboard', (req, res) => {
  // Fetch leaderboard data from Firebase
  firebaseAdmin.firestore().collection('users').orderBy('score', 'desc').limit(10).get()
    .then(snapshot => {
      let leaderboard = [];
      snapshot.forEach(doc => leaderboard.push(doc.data()));
      res.json(leaderboard);
    });
});

app.post('/api/notify-login', sendLoginNotification);
app.get('/api/export-pdf', exportUsersToPDF);

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
