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
    subject: 'Welcome from the Likin Hikin Team!',
    text: 'You have joined a community that is just as passionate as you are about the great outdoors! We hope you find your next great hike on our app, and look forward to your contributions as well.', // plain text body,
  };

  try {
    const results = await transporter.sendMail(emailInfo);
    console.log('Success sending email:', results);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };

