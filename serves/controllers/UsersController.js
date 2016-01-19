var encryption = require('../utilities/encryption');
var Users = require('../data/users');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function(req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        if(newUserData.roles != 'admin'){
            newUserData.points = 0;
            newUserData.bonusPoints = 0;
            newUserData.tasksResolved = 0;
            newUserData.roles = 'user';
            newUserData.message = 'Ciao ' + newUserData.username + ', ti alguriamo buon divertimento!';
        }

        User.findOne({username: newUserData.username},function(err, user) {
            // In case of any error return
            if (err) {
                console.log('Error in SignUp: ' + err);
                return;
            }
            // already exists
            if (user) {
                console.log('User already exists');
                return res.send({success: false});
            } else {

                // create the user
                Users.create(newUserData, function(err, user) {

                    if (err) {
                        console.log('Failed to register new user: ' + err);
                        return;
                    }

                    req.logIn(user, { session: true}, function(err) {
                        if (err) {
                            res.status(400);
                            return res.send({reason: err.toString()});
                        }

                        res.send({success: true, user: user});
                    })
                });

            }
        });
    },
    updateUser: function(req, res, next) {
        var updatedUserData = req.body;
        User.update({_id: req.body._id}, updatedUserData, function() {
            res.end();
        })
    },
    removeUser: function(req, res, next) {
        var deliteUserData = req.query;

        User.remove({_id: deliteUserData._id}, function(err) {
            if(err) console.log(err);
           res.end();
        })
    },
    getUserById: function(req, res, next) {

        console.log(req.body);
        User.findOne({_id: req.params.id}).exec(function(err, course) {
            if (err) {
                console.log('User could not be loaded: ' + err);
            }

            res.send(course);
        })
    },
    getAllUsers: function(req, res) {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    }
}