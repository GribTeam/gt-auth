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
  (username, password, done) => {    
    User.findOne({ email: username },  (err, user) => {      
      if (err) { return done(err); }
      if (!user) { return done(null, false); }     
      if (user.password !== password) { return done(null, false); }
      return done(null, user);
    });
  }
));

router.post('/v1/auth/local', 
  passport.authenticate('local', { session: false, failureRedirect: '/?failure' }),
  generateUserToken);

module.exports = router