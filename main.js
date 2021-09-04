const sudoku = require('./models/sudoku.js').sudoku;
let g =  sudoku.generate('easy')
module.exports = g