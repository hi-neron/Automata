'use strict'
// modulo de conexion en tiempo real entre usuarios
// Maneja independientemente cada pieza del cadaver
const Driver = require('./driver/driver.js')

function io (io) {
  io.on('connection', function (socket) {
    var driver = new Driver(socket)
    driver.getName()
    // next line need be to change
    let name = null
    // var address = socket.handshake.address; para encontrar la ip

    socket.on('response', function (data) {
      socket.emit('welcome', {'hi': 'welcome to Automata'})
    })

    socket.on('turnOn piece', function (piece) {
      // piece:
      // id : id de la pieza
      driver.turnOn(piece, function (err) {
        if (err) return socket.emit('choosed piece', err)
        socket.emit('choosed piece', {'pieceId': piece.id, 'user': name || 'guest'})
      })
      // look for piece
      // block piece and use
    })

    socket.on('turnOff piece', function (data) {
      driver.turnOff(function (err, status) {
        if (err) return socket.emit('closed piece', err)
        socket.emit('closed piece', status)
      })
    })

    socket.on('disconnect', function () {
      driver.turnOff(function (err, status) {
        if (err) return socket.emit('closed piece', err)
        socket.emit('closed piece', status)
      })
      driver = null
      io.emit('user disconnected')
    })
  })
}

module.exports = io
