'use strict'

const $gridContainer = require('../grid-container')

var template = `
<div class="corpsePiece">
  <div class="position">
    {{pos}}
  </div>
  <div class="piece">
    {{id}}
  </div>
</div>
`

function renderGrid(grid) {
  let dimension = Math.sqrt(grid.grid.length)
  let size = 400
  let x = 0
  let y = 0
  let bucle = 0

  grid.grid.forEach((piece) => {
    let item = template
    .replace('{{id}}', piece.id)
    .replace('{{pos}}', piece.pos)

    let $item = $(item)
    let $grid = $gridContainer.find('.grid')

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

    $gridContainer.css({
      height: size * (dimension + 1)
    })

    $grid.css({
      height: size * dimension,
      width: size * dimension
    })

    $grid.append($item)
  })
}

module.exports = renderGrid