class SudokuSolver {

  validate(puzzleString) {
    let validateRegex = /^[\d.]+$/;
    if (puzzleString.length !== 81) { return { error: 'Expected puzzle to be 81 characters long' } };
    if (!validateRegex.test(puzzleString)) { return { error: 'Invalid characters in puzzle' } };
    return 'valid'
  }

  checkRowPlacement(puzzleObj, row, column, value) {
    return puzzleObj[row].includes(value)
  }

  checkColPlacement(puzzleObj, row, column, value) {
    let rowArr = Object.keys(puzzleObj);
    let colArr = [];
    rowArr.forEach(n => { colArr.push(puzzleObj[n][column - 1]) })
    return colArr.includes(value)
  }

  checkRegionPlacement(puzzleObj, row, column, value) {
    let rowGroup = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']];
    let colGroup = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    let quadrant = {
      rowQuad: rowGroup.find(arr => { return arr.includes(row) }),
      colQuad: colGroup.find(arr => { return arr.includes(+column) })
    };
    let regionArr = [];

    quadrant.rowQuad.forEach(row => {
      quadrant.colQuad.forEach(col => {
        regionArr.push(puzzleObj[row][`${col - 1}`])
      });
    });

    return regionArr.includes(`${value}`) //This is cuz input value is in String format.
  }

  solve(puzzleString) {
    let validation = this.validate(puzzleString)
    if (validation !== 'valid') { return validation };
    let response;
    let puzzleObj = {
      a: puzzleString.split("").slice(0, 9),
      b: puzzleString.split("").slice(9, 18),
      c: puzzleString.split("").slice(18, 27),
      d: puzzleString.split("").slice(27, 36),
      e: puzzleString.split("").slice(36, 45),
      f: puzzleString.split("").slice(45, 54),
      g: puzzleString.split("").slice(54, 63),
      h: puzzleString.split("").slice(63, 72),
      i: puzzleString.split("").slice(72, 81),
    };

    const anchor = this; //is needed to callback the check functions above.

    function answerFinder() {
      let blankArr = []; //array of all empty squares with possible answers as objects
      for (let row in puzzleObj) {
        for (let i = 0; i < puzzleObj[row].length; i++) {
          if (puzzleObj[row][i] == '.') {
            let target = {
              row: row,
              col: i,
              answers: []
            };
            blankArr.push(target)
          };
        }
      };

      blankArr.forEach(blank => {
        for (let i = 1; i <= 9; i++) {
          let args = [puzzleObj, `${blank.row}`, `${blank.col + 1}`, `${i}`];
          if (!anchor.checkRowPlacement(...args) && !anchor.checkColPlacement(...args) && !anchor.checkRegionPlacement(...args)) {
            blank.answers.push(`${i}`)
          }
        };
      });
      let answerToFill;
      answerToFill = blankArr.find(n => n.answers.length == 1);
      //console.log(answerToFill)
      if (!answerToFill) { //LOOP ENDER
        if (!blankArr.length == 0) {
          //BAD ENDING
          response = 'Could not be solved';

        } else {
          //GOOD ENDING
          let result = [];
          for (let row in puzzleObj) {
            puzzleObj[row].forEach(n => {
              result.push(n);
            })
          }
          response = result.join('');
        }


      }
      else { //LOOP STARTER
        answerFiller(answerToFill)
      }


    };

    function answerFiller(answerToFill) { //LOOP MIDDLEWARE
      puzzleObj[answerToFill.row][answerToFill.col] = answerToFill.answers[0];
      answerFinder()
    }

    answerFinder() //FIRST RUN
    return response


  };
}

module.exports = SudokuSolver;

