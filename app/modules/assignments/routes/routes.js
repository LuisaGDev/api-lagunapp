var Cobuild           = require('cobuild2');
var express           = require('express');
var router            = express.Router();
var assignmentController   = require(Cobuild.Utils.Files.dirpath(__dirname)+'/controllers/assignmentController');
var assignmentValidator    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/validators/assignment');



module.exports = function(app, limiter) {

  /**
  *   Limiter
  *     For more info see: https://www.npmjs.com/package/express-limiter
  */

  if (limiter){
    // Here insert the rules for use limiter.
    // Example
    limiter({
      path: '/api/'+Cobuild.config.apiVersion+'/assignments/health',
      method: 'get',
      lookup: ['connection.remoteAddress'],
      // 10 requests per 10 seconds
      total: 10,
      expire: 1000 * 10 ,
      onRateLimited: function (req, res, next) {
        next({ message: 'Rate limit exceeded', status: 400 })
      }
    });
  } 

  /**
  * The Policies load when init a server, in that policies are some validations like:
  * isLoggedIn or isAdmin
  * To use:
  * 
  * var authPolicyIsLoggedIn      = Cobuild.Policies.getPolicy('cobuild.'+config.authentication.strategy+'.isLoggedIn');
  * var authPolicyIsAdmin      = Cobuild.Policies.getPolicy('cobuild.'+config.authentication.strategy+'.isAdmin');
  * 
  * On the declaretion of end-point call a policy
  *
  * router.put('/', authPolicyIsLoggedIn, Ctrl.update);
  *
  */
  
	router.get('/health', function(req, res) {
    
     return res.status(200).send('ok');
  });

/**
 * @api {post} /api/v1/assignments Create a Assignment
 * @apiName Assignment - Create
 * @apiGroup Assignment
 * @apiDescription Create a Assignment into the database
 * @apiVersion 1.0.0
 *
 * @apiParam {String} title A random title param of this record
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "title": "Hello world"
 * }
 *
 * @apiSuccessExample {JSON} response-example:
 * {
 *   "__v": 0,
 *   "title": "Hello world",
 *   "_id": "573f2904e383af8c2e612b5e"
 * }
 */  
  router.post('/', assignmentController.create);


/**
 * @api {get} /api/v1/assignments Read records for a Assignment
 * @apiName Assignment - Read
 * @apiGroup Assignment
 * @apiDescription Read several Assignment given conditions
 * @apiVersion 1.0.0
 * 
 *
 * @apiParamExample {json} Request-Example:
 * {
 * }
 * 
 * @apiSuccessExample {JSON} response-example:* 
 * [
 *   {
 *     "_id": "573f5e2bd661390c453a64d8",
 *     "title": "Hello world",
 *     "__v": 0
 *   },
 *   {
 *     "_id": "573f5e2cd661390c453a64d9",
 *     "title": "Hello world",
 *     "__v": 0
 *   },
 *   {
 *     "_id": "573f5e33d661390c453a64da",
 *     "title": "Hello world 2",
 *     "__v": 0
 *   },
 *   {
 *     "_id": "573f5e36d661390c453a64db",
 *     "title": "Hello world 3",
 *     "__v": 0
 *   },
 *   {
 *     "_id": "573f5e3ad661390c453a64dc",
 *     "title": "Hello world 4",
 *     "__v": 0
 *   }
 * ]
 */

  router.get('/', assignmentController.list);

  /**
 * @api {get} /api/v1/assignments/:id  Read a record for a Assignment with given id
 * @apiName Assignment - Read
 * @apiGroup Assignment
 * @apiDescription Read one Assignment given id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Assignment
 *
 * @apiParamExample {json} Request-Example:
 * {
 * }
 * 
 * @apiSuccessExample {JSON} response-example:* 
 
 *   {
 *     "_id": "573f5e2bd661390c453a64d8",
 *     "title": "Hello world",
 *     "__v": 0
 *   }
 */
  router.get('/:id', assignmentController.list);



 

/**
 * @api {put} /api/v1/assignments Update a Assignment
 * @apiName Assignment - Update
 * @apiGroup Assignment
 * @apiDescription Update a Assignment given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Assignment
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "title": "Hello world 2",
 *   "id": "573f22b74db4608025e7abf4"
 * }
 *
 * @apiSuccessExample {JSON} response-example:
 * {
 *   "__v": 0,
 *   "title": "Hello world 2",
 *   "_id": "573f22b74db4608025e7abf4"
 * }
 */ 
  router.put('/', assignmentValidator.haveId, assignmentController.update);
  router.put('/:id', assignmentValidator.haveId, assignmentController.update);


/**
 * @api {delete} /api/v1/assignments Delete a Assignment instance
 * @apiName Assignment - Delete
 * @apiGroup Assignment
 * @apiDescription Delte a Assignment given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Assignment to be deleted
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "id": "573f22b74db4608025e7abf4"
 * }
 *
 * @apiSuccessExample {JSON} response-example:
 * {
 *   "_id": "573f22b74db4608025e7abf4"
 * }
 */ 
  router.delete('/', assignmentController.destroy);
  router.delete('/:id', assignmentController.destroy);
  
  console.log('/api/'+Cobuild.config.apiVersion+'/assignments');
  app.use('/api/'+Cobuild.config.apiVersion+'/assignments',router);

  

}