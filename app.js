'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const matrix = require('./matrixes/matrix.js').mainMatrix

const matrixRoutes = require('./routes/matrix')

// app.use((req, res, next) => {
//   req.auth = true
//   console.log(`door is open? ${req.auth}`)
//   next()
// })

app.use('/grid', matrixRoutes)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))

module.exports = app
