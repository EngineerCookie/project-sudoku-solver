const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let testString = {
    valid: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    invalid: '5..91372.3...8.5.9.9.25..8.68.47.23...9A..46.7.4.....5.2.......4..8916..85.72...3',
    completed: '135762984946381257728459613694517832812936745357824196473298561581673429269145378',
    incomplete: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4'
};

let testObj = {
    'a': testString.valid.split("").slice(0, 9),
    'b': testString.valid.split("").slice(9, 18),
    'c': testString.valid.split("").slice(18, 27),
    'd': testString.valid.split("").slice(27, 36),
    'e': testString.valid.split("").slice(36, 45),
    'f': testString.valid.split("").slice(45, 54),
    'g': testString.valid.split("").slice(54, 63),
    'h': testString.valid.split("").slice(63, 72),
    'i': testString.valid.split("").slice(72, 81),
  };

suite('Unit Tests', () => {
    
    test('1. Logic handles a valid puzzle string of 81 characters', () => {
        assert.equal(solver.validate(testString.valid), 'valid', 'Enters a valid puzzle string');
    });

    test('2. Logic handles a puzzle string with invalid characters (not 1-9 or .)', () => {
        assert.deepEqual(solver.validate(testString.invalid), { error: 'Invalid characters in puzzle' }, 'Invalid characters inside puzzle string');
    });

    test('3. Logic handles a puzzle string that is not 81 characters in length', () => {
        assert.deepEqual(solver.validate(testString.incomplete), { error: 'Expected puzzle to be 81 characters long' }, 'Puzzle string not 81 characters');
    });

    test('4. Logic handles a valid row placement', () => {
        assert.equal(solver.checkRowPlacement(testObj, 'b', '1', '9'), false, 'Input B1 value 9 is a valid row placement.');
    });

    test('5. Logic handles an invalid row placement', () => {
        assert.equal(solver.checkRowPlacement(testObj, 'a', '1', '5'), true, 'Input A1 value 5 is an invalid row placement.')
    });

    test('6. Logic handles a valid column placement', () => {
        assert.equal(solver.checkColPlacement(testObj, 'b', '5', '8'), false, 'Input B5 value 8 is a valid columm placement');
    });

    test('7. Logic handles an invalid column placement', () => {
        assert.equal(solver.checkColPlacement(testObj, 'b', '5', '3'), true, 'Input B5 value 3 is not a valid column placement' );
    });

    test('8. Logic handles a valid region (3x3 grid) placement', () => {
        assert.equal(solver.checkRegionPlacement(testObj, 'c', '3', '4'),  false , 'Input C3 value 4 is a valid region placement');
    });

    test('9. Logic handles an invalid region (3x3 grid) placement', () => {
        assert.equal(solver.checkRegionPlacement(testObj, 'c', '3', '2'),  true, 'Input C3 value 2 is not a valid region placement' )
    })
/*
    test('Valid puzzle strings pass the solver', () => {

    });

    test('Invalid puzzle strings fail the solver', () => {

    });
    
    test('Solver returns the expected solution for an incomplete puzzle', () => {

    });*/
});

