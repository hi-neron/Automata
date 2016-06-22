'use strict'

const $ = require('jquery')
const $gridContainer = require('../grid-container')

var template = `
<div class="corpsePiece" style="background-color:{{id}}" id-piece="{{id}}">
  <div class="handle">
    <div class="left"></div>
    <div class="right"></div>
  </div>
  <div class="handlebar">
    <a class="closeHandlebar">close</a>
    <a class="rotate">rotate</a>
    <div class="move"></div>
  </div>
  <div class="position">
    {{pos}}
  </div>
</div>
`

function renderGrid (grid, cb) {
  let dimension = Math.sqrt(grid.grid.length)
  let $grid = $gridContainer.find('.grid')
  let $blankSpace = $gridContainer.find('.blankSpace')
  let size = 340
  let x = 0
  let y = 0
  let bucle = 0

  grid.grid.forEach((piece) => {
    let item = template
    .replace(/{{id}}/g, piece.id)
    .replace('{{pos}}', '') // piece.pos

    let $item = $(item)
    let $handlebar = $item.find('.handlebar')
    $handlebar.hide()
    // let $corpsePiece = $item.find('.piece')
    // $corpsePiece.data('id', piece.id)

    $item.css({
      width: size,
      height: size,
      left: x,
      top: y
    })

    x = x + size
    bucle = bucle + 1

    if (bucle >= dimension) {
      y = y + size
      x = 0
      bucle = 0
    }
    $grid.append($item)
  })
    // center in the viewport
  let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  $gridContainer.css({
    height: h
  })

  let hGrid = size * dimension
  let wGrid = size * dimension

  $blankSpace.css({
    height: hGrid - 40,
    width: wGrid - 30
  })

  $grid.css({
    height: hGrid,
    width: wGrid
  })
  cb('ok')
  // $gridContainer.scrollTop( 500 )
  // $gridContainer.scrollLeft( 500 )
}

module.exports = renderGrid
