'use strict'
// busca la pieza en la base de datos
// Bloquea la pieza para que nadie mas pueda manejarla
// Aplica interacciones: intercambiar y rotar
// interactua con el la rejilla
const matrix = require('../../matrixes/matrix.js').mainMatrix
// const _ = require('lodash')
// const chalk = require('chalk')

class Driver {
  constructor (socket, grid) {
    this.userId = socket.id
    this.piece = null
  }

  exchange () {
  }

  getName () {
    console.log(this.userId)
  }

  rotate () {
    console.log('was rotated')
  }

  // elige la pieza que se va a manejar
  turnOn (piece, cb) {
    this.piece = piece
    let data = {'piece': this.piece, 'userId': this.userId}
    matrix.choosePiece(data, function (err) {
      if (err) return cb(err, null)
      cb(null, {'ok': 'ok'})
    })
  }

  turnOff (cb) {
    if (this.piece) {
      matrix.closeUser(this.userId, function (err, status) {
        if (err) return cb(err, null)
        cb(null, status)
      })
    } else {
      cb({'err': '01', 'message': 'No tienen ninguna pieza'}, null)
    }
    // if(this.piece) matrix.closePiece(this.piece)
  }
}

module.exports = Driver
