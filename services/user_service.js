var User = require('../models/user');

var UserService = {

      register: function(email, password, username) {
          return new Promise((resolve, reject) => {
              // check if the user with same email already exists or not
              User.findOne({ email: email }, function(error, user) {
                  if (error) return reject(error);
                  if (user) {
                      return reject("already exists");
                  }
              });
              // save new user
              var newUser = new User({
                  email: email,
                  password: password,
                  username: username
              });
              newUser.save(function(error, user) {
                  if (error) return reject(error);
                  return resolve(user);
              });
          })
      },

      login: function(email, password) {
          return new Promise((resolve, reject) => {
              // fetch user and test password verification
              User.findOne({ email: email }, function(error, user) {
                  if (error) return reject(error);
                  if (!user) {
                      return reject("user account does not exist");
                  }
                  
                  user.comparePassword(password, function(error, isMatch) {
                      if (error) return reject(error);
                      if (isMatch == true) {
                          return resolve(user);
                      } else {
                          return reject("password is wrong");
                      }
                  });
              });
          });
      }
};

module.exports = UserService;
