require('dotenv').config()
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router()

const User = require('../../../persistence/mongo/entity/users')

function generateUserToken(req, res) {   
  const accessToken = token.generateAccessToken(req.user.id);
  res.json({
    "jwt_token": accessToken
  })
}

passport.use(new LocalStrategy(
  (email, password, done) => {

    console.log('------>',email,password)

    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect e-mail.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
))

router.post('/v1/auth/local/',
    passport.authenticate('local', { 
      successRedirect: '/v1/auth/local/autenticated',
      failureRedirect: '/'        
    })
)

router.get('/v1/auth/local/autenticated', 
  passport.authenticate('local', { session: false }),
  generateUserToken
)

module.exports = router