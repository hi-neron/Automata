'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
Mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/Automata')

const ProtoString = {type: String, required: true}

const designerSchema = new Schema({
  idFb: {
    type: String,
    required: true,
    unique: true
  },
  name: ProtoString,
  alias: String
})

const corpsePieceSchema = new Schema({
  id: ProtoString,
  designer: {
    type: Schema.ObjectId,
    ref: 'Designer',
    required: true
  },
  url: ProtoString,
  position: ProtoString
})

const CorpsePiece = Mongoose.model('CorpsePiece', corpsePieceSchema)
const Designer = Mongoose.model('Designer', designerSchema)


module.exports = {
  Designer: Designer,
  CorpsePiece: CorpsePiece
}
