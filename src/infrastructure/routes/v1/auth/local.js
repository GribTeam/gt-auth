require('dotenv').config()
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router()
const User = require('../../../persistence/mongo/entity/users')

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ userName: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
))

router.post('/v1/auth/local/',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/v1/auth/local/'        
    })
)

module.exports = router