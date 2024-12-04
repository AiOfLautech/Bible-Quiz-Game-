const firebaseAdmin = require('./firebaseAdmin');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

function sendLoginNotification(req, res) {
  const { username, email } = req.body;
  // Logic to send email notification
  res.json({ message: 'Notification sent' });
}

function exportUsersToPDF(req, res) {
  let doc = new PDFDocument();
  let users = [];

  firebaseAdmin.firestore().collection('users').get()
    .then(snapshot => {
      snapshot.forEach(doc => users.push(doc.data()));

      doc.text('User List');
      users.forEach(user => doc.text(`Username: ${user.username}, Email: ${user.email}, Score: ${user.score}`));

      res.setHeader('Content-disposition', 'attachment; filename=users.pdf');
      res.setHeader('Content-type', 'application/pdf');
      doc.pipe(res);
      doc.end();
    });
}

module.exports = { sendLoginNotification, exportUsersToPDF };
