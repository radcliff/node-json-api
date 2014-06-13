var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var database = require('./config/database');

mongoose.connect(database.url);

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

require('./app/routes')(app);

app.listen(port);
console.log("=> listening on port " + port);
