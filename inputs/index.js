/**
 * Supported input types
 * @type {string[]}
 */
var INPUT_TYPES = ['add-aircraft', 'add-route', 'add-passenger'];

/**
 * Processes a line
 * @param summary
 */
function processLine (summary, line) {
  for (var i in INPUT_TYPES) {
    var input = new (require('./' + INPUT_TYPES[i] + '.js'))(summary);

    if (input.match(line)) {
      input.parse(line);
      break;
    }
  }
}

module.exports.processLine = processLine;
