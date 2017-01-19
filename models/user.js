var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    id: ObjectId,
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, index: { unique: true }},
    /* phone: { type: Number, index: { unique: true }},*/
    age: { type: Number },
    active: { type: Boolean },
    token: { type: String },
    loginMethod: { type: Number },
    created: { type: Date }
});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
/*
UserSchema.methods.login = function(loginUser) {

    if (loginUser == undefined) {
        return;
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
        if (error) {
            return next(error);
        }
        // hash the password using our new salt
        bcrypt.hash(loginUser.password, salt, function(error, hashedPassword) {
            if (error) {
                return next(error);
            }

            User.findOne({ 'username' : loginUser.username, 'password': hashedPassword }, function(error, user) {
                if (error) {
                    throw err;
                }

                return user;
            });
        });
    });
}
*/

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
