/**
 * Base Input class
 *
 * It uses the chain-of-responsibility pattern
 * to go through different input processors.
 */
var Input = function () {}

Input.prototype.successor = null;

Input.prototype.match = function (line) {
  this.matches = line.match(this.pattern);
  return !!this.matches;
}

Input.prototype.process = function (summary, line) {
  if (this.match(line)) {
    return this.extractValues(summary);

  } else if (this.successor) {
    return this.successor.process(summary, line);
  }

}

module.exports = Input;