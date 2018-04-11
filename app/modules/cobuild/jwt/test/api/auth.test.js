'use strict';

var _         = require('lodash');
var Cobuild   = require('cobuild2');
var request   = require('supertest');
var request   = request('http://localhost:3000');
var fixtures  = Cobuild.Utils.Test.loadFixtures(__dirname);

describe('Authentication (Strategy: JWT)', function () {  
  
  it('Should throw empty fields error', function (done) {
    
    request
      .post('/api/'+Cobuild.config.apiVersion+'/login')
      .send()
      .expect(400)
      .end(done);

  });

  it('Should throw wrong email format', function (done) {
    
    var fixture = _.clone(fixtures.wrongEmailFormat);

    request
      .post('/api/'+Cobuild.config.apiVersion+'/login')
      .send(fixture)
      .expect(400)
      .end(done);

  });

  it('Should throw unknown email error', function (done) {
    
    var User = Cobuild.Utils.Files.getModel('cobuild.users.User').User;

    User.create( fixtures.user, function (err, user) {
    
      var fixture = _.clone(fixtures.wrongEmail);
      request
        .post('/api/'+Cobuild.config.apiVersion+'/login')
        .send(fixture)
        .expect(401)
        .end(done);

    });

  });

  it('Should throw wrong password error', function (done) {
    
    var fixture = _.clone(fixtures.wrongPassword);

    request
      .post('/api/'+Cobuild.config.apiVersion+'/login')
      .send(fixture)
      .expect(401)
      .end(done);

  });

  it('Should login', function (done) {
      
    var fixture = _.clone(fixtures.rightAuthentication);
    request
      .post('/api/'+Cobuild.config.apiVersion+'/login')
      .send(fixture)
      .expect(200)
      .end(function(err, res) {
        done();
      });


  });

});
