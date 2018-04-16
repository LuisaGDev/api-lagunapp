var Cobuild = require('cobuild2');
var validator = require(Cobuild.paths.app+'/validators/loginValidator')
var authController = Cobuild.Utils.Files.getController('auth.jwt.authController');
var config = Cobuild.config;
var i18n = require('i18n');

/*
 * JWT authentication routes
 */

module.exports = function authenticationRoutes(app) {
  
 /**
 * @api {post} /api/v1/login Login 
 * @apiName Login
 * @apiGroup JWT Authentication
 * @apiDescription Login a user with email and password using JWT strategy
 * @apiVersion 1.0.0
 *
 * @apiParam {string} email user's email
 * @apiParam {string} password user's password
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "email"         : "whoiam@rokk3rlabs.com", 
 *  "password"      : "mySecurePassword!" 
 * }
 *
 * @apiSuccessExample {JSON} response-example:
 *  {
 *      "data":
 *      {
 *          "_id"          : "56a7c125706144ab0b2ab7e9",
 *          "firstName"    : "asdads",
 *          "lastName"     : "asdads",
 *          "email"        : "asdlkasldk@asdkjkda.com",
 *          "token"        : "eyJ0eXAiOiJKV1QiLCJhbGciOiJ9.eyJfaW4iOjYzMLCJpYNjM0NTAyOTh9.n964A95bnIgerP_QWoDX7Z8P1rOJw"
 *      }
 * }
 *
 *
 * @apiError {Object} error error object
 * @apiError (error) {Int} code server error code
 * @apiError (error) {String} userMessage friendly message to show 
 * @apiError (error) {String} serverInfo server information to know where the error come from
 * @apiError (error) {Object} additional data to show or use if neccesary 
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

    
  app.route('/api/'+config.apiVersion+'/login')
   .post(validator.emptyFields, validator.fieldsFormat, authController.login);



};
