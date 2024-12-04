const express = require('express');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const db = require('./firebaseAdmin'); // Import Firestore instance

const router = express.Router();

// Endpoint to send login notification to admin
router.post('/notify-login', async (req, res) => {
  const { username, email } = req.body;

  // Configure the mail transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'babalolahephzibah2@gmail.com',
      pass: 'Hephzibah' // Replace with your email credentials
    }
  });

  // Configure the email content
  const mailOptions = {
    from: 'babalolahephzibah2@gmail.com',
    to: 'hephzibarsamuel@gmail.com', // Replace with admin's email
    subject: 'New User Login Notification',
    text: `User ${username} with email ${email} just logged in.`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Notification sent to admin.');
  } catch (error) {
    console.error('Error sending email notification:', error);
    res.status(500).send('Failed to send notification.');
  }
});

// Endpoint to export user data as a PDF
router.get('/export-users', async (req, res) => {
  try {
    const users = [];
    const snapshot = await db.collection('users').get();

    snapshot.forEach((doc) => {
      users.push(doc.data());
    });

    // Create a new PDF document
    const doc = new PDFDocument();

    res.setHeader('Content-disposition', 'attachment; filename=users.pdf');
    res.setHeader('Content-type', 'application/pdf');

    // Add user data to the PDF
    doc.text('User List\n');
    users.forEach((user, index) => {
      doc.text(
        `${index + 1}. Username: ${user.username}, Email: ${user.email}, Score: ${user.score}`
      );
    });

    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error exporting users:', error);
    res.status(500).send('Failed to export user data.');
  }
});

module.exports = router;
