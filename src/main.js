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

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
