'use strict'

const test = require('tape')
const request = require('supertest')
const start = require('../bin/www')
const app = require('../app.js')
const mongoose = require('mongoose')

test('return a matrix', (t) => {
  request(app)
    .get('/grid')
    .expect(200)
    .end((err, res) => {
      if (err) console.log(err)
      console.log(res.body)
      t.equal(typeof res.body, 'object', 'should be an array')
      t.equal(res.body.length, 9, 'should be an intial size nine')
      t.ok(res.body.grid, 'should have an item named grid')
      start.close()
      mongoose.connection.close()
      t.end()
    })
})
