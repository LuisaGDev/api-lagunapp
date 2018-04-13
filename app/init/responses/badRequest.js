/** 
 *
 * This will be available in controllers as res.badRquest(data);
 * api/responses/ok.js
 * 400 (BadRequest) Response
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
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
    code: 400,
    userMessage: responseData.userMessage || '',
    serverInfo: responseData.serverInfo || {},
    data: responseData.data ? responseData.data : responseData
  };

  res.status(responseObj.code).send(responseObj);


};