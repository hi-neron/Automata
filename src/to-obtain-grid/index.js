'use strict'

function getGrid(type, cb) {
  $.ajax('/grid',{
    data: type,
    success: function (grid, textStatus, xhr) {
      cb(grid)
    }
  })
}

module.exports = getGrid