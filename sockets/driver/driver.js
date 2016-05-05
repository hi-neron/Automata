'use strict'
// busca la pieza en la base de datos
// Bloquea la pieza para que nadie mas pueda manejarla
// Aplica interacciones: intercambiar y rotar
// interactua con el la rejilla
const matrix = require('../../matrixes/matrix.js').mainMatrix
const _ = require('lodash')

class Driver {
  constructor(name, grid){
    this.name = name
    this.piece = null
  }

  turnOn (piece) {
    this.piece = piece
    matrix.lockPiece(this.piece)
  }

  turnOf () {
    if(this.piece) matrix.unLockPiece(this.piece)
  }
}

module.exports = Driver