
var Cobuild = require('cobuild2');
var config 	= Cobuild.config;
var _       = require('lodash');
var i18n    = require('i18n');

var isLoggedIn = function(req, res, next) {
    
    (!!req.user) ? next() : res.unauthorized();
    
}



var policies = {  
	isLoggedIn: isLoggedIn
};

module.exports = policies;