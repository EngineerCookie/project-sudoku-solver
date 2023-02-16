const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let testString = {
    valid: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
    invalid: '5..91372.3...8.5.9.9.25..8.68.47.23...9A..46.7.4.....5.2.......4..8916..85.72...3',
    completed: '135762984946381257728459613694517832812936745357824196473298561581673429269145378',
    incomplete: '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4',
    imposible: ''
};

suite('Functional Tests', () => {
    suite('API/SOLVE', () => {
        test('1. Solve a puzzle with valid puzzle string: POST request to /api/solve', (done) => {
            chai.request(server)
            .post('/api/solve')
            .send({ puzzle: testString.valid })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.solution, testString.completed, "Solution must match the correct answer");
                done();
            });
        });
        test('2. Solve a puzzle with missing puzzle string: POST request to /api/solve', (done) => {
            chai.request(server)
            .post('/api/solve')
            .send({ puzzle: undefined })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.error, 'Required field missing', 'Display error when input puzzle is missing');
                done();
            });
        });
        
        test('3. Solve a puzzle with invalid characters: POST request to /api/solve', (done) => {
            chai.request(server)
            .post('/api/solve')
            .send({ puzzle: testString.invalid })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.error, 'Invalid characters in puzzle', 'Display error when input invalid characters in puzzle');
                done();
            });
        });
        test('4. Solve a puzzle with incorrect length: POST request to /api/solve', (done) => {
            chai.request(server)
            .post('/api/solve')
            .send({ puzzle: testString.incomplete })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.error, 'Expected puzzle to be 81 characters long', 'Display ereror when input incomplete puzzle');
                done();
            });
        });
        test('5. Solve a puzzle that cannot be solved: POST request to /api/solve', (done) => {
            chai.request(server)
            .post('/api/solve')
            .send({})
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal()
                done()
            });
        });
    

    });
    /*
    suite('API/CHECK', () => {
        test('1. Check a puzzle placement with all fields: POST request to /api/check', (done) => {

        });
        test('2. Check a puzzle placement with single placement conflict: POST request to /api/check', (done) => {

        });
        test('3. Check a puzzle placement with multiple placement conflicts: POST request to /api/check', (done) => {

        });
        test('4. Check a puzzle placement with all placement conflicts: POST request to /api/check', (done) => {

        });
        test('5. Check a puzzle placement with missing required fields: POST request to /api/check', (done) => {

        });
        test('6. Check a puzzle placement with invalid characters: POST request to /api/check', (done) => {

        });
        test('7. Check a puzzle placement with incorrect length: POST request to /api/check', (done) => {

        });
        test('8. Check a puzzle placement with invalid placement coordinate: POST request to /api/check', (done) => {

        });
        test('9. Check a puzzle placement with invalid placement value: POST request to /api/check', (done) => {

        });
    });
    */
});