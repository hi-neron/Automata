'use strict'

const io = require('socket.io-client')
const socket = io('http://localhost:3000')

function turnOn(piece){
  console.log(piece)
  socket.emit('turnOn piece', {'id': piece})
}

module.exports = {
  'turnOn': turnOn
}

