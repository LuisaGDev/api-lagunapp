var express           = require('express');
var router            = express.Router();
var Cobuild         = require('cobuild2');
var config          = Cobuild.config;
var userCtrl        = Cobuild.Utils.Files.getController('cobuild.users.userController');
var authPolicyIsLoggedIn      = Cobuild.Policies.getPolicy('cobuild.'+config.authentication.strategy+'.isLoggedIn');
var authPolicyIsAdmin      = Cobuild.Policies.getPolicy('cobuild.'+config.authentication.strategy+'.isAdmin');
var i18n = require('i18n');

/*
 * Registers users routs in app
 */
module.exports = function userRoutes(app) {



router.post('/', userCtrl.create);

/**
 * @api {post} /api/v1/users/me Gets user on session
 * @apiHeader {String} Authorization bearer user oauth2 token
 * @apiName read
 * @apiGroup User
 * @apiDescription Gets user on session
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {JSON} response-example:
 *  {
 *   "data":
 *    {
 *      "gender": "Male",
 *      "email": "asdlkasldk@asdkjkda.com",
 *      "lastName": "asdads",
 *      "firstName": "asdads",
 *      "password": "$2a$10$NoJV5izPvB1HK2v./MgxC.x/8/wGUGmCf0SpIHBiPDdAHSyyzOwZa",
 *      "_id": "56a7c125706144ab0b2ab7e9",
 *      "updatedAt": "2016-01-26T18:55:33.800Z",
 *      "createdAt": "2016-01-26T18:55:33.800Z",
 *      "image": "http://simpleicon.com/wp-content/uploads/user1.png",
 *      "isActive": true,
 *      "role": "User"
 *    }
 * }
 *
 * @apiError {Object} error error object
 * @apiError (error) {Int} code server error code
 * @apiError (error) {String} userMessage friendly message to show 
 * @apiError (error) {String} serverInfo server information to know where the error come from
 * @apiError (error) {Object} data extra data to show or use if neccesary 
 *
 * @apiErrorExample {JSON}  Error-Example
 *
 *  {
 *     error:
 *     {
 *         "code": 401
 *         "userMessage": "Friendly Error String",
 *         "serverInfo": "model_controller_method_extraInfo",
 *         "data": {}
 *     } 
 *  }
 */
  router.get('/me', authPolicyIsLoggedIn, userCtrl.read);


  app.use('/api/'+config.apiVersion+'/users/',router);

};


