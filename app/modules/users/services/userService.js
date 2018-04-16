var Cobuild         = require('cobuild2');
var config          = Cobuild.config;
var User            = Cobuild.Utils.Files.getModel('users.User').User;
var userWorker      = {};
var mongoose        = require('mongoose');


userWorker.createUser = function createUser(data, res) {

    //log("User - createUser: ", data)
    return new Promise((resolve, reject) => {
     
        User.create(data, function(err, result) {
            if (err) return reject(err);
            
            return resolve(result)
        }); 

    });

};



module.exports = userWorker;