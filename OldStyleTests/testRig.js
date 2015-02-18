var TestRig = TestRig || {
	log:[],passing:true,verboseMode:false,
	assertTrue: function(cond, message, verbose) {
		TestRig.passing &= cond;
		if(!cond) {
			TestRig.log.push("Assertion failed: " + message);
		} else {
			if(verbose || TestRig.verboseMode)
			{
				TestRig.log.push("Assertion passed: " + message);
			}
		}
		return cond;
	},
	report: function() {
		return (TestRig.passing? "All tests passed\n":"Tests failed\n") + TestRig.log.join("\n");
	},
	reset: function() {
		TestRig.log = [];
		TestRig.passing = true;
	},
	fillLog: function(id) {
		var span = $('#'+id);
		if(span != null)
		{
			span.html(this.report().replace(/\n/g,"<br />"));
		}
	},
	//http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
	arrEquals: function(th, array) {
		// if the other array is a falsy value, return
		if (!array)
			return false;

		// compare lengths - can save a lot of time
		if (th.length != array.length)
			return false;

		for (var i = 0, l=th.length; i < l; i++) {
			// Check if we have nested arrays
			if (th[i] instanceof Array && array[i] instanceof Array) {
				// recurse into the nested arrays
				if (!th[i].equals(array[i]))
					return false;
			}
			else if (th[i] != array[i]) {
				// Warning - two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}
    	return true;
	}
};