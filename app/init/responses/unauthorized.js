/** 
 *
 * This will be available in controllers as res.unauthorized(data);
 * api/responses/ok.js
 * 401 (unauthorized) Response
 *
 * Usage:
 * return res.unauthorized();
 * return res.unauthorized(data);
 *
 * @param  {Object} message
 */

module.exports = function(responseData) {

  if(responseData && responseData._doc)
    responseData = responseData._doc;

  if(!responseData)
    responseData = {};

  var res = this;

  var responseObj = {
    code: 401,
    userMessage: responseData.userMessage || '',
    serverInfo: responseData.serverInfo || {},
    data: responseData.data ? responseData.data : responseData
  };

  res.status(responseObj.code).send(responseObj);


};