'use strict'

const express = require('express')
const router = express.Router()
const gridServer = require('../../matrixes/matrix.js')

router.get('/', (req, res, next) => {
  gridServer.getMainGrid((err, grid) => {
    if (err) return res.json({'error': err})
    res.json(grid)
  })
})

// 'Privated'

router.route('/:dir')
  .all((req, res, next) => {
    next()
  })
// intercambiar

module.exports = router
