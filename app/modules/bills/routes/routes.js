var Cobuild           = require('cobuild2');
var express           = require('express');
var router            = express.Router();
var billController   = require(Cobuild.Utils.Files.dirpath(__dirname)+'/controllers/billController');
var billValidator    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/validators/bill');



module.exports = function(app, limiter) {


/**
 * @api {post} /api/v1/bills Create a Bill
 * @apiName Bill - Create
 * @apiGroup Bill
 * @apiDescription Create a Bill into the database
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
  router.post('/', billController.create);


/**
 * @api {get} /api/v1/bills Read records for a Bill
 * @apiName Bill - Read
 * @apiGroup Bill
 * @apiDescription Read several Bill given conditions
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

  router.get('/', billController.list);

  

  /**
 * @api {get} /api/v1/bills/:id  Read a record for a Bill with given id
 * @apiName Bill - Read
 * @apiGroup Bill
 * @apiDescription Read one Bill given id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Bill
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
  router.get('/:id', billController.list);

/**
 * @api {put} /api/v1/bills Update a Bill
 * @apiName Bill - Update
 * @apiGroup Bill
 * @apiDescription Update a Bill given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Bill
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
  router.put('/', billValidator.haveId, billController.update);
  router.put('/:id', billValidator.haveId, billController.update);


/**
 * @api {delete} /api/v1/bills Delete a Bill instance
 * @apiName Bill - Delete
 * @apiGroup Bill
 * @apiDescription Delte a Bill given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Bill to be deleted
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
  router.delete('/', billController.destroy);
  router.delete('/:id', billController.destroy);
  
  console.log('/api/'+Cobuild.config.apiVersion+'/bills');
  app.use('/api/'+Cobuild.config.apiVersion+'/bills',router);

  

}