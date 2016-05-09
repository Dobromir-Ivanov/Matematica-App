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
        db: 'mongodb://admine:..............................', //hidden code
        port: process.env.PORT || PORT
    }

};
