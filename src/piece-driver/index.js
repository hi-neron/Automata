'use strict'
const $ = require('jquery')

const $gridContainer = $('#gridContainer')
const $grid = $gridContainer.find('.grid')

class PieceToDrive {
  constructor (data) {
  // data: {
  // pieceId: id de la pieza
  // user: name del usuario
  // }
    this.piece = data.pieceId
    this.$div = $grid.find(`.corpsePiece[id-piece="${this.piece}"]`)
    this.$handlebar = this.$div.find('.handlebar')
    this.visualHandlerOn()
  }
  // Activa los manejadores visuales
  visualHandlerOn () {
    this.$handlebar.show('500')
    this.$div.find('.handle').hide('300')
    console.log(`${this.piece} has taken`)
    console.log(this.$div)
    // this.$div.find('.handlebar').show('fast', function() {
    // });
  }

  visualHandleroff () {
    this.$handlebar.hide('500')
    this.$div.find('.handle').show('300')
  }

  close () {
    this.visualHandleroff()
    console.log(`${this.piece} has been closed`)
  }
}

module.exports = PieceToDrive

