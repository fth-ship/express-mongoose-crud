var util = require('util');
var crud = require('./lib');
var debug = require('debug')('crud'); 


function crudMiddlewareHandler(req, res, next) { 
  debug(util.inspect(req.params));
  var opts = this;
  var mongoose = opts.mongoose;
  var entity = entityHandler(req.params.entity);
  var isCreate = (req.method === 'POST' || req.params.action === 'create');
  var isRead = (req.method === 'GET' || req.params.action === 'read');
  var isUpdate = (req.method === 'PUT' || req.params.action === 'update');
  var isRemove = (req.method === 'DELETE' || req.params.action === 'remove');

  function createHandler(content, callback) {
    debug('create handler');
    var self = this;
    var label = self.toEntityLabel();
    var entity = mongoose.model(self.toEntityLabel());
    var callback = (callback || function anonymousCreateCallback() {});

    function createHandler(err, result) {
      res.locals[self.label] = result;
      callback(err, result);
    }
    entity.create(content, createHandler);

    return self;
  }

  function readHandler(id, callback) {
    debug('read handler');
    var self = this;
    var entity = mongoose.model(self.toEntityLabel());
    var query = { _id: id };
    var callback = (callback || function anonymousReadCallback() {});

    function findOneHandler(err, result) {
      res.locals[self.label] = result;
      callback(err, result);
    }
    entity.findOne(query, findOneHandler);

    return self;
  }

  function listHandler(query, callback) {
    debug('list handler');
    var self = this;
    var entity = mongoose.model(self.toEntityLabel());
    var callback = (callback || function anonymousReadCallback() {});

    query = (query || {});

    function findHandler(err, result) {
      res.locals[self.label] = result;
      callback(err, result);
    }
    entity.find(query, findOneHandler);

    return self;
  }

  function updateHandler(id, content, callback) {
    debug('update handler');
    var self = this;
    var entity = mongoose.model(self.toEntityLabel());
    var callback = (callback || function anonymousUpdateHandler() {});
    var query = { _id: id };

    entity.update(query, content, callback);

    return self;
  }

  function removeHandler(id, callback) {
    debug('remove handler');
    var self = this;
    var entity = mongoose.model(self.toEntityLabel());
    var callback = (callback || function anonymousRemoveHandler() {});
    var query = { _id: id };

    entity.remove(query, callback);

    return self;
  }

  function entityHandler(label) {
    debug('entity handler');
    var entity = new crud.Operation(label);

    entity
      .register('create', createHandler);

    entity
      .register('read', readHandler);

    entity
      .register('list', listHandler);

    entity
      .register('update', updateHandler);

    entity
      .register('remove', removeHandler);

    return entity;
  }
  
  if (isCreate) {
    entity.perform('create', req.body, next);
  } else if (isRead) {
    entity.perform('read', req.params.id, next); 
  } else if (isList) {
    entity.perform('list', req.query, next);
  } else if (isUpdate) {
    entity.perform('update', req.params.id, req.body, next);
  } else if (isRemove) {
    entity.perform('remove', req.params.id, next);
  } else {
    next();
  }
}

function crudMiddlewareInitHandler(opts) {
  debug('middleware init handler');
  return crudMiddlewareHandler.bind(opts);
}
module.exports = exports = crudMiddlewareInitHandler;
