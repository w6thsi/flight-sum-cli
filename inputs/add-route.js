var Input = require('./input.js');

var AddRoute = function (summary) {
  Input.call(this, summary);

  this.pattern = /add route\s([a-z]+)\s([a-z]+)\s([0-9]+)\s([0-9]+)\s([0-9]{0,3})/i;

  this.extractValues = function () {
    this.summary.origin = this.matches[1];
    this.summary.destination = this.matches[2];
    this.summary.costPerPassenger = parseInt(this.matches[3]);
    this.summary.ticketPrice = parseInt(this.matches[4]);
    this.summary.minimumTakeoffLoadPercentage = parseInt(this.matches[5]);
    return true;
  }
}
AddRoute.prototype = Input.prototype;
AddRoute.prototype.constructor = AddRoute;

module.exports = AddRoute;