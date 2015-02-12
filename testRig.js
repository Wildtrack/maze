var TestRig = TestRig || {
	assertTrue: function(cond, message) {
		if(!cond) {
			console.log("Assertion failed: " + message);
		}
		return cond;
	}
};