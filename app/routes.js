var Todo = require('./models/todo');

module.exports = function(app) {

	app.get('/todos', function(request, response){
		Todo.find(function(err, todos){
			if (err) {
				response.send(err);
			}
			response.json(todos);
		});
	});

// curl -H "Content-Type: application/json" -X POST -d {"text":"Hello World"}' http://localhost:3000/todos
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

};