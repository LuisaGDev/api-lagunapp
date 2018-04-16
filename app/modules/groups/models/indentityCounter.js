var Cobuild           = require('cobuild2');
var mongoose          = require(Cobuild.Utils.Files.dirpath(__dirname)+'/init/db').mongoose;



var counterSchema = new mongoose.Schema({
  model: { type: String, require: true },
  field: { type: String, require: true },
  count: { type: Number, default: 0 }
});

// Create a unique index using the "field" and "model" fields.
counterSchema.index({ field: 1, model: 1 }, { unique: true, required: true, index: -1 });

// Create model using new schema.
IdentityCounter = mongoose.model('IdentityCounter', counterSchema);
module.exports = IdentityCounter;