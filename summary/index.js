var processLine = require('../inputs').processLine;
var fs = require('fs');

var Summary = function (input) {
  this.input = input;
}

Summary.prototype.getSummary = function () {
  var summary = {
    passengers: [],
    totalPassengerCount: 0,
    generalPassengerCount: 0,
    airlinePassengerCount: 0,
    loyaltyPassengerCount: 0,
    totalNumberOfBags: 0,
    totalLoyaltyPointsRedeemed: 0,
    totalCostOfFlight: 0,
    totalUnadjustedTicketRevenue: 0,
    totalAdjustedRevenue: 0,
    canFlightProceed: 0
  }

  var lines = this.input.split("\n");
  lines.forEach(function (line) {
    processLine(summary, line);
  });

  return summary;
}

Summary.prototype.writeSummary = function (outputFilePath) {
  var summary = this.getSummary();
  var output = summary.totalPassengerCount + ' '
  + summary.generalPassengerCount + ' '
  + summary.airlinePassengerCount + ' '
  + summary.loyaltyPassengerCount + ' '
  + summary.totalNumberOfBags + ' '
  + summary.totalLoyaltyPointsRedeemed + ' '
  + summary.totalCostOfFlight + ' '
  + summary.totalUnadjustedTicketRevenue + ' '
  + summary.totalAdjustedRevenue + ' '
  + (summary.canFlightProceed ? 'TRUE' : 'FALSE');

  fs.writeFileSync(outputFilePath, output, 'utf8');
}

module.exports = Summary;



