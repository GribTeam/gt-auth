const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const router = express.Router()

passport.use(new GoogleStrategy({
  consumerKey: process.env.GOOGLE_CONSUMER_KEY,
  consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: '/auth/google/autenticated'
}, (token, tokenSecret, profile, done) => {
  done(null)
})
)


router.get('/auth/google',
  passport.authenticate('google')
)

router.get('/auth/google/autenticated',
  (req, res) => {

  }
)

module.exports = router
