'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const protoString = {type: String, required: true}

const designerSchema = new Schema({
  name: protoString
})

const Designer = mongoose.model('Designer', designerSchema)
module.exports = Designer
