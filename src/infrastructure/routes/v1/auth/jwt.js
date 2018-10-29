require('dotenv').config()
const express = require('express')
const passport = require('passport')
const Jwt = require('passport-jwt')
const router = express.Router()

const User = require('../../../persistence/mongo/entity/users')

passport.use(new Jwt.Strategy( {
  jwtFromRequest: Jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN_SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE 
}, (payload, done) => {
  User.find({ jwt: parseInt(payload.sub) })
  .then((user) => {
    return done(null, user, payload)
  })  
  return done()
}))

router.get('/v1/auth/',
  passport.authenticate(['jwt'], {session: false}), (req,res) => {
    res.send('Secure response from user.');
  }
)

router.post('/v1/auth/validate_token/', (req, res) => {
  jwt.verify(
    req.body.token, 
    process.env.JWT_SECRET, 
    (err) => {
      if (err) {
        res.status(401).json({});
      } else {
        res.json({});
      }
    }
  );
})

module.exports = router
