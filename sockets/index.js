'use strict'
// modulo de conexion en tiempo real entre usuarios
// Maneja independientemente cada pieza del cadaver
const Driver = require('./driver/driver.js')

function io (io){
 io.on('connection', function (socket) {
    var driver = new Driver('Pepe')

    socket.on('response', function(data){
      socket.emit('welcome', {'hi': 'welcome to Automata'})
    })

    socket.on('turnOn piece', function(piece) {
      driver.turnOn(piece)
      // look for piece
      // block piece and use
    });

    socket.on('disconnect', function(){
      driver.turnOf()
      driver = null
      io.emit('user disconnected')
    })
  })
}

module.exports = io
