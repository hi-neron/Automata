'use strict'

const Mongoose = require('mongoose')
const ProtoString = {type: String, required: true}
// const Designer = mongoose.model('Designer')

const Schema = Mongoose.Schema

const CorpsePieceSchema = new Schema({
  id: ProtoString,
  designer: {
    type: Schema.ObjectId,
    ref: 'Designer',
    required: true
  },
  url: ProtoString,
  position: ProtoString
})

// Ojo agregar metodos al modelo CorpsePieceSchema.methods.

const CorpsePiece = Mongoose.model('CorpsePiece', CorpsePieceSchema)
module.exports = CorpsePiece
