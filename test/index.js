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
      res.body.should.be.above(0);
      done();
    }
    superagent
      .get('http://localhost:3000/product/')
      .end(endHandler);
  });
});
