var Cobuild = require('cobuild2');
var _ = require('lodash');

var exports = module.exports;

exports.emptyFields = function( req, res, next ){

	var emptyFieldRules = ['email', 'password'];
	var errors = Cobuild.Validators.emptyFields( emptyFieldRules, req.body );
	_.isEmpty(errors) ? next() : res.badRequest(errors);

}

exports.fieldsFormat = function( req, res, next ){

	var errors = Cobuild.Validators.fieldsFormat( req.body );
	_.isEmpty(errors) ? next() : res.badRequest(errors);

}

