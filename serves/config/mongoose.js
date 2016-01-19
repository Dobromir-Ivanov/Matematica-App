// Database
var mongoose = require('mongoose'),
    UserModel = require('../data/models/user');

module.exports = function(config){
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function(err){
        if(err){
            console.log('Error to database is not to open: ' + err);
            return;
        }
        console.log('Database up end running ...');
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
        return;
    });

    UserModel.init();
};