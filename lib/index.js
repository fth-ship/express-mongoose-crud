var crud = exports;

function Setup(opts) {
  var self = this;
  var opts = {};

  self.core = (opts.core || global);

  return self; 
}
crud.Setup = Setup;

function Operation(label) {
  var self = this;

  if (!label) {
    throw new Error('You need to provide an label.');
  }

  self.label = label;
  self._operations = {};

  return self;
}

function OpearationToEntityLabelHandler() {
  var self = this;
  var rFirstLetter = /^[a-z]/;

  function _capitalizeFirst(letter) {
    return letter.toUpperCase();
  }
  return self.label.replace(rFirstLetter, _capitalizeFirst);
}
Operation.prototype.toEntityLabel = OpearationToEntityLabelHandler;

function OperationRegisterHandler(operation, action) {
  var self = this;
  var operations = [ 'create', 'read', 'update', 'remove', 'list' ];
  var hasNotPermittedOperation = (operations.indexOf(operation) === -1);
  var isNotAFunction = (typeof(action) !== 'function');

  if (hasNotPermittedOperation) {
    throw new Error('Operation not permitted.');
  } else if (isNotAFunction) {
    throw new Error('The action should be a function.');
  }

  self._operations[operation] = action;

  return self;
}
Operation.prototype.register = OperationRegisterHandler;

function OperationPerformHandler(operation) {
  var self = this;
  var args = Array.prototype.slice.call(arguments, []).slice(1);

  return self._operations[operation].apply(self, args);
}
Operation.prototype.perform = OperationPerformHandler;

crud.Operation = Operation;
