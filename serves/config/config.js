var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../'),
    PORT = 3017;

module.exports = {
    development:{
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/matematikapplication',
        port: process.env.PORT || PORT
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admine:130784@ds055732.mongolab.com:55732/first-progect-db',
        port: process.env.PORT || PORT
    }

};