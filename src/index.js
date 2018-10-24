'use strict'
require('dotenv').config()
var bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')

const index = require('./infrastructure/routes/v1/auth/index')
const facebook = require('./infrastructure/routes/v1/auth/facebook')
const google = require('./infrastructure/routes/v1/auth/google')
const jwt = require('./infrastructure/routes/v1/auth/jwt')

const mongoose = require('./infrastructure/persistence/mongoDB/mongo')

const app = express()
app.use(compression())
app.use(bodyParser.json())
app.use(index)
app.use(jwt)
app.use(facebook)
app.use(google)
app.use('/public', express.static('public'))

app.set('views', './src/views')
app.set('view engine', 'pug')

app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "127.0.0.1"
)
