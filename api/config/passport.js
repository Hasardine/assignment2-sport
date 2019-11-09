const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const UserModel = require('../models/user');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = (username, password, done) => {
        getUserByUsername(username, (user) => {
            if (user == null) {
                console.log('USER NOT FOUND');
                return done(null, false, {message: 'No user of that name'});
            }
            if (user.hash == crypto.pbkdf2Sync(password, user.salt,30000,32,'sha512').toString('hex')) {
                console.log('SUCCESS');
                return done(null, user);
            } else {
                console.log('INCORRECT PASSWORD');
                return done(null, false, {message: 'Incorrect password'});
            }
        });
        

    }
    passport.use(new LocalStrategy({usernameField: 'username'},authenticateUser));

    // code from https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c
    passport.use(new JWTStrategy({
        jwtFromRequest: req => req.cookies.jwt,
        secretOrKey: secret,
      },
      (jwtPayload, done) => {
        if (Date.now() > jwtPayload.expires) {
          return done('jwt expired');
        }
        return done(null, jwtPayload);
      }
    ));
}

module.exports = initialize;