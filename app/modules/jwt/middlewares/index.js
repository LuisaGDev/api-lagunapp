var Cobuild       = require('cobuild2');
var User          = Cobuild.Utils.Files.getModel('users.User').User;
var authService   = Cobuild.Utils.Files.getEntity('jwt.authService','services');

var exports = module.exports;

exports.loadUserFromRequest = function loadUserFromRequest( req, res, next ) {

    authService.verifyAuthToken(req, function verifyAuthToken( err, decodedData ) {
        
        if( !err && decodedData ){
          
            User.findById( decodedData._id ).lean().exec( function ( err, user ) {
                
                if( !err && user ){
                    delete user.password
                    user.id = user._id;                    
                    req.user = user;
                }
                next();

            });

        }else{
            next();
        }

    });

};