require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendEmail(recipient) {
  if (recipient === 'recipient@email.com') {
    throw new Error('Please use your email address for testing.');
  }

  const transporterConfig = {
    host: process.env.EMAIL_SMTP_ADDRESS,
    port: process.env.EMAIL_SMTP_PORT,
    secure: process.env.EMAIL_SMTP_PORT === '465',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(transporterConfig);

  const emailInfo = {
    from: `${process.env.EMAIL_DISPLAY_NAME} <${process.env.EMAIL_SENDER}>`,
    to: `${recipient}`,
    subject: 'Hello From Nodemailer',
    text: 'Nodemailer says hello!',
  };

  try {
    const results = await transporter.sendMail(emailInfo);
    console.log('Success sending email:', results);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };
// sendEmail('mixicek@gmail.com');
