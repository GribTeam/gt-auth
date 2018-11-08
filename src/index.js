'use strict'
require('dotenv').config()
const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const passport = require('passport')

const mongoose = require('./infrastructure/persistence/mongo/mongo')
const index = require('./infrastructure/routes/v1/auth/index')
const facebook = require('./infrastructure/routes/v1/auth/facebook')
const google = require('./infrastructure/routes/v1/auth/google')
const jwt = require('./infrastructure/routes/v1/auth/jwt')
const local = require('./infrastructure/routes/v1/auth/local')

const app = express()
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(index)
app.use(local)
app.use(jwt)
app.use(facebook)
//app.use(google)
app.use('/public', express.static('public'))

app.set('views', './src/views')
app.set('view engine', 'pug')

app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "127.0.0.1"
)
