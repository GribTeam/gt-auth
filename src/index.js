'use strict'
require('dotenv').config()
const compression = require('compression')
const express = require('express')
const app = express()

const index = require('./infrastructure/routes/auth/index')
const facebook = require('./infrastructure/routes/auth/facebook')
// const google = require('./infrastructure/routes/auth/google')
// const jwt = require('./infrastructure/routes/auth/jwt')

app.use(compression())
app.use(index)
//app.use(facebook)
// app.use(google)
app.use('/public', express.static('public'))

app.set('views', './src/views')
app.set('view engine', 'pug')

app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "127.0.0.1"
)
