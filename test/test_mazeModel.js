var N_CONST = AMaze.model.N_CONST, E_CONST = AMaze.model.E_CONST,
S_CONST = AMaze.model.S_CONST, W_CONST = AMaze.model.W_CONST,
testsPassing = true, testsFinished = false;

//sanity check, constructor should construct
var modelTest = new AMaze.model.Maze();
testsPassing &=TestRig.assertTrue(modelTest.width == modelTest.board.length, "Reported width ("+modelTest.width+") not same as actual width ("+modelTest.board.length);
testsPassing &=TestRig.assertTrue(modelTest.width == AMaze.model.DEF_WIDTH, "Idiot proofing: width = default width");

//checking that path making works correctly
var expectedExits = (E_CONST | S_CONST);
modelTest.makeAccessible(0,0, (N_CONST | S_CONST | E_CONST | W_CONST));
testsPassing &=TestRig.assertTrue(modelTest.board[0][0] == expectedExits, "board[0][0] is incorrectly accessible: " + modelTest.board[0][0] + ", not " + expectedExits);
testsPassing &=TestRig.assertTrue(modelTest.board[0][1] == N_CONST, "board[0][1] is incorrectly accessible: " + modelTest.board[0][1] + ", not " + N_CONST);
testsPassing &=TestRig.assertTrue(modelTest.board[1][0] == W_CONST, "board[1][0] is incorrectly accessible: " + modelTest.board[1][0] + ", not " + W_CONST);

//accessible exits should report correct exits (relies on above not failing)
var exits = modelTest.accessibleExits(0,0);
testsPassing &=TestRig.assertTrue(exits == expectedExits, "board[0][0]'s reported accessible exits " + exits + ", not " + expectedExits);

//constructor should make correct sized board
var testWidth = 15, testHeight = 8;
modelTest = new AMaze.model.Maze({width:testWidth,height:testHeight});
testsPassing &=TestRig.assertTrue(modelTest.board.length == modelTest.width, "Reported width ("+modelTest.width+") not same as actual width ("+modelTest.board.length);
testsPassing &=TestRig.assertTrue(modelTest.board[0].length == modelTest.height, "Reported height ("+modelTest.height+") not same as actual height ("+modelTest.board[0].length);
testsPassing &=TestRig.assertTrue(modelTest.width == testWidth, "nonstandard width incorrect, " +modelTest.width+ " instead of "+testWidth);
testsPassing &=TestRig.assertTrue(modelTest.height == testHeight, "nonstandard height incorrect, " +modelTest.height+ " instead of "+testHeight);

//another path making check
var testX = 3, testY = 4;
expectedExits = (N_CONST | E_CONST | S_CONST | W_CONST);
modelTest.makeAccessible(testX,testY, expectedExits);
testsPassing &=TestRig.assertTrue(modelTest.board[testX][testY] == expectedExits, "board["+testX+"]["+testY+"] is incorrectly accessible: " + modelTest.board[testY][testY] + ", not " + expectedExits);

modelTest.load('./mocks/maze1.json', function(loaded) {
	modelTest = loaded;
	testsPassing &=TestRig.assertTrue(modelTest.accessibleExits(0,1) == (S_CONST | N_CONST), "file loaded board[0][1] is incorrectly accessible: "+modelTest.accessibleExits(0,1)+", not "+(S_CONST | N_CONST));
	testsPassing &=TestRig.assertTrue(modelTest.accessibleExits(1,2) == W_CONST, "file loaded board[1][2] is incorrectly accessible: "+modelTest.accessibleExits(1,2)+", not "+W_CONST);
	testsPassing &=TestRig.assertTrue(modelTest.width == 2, "file loaded width is incorrect: "+modelTest.width+", not "+2);
	testsPassing &=TestRig.assertTrue(modelTest.height == 3, "file loaded height is incorrect: "+modelTest.height+", not "+3);
	testsPassing &=TestRig.assertTrue(modelTest.start.equals([0,1]), "file loaded start is incorrect: "+modelTest.start+", not "+[0,1]);
	testsPassing &=TestRig.assertTrue(modelTest.end.equals([1,2]), "file loaded end is incorrect: "+modelTest.end+", not "+[1,2]);
	done();
});

done();


function done()
{
	var span = $('#log');
	if(span != null)
	{
		span.html(testsPassing? "All tests passed" : "Tests failed:<br \>"+TestRig.log.join("<br \>"));
	}
}
