'use strict'

/*==================================
=           PATH: /user            =
=            privated              =
==================================*/

const express = require('express')
const router = express.Router()
const matrix = require('../../matrixes/matrix.js')

const users = require('../../users/create')

router.post('/create', (req, res) => {
  if (req.userName) {
    res.end('necesita cerrar sesion para crear un nuevo usuario')
  } else {
    users(req, function(err, name) {
      if (err) return res.json({err: err})
      res.end(`${name} has been created`)
    })
  }
})

router.route('/')
  .all((req, res, next) => {
    // User need to be authorized
    if (req.auth) next()
    res.end('not auth')
  })
  .post((req, res, next) => {
    res.end('Uploaded')// Return data.
    // Bio
    // Score
  })

module.exports = router