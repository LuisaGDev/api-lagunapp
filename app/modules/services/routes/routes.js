var Cobuild           = require('cobuild2');
var express           = require('express');
var router            = express.Router();
var serviceController   = require(Cobuild.Utils.Files.dirpath(__dirname)+'/controllers/serviceController');
var serviceValidator    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/validators/service');



module.exports = function(app, limiter) {

/**
 * @api {post} /api/v1/services Create a Service
 * @apiName Service - Create
 * @apiGroup Service
 * @apiDescription Create a Service into the database
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
  router.post('/', serviceController.create);


/**
 * @api {get} /api/v1/services Read records for a Service
 * @apiName Service - Read
 * @apiGroup Service
 * @apiDescription Read several Service given conditions
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

  router.get('/', serviceController.list);

  /**
 * @api {get} /api/v1/services/:id  Read a record for a Service with given id
 * @apiName Service - Read
 * @apiGroup Service
 * @apiDescription Read one Service given id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Service
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
  router.get('/:id', serviceController.list);



/**
 * @api {put} /api/v1/services Update a Service
 * @apiName Service - Update
 * @apiGroup Service
 * @apiDescription Update a Service given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Service
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
  router.put('/', serviceValidator.haveId, serviceController.update);
  router.put('/:id', serviceValidator.haveId, serviceController.update);


/**
 * @api {delete} /api/v1/services Delete a Service instance
 * @apiName Service - Delete
 * @apiGroup Service
 * @apiDescription Delte a Service given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Service to be deleted
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
  router.delete('/', serviceController.destroy);
  router.delete('/:id', serviceController.destroy);
  
  console.log('/api/'+Cobuild.config.apiVersion+'/services');
  app.use('/api/'+Cobuild.config.apiVersion+'/services',router);

  

}