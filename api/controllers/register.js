const UserModel = require('../models/user');
const crypto = require('crypto');

module.exports.loadRegister = function (req,res) {
    if (req.user) {
      res.redirect('/');
    }
    res.render('register');
}

module.exports.register = function (req,res) {
    var newUser = new UserModel({
        username: req.body.username
      })
      newUser.salt= crypto.randomBytes(10).toString('hex'),
      newUser.hash= crypto.pbkdf2Sync(req.body.password, newUser.salt,30000,32,'sha512').toString('hex')
      newUser.save((err,user) => {
        if (err) { console.log(err);} else {
          console.log(`New user of name ${newUser.username} has been added to the DB`);
        }
      })
      res.redirect('/login');
}