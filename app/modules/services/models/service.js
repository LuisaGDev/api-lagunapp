var Cobuild           = require('cobuild2');
var mongoose 		  = require(Cobuild.paths.app + '/init/db').mongoose;
var autoIncrement     = require(Cobuild.paths.app + '/init/db').autoIncrement;
var findOrCreate      = require('mongoose-findorcreate');
var mongoosePaginate  = require('mongoose-paginate');
var generator         = require('mongoose-gen');
var timestamps        = require('mongoose-timestamp');
var fs                = require('fs');

var data = fs.readFileSync(Cobuild.Utils.Files.dirpath(__dirname)+'/models/service.json', {encoding: 'utf8'});
var modelJSON = JSON.parse(data);


var schema = new mongoose.Schema(generator.convert(modelJSON.schema));
schema.plugin(findOrCreate);
schema.plugin(mongoosePaginate);
schema.plugin(timestamps);

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin, { model: modelJSON.name, field: 'cursor' });

module.exports = mongoose.model(modelJSON.name, schema);