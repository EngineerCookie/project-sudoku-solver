'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();
  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.coordinate || !req.body.value || !req.body.puzzle) {
        return res.json({ error: 'Required field(s) missing' });
      }
      let validation = solver.validate(req.body.puzzle);
      if (validation !== 'valid') {
        return res.json(validation);
      }

      if (!/^[A-Ia-i]{1}[1-9]{1}$/.test(req.body.coordinate)) {return res.json({ error: 'Invalid coordinate'})};
      
      if (!/^[1-9]{1}$/.test(req.body.value)) {return res.json({ error: 'Invalid value' })};

      let puzzleObj = {
        'a': req.body.puzzle.split("").slice(0, 9),
        'b': req.body.puzzle.split("").slice(9, 18),
        'c': req.body.puzzle.split("").slice(18, 27),
        'd': req.body.puzzle.split("").slice(27, 36),
        'e': req.body.puzzle.split("").slice(36, 45),
        'f': req.body.puzzle.split("").slice(45, 54),
        'g': req.body.puzzle.split("").slice(54, 63),
        'h': req.body.puzzle.split("").slice(63, 72),
        'i': req.body.puzzle.split("").slice(72, 81),
      };

      let checkResponse = {};
      let args = [puzzleObj, ...req.body.coordinate.split(''), req.body.value];
      args[1] = args[1].toLowerCase();  //row letters are all lower case

      //If coordinates hits a spot with a number in it:   
      if (puzzleObj[args[1]][args[2]-1] !== ".") { puzzleObj[args[1]][args[2]-1] = '.'};

      if (solver.checkRowPlacement(...args) || solver.checkColPlacement(...args) || solver.checkRegionPlacement(...args)) {
        checkResponse.valid = false;
        checkResponse.conflict = [];
        if(solver.checkRowPlacement(...args)){ checkResponse.conflict.push('row') };
        if(solver.checkColPlacement(...args)){ checkResponse.conflict.push('column') };
        if(solver.checkRegionPlacement(...args)){  checkResponse.conflict.push('region') };
        return res.json(checkResponse)
      } else { checkResponse.valid = true };
      res.json(checkResponse);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      res.json( {solution:  '827549163531672894649831527496157382218396475753284916962415738185763249374928651'})
    });

  app.route('/test')
  .get((req, res) => {
    let puzzleObj = {};
    let test = '  ';
    let testString = '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
    let testString2 ='1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let testObj = {
      a: testString.split("").slice(0, 9),
      b: testString.split("").slice(9, 18),
      c: testString.split("").slice(18, 27),
      d: testString.split("").slice(27, 36),
      e: testString.split("").slice(36, 45),
      f: testString.split("").slice(45, 54),
      g: testString.split("").slice(54, 63),
      h: testString.split("").slice(63, 72),
      i: testString.split("").slice(72, 81),
    };

    //if (Object.keys(testObj).includes('j')) {console.log('si ta')}else {console.log('no ta')}
    //if (false || (false || false)) {console.log('1')} else (console.log('2'))
    res.send('testing')
  })
};

/*
let posibilities = 
{
  'a' : [
    {posibles: [1,2,3] }
  ]
}

*/