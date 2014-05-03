var should = require('should');
var caseApp = require('./case');
var superagent = require('superagent').agent();

caseApp.listen(3000);

describe('Middleware case', function () {
  var id = null;

  it('create', function (done) {
    function endHandler(err, res) {
      should.not.exists(err);
      res.body._id.should.be.an.lengthOf(24);
      id = res.body._id;
      res.body.should.have.property('name', 'test case');
      done();
    }
    superagent
      .post('http://localhost:3000/product')
      .send({ name: 'test case' })
      .end(endHandler);
  });

  it('read', function (done) {
    function endHandler(err, res) {
      should.not.exists(err);
      res.body._id.should.be.an.lengthOf(24);
      res.body.should.have.property('name', 'test case');
      done();
    }
    superagent
      .get('http://localhost:3000/product/' + id)
      .end(endHandler);
  });

  it('list', function (done) {
    function endHandler(err, res) {
      should.not.exists(err);
      res.body.length.should.be.above(0);
      done();
    }
    superagent
      .get('http://localhost:3000/product/')
      .end(endHandler);
  });

  it('update', function (done) {
    function endHandler(err, res) {
      should.not.exists(err);
      done();
    }
    superagent
      .put('http://localhost:3000/product/' + id)
      .send({ name: 'test case update' })
      .end(endHandler);
  });

  it('read after update', function (done) {
    function endHandler(err, res) {
      should.not.exists(err);
      res.body._id.should.be.an.lengthOf(24);
      res.body.should.have.property('name', 'test case update');
      done();
    }
    superagent
      .get('http://localhost:3000/product/' + id)
      .end(endHandler);
  });

  it('remove', function (done) {
    function endHandler(err, res) {
      should.not.exists(err);
      done();
    }
    superagent
      .del('http://localhost:3000/product/' + id)
      .end(endHandler);
  });

  it('read after remove', function (done) {
    function endHandler(err, res) {
      should.not.exists(err);
      res.body.should.be.eql({});
      done();
    }
    superagent
      .get('http://localhost:3000/product/' + id)
      .end(endHandler);
  });
});
