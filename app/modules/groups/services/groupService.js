var Cobuild           = require('cobuild2');
var _                 = require('lodash');
var q                 = require('q');
var Group    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/models/group');

var exports           = module.exports;


exports.list = function list(requestData){

  var pagination = {
    limit : parseInt(requestData.query.limit) || 10,
    page  : parseInt(requestData.query.page) || 1

  };

  delete requestData.query.limit;
  delete requestData.query.page;

  var query = Cobuild.Utils.Request.formatQueryString(requestData.query);
  var sort = Cobuild.Utils.Request.formatSortString(requestData.query.sort );

  if(!_.isEmpty(sort)){
    pagination.sort = sort;
    delete query.sort;
  }
  
  var id = requestData.params.id || requestData.query.id;
  
  if(id !== undefined) {
    query._id = id;
  }

  return Group.paginate(query, pagination);

};
