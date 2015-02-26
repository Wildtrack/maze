//Chai assert api is here
//http://chaijs.com/api/assert/
//Could always switch to should or expect if necessary
//var assert = require('chai').assert;
//var mazeModel = require('./../mazeModel');
 
assert = chai.assert;
var N_CONST = AMaze.model.N_CONST;
var E_CONST = AMaze.model.E_CONST;
var S_CONST = AMaze.model.S_CONST;
var W_CONST = AMaze.model.W_CONST;
var TEST_WIDTH1 = 15;
var TEST_HEIGHT1 = 8;
var TEST_WIDTH2 = 1;
var TEST_HEIGHT2 = 2;
var EXPECTED_EXITS1 = (E_CONST | S_CONST);
var EXPECTED_EXITS2 = (N_CONST | E_CONST | S_CONST | W_CONST);
var TEST_X = 3;
var TEST_Y = 4;
 
var maze;
describe('MAZEMODEL TESTS', function() {
    describe('Maze constructor tests', function() {
        describe('Maze(null)', function(){
            before(function(){
                maze = new AMaze.model.Maze();
            });
            it('Check the constructed maze length is correct', function() {
              assert.equal(maze.width, maze.board.length);
            });
            it('Check that constructed maze width is correct', function() {  
              assert.equal(maze.width, AMaze.model.DEF_WIDTH);
            });
        });
     
        describe('Maze(parameters)', function() {
            before(function(){
                maze = new AMaze.model.Maze({width:TEST_WIDTH1,height:TEST_HEIGHT1});
            });
            it('Check board width is what was constructed', function() {
                assert.equal(maze.board.length, maze.width);
            });
            it('Check board height is what was constructed', function() {
                assert.equal(maze.board[0].length , maze.height);
            });
            it('Check that maze width is what was constructed', function() {
                assert.equal(maze.width, TEST_WIDTH1);
            });   
            it('Check that maze height is what was constructed', function() {
                assert.equal(maze.height, TEST_HEIGHT1);
            });
        });
    });
     
     
    describe('Maze.makeAccessible()', function() {
        before(function() {
            maze = new AMaze.model.Maze();
            maze.makeAccessible(0,0, (N_CONST | S_CONST | E_CONST | W_CONST));
        });
        it('Check if exits are made accessible they are accessible', function() {
            assert.equal(maze.board[0][0], EXPECTED_EXITS1);
        });
        it('Check north accessibility', function(){
            assert.equal(maze.board[0][1], N_CONST);
        });
        it('Check west accessibility', function(){
            assert.equal(maze.board[1][0], W_CONST);
        });
        before(function(){
            maze.makeAccessible(TEST_X, TEST_Y, EXPECTED_EXITS2);
        });
        it('After making another location accessible is it?', function() {
            assert.equal(maze.board[TEST_X][TEST_Y], EXPECTED_EXITS2);
        });
    });
     
     
    describe('Maze.accessibleExits()', function() {
        it('Accessible exits should report correct exits', function() {
            assert.equal(maze.accessibleExits(0,0), EXPECTED_EXITS1);
        });
    });

    var maze3;
    // This test is hopelessly broken.
    describe('test loadout', function(){
        before(function(){
            maze3 = AMaze.model.load('http://localhost:8080/mocks/maze1.json', function(loaded){
               return loaded;
            });
        });
        it('Check that maze3 exists', function(){
            assert.isDefined(maze3);
        });
        it('Check accessible exits at (0,1)', function() {
            assert.equal(maze3.accessibleExits(0,1), (S_CONST | N_CONST));
        });
        it('Check accessible exits at (1,2)', function(){
            assert.equal(maze3.accessibleExits(1,2), W_CONST);
        });
        it('Check maze width', function(){
            assert.equal(maze3.width, 2);
        });
        it('Check maze height', function(){
            assert.equal(maze3.height, 4);
        });
        it('Check that start is in the right place', function(){
            assert.equal(maze3.start, [0,1]);
        });
        it('Check that end is in the right place', function(){
            assert.equal(maze3.end, [1,2]);
        });
    });
    
     
    describe('Maze.onlyOneDir()', function() {
        it('Tests only one dir with one direction.', function() {
            assert.isTrue(AMaze.model.onlyOneDir(N_CONST));
        });
        it('Tests only one dir with two directions.', function() {
            assert.isFalse(AMaze.model.onlyOneDir(N_CONST | E_CONST));
        });
    });
     
    describe('Maze.movePlayer()', function() {
        before(function() {
            maze = new AMaze.model.Maze();
            maze.makeAccessible(maze.start[0], maze.start[1], S_CONST);
        });
        it('Try to move the player south.', function() {
            assert.isTrue(maze.movePlayer(S_CONST));
        });
        it('Check that movement has occurred.', function() {
            assert.deepEqual(maze.currPos, [0,1]);
        });
        before(function() {
            maze = new AMaze.model.Maze();
            maze.makeAccessible(maze.start[0], maze.start[1], S_CONST);
        });
        it('Try to move player south when the south is blocked', function () {
            assert.isFalse(maze.movePlayer(S_CONST));
        });
        it('Check that not movement has occurred', function() {
            assert.deepEqual(maze.currPos, [0,1]);
        });
    });
     
     
    describe('Maze.hasPlayerWon()', function() {
        describe('Player has not won yet', function() {
            before(function() {
                maze = new AMaze.model.Maze({width:TEST_WIDTH2,height:TEST_HEIGHT2});
                maze.makeAccessible(maze.start[0],maze.start[1], S_CONST);
            });
            it('Do we start the game having won?', function() {
                assert.isFalse(maze.hasPlayerWon());
            });
            it('Is our position what we expect?', function() {
                assert.deepEqual(maze.currPos, [0,0]);
            });
        });
        describe('Player has won', function(){
               before(function(){
                maze.movePlayer(S_CONST);
            });
            it('After moving south have we won?', function() {
                assert.isTrue(maze.hasPlayerWon());
            });
            it('Are we where we expect to be after moving south?', function() {
                assert.deepEqual(maze.currPos, [0,1]);
            }); 
        });
    });
});