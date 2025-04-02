const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// This endpoint replaces the Flask send_fake_email route
app.post('/send_fake_email', (req, res) => {
  const { email, password } = req.body;
  console.log(`Sending fake email from ${email} with password ${password}`);
  // Implement your email sending logic here.
  res.json({ message: `Test email sent successfully from ${email}.` });
});

// This endpoint replaces the Flask run_email_scimmer route
app.post('/run_email_scimmer', (req, res) => {
  const { email, password, num_emails, order_choice } = req.body;
  console.log(`Running email scimmer for ${email}`);
  console.log(`Parameters: num_emails=${num_emails}, order_choice=${order_choice}`);
  // Implement your email scanning logic here.
  res.json({ message: `Email scimmer completed for ${email}: checked ${num_emails} emails in ${order_choice} order.` });
});

// Export the Express app as an HTTPS Cloud Function with the name "api"
exports.api = functions.https.onRequest(app);