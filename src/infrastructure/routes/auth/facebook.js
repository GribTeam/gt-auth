require('dotenv').config()

const express = require('express')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const router = express.Router()

passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/autenticated'
  }, (accessToken, refreshToken, profile, done) => {
    done(null)
    // User.findOrCreate({ facebook_id: profile.id }, function(err, user) {
    // if (err) { return done(err) }
    // done(null, user)
    // })
  }
  ))

router.get('/auth/facebook',
  passport.authenticate('facebook')
)

router.get('/auth/facebook/autenticated',
  (req, res) => {
    res.send('Facebook autenticado.')
  }
)

module.exports = router
