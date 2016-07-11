'use strict'
const $ = require('jquery')

const $gridContainer = $('#gridContainer')
const $grid = $gridContainer.find('.grid')
const $mask = $gridContainer.find('.mask')

function openPiece(close, div) {
  if (!close){
    $mask.css({
      opacity: 0.70,
      zIndex: 100
    })
    div.css({zIndex: 100})
  } else {
    $mask.css({
      opacity: 0,
      zIndex: -10
    })
    div.css({zIndex: 0})
  }
}

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
    openPiece(false, this.$div)
    console.log(`${this.piece} has taken`)
    // this.$div.find('.handlebar').show('fast', function() {
    // });
  }

  visualHandleroff () {
    openPiece(true, this.$div)
    this.$handlebar.hide('500')
    this.$div.find('.handle').show('300')
  }

  close () {
    this.visualHandleroff()
    console.log(`${this.piece} has been closed`)
  }
}

module.exports = PieceToDrive

