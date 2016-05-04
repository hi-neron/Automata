'use strict'
global.$ = require('jquery')
global.jQuery = global.$

const $gridContainer = require('./grid-container')
// const io = require('socket.io-client')
// const socket = io()

const getGrid = require('./to-obtain-grid')
const renderGrid = require('./render-grids')

getGrid({}, (grid) => {
  renderGrid(grid)
})

$(window).on('resize orientationChange', function(event) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    $gridContainer.css({
      height: h
    })
});
// socket.on('news', (data) => {
//   console.log(data)
// })
