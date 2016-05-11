'use strict'

const io = require('socket.io-client')
const socket = io('http://localhost:3000')

const PieceToDrive = require('../piece-driver')
var pieceDriving
// pieceActions:
// $grid : objeto DOM que contiene todas las piezas
// pieceActions: acciones para las peizas que contiene $grid

const drive = {
  turnOn: function (piece) {
    socket.emit('turnOn piece', {'id': piece})
    // actions.choosed('e')
    // console.log($grid)
  },
  turnOff: function () {
    socket.emit('turnOff piece', {})
  },
  rotate: function () {
  },
  move: function () {
  }
}

// información de la pieza que solicito
// devuelve error si ya esta manejando una pieza
// Devuelve la pieza si la puede manejar
socket.on('choosed piece', function (data) {
  // data: {
  // pieceId: ide de la pieza
  // user: name del usuario
  // }
  if (data.error) return console.log(data)
  pieceDriving = new PieceToDrive(data)
})

// Cierra la pieza que se esta manejando
// devuelve error si no hay alguna
// desactiva el manejador visual
socket.on('closed piece', function (response) {
  if (response.status == '200'){
    pieceDriving.close()
  } else {
    console.log(response)
  }
})

socket.on('rotate', function (){
})

socket.on('move', function (){
})

module.exports = drive
