/** 
 *
 * This will be available in controllers as res.ok(data);
 * api/responses/ok.js
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
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
    code: 200,
    userMessage: responseData.userMessage || '',
    serverInfo: responseData.serverInfo || {},
    data: responseData.data ? responseData.data : responseData
  };

  res.status(responseObj.code).send(responseObj);


};