'use strict'
global.$ = require('jquery')
global.jQuery = global.$

const $gridContainer = require('./grid-container')
require('./sockets')


const getGrid = require('./to-obtain-grid')
const renderGrid = require('./render-grids')

getGrid({}, (grid) => {
  renderGrid(grid)
})
