var Input = require('./input.js');

var AddRoute = function () {
  Input.call(this);

  this.pattern = /add route\s([a-z]+)\s([a-z]+)\s([0-9]+)\s([0-9]+)\s([0-9]{0,3})/i;

  this.extractValues = function (summary) {
    summary.origin = this.matches[1];
    summary.destination = this.matches[2];
    summary.costPerPassenger = parseInt(this.matches[3]);
    summary.ticketPrice = parseInt(this.matches[4]);
    summary.minimumTakeoffLoadPercentage = parseInt(this.matches[5]);
    return true;
  }
}
AddRoute.prototype = Input.prototype;
AddRoute.prototype.constructor = AddRoute;

module.exports = AddRoute;