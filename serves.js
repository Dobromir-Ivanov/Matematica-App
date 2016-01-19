var express = require('express');


// cmd set NODE_ENV=development or production
var env = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./serves/config/config')[env];

require('./serves/config/express')(app, config);
require('./serves/config/mongoose')(config);
require('./serves/config/passport')();
require('./serves/config/routes')(app);


app.listen(config.port);
console.log("Work environment: " + env);
console.log("Servece runing on port: " + config.port);