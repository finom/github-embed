var express = require('express');
var app = express();
var compression = require('compression');

app.use(compression());

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
	res.sendFile('/static/index.html', {
		root: __dirname
	});
});

app.get('/v0/*', function (req, res) {
	res.sendFile('/static/v0/embed.html', {
		root: __dirname
	});
});


var server = app.listen( require('optimist').argv.port || 3001);