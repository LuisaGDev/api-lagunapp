var Cobuild           = require('cobuild2');
var express           = require('express');
var router            = express.Router();
var groupController   = require(Cobuild.Utils.Files.dirpath(__dirname)+'/controllers/groupController');
var groupValidator    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/validators/group');



module.exports = function(app, limiter) {


/**
 * @api {post} /api/v1/groups Create a Group
 * @apiName Group - Create
 * @apiGroup Group
 * @apiDescription Create a Group into the database
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
  router.post('/', groupController.create);


/**
 * @api {get} /api/v1/groups Read records for a Group
 * @apiName Group - Read
 * @apiGroup Group
 * @apiDescription Read several Group given conditions
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

  router.get('/', groupController.list);



  /**
 * @api {get} /api/v1/groups/:id  Read a record for a Group with given id
 * @apiName Group - Read
 * @apiGroup Group
 * @apiDescription Read one Group given id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Group
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
  router.get('/:id', groupController.list);
 

/**
 * @api {put} /api/v1/groups Update a Group
 * @apiName Group - Update
 * @apiGroup Group
 * @apiDescription Update a Group given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Group
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
  router.put('/', groupValidator.haveId, groupController.update);
  router.put('/:id', groupValidator.haveId, groupController.update);


/**
 * @api {delete} /api/v1/groups Delete a Group instance
 * @apiName Group - Delete
 * @apiGroup Group
 * @apiDescription Delte a Group given their id
 * @apiVersion 1.0.0
 *
 * @apiParam {string} id of the Group to be deleted
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
  router.delete('/', groupController.destroy);
  router.delete('/:id', groupController.destroy);
  
  console.log('/api/'+Cobuild.config.apiVersion+'/groups');
  app.use('/api/'+Cobuild.config.apiVersion+'/groups',router);

  

}