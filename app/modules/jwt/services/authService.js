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

exports.getRequestToken = function(params){
  
    var defer = q.defer();
    errObject.serverInfo = "jwt_authService_getRequestToken"


    // Step 1. Obtain request token for the authorization popup.
    request.post(params, function(err, response, body) {
      

      if(err){

        errObject.data = err
        return defer.reject(errObject);
      }

      if(response.statusCode == '500'){

        errObject.code = 500
        errObject.data = response
        return defer.reject(errObject);
      }else if( response.statusCode == '401'){  

        var body = response.body
        var json = JSON.parse(body);

        err = json.errors.length > 0 ? json.errors[0] : json.errors;

        errObject.code = err.code
        errObject.userMessage = err.message
        errObject.data = params.url

        return defer.reject(errObject);
      }
      
      var oauthToken = qs.parse(body);
      

      if(oauthToken){
        log('oauthToken:', oauthToken)
        return defer.resolve(oauthToken);
      }
      
      return defer.reject({error:'invalid-request'});

    });

    return defer.promise;
}

/**
 * Exchange authentication code for access token
 * @param  {String} url    URL of the service to get access token
 * @param  {Object} params Parameters required to service to get access token
 * @return {Q.Promise}     Q.promise
 */
exports.exchangeCodeForToken = function(params) {
  var defer = q.defer();
  errObject.serverInfo = "jwt_authService_exchangeCodeForToken"

  request.post(params, function(err, response, token) {
    
    if(err){
      errObject.data = err
      return defer.reject(errObject);
    }
    
    if(response.statusCode == '500'){
      errObject.code = 500
      errObject.data = response
      return defer.reject(response);
    }
    
    if(token){
      return defer.resolve(token);
    }
    
    errObject.userMessage = i18n.__("invalid_request")
    return defer.reject(errObject);

  });

  return defer.promise;
};

/**
 * Retrieve user profile from a given url/social network
 * @param  {String} url         URL where to get the profile information
 * @param  {Object} headers     Headers required by the endpoint
 * @param  {Object} extraParams Extra parameters to be sent on the request
 * @return {Q.Promise}          Q.Promise
 */
exports.retrieveProfileInformation = function(url, headers, extraParams, social, token){
  
  var defer = q.defer();
  errObject.serverInfo = "jwt_authService_retrieveProfileInformation"

  if (social == 'twitter'){

    var outh = new oauth.OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
		Cobuild.config.twitter.clientId, Cobuild.config.twitter.secret, "1.0A", this.callback, "HMAC-SHA1");

    var endpoint = "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true";
    
    outh.get(endpoint, token.oauth_token, token.oauth_token_secret, function(error, data, response) {
      if (error) {
        errObject.userMessage = error;
        errObject.data = error;
        return defer.reject(error);
      } else {
        try {
          var parsedData = JSON.parse(data);
          return defer.resolve(parsedData);
        } catch (e) {
          return defer.resolve(data);
        }
      }
    });
    
  } else { 

    var params = { 
      url: url
    };

    if(!_.isEmpty(headers)){
      params.headers = headers;
    }

    params = _.extend(params, extraParams);

    request.get( params, function(err, response, profile) {


      if(err){
        errObject.userMessage = err
        errObject.data = err
        return defer.reject(err);
      }
      
      if(response.statusCode != 200){

        errObject.code = response.statusCode

        var body = response.body


        errObject.code = body.error.code
        errObject.userMessage = body.error.message
        errObject.data = body.error.errors

        return defer.reject(errObject);
      }
      
      if(profile){
        
        return defer.resolve(profile);
        
      } else {
        errObject.userMessage =  i18n.__("invalid_request")
        return defer.reject(errObject);
      }
    });
  }

  return defer.promise;
};


exports.buildSocialRequestTokenRequest = function(req){
  var request = {};

  switch(req.params.social){
    case 'twitter':
      request.url = 'https://api.twitter.com/oauth/request_token';
      request.oauth = {
        consumer_key: Cobuild.config.twitter.clientId,
        consumer_secret: Cobuild.config.twitter.secret,
        oauth_callback: req.body.redirectUri
      }
    break;
    default:
    break;
  }

  return request;
}


exports.buildSocialExchangeRequest = function(req){
  
  var request = {json:true};

  switch(req.params.social){
    case 'facebook':
      
      var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
      
      request.url = 'https://graph.facebook.com/v2.5/oauth/access_token';
      request.profileUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
      request.qs = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: Cobuild.config.facebook.secret,
        redirect_uri: req.body.redirectUri
      };

    break

    case 'google':
      request.url = 'https://accounts.google.com/o/oauth2/token';
      request.profileUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
      request.form = {
        grant_type: 'authorization_code',
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: Cobuild.config.google.secret,
        redirect_uri: req.body.redirectUri        
      };
    break;

    case 'twitter':
    
      request.url =  'https://api.twitter.com/oauth/access_token';
      request.profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';
      request.oauth = {
        consumer_key: Cobuild.config.twitter.clientId,
        consumer_secret: Cobuild.config.twitter.secret,
        token: req.body.oauth_token,
        verifier: req.body.oauth_verifier,
        oauth_callback: req.body.redirectUri
      };

    break;

    default:
    break;
  }

  return request;
  

}

exports.buildSocialProfileRequest = function (socialNetwork, token) {
  
  var headers = {};
  var params = {json:true};

  switch(socialNetwork){
    case 'facebook':
      
      var hash = crypto.createHmac('sha256',Cobuild.config.facebook.secret );
      hash.update(token.access_token);
      token.appsecret_proof = hash.digest('hex');
      params.qs = token;

    break;

    case 'google':
      headers.Authorization = 'Bearer ' + token.access_token;
    break;

    case 'twitter':
      params.oauth = {
        consumer_key: Cobuild.config.twitter.clientId,
        consumer_secret: Cobuild.config.twitter.secret,
        oauth_token: token.oauth_token
      };
    break;
  }

  return {
    headers:headers,
    params: params
  };
}
