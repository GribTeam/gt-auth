require('dotenv').config()
const express = require('express')
const passport = require('passport')
const Jwt = require('passport-jwt')
const router = express.Router()

passport.use(new Jwt.Strategy( {
  jwtFromRequest: Jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN_SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE 
}, (payload, done) => {
  //const user = users.getUserById(parseInt(payload.sub))
  //if (user) {
      //return done(null, user, payload)
  //}
  return done()
}))

router.get('/v1/auth/',
  passport.authenticate(['jwt'], {session: false}), (req,res) => {
    res.send('Secure response from user.');
  }
)

module.exports = router
