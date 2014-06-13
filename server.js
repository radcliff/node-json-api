var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://'+process.env.USERNAME+':'+process.env.PASSWORD+'@novus.modulusmongo.net:27017/v2ytUwab');

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

var Todo = mongoose.model('Todo', {
	text: String
});

app.get('/todos', function(request, response){
	Todo.find(function(err, todos){
		if (err) {
			response.send(err);
		}
		response.json(todos);
	});
});

app.post('/todos', function(request, response){
	Todo.create({
		text : request.body.text,
		done : false
	}, function(err, todo) {
		if (err) {
			response.send(err);	
		}
		Todo.find(function(err, todos){
			if (err) {
				response.send(err);
			}
			response.json(todos);	
		});
	});
});

app.delete('/todos/:todo_id', function(request, response){
	Todo.remove({
		_id : request.params.todo_id
	}, function(err, todo) {
		if (err) {
			response.sender(err);
		}
		Todo.find(function(err, todos){
			if (err) {
				respnse.send(err);
		}
		response.json(todos);
		});
	});
});

app.get('*', function(request, response) {
	response.sendfile('./public/index.html');
});

app.listen(port);
console.log("=> listening on port " + port);
