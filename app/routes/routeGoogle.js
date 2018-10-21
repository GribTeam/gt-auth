const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const router = express.Router()

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.

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
