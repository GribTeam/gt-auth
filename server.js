'use strict'
require('dotenv').config()
const compression = require('compression')
const express = require('express')
const app = express()

const routeDefault = require('./app/routes/routeDefault')
const routeFacebook = require('./app/routes/routeFacebook')
// const routeGoogle = require('./app/routes/routeGoogle')

app.use(compression())
app.use(routeDefault)
app.use(routeFacebook)
// app.use(routeGoogle)
app.use('/public', express.static('public'))

app.set('views', './views')
app.set('view engine', 'pug')

app.listen(
  process.env.PORT,
  process.env.HOST
)
