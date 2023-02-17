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
      if (!req.body.puzzle) {return res.json({ error: 'Required field missing' });
      };

      let validation = solver.validate(req.body.puzzle);
      if (validation !== 'valid') {
        return res.json(validation);
      }
      let solve = solver.solve(req.body.puzzle);
      if(solve == 'Could not be solved') { res.json({ error: 'Puzzle cannot be solved' })}
      res.json( {solution: solve})
    });

    app.route('/test')
    .get((req, res) => {
      let testString = '...5.9..6.1.......54.8...9.89.4...6.....2.3....7........67.......1....5.75..4...2';
      console.log(solver.solve(testString))
      res.send('testing')
    })
};

