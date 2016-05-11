'use strict'
const fs = require('fs-extra')
const jsonfile = require('jsonfile')
const path = require('path')
const corpsePieces = require('../db').CorpsePiece
const _ = require('lodash')

const rsp = require('../responses')

class Matrix {
  constructor (name) {
    let gridName = name || 'main'
    this.dirName = `${gridName}.json`
    this.pathFile = path.join(__dirname, 'matrixDir', this.dirName)
    this.template = []
    this.grid = null
    this.usersDriving = []

    this.buildGrid((err, grid) => {
      if (err) console.log(err)
      this.grid = grid
    })
  }

  makeFile (cb) {
    let grid = {'grid': this.template}
    jsonfile.writeFile(this.pathFile, grid, {'spaces': 2}, (err) => {
      if (err) return cb('No se puede crear el archivo')
      cb(null, this.grid)
    })
  }

  buildGrid (cb) {
    // si el archivo matriz, no existe, se lo crea.
    fs.ensureFile(this.pathFile, (err) => {
      if (err) return cb(err, null)
      console.log('ensure')
      // lee el archivo backup que contiene la matriz principal
      jsonfile.readFile(this.pathFile, (err, matriz) => {
        console.log('json read')
        // Si los datos en el archivo no se pueden leer, se crea otro
        if (err || !matriz) {
          console.log('no matrix')
          // busca el numero de piezas en su base de datos
          corpsePieces.find({}, (err, data) => {
            if (err) return cb(err, null)
            let dimension = 3
            // Buscamos un numero impar donde entren todas las piezas del
            // cadaver
            while (dimension * dimension / data.length + 1 < 1) {
              dimension = dimension + 2
            }

            let color1 = 0
            let color2 = 0
            let color3 = 0
            // Se construye la rejilla
            for (let y = Math.floor(dimension / 2); y >= (dimension / 2) * -1; y--) {
              for (let x = Math.round((dimension / 2) * -1); x < dimension / 2; x++) {
                color1 = Math.floor(Math.random() * 10)
                color2 = Math.floor(Math.random() * 10)
                color3 = Math.floor(Math.random() * 10)
                this.template.push({'pos': `${x}/${y}`, 'direction': '0', 'id': `rgb(${color3 * 25}, ${color2 * 25}, ${color1 * 25})`})
              }
            }

            // Se crear el archivo backup
            this.makeFile((err, grid) => {
              if (err) return cb(err)
              cb(null, grid)
            })
          })
        } else {
          // si el archivo backup existe, lo devuelve
          cb(null, matriz)
        }
      })
    })
  }
  // Devuelve un main grid, si no existe lo construye
  getMainGrid (cb) {
    if (!this.grid) {
      this.buildGrid((err, grid) => {
        if (err) return cb(err, null)
        console.log('se contruyo una matriz, desde get')
        this.grid = grid
        cb(null, grid)
      })
    } else {
      cb(null, this.grid)
    }
  }

  updateGrid () {
  }

  closeUser (userId, cb) {
    let indexUser = _.indexOf(this.usersDriving, userId)
    if (indexUser !== -1) {
      this.usersDriving.splice(indexUser, 1)
      cb(null, rsp('200', `user ${userId} has stoped driving`))
    } else {
      cb(rsp('404', `user ${userId} do not driving anything`, '404'), null)
    }
  }

  choosePiece (data, cb) {
    // data:
    // piece : id de la pieza
    // userId : id del socket del usuario
    let pieceToChoose = data.piece
    let userId = data.userId

    if (_.indexOf(this.usersDriving, userId) === -1) {
      this.usersDriving.push(userId)
      cb(null, rsp('200'))
    } else {
      cb(rsp('201', `${userId}, already driving a piece`, '01'))
    }
  }
}

let mainMatrix = new Matrix()

module.exports = {
  'mainMatrix': mainMatrix,
  'Matrix': Matrix
}
