'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const matrixRoutes = require('./routes/matrix.js')

const path = require('path')

app.use('/grid', matrixRoutes)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

module.exports = app
