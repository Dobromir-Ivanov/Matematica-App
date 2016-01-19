var auth = require('./auth'),
    controllers = require('../controllers');


module.exports = function(app){
    app.get('/api/users/:id', controllers.users.getUserById);
    app.get('/api/users', auth.isAuthenticated, controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);
    app.delete('/api/users', auth.isAuthenticated, controllers.users.removeUser);

    app.get('/view/:partialsAria/:partialName', function(request, response){
        response.render(request.params.partialsAria +'/'+ request.params.partialName);
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api*//*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};



