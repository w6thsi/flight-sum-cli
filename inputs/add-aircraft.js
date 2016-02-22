var Input = require('./input.js');

var AddAircraft = function (summary) {
  Input.call(this, summary);

  this.pattern = /add aircraft\s([\w-]+)\s([0-9]{0,3})/i;

  this.extractValues = function () {
    this.summary.aircraftTitle = this.matches[1];
    this.summary.numberOfSeats = parseInt(this.matches[2]);
    return true;
  }
}
AddAircraft.prototype = Input.prototype;
AddAircraft.prototype.constructor = AddAircraft;

module.exports = AddAircraft;