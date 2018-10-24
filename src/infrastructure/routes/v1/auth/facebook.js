require('dotenv').config()
const express = require('express')
const passport = require('passport')
const Facebook = require('passport-facebook').Strategy
const router = express.Router()

const token = require('../../../util/generatorToken')
const User = require('../../../persistence/mongoDB/entity/users')

passport.use(
  new Facebook({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/v1/auth/facebook/autenticated'
  }, (accessToken, refreshToken, profile, done) => {
    done(null)
     User.findOrCreate({ facebook_id: profile.id }, function(err, user) {
     if (err) { return done(err) }
     done(null, user)
    })
  }
))

router.get('/v1/auth/facebook',  
  passport.authenticate('facebook')
)

router.get('/v1/auth/facebook/autenticated', 
  passport.authenticate('facebook', { session: false }),
  token.generateAccessToken
)
module.exports = router
