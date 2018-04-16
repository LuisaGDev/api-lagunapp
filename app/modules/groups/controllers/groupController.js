var Cobuild                     = require('cobuild2');
var _                           = require('lodash');
var Group              = require(Cobuild.Utils.Files.dirpath(__dirname)+'/models/group');
var groupService    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/services/groupService');

var exports                     = module.exports;

exports.create = function(req, res) {
  
  Group.create(req.body, function(err, record) {
    if(err){
      res.badRequest(err);
    }else{
      res.ok(record);
    }
  });

};

exports.list = function(req, res) {
  
  var id = req.params.id || req.query.id;

  groupService
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

  
  Group.update({_id: id}, {$set:data}, function(err, updated) {
    if(err){
      res.badRequest(err);
    }else{
      Group.findById(id, function (err, record) {
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
  

  Group.remove({ _id: id }, function(err, result) {
    
    if(err){
      res.badRequest(err);
    }else{
      res.ok({id: id});
    }
  });

};

