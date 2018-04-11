//-------------------------------load modules---------------------------------\\
var express      = require('express');
var mime         = require('mime');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var i18n         = require('i18n');
var cors         = require('cors');
var Cobuild      = require('cobuild2')
var config       = Cobuild.config
var cluster      = require('cluster');
log              = require('debug')('cobuild-express-stack');
var helmet       = require('helmet');
var multipart = require('connect-multiparty');
var express_limiter = require('express-limiter');



module.exports = function initApp() {

  //--------------------setup the express application-------------------------\\
  var app = express();


  i18n.configure({
    locales: ['es'],
    defaultLocale: 'es',
    directory: __dirname + '/locales'
  });


  app
    .use(logger('dev'))            
    .use(helmet())
    .use(cookieParser())            
    .use(bodyParser.json())         
    .use(bodyParser.urlencoded({   
      extended: false
    }))
    .use(session({                  //configures sessions setting
      secret: config.web.sessionSecret,
      resave: false,
      saveUninitialized: true
    }))
    .use(express.static(Cobuild.Utils.Files.resolvePath('public')))
    .use(i18n.init)

  require('express-custom-response')(Cobuild.paths.customResponses);

  //--------------------------------Load modules-------------------------------\\
  require(Cobuild.paths.app + '/init/modulesLoader')(app);

  //-----------------------------start server---------------------------------\\
  config.web.port =  process.env.PORT || config.web.port; 

  var server = app.listen(config.web.port, function() {
    var port = server.address().port;
    console.log('Server is running on port: ' , port, "  and worker: ",(cluster.worker ? cluster.worker.id : 'n/a'));
    return server;
  });
  
};
