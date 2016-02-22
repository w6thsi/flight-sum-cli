
var Input = function (summary) {
  this.summary = summary;
}

Input.prototype.match = function (line) {
  this.matches = line.match(this.pattern);
  return !!this.matches;
}

Input.prototype.parse = function (line) {
  return this.match(line) && this.extractValues();
}

module.exports = Input;