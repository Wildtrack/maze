var testsPassing = true;
var testsFinished = false

TestRig.verboseMode = true;

//
testsPassing &=TestRig.assertTrue(true, "If you see this message TesRig is NOT working properly!");
testsPassing &=TestRig.assertTrue(false, "TestRig is working properly");


// Manually test backtrack.js
var modelTest = new AMaze.model.Maze();


done();


function done()
{
	var span = $('#log');
	if(span != null)
	{
		span.html(TestRig.report().replace(/\n/g,"<br />"));
	}
}