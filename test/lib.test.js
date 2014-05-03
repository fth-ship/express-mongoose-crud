var should = require('should');
var crud = require('../lib');

describe('Crud engine setup', function () {
  var setup = new crud.Setup();

  it('should be an instance of setup', function () {
    setup.should.be.an.instanceof(crud.Setup);
  });

  it('if not receive and object entry point should be an default object `global`', function () {
    setup.core.should.be.eql(global);
  });
});

describe('Crud engine operation', function () {
  var operation = new crud.Operation('product');

  it('should be an instance of operation', function () {
    operation.should.be.an.instanceof(crud.Operation);
  });

  it('should be throw an error if not receive a label', function () {
    var actual = (function () { return new crud.Operation(); });

    actual.should.throw('You need to provide an label.');
  });

  it('should be translate to an entity label', function () {
    operation.toEntityLabel().should.be.eql('Product'); 
  });

  it('should be throw an error if register a non-action of crud', function () {
    var actual = (function () { return operation.register('insert'); });

    actual.should.throw('Operation not permitted.');
  }); 

  it('should be a function the action of operation', function () {
    var actual = (function () { return operation.register('create', {}); });

    actual.should.throw('The action should be a function.');
  });

  it('should be register action in operation', function () {
    operation.register('create', function (a) { return 'create ' + a; }).should.be.eql(operation);
  });

  it('should be perform an action', function () {
    operation.perform('create', 'sample').should.be.eql('create sample');
  });
});
