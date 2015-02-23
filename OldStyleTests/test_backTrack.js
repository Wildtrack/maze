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
// 5. move cursor in x + 3, NO new node should be added, only lastX & lastY should change
//    avoid diagnoal movements
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

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 1, 
	"6. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 1);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"6. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"6. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"6. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.east, 
	"6. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.east);

//
// 7. At (5,2) Make a turn and move down in y direction +1, a new node at (5,2) should be created
//
moveTo(x, ++y);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == x, 
	"7. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == (y-1), 
	"7. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+ (y-1));

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"7. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"7. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.south, 
	"7. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.south);

testsPassing &=TestRig.assertTrue(testModel.pointer.direction == directionCode.west, 
	"7. testModel.pointer.direction is "+testModel.pointer.direction+", expected " + directionCode.west);


//
// 8. At (5,3), make a turn and go west in x direcdtion -1, a new node should be creaetd at (5,3)
// at (4,3)
moveTo(--x, y);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == (x + 1), 
	"8. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ (x + 1));

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == y, 
	"8. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"8. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"8. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.west, 
	"8. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.west);

testsPassing &=TestRig.assertTrue(testModel.backtrackDir == directionCode.east, 
	"8. testModel.pointer.backtrackDir is "+testModel.backtrackDir+", expected " + directionCode.east);

testsPassing &=TestRig.assertTrue(testModel.pointer.direction == directionCode.north, 
	"8. testModel.pointer.direction is "+testModel.pointer.direction+", expected " + directionCode.north);

//
// 9. Continue on x for -x, no new node should be created, last node is (5,3)
// at (3,3)
moveTo(--x, y);
testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 5, 
	"9. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 5);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == y, 
	"9. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"9. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"9. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.west, 
	"9. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.west);

testsPassing &=TestRig.assertTrue(testModel.backtrackDir == directionCode.east, 
	"9. testModel.pointer.backtrackDir is "+testModel.backtrackDir+", expected " + directionCode.east);

//
// 10. Backtrack on x and move in ++x direction, examine onTrack function
// at (4,3)
++x;
testsPassing &=TestRig.assertTrue((flag = testModel.onTrack(x,y)) == true, 
	"10. testModel.onTrack("+x+","+y+") is "+flag+", expected " + true);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 5, 
	"10. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 5);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 3, 
	"10. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+3);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"10. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"10. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.east, 
	"10. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.east);

testsPassing &=TestRig.assertTrue(testModel.backtrackDir == directionCode.east, 
	"10. testModel.pointer.backtrackDir is "+testModel.backtrackDir+", expected " + directionCode.east);

testsPassing &=TestRig.assertTrue((flag = testModel.nodeRevisited) == false, 
	"10. testModel.nodeRevisited is "+flag+", expected " + false);

//
// 11. Backtrack on x and move in ++x direction, should be sitting on last node, examine onTrack function
// at (5,3)
++x;
testsPassing &=TestRig.assertTrue((flag = testModel.onTrack(x,y)) == true, 
	"11. testModel.onTrack("+x+","+y+") is "+flag+", expected " + true);

testsPassing &=TestRig.assertTrue((flag = testModel.nodeRevisited) == true, 
	"11. testModel.nodeRevisited is "+flag+", expected " + true);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 5, 
	"11. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 5);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 3, 
	"11. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+3);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"11. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"11. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.east, 
	"11. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.east);

testsPassing &=TestRig.assertTrue(testModel.backtrackDir == directionCode.north, 
	"11. testModel.pointer.backtrackDir is "+testModel.backtrackDir+", expected " + directionCode.north);

//
// 12. Backtrack on x and move in --y direction, should past last node, examine onTrack function
// node (5,3) should be removed, last node becomes (5,2)
--y;
testsPassing &=TestRig.assertTrue((flag = testModel.onTrack(x,y)) == true, 
	"12. testModel.onTrack("+x+","+y+") is "+flag+", expected " + true);

testsPassing &=TestRig.assertTrue((flag = testModel.nodeRevisited) == true, 
	"12. testModel.nodeRevisited is "+flag+", expected " + true);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 5, 
	"12. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 5);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"12. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"12. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"12. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.north, 
	"12. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.north);

testsPassing &=TestRig.assertTrue(testModel.backtrackDir == directionCode.west, 
	"12. testModel.pointer.backtrackDir is "+testModel.backtrackDir+", expected " + directionCode.west);


//
// 13. move to (3,2), node (5,2) should be removed!
//
x = 3;
testsPassing &=TestRig.assertTrue((flag = testModel.onTrack(x,y)) == true, 
	"13. testModel.onTrack("+x+","+y+") is "+flag+", expected " + true);

testsPassing &=TestRig.assertTrue((flag = testModel.nodeRevisited) == false, 
	"13. testModel.nodeRevisited is "+flag+", expected " + false);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 1, 
	"13. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 1);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"13. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"13. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"13. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.west, 
	"13. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.west);

testsPassing &=TestRig.assertTrue(testModel.backtrackDir == directionCode.west, 
	"13. testModel.pointer.backtrackDir is "+testModel.backtrackDir+", expected " + directionCode.west);

//
// 14. From (3,2) move to (3,3)
//
++y;
testsPassing &=TestRig.assertTrue((flag = testModel.onTrack(x,y)) == false, 
	"14. testModel.onTrack("+x+","+y+") is "+flag+", expected " + false);

testsPassing &=TestRig.assertTrue((flag = testModel.nodeRevisited) == false, 
	"14. testModel.nodeRevisited is "+flag+", expected " + false);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[0] == 3, 
	"14. testModel.pointer.pos[0] is "+testModel.pointer.pos[0]+", expected "+ 3);

testsPassing &=TestRig.assertTrue(testModel.pointer.pos[1] == 2, 
	"14. testModel.pointer.pos[1] is "+testModel.pointer.pos[1]+", expected "+2);

testsPassing &=TestRig.assertTrue(testModel.lastX == x, 
	"14. testModel.pointer.lastX is "+testModel.lastX+", expected "+ x);

testsPassing &=TestRig.assertTrue(testModel.lastY == y, 
	"14. testModel.pointer.lastY is "+testModel.lastY+", expected "+y);

testsPassing &=TestRig.assertTrue(testModel.currentDir == directionCode.south, 
	"14. testModel.pointer.curretDir is "+testModel.currentDir+", expected " + directionCode.south);

testsPassing &=TestRig.assertTrue(testModel.backtrackDir == directionCode.north, 
	"14. testModel.pointer.backtrackDir is "+testModel.backtrackDir+", expected " + directionCode.north);

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