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

/**
 * @api {post} /api/v1/users/ Creates an user
 * @apiGroup User
 * @apiDescription Create an user who can start use the app
 * @apiVersion 1.0.0
 * @apiParam {string} email user's email
 * @apiParam {string} password user's password
 * @apiParam {string} firstName user's first name
 * @apiParam {string} lastName user's last name
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "email"     : "whoiam@rokk3rlabs.com", 
 *  "password"  : "mySecurePassword!" ,
 *  "firstName" : "dsads",
 *  "lastName"  : "dasdasd"
 * }
 *
 * @apiSuccessExample {JSON} response-example:
 *  {
 *   "data":
 *    {
 *      "email": "asdlkasldk@asdkjkda.com",
 *      "lastName": "asdads",
 *      "firstName": "asdads",
 *      "password": "$2a$10$NoJV5izPvB1HK2v./MgxC.x/8/wGUGmCf0SpIHBiPDdAHSyyzOwZa",
 *      "_id": "56a7c125706144ab0b2ab7e9",
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJ9.eyJfaW4iOjYzMLCJpYNjM0NTAyOTh9.n964A95bnIgerP_QWoDX7Z8P1rOJw"
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
 *         "code": 400
 *         "userMessage": "Friendly Error String",
 *         "serverInfo": "model_controller_method_extraInfo",
 *         "data": {}
 *     } 
 *  }
 */

router.post('/', userCtrl.create);

/**
 * @api {get} /api/v1/users/me Gets user on session
 * @apiHeader {String} Authorization bearer user oauth2 token
 * @apiGroup User
 * @apiDescription Gets user on session
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {JSON} response-example:
 *  {
 *   "data":
 *    {
 *      "email": "asdlkasldk@asdkjkda.com",
 *      "lastName": "asdads",
 *      "firstName": "asdads",
 *      "password": "$2a$10$NoJV5izPvB1HK2v./MgxC.x/8/wGUGmCf0SpIHBiPDdAHSyyzOwZa",
 *      "_id": "56a7c125706144ab0b2ab7e9",
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


