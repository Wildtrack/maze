var N_CONST = AMaze.model.N_CONST, E_CONST = AMaze.model.E_CONST,
S_CONST = AMaze.model.S_CONST, W_CONST = AMaze.model.W_CONST,
testsPassing = true, testsFinished = false;

TestRig.verboseMode = true;

//sanity check, constructor should construct
var modelTest = new AMaze.model.Maze();
testsPassing &=TestRig.assertTrue(modelTest.width == modelTest.board.length, "(constructor) board direct width "+modelTest.width+", expected "+modelTest.board.length);
testsPassing &=TestRig.assertTrue(modelTest.width == AMaze.model.DEF_WIDTH, "(constructor) board reported width "+modelTest.width+", expected default "+AMaze.model.DEF_WIDTH);

//checking that path making works correctly
var expectedExits = (E_CONST | S_CONST);
modelTest.makeAccessible(0,0, (N_CONST | S_CONST | E_CONST | W_CONST));
testsPassing &=TestRig.assertTrue(modelTest.board[0][0] == expectedExits, "(makeAccessible) board[0][0] reported accessible: " + modelTest.board[0][0] + ", expected " + expectedExits);
testsPassing &=TestRig.assertTrue(modelTest.board[0][1] == N_CONST, "(makeAccessible) board[0][1] reprted accessible: " + modelTest.board[0][1] + ", expected " + N_CONST);
testsPassing &=TestRig.assertTrue(modelTest.board[1][0] == W_CONST, "(makeAccessible) board[1][0] reported accessible: " + modelTest.board[1][0] + ", expected " + W_CONST);

//accessible exits should report correct exits (relies on above not failing)
var exits = modelTest.accessibleExits(0,0);
testsPassing &=TestRig.assertTrue(exits == expectedExits, "(accessibleExits) board[0][0] reported accessible exits " + exits + ", expected " + expectedExits);

//constructor should make correct sized board
var testWidth = 15, testHeight = 8;
modelTest = new AMaze.model.Maze({width:testWidth,height:testHeight});
testsPassing &=TestRig.assertTrue(modelTest.board.length == modelTest.width, "(constructor with opts) direct width "+modelTest.width+", expected "+modelTest.board.length);
testsPassing &=TestRig.assertTrue(modelTest.board[0].length == modelTest.height, "(constructor with opts) direct height ("+modelTest.height+", expected "+modelTest.board[0].length);
testsPassing &=TestRig.assertTrue(modelTest.width == testWidth, "(constructor with opts) reported width " +modelTest.width+ ", expected "+testWidth);
testsPassing &=TestRig.assertTrue(modelTest.height == testHeight, "(constructor with opts) reported height " +modelTest.height+ ", expected "+testHeight);

//another path making check
var testX = 3, testY = 4;
expectedExits = (N_CONST | E_CONST | S_CONST | W_CONST);
modelTest.makeAccessible(testX,testY, expectedExits);
testsPassing &=TestRig.assertTrue(modelTest.board[testX][testY] == expectedExits, "(makeAccessible) board["+testX+"]["+testY+"] reported accessible " + modelTest.board[testY][testY] + ", expected " + expectedExits);

modelTest.load('./mocks/maze1.json', function(loaded) {
	var modelTest = loaded;
	testsPassing &=TestRig.assertTrue(modelTest.accessibleExits(0,1) == (S_CONST | N_CONST), "(file load) board[0][1] reported accessible "+modelTest.accessibleExits(0,1)+", expected "+(S_CONST | N_CONST));
	testsPassing &=TestRig.assertTrue(modelTest.accessibleExits(1,2) == W_CONST, "(file load) board[1][2] reported accessible "+modelTest.accessibleExits(1,2)+", expected "+W_CONST);
	testsPassing &=TestRig.assertTrue(modelTest.width == 2, "(file load) width reported "+modelTest.width+", expected "+2);
	testsPassing &=TestRig.assertTrue(modelTest.height == 3, "(file load) height reported "+modelTest.height+", expected "+3);
	testsPassing &=TestRig.assertTrue(TestRig.arrEquals(modelTest.start, [0,1]), "(file load) start reported "+modelTest.start+", expected "+[0,1]);
	testsPassing &=TestRig.assertTrue(TestRig.arrEquals(modelTest.end, [1,2]), "(file load) end reported "+modelTest.end+", expected "+[1,2]);
	TestRig.fillLog('log');
});

TestRig.fillLog('log');
