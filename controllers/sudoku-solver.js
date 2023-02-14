class SudokuSolver {

  validate(puzzleString) {
    let validateRegex = /^[\d.]+$/;
    if (puzzleString.length !== 81) { return { error: 'Expected puzzle to be 81 characters long' }};
    if (!validateRegex.test(puzzleString)) {return { error: 'Invalid characters in puzzle' }};
    return 'valid'
  }

  checkRowPlacement(puzzleObj, row, column, value) {
    return puzzleObj[row].includes(value)
  }

  checkColPlacement(puzzleObj, row, column, value) {
    let rowArr = Object.keys(puzzleObj);
    let colArr = [];
    rowArr.forEach(n => { colArr.push(puzzleObj[n][column - 1])})
    return colArr.includes(value)
  }

  checkRegionPlacement(puzzleObj, row, column, value) {
    let rowGroup = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
    let colGroup = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let quadrant = {
      rowQuad: rowGroup.find(arr => {return arr.includes(row)}),
      colQuad: colGroup.find(arr => {return arr.includes(+column)})
    };
    let regionArr = [];
    
    quadrant.rowQuad.forEach(row => {
      quadrant.colQuad.forEach(col => {
        regionArr.push(puzzleObj[row][`${col-1}`])
      });
    });

    return regionArr.includes(`${value}`) //This is cuz input value is in String format.
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

