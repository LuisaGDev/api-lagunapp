var Cobuild                     = require('cobuild2');
var _                           = require('lodash');
var Bill              = require(Cobuild.Utils.Files.dirpath(__dirname)+'/models/bill');
var billService    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/services/billService');

var exports                     = module.exports;

exports.create = function(req, res) {
  
  Bill.create(req.body, function(err, record) {
    if(err){
      res.badRequest(err);
    }else{
      res.ok(record);
    }
  });

};

exports.list = function(req, res) {
  
  var id = req.params.id || req.query.id;

  billService
  .list(req)
  .then(
    
    function success(result){
      if(id !== undefined){
        res.ok((result && result.data.length > 0)? result.data[0] : {});
      }else{
        res.ok(result);  
      }
    },

    function error(err){
      res.badRequest(err);
    });
  

};


exports.update = function(req, res){

  var id = req.body.id || req.body._id  || req.params.id;

  var data = _.clone(req.body);
  delete data.id;

  
  Bill.update({_id: id}, {$set:data}, function(err, updated) {
    if(err){
      res.badRequest(err);
    }else{
      Bill.findById(id, function (err, record) {
        if(err){
          res.badRequest(err);
        }else{
          res.ok(record);
        }
      })
      
    }
  });

};

exports.destroy = function(req, res) {
  
  var id = req.body.id || req.params.id;

  Bill.remove({ _id: id }, function(err, result) {
    
    if(err){
      res.badRequest(err);
    }else{
      res.ok({id: id});
    }
  });

};

