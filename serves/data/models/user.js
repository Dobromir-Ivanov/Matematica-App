var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

module.exports.init = function() {
    var userSchema = mongoose.Schema({
        username: { type: String, unique: true },
        email: String,
        age: Number,
        salt: String,
        roles: [String],
        message: String,
        hashPass: String,
        points: Number,
        bonusPoints: Number,
        tasksResolved: Number
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }else {
                return false;
            }
        }
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '1234');
            User.create({username: 'admin', salt: salt, hashPass: hashedPwd, roles: ['admin']});
        }
    })
};