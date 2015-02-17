//Chai assert api is here
//http://chaijs.com/api/assert/
//Could always switch to should or expect if necessary
var assert = require('chai').assert;
var mazeModel = require('./../mazeModel');

var N_CONST = mazeModel.N_CONST;
var E_CONST = mazeModel.E_CONST;
var S_CONST = mazeModel.S_CONST;
var W_CONST = mazeModel.W_CONST;

var maze = new mazeModel.Maze();

describe('Maze', function() {
    it('Constructor should construct, sanity check', function() {
      assert.equal(maze.width, maze.board.length);
      assert.equal(maze.width, mazeModel.DEF_WIDTH);
  })
});

var expectedExits = (E_CONST | S_CONST);
maze.makeAccessible(0,0, (N_CONST | S_CONST | E_CONST | W_CONST));
describe('Maze', function() {
    it('Check that path making functions correctly', function() {
        assert.equal(maze.board[0][0], expectedExits);
        assert.equal(maze.board[0][1], N_CONST);
        assert.equal(maze.board[1][0], W_CONST);
    })
});


describe('Maze', function() {
    it('Accessible exits should report correct exits', function() {
        assert.equal(maze.accessibleExits(0,0), expectedExits);
    })
});

var testWidth = 15;
var testHeight = 8;
var maze2 = new mazeModel.Maze({width:testWidth,height:testHeight});

describe('Maze', function() {
    it('Constructor should make correct sized board', function() {
        assert.equal(maze2.board.length, maze2.width);
        assert.equal(maze2.board[0].length , maze2.height);
        assert.equal(maze2.width, testWidth);
        assert.equal(maze2.height, testHeight);
    })
});


var testX = 3;
var testY = 4;
var expectedExits2 = (N_CONST | E_CONST | S_CONST | W_CONST);
maze2.makeAccessible(testX, testY, expectedExits2);
describe('Maze', function() {
    it('Another path making check', function() {
        assert.equal(maze2.board[testX][testY], expectedExits2);
    })
});

mazeModel.load('./mocks/maze1.json', function(loaded){
    var maze3 = loaded;
    describe('Maze', function() {
        it('Test loadout of map', function() {
            assert.equal(maze3.accessibleExits(0,1), (S_CONST | N_CONST));
            assert.equal(maze3.accessibleExits(1,2), W_CONST);
            assert.equal(maze3.width, 2);
            assert.equal(maze3.height, 4);
            assert.equal(modelTest.start, [0,1]);
            assert.equal(modelTest.end, [1,2]);
        })
    });
});


var testDir = N_CONST;
var dirResult = mazeModel.onlyOneDir(testDir);
describe('Maze', function() {
    it('Checks function of onlyOneDir method', function() {
        assert.isTrue(dirResult);
    })
});

var testDir2 = (N_CONST | E_CONST);
var dirResult2 = mazeModel.onlyOneDir(testDir2);
describe('Maze', function() {
    it('Checks function of onlyOneDir method 2nd time', function() {
        assert.isFalse(dirResult2);
    })
});


var maze3 = new mazeModel.Maze();
maze3.makeAccessible(maze3.start[0], maze3.start[1], S_CONST);
var moveResult = maze3.movePlayer(S_CONST);
describe('Maze', function() {
    it('Movement test true', function() {
        assert.isTrue(moveResult);
        assert.deepEqual(maze3.currPos, [0,1]);
    })
});

var maze4 = new mazeModel.Maze();
maze4.makeAccessible(maze4.start[0], maze4.start[1], S_CONST);
maze4.movePlayer(S_CONST);
var moveResult2 = maze4.movePlayer(S_CONST);
describe('Maze', function() {
    it('Movement test false', function() {
        assert.isFalse(moveResult2);
        assert.deepEqual(maze4.currPos, [0,1]);
    })
});

var testWidth2 = 1;
var testHeight2 = 2;
var maze5 = new mazeModel.Maze({width:testWidth2,height:testHeight2});
maze5.makeAccessible(maze5.start[0],maze5.start[1], S_CONST);
var atExit = maze5.hasPlayerWon();
describe('Maze', function() {
    it('Testing win or lose', function() {
        assert.isFalse(atExit);
        assert.deepEqual(maze5.currPos, [0,0]);
        maze5.movePlayer(S_CONST);
        atExit = maze5.hasPlayerWon();
        assert.isTrue(atExit);
        assert.deepEqual(maze5.currPos, [0,1]);
    })
});