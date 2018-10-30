require('dotenv').config()
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router()

const token = require('../../../util/generatorToken')
const User = require('../../../persistence/mongo/entity/users')

function generateUserToken(req, res) {   
  const accessToken = token.generateAccessToken(req.user.id);
  res.json({
    "jwt_token": accessToken
  })
}

passport.use(new LocalStrategy(
  (email, password, done) => {
    User.findOne({ 
      email: email 
    }).then((err, user) => { 
      
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect e-mail.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);

    }).catch((err) => {
      console.log('Mongo ERRO '+err)
      return done(err);
    })

  }
))

router.post('/v1/auth/local/',
    passport.authenticate('local', { failureRedirect: '/' }, (req, res) => {
      console.log(res.message)      
    })
)

module.exports = router