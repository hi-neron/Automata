'use strict'

$(function () {
  const $gridContainer = require('../grid-container')
  const $grid = $gridContainer.find('.grid')
  const drive = require('../sockets')

  $grid.on('click', 'div.handlebar', function(er){
    let $this = $(this)
    let $piece = $this.closest('.corpsePiece').find('.piece')
    let id = $piece.data('id')
    drive.turnOn(id)
  })

  module.exports = $grid
})





//const $grid = $gridContainer.find('.grid')

// $grid.on('click', 'div.corpsePiece', function (ev) {
//   console.log('click aqui')
// })
