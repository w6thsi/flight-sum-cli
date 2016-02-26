var inputTypes = ['add-aircraft', 'add-route', 'add-passenger'];

function _initialiseInputs(inputTypes, inputProcessor) {
  if (!inputProcessor) {
    inputProcessor = new (require('./' + inputTypes.shift() + '.js'))();
  }

  // Set successor in the chain-of-responsibility
  inputProcessor.successor = new (require('./' + inputTypes.shift() + '.js'))();

  if (inputTypes.length!==0) {
    return _initialiseInputs(inputTypes, inputProcessor.successor);
  }
  return inputProcessor;
}

module.exports.inputProcessor = _initialiseInputs(inputTypes);
