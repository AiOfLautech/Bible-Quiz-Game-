function registerUser(email, password, username) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Add user to Firestore
      db.collection('users').doc(user.uid).set({
        email: email,
        username: username,
        score: 0
      });
      console.log('User registered');
    })
    .catch((error) => console.error("Error registering user:", error));
}

function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('User logged in:', userCredential.user);
      // Load game or leaderboard
    })
    .catch(error => console.error("Error logging in:", error));
}

function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => console.log("Password reset email sent."))
    .catch(error => console.error("Error resetting password:", error));
      }
