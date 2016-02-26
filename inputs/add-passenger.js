var Input = require('./input.js');

var AddPassenger = function () {
  Input.call(this);

  this.pattern = /add\s(general|airline|loyalty)\s([a-z]+)\s([0-9]+)\s?([0-9]*)?\s?(TRUE|FALSE)?\s?(TRUE|FALSE)?/i;

  this.extractValues = function (summary) {
    var passenger = {};
    passenger.type = this.matches[1];
    passenger.firstName = this.matches[2];
    passenger.age = this.matches[3];

    summary.totalPassengerCount++;
    summary.totalNumberOfBags++;
    summary.totalCostOfFlight += summary.costPerPassenger;
    summary.totalUnadjustedTicketRevenue += summary.ticketPrice;

    switch (passenger.type) {
      case 'general':
        summary.generalPassengerCount++;
        break;

      case 'airline':
        summary.airlinePassengerCount++;
        break;

      case 'loyalty':
        summary.loyaltyPassengerCount++;

        passenger.currentLoyaltyPoints = parseInt(this.matches[4]);
        passenger.usingLoyaltyPoint = this.matches[5]==='TRUE';
        passenger.extraBaggage = this.matches[6]==='TRUE';

        // Loyalty points
        if (passenger.currentLoyaltyPoints && passenger.usingLoyaltyPoint) {
          summary.totalLoyaltyPointsRedeemed += passenger.currentLoyaltyPoints;
        }

        // Excess baggage
        if (passenger.extraBaggage) {
          summary.totalNumberOfBags++;
        }

        break;
    }

    summary.totalAdjustedRevenue = summary.totalUnadjustedTicketRevenue
      - (summary.totalLoyaltyPointsRedeemed + (summary.airlinePassengerCount * summary.ticketPrice));

    summary.canFlightProceed = (summary.totalAdjustedRevenue > summary.totalCostOfFlight)
      && (summary.totalPassengerCount <= summary.numberOfSeats)
      && (((summary.generalPassengerCount + summary.loyaltyPassengerCount) / summary.numberOfSeats) * 100)
      > summary.minimumTakeoffLoadPercentage;

    summary.passengers.push(passenger);
    return true;
  }
}
AddPassenger.prototype = Input.prototype;
AddPassenger.prototype.constructor = AddPassenger;

module.exports = AddPassenger;