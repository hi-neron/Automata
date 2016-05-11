'use strict'
// const $ = require('jquery')

require('./grid-container')
const getGrid = require('./to-obtain-grid')
const renderGrid = require('./render-grid')

getGrid({}, (grid) => {
  renderGrid(grid, function () {
    require('./events/grid.js')
  })
})
