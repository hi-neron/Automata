'use strict'

module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('conected user')
    io.on('move', (data) => {
      console.log(data)
    })
  })
}
