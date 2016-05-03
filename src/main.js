'use strict'
global.$ = require('jquery')
global.jQuery = global.$

// const io = require('socket.io-client')
// const socket = io()

const getGrid = require('./to-obtain-grid')
const renderGrid = require('./render-grids')

getGrid({}, (grid) => {
  renderGrid(grid)
})

// socket.on('news', (data) => {
//   console.log(data)
// })
