require('dotenv').config()
const express = require('express')
const passport = require('passport')
const Google = require('passport-google-oauth').OAuthStrategy
const token = require('../../../util/generatorToken')
const router = express.Router()

passport.use(new Google({
  consumerKey: process.env.GOOGLE_CONSUMER_KEY,
  consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: '/v1/auth/google/autenticated'
}, (token, tokenSecret, profile, done) => {
  done(null)
})
)


router.get('/v1/auth/google',
  passport.authenticate('google')
)

router.get('/v1/auth/google/autenticated', 
  passport.authenticate('google', { session: false }),
  token.generateAccessToken
)

module.exports = router
