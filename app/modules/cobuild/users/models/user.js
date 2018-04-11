var Cobuild          = require('cobuild2');
var mongoose         = require(Cobuild.paths.app + '/init/db').mongoose;
var Schema           = mongoose.Schema;
var bcrypt           = require('bcrypt-nodejs');
var config           = Cobuild.config;
var findOrCreate     = require('mongoose-findorcreate');
var mongoosePaginate = require('mongoose-paginate');
var generator        = require('mongoose-gen');
var fs               = require('fs');
var _                = require('lodash');
var authy            = require('authy')(config.authyApiKey);

// create a schema
mongoose.Error.messages.general.required = "{PATH}_empty";

var data = fs.readFileSync(Cobuild.Utils.Files.dirpath(__dirname) + '/models/user.json', { encoding: 'utf8' });
var modelJSON = JSON.parse(data);

/*generator.setValidator('validEmail', function(email) {
    var re = /^([\w-\.\+]+@([\w-]+\.)+[\w-]{2,4})$/;
    return re.test(email);
});*/

var userSchema = new Schema(generator.convert(modelJSON.schema));

userSchema.pre('save', function(next) {

    var self = this;
    if(typeof self.isActive != 'undefined'){
        var isActive = self.isActive;
    } else {
        var isActive = true;
    }
    if (self.isNew) {        
        
        self.model('User').findOne({ email: self.email}, function(err, user) {
            if (err && self.email != undefined) {
                next(err);
            } else if (user && self.email != undefined) {
                next(new Error('email_already_exists'));
            } else {
                self.password = bcrypt.hashSync(self.password);
                next();
            }
        }); 
        
       
    } else {
        next();
    }

});

userSchema.pre('update', function(next) {
    if (!_.isEmpty(this.email)) {
        this.model('User').findOne({ _id: { $ne: this._id }, email: this.email }, function(err, user) {
            if (err || user) {
                return next(err || 'user_exists');
            }
            this.updatedAt = new Date();
            next();
        });
    } else {
        this.updatedAt = new Date();
        next();
    }
});


userSchema.plugin(findOrCreate);
userSchema.plugin(mongoosePaginate);

module.exports.User = mongoose.model(modelJSON.name, userSchema);