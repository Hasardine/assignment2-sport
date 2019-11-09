var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  if (req.user) {
    res.redirect('/');
  }
  res.render('login');
})

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

// refactored from https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c
router.post('/', (req, res) => passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    session: false
}, (error, user) => {
  if (error || !user) {
    res.status(400).json({ error });
  }

  /** This is what ends up in our JWT */
  const payload = {
    username: user.username,
    expires: Date.now() + parseInt(30 * 60 * 1000),
  };

  /** assigns payload to req.user */
  req.login(payload, {session: false}, (error) => {
    if (error) {
      res.status(400).send({ error });
    }

    /** generate a signed json web token and return it in the response */
    const token = jwt.sign(JSON.stringify(payload), 'secret');

    /** assign our jwt to the cookie */
    res.cookie('jwt', jwt, { httpOnly: true, secure: true });
    res.status(200).send({ username });
  });
}))

module.exports = router;