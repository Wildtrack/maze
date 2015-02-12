var TestRig = TestRig || {
	log:[],
	assertTrue: function(cond, message) {
		if(!cond) {
			TestRig.log.push("Assertion failed: " + message);
		}
		return cond;
	}
};