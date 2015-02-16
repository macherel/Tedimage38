var app    = require('express')();
var http   = require('http').Server(app);
var io     = require('socket.io')(http);

// Handlers
app.all('*', function(req, res, next) {
//	console.log(req);
	next();
});
// API
app.get('/api/:action/*', function(req, res){
	io.emit(req.params.action, req.params[0]);
	res.send();
});
// Public pages
var wwwOptions = { root: __dirname + '/www/' };
app.get('/', function(req, res){
	res.sendFile('index.html', wwwOptions);
});
app.get('/main.js', function(req, res){
	res.sendFile('main.js', wwwOptions);
});
app.get('/style.css', function(req, res){
	res.sendFile('style.css', wwwOptions);
});
app.get('/configuration.json', function(req, res){
	res.sendFile('configuration.json', wwwOptions);
});
// Resources
var options = { root: __dirname + '/data/' };
app.get('/:file', function(req, res){
	res.sendFile(req.params.file, options);
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});