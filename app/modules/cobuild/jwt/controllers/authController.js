var async           = require('async');
var bcrypt          = require('bcrypt-nodejs');
var jwt             = require('jsonwebtoken');
var Cobuild         = require('cobuild2');
var _               = require('lodash');
var qs              = require('querystring');
var config          = Cobuild.config;
var User            = Cobuild.Utils.Files.getModel('cobuild.users.User').User;
var authService     = Cobuild.Utils.Files.getEntity('cobuild.jwt.authService','services');
var userService     = Cobuild.Utils.Files.getEntity('cobuild.users.userService','services');
var express         = require('express');
var app             = express(); 
var exports         = module.exports;
var errObject       = {
  code:401,
  userMessage:"",
  serverInfo: "",
  data:{}
}


exports.login = function login( req, res ){
    log("jwt-authController-login...");
 
    var params = req.body;

    async.waterfall([
      function( callback ) { 
        User.findOne( { email: params.email }, function(err, user){
          if ( user ){
            return callback( null, user )
          }
          return callback( 'unknown_email' );    
        }).lean();
      }, function( user, callback ) { 
        if(bcrypt.compareSync( params.password, user.password ) ){
            callback( null, user);
        }else{
            callback( 'wrong_password' );   
        }
      }
    ], function(err, user){
      if(err){
        errObject.userMessage = err
        errObject.serverInfo = "jwt_authController_login"
        res.unauthorized( errObject );
      }else{
        var response = _.clone(user)
        response.token =  authService.generateToken(user);
        delete response.password;
        res.ok(response);
      }
    });   
};

