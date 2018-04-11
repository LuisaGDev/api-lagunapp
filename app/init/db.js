var Cobuild 			= require('cobuild2')
var config 				= Cobuild.config
var mongoose 			= require('mongoose');
var autoIncrement     	= require('mongoose-auto-increment');
mongoose.connect(config.db.connectionString);
module.exports = {
	mongoose : mongoose,
	autoIncrement : autoIncrement
}