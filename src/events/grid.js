'use strict'
const $ = require('jquery')
const $gridContainer = $('#gridContainer')
const $grid = $gridContainer.find('.grid')

const drive = require('../sockets')

$grid.on('click', 'div.handle', function (ev) {
  let $this = $(this)
  let $piece = $this.closest('.corpsePiece')
  let id = $piece.attr('id-piece')
  drive.turnOn(id)
})

$grid.on('click', 'a.closeHandlebar', function (ev) {
  ev.preventDefault()
  drive.turnOff()
})
