var testsPassing = true;
var testsFinished = false

TestRig.verboseMode = true;

//testRig testers
testsPassing &=TestRig.assertTrue(true, "If you see this message TesRig has been working properly!");

//Comment out the line blow to fail assertTrue test
//testsPassing &=TestRig.assertTrue(false, "This test should fail!");

// set up parameters here
var x;
var y;
var directionCode =  {north: 0, east: 1, south: 2, west: 3};

// create a backtrack model, root should be null
var testModel = new backtrack.model();
testsPassing &=TestRig.assertTrue(testModel.tree == null, "testModel.tree reports "+testModel.tree+", expected null");

//
// 1. Set root to (1,2)
//
x = 1;
y = 2;
testModel.setRoot(x, y);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == x, 
	"1. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+x);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == y, 
	"1. testModel.pointer.last[1] is "+testModel.pointer.pos[1]+", expected "+x);

//
// 2. Set root to (3,3) again, root shouldn't change!
//
x = 3;
y = 3;
testModel.setRoot(x, y);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 1, 
	"2. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+1);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"2. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.lastX == 1, 
	"2. testModel.pointer.lastX is "+testModel.lastX+", expected "+1);

testsPassing &=TestRig.assertTrue(testModel.lastY == 2, 
	"2. testModel.pointer.lastY is "+testModel.lastY+", expected "+2);


//
// 3. move cursor to (5,5), should not add new node, currentDir should be no value (-1)
//
moveTo(5,5);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 1, 
	"3. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 1);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"3. testModel.pointer.last[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.currentDir == -1, 
	"3. testModel.pointer.currentDir is "+testModel.currentDir+", expected -1");

//
// 4. move cursor to (1,2), the original root direction, model should not add new node, currentDir should be no value (-1)
//
moveTo(1,2);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 1, 
	"4. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 1);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"4. testModel.pointer.last[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.currentDir == -1, 
	"4. testModel.pointer.currentDir is "+testModel.currentDir+", expected -1");

//
// 5. move cursor in x + 3, no new node should be added, only lastX & lastY should change
//
moveTo(3,2);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 1, 
	"5. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 1);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"5. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"5. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"5. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.east, 
	"5. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.east);


//
// 6. Use backtrack.js onTrack function to track cursor, x + 2, and evalue returned value
//
x = 5;
y = 2;
var flag;
testsPassing &=TestRig.assertTrue((flag = testModel.onTrack(5,2)) == false, 
	"6. testModel.onTrack("+x+","+y+") is "+flag+", expected " + false);

//
// 7. Make a turn and move down in y direction +1
//
moveTo(x, y++);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == x, 
	"7. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == y, 
	"7. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"7. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"7. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.south, 
	"7. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.south);

//
// 8. Make a turn and go west in x direcdtion -1
//
moveTo(x--, y);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == x, 
	"8. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == y, 
	"8. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"8. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"8. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.west, 
	"8. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.west);


done();


function done()
{
	var span = $('#log');
	if(span != null)
	{
		span.html(TestRig.report().replace(/\n/g,"<br />"));
	}
}

function init() {

}

function moveTo(x, y) {
	this.x = x;
	this.y = y;

	testModel.onTrack(x, y);
}