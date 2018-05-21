var exports = module.exports;

exports.haveId = function (req, res, next) {
  //console.log("req.body.id:",req.body.id, "req.query", req.query)
  if(!req.body.id && !req.body._id && !req.params.id){
    return res.badRequest({error:'invalid-record'});
  }
  next();
}