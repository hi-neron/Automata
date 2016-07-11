'use strict'

const Formidable = require('formidable')

function createUser (req, cb) {
  let form = new Formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) return cb(err, null)
    if (!fields.name) return cb({err: 'name of user invalid'}, null)

    cb(null, fields.name)
  })
}

module.exports = createUser