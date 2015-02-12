var N_CONST = AMaze.model.N_CONST, E_CONST = AMaze.model.E_CONST,
S_CONST = AMaze.model.S_CONST, W_CONST = AMaze.model.W_CONST;

//sanity check, constructor should construct
var modelTest = new AMaze.model.Maze();
TestRig.assertTrue(modelTest.width == modelTest.board.length, "Reported width ("+modelTest.width+") not same as actual width ("+modelTest.board.length);
TestRig.assertTrue(modelTest.width == AMaze.model.DEF_WIDTH, "Idiot proofing: width = default width");

//checking that path making works correctly
var expectedExits = (E_CONST | S_CONST);
modelTest.makeAccessible(0,0, (N_CONST | S_CONST | E_CONST | W_CONST));
TestRig.assertTrue(modelTest.board[0][0] == expectedExits, "board[0][0] is incorrectly accessible: " + modelTest.board[0][0] + ", not " + expectedExits);

//accessible exits should report correct exits (relies on above)
var exits = modelTest.accessibleExits(0,0);
TestRig.assertTrue(exits == expectedExits, "board[0][0]'s reported accessible exits " + exits + ", not " + expectedExits);

//constructor should make correct sized board
var testWidth = 15, testHeight = 8;
modelTest = new AMaze.model.Maze({width:testWidth,height:testHeight});
TestRig.assertTrue(modelTest.board.length == modelTest.width, "Reported width ("+modelTest.width+") not same as actual width ("+modelTest.board.length);
TestRig.assertTrue(modelTest.board[0].length == modelTest.height, "Reported height ("+modelTest.height+") not same as actual height ("+modelTest.board[0].length);
TestRig.assertTrue(modelTest.width == testWidth, "nonstandard width incorrect, " +modelTest.width+ " instead of "+testWidth);
TestRig.assertTrue(modelTest.height == testHeight, "nonstandard height incorrect, " +modelTest.height+ " instead of "+testHeight);

//another path making check
var testX = 3, testY = 4;
expectedExits = (N_CONST | E_CONST | S_CONST | W_CONST);
modelTest.makeAccessible(testX,testY, expectedExits);
TestRig.assertTrue(modelTest.board[testX][testY] == expectedExits, "board["+testX+"]["+testY+"] is incorrectly accessible: " + modelTest.board[testY][testY] + ", not " + expectedExits);
