require('dotenv').config()
const express = require('express')
const passport = require('passport')
const Facebook = require('passport-facebook').Strategy
const router = express.Router()

const token = require('../../../util/generatorToken')
const User = require('../../../persistence/mongo/entity/users')

function generateUserToken(req, res) {   
  const accessToken = token.generateAccessToken(req.user.id);
  res.json({
    "token": accessToken
  })
}

passport.use(
  new Facebook({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost/v1/auth/facebook/autenticated'
  }, (accessToken, refreshToken, profile, done) => {
    
    User.findOneAndUpdate({ 
      facebook_id: profile.id 
   },{
     "name" : profile.displayName,
     //"email": "teste@teste", //profile.emails[0].value,
     "facebook_id": profile.id
   },{
     upsert: true,
     new: true
   }).then((user) => {
     done(null, user)
   }).catch((err) => {
     console.log('Mongo ERROR:', err)
     done(null)
   })
   
  }))

router.get('/v1/auth/facebook',  
  passport.authenticate('facebook', { session: false })
)

router.get('/v1/auth/facebook/autenticated', 
  passport.authenticate('facebook', { session: false }),
  generateUserToken
)
module.exports = router
