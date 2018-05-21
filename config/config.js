var _ = require('lodash');

var defaultConfig = {
  'web': {
    'host': 'localhost',
    'port':  process.env.PORT ||  1337,
    'sessionSecret': 'lagunapp',
    'timeouts': {
      'resetPassword': '1d',
      'activation': '2 days'
    }
  },
  'resetPasswordStrategy':'token', 
  'activateUserStrategy': 'token',
  'activateSubscription':'token',
  'authentication':{
    'strategy': 'jwt',
    'tokenSecret': 'tlagunappsecret'
  },
  'jwt': {
    'tokenLife': 63072000,
    'url': '/api/v1/login',
    'tokenKey': 'token'
  },
  'db': {
    'connectionString': 'mongodb://lagunapp:trudat55!@ds147118.mlab.com:47118/lagunapp'
  },
  'total_request_login': 5,
  'time_restart_request_login': (1000 * 60 * 5),
  'authyApiKey': 'HpkjSSBjPSWLjDKQwzAgToUzIzR56Y14',
  'env':'local',
  'apiVersion':'v1',

};

module.exports = (function () {
  return defaultConfig;
 })();
