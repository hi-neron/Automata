'use strict'

const test = require('tape')
const db = require('../db/db-main.js')
const mongoose = require('mongoose')
const start = require('../bin/www')
// const app = require('../app.js')

test.skip('should to create a designer', (t) => {
  let designer = new db.Designer({'name': 'Pedro'})

  designer.save((err) => {
    if (err) return console.log(err)
  })

  db.Designer.findOne({'name': 'Pedro'}, (err, designer) => {
    if (err) return console.log(err)
    console.log(designer)
    t.ok(designer, 'should be a data')
    t.equal(designer.name, 'Pedro', 'should have Pedro')
    t.end()
    mongoose.connection.close()
    start.close()
  })
})

test.skip('should to create a corpse piece', (t) => {
  let designer = new db.CorpsePiece({'designer': 'Pedro'})

  designer.save((err) => {
    if (err) return console.log(err)
  })

  db.Designer.findOne({'name': 'Pedro'}, (err, designer) => {
    if (err) return console.log(err)
    console.log(designer)
    t.ok(designer, 'should be a data')
    t.equal(designer.name, 'Pedro', 'should have Pedro')
    t.end()
    mongoose.connection.close()
    start.close()
  })
})
