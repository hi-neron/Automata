'use strict'
const fs = require('fs-extra')
const path = require('path')
const corpsePieces = require('../db').CorpsePiece

class Matrix {
  constructor () {
    // let template = {"grid":[]}
    this.pathFile = path.join(__dirname, 'matrixBackUp.json')
    this.grid = null
    this.template = []
  }

  buildGrid (cb) {
    // si el backup de matriz principal, no existe, se lo crea.
    fs.ensureFile(this.pathFile, (err) => {
      if (err) return cb(err, null)
      // lee el archivo backup que contiene la matriz principal
      fs.readJson(this.pathFile, (err, matriz) => {
        // Si los datos en el archivo no se pueden leer, se crea otro
        if (err || !matriz || !matriz.grid.length) {
          corpsePieces.find({}, (err, data) => {
            if (err) return cb(err, null)
            let dimension = 3
            // Buscamos un numero impar donde entren todas las piezas del
            // cadaver
            while (dimension * dimension / data.length + 1 < 1) {
              dimension = dimension + 2
            }

            for (let y = Math.round((dimension / 2) * -1); y < dimension / 2; y++) {
              for (let x = Math.round((dimension / 2) * -1); x < dimension / 2; x++) {
                this.template.push({'pos': [x, y], 'piece': 'none'})
              }
            }
            cb(null, this.template)
          })
        } else {
          cb(null, matriz)
        }
      })
    })
  }

  getMainGrid (cb) {
    if (!this.grid) {
      this.buildGrid((err, grid) => {
        if (err) return cb(err, null)
        cb(null, grid)
      })
    } else {
      cb(this.grid)
    }
  }

  updateGrid () {
  }
}

const mainMatrix = new Matrix()

module.exports = mainMatrix
