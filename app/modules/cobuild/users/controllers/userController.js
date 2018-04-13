"use strict";
var Cobuild     = require('cobuild2');
var i18n              = require('i18n');
var userService = Cobuild.Utils.Files.getEntity('cobuild.users.userService','services');
var userCtrl = {};
var _ = require('lodash');

var config = Cobuild.config;
var authService = Cobuild.Utils.Files.getEntity('cobuild.' + config.authentication.strategy + '.authService', 'services');
var async = require('async');
var mongoose        = require('mongoose');


var errObj = {
    userMessager: "",
    data: {}
}

var errorFormat = function(err, res){
    if (typeof err === 'string') {
      errObj.userMessage = res.__(err)
    } else {
      if (err.toString().indexOf('email_already_exist') > -1 ){
        errObj.userMessage = res.__("email_already_exists")
      }else{
        errObj.userMessage = res.__("server_error")
      }
      errObj.data = err
    }
    return errObj
}


userCtrl.read = function read(req, res) {
    res.ok(req.user);
};

userCtrl.create = function create(req, res) {
 
    userService.createUser(req.body)
    .then((createdUser) => { 

        var user = createdUser.toObject();

        authService.generateToken(createdUser, function(err, token) {
  
            if(err) return res.badRequest(errorFormat(err, res))

            if (!err && token) user.token = token;
        
            delete user.password;

            res.ok({data: user, userMessage: i18n.__('success_user_add')})
            

        });

    })
    .catch((err) => {
        errObj.data = req.body;
        res.badRequest(errorFormat(err, res))

    });
    
}; 


module.exports = userCtrl;