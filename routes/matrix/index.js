'use strict'

const express = require('express')
const router = express.Router()
const matrix = require('../../matrixes/matrix.js')

router.get('/:matrixName?', (req, res, next) => {
  matrix.mainMatrix.getMainGrid((err, grid) => {
    if (err) return res.json({'error': err})
    console.log('llego a la ruta matrix')
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
