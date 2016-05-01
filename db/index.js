'use strict'

const Mongoose = require('mongoose')
const Designer = require('./models/designer.js')
const CorpsePiece = require('./models/corpse_piece.js')

Mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/Automata')

module.exports = {
  Designer: Designer,
  CorpsePiece: CorpsePiece
}
