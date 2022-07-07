const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(userData)
    // let transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_SMTP_ADDRESS,
    //   port: process.env.EMAIL_SMTP_PORT,
    //   secure: process.env.EMAIL_SMTP_PORT === '465',
    //   auth: {
    //     user: process.env.EMAIL_SENDER,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });
  

    // let info = await transporter.sendMail({
    //   from: `${process.env.EMAIL_DISPLAY_NAME} <${process.env.EMAIL_SENDER}>`, // sender address
    //   to: `rwilliams05@gmail.com`, // list of receivers
    //   subject: 'Welcome from the Likin Hikin Team!', // Subject line
    //   text: 'You have joined a community that is just as passionate as you are about the great outdoors! We hope you find your next great hike on our app, and look forward to your contributions as well.', // plain text body
    // });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
