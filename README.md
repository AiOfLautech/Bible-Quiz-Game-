# Bible Quiz Game

This is a Bible Quiz Game where players answer Bible-related questions to score points. The game includes multiple levels, a leaderboard, and a login system using Firebase.

## Features:
- Glowing UI with emoji support
- 20 questions per level
- Login system with email/password (via Firebase)
- Leaderboard displaying top players
- Offline support using service workers
- Cumulative scores for the leaderboard (weekly)
- Prizes for top scorers

## Setup

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/bible-quiz-game.git
cd bible-quiz-game

---

### **11. Running the Game Offline (Service Workers)**

The service worker file (`service-worker.js`) will cache your assets for offline use. It's important that the `service-worker.js` file is correctly registered to ensure offline functionality. You can add a `registerServiceWorker.js` file to handle service worker registration.

**`registerServiceWorker.js`**:

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}
