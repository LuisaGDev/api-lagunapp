var Cobuild         = require('cobuild2');
var _               = require('lodash');
var jwt             = require('jsonwebtoken');
var request         = require('request');
var q               = require('q');
var crypto          = require('crypto');
var qs              = require('querystring');
var i18n            = require('i18n');
var oauth           = require("oauth");
var exports         = module.exports;
var errObject       = {
  code:401,
  userMessage:"",
  serverInfo: "",
  data:{}
}


/**
 * Generates jwt token
 * @param  {Object}  user User instance
 * @param  {Function} cb   Optional function to return the token on a callback
 * @return String        Return the jwt token
 */
exports.generateToken = function(user, cb){
    var payload = { "_id": user._id, 'expiresIn': Cobuild.config.jwt['tokenLife'] };
    var secret = Cobuild.config.authentication['tokenSecret'];
    // Generate token with given data
    var token = jwt.sign( payload, secret );
    //Add compatibility for oauth module
    if(cb && typeof cb == 'function'){
      cb(null, token);
    }
    return token;
};


/**
 * Verify the presence and validity of jwt token
 * @param  {Object}   req      Express Request Object
 * @param  {Function} callback Callback function
 */
exports.verifyAuthToken = function(req, callback){
    
  if(req.headers.authorization){
      
    var authInfo = req.headers.authorization.split(' ')
    
    if(authInfo.length == 2){
        
        var token = _.trim(authInfo[1]);
        
        jwt.verify(token, Cobuild.config.authentication.tokenSecret, callback);

    }else{
        callback( { error:'invalid-token-info' } )
    }

  }else{

      callback( { error:'no-token-present' } )

  }

};