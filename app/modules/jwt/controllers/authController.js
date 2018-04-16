var async           = require('async');
var bcrypt          = require('bcrypt-nodejs');
var jwt             = require('jsonwebtoken');
var Cobuild         = require('cobuild2');
var _               = require('lodash');
var qs              = require('querystring');
var config          = Cobuild.config;
var User            = Cobuild.Utils.Files.getModel('users.User').User;
var authService     = Cobuild.Utils.Files.getEntity('jwt.authService','services');
var userService     = Cobuild.Utils.Files.getEntity('users.userService','services');
var express         = require('express');
var i18n            = require('i18n');

var app             = express(); 

var exports         = module.exports;




exports.login = function login( req, res ){
    log("jwt-authController-login...");
 
    var params = req.body;

    async.waterfall([
      function( callback ) { 
        User.findOne( { email: params.email }, function(err, user){
          if ( user ){
            return callback( null, user )
          }
          return callback('login_unknown_email');    
        }).lean();
      }, function( user, callback ) { 
        if(bcrypt.compareSync( params.password, user.password ) ){
            callback( null, user);
        }else{
            callback('login_wrong_password');   
        }
      }
    ], function(err, user){
      if(err){
        res.unauthorized({userMessage: i18n.__(err), data:params});

      }else{

        var response = _.clone(user)
        response.token =  authService.generateToken(user);
        delete response.password;
        
        res.ok({userMessage: i18n.__('login_success'), data: response});
      }
    });   
};

