var Cobuild           = require('cobuild2');
var _                 = require('lodash');
var q                 = require('q');
var Service    = require(Cobuild.Utils.Files.dirpath(__dirname)+'/models/service');

var exports           = module.exports;

exports.create = function create(service, user) {
  console.log("CREATE SERVICE " , user)
  return new Promise((resolve, reject) => {
    service.userId = _.has(user, '_id' ) ? user._id : 'No found';
    Service.create(service, function(err, response){
      if(err) return reject(err);
  
      resolve(response);
    });
  });
}

exports.list = function list(requestData, user){

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
  if(_.has(user, '_id' )) query.userId = user._id

  return Service.paginate(query, pagination);

};
