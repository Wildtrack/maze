var express = require('express');
var app = express();
var port = process.env.PORT || 80;
app.use(express.static(__dirname + '/public'));
app.listen(port, function() {
	console.log("Our app is running on http://localhost:" + port);
});