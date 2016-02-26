var Input = require('./input.js');

var AddPassenger = function (summary) {
  Input.call(this, summary);

  this.pattern = /add\s(general|airline|loyalty)\s([a-z]+)\s([0-9]+)\s?([0-9]*)?\s?(TRUE|FALSE)?\s?(TRUE|FALSE)?/i;

  this.extractValues = function () {
    var passenger = {};
    passenger.type = this.matches[1];
    passenger.firstName = this.matches[2];
    passenger.age = this.matches[3];

    this.summary.totalPassengerCount++;
    this.summary.totalNumberOfBags++;
    this.summary.totalCostOfFlight += this.summary.costPerPassenger;
    this.summary.totalUnadjustedTicketRevenue += this.summary.ticketPrice;

    switch (passenger.type) {
      case 'general':
        this.summary.generalPassengerCount++;
        break;

      case 'airline':
        this.summary.airlinePassengerCount++;
        break;

      case 'loyalty':
        this.summary.loyaltyPassengerCount++;

        passenger.currentLoyaltyPoints = parseInt(this.matches[4]);
        passenger.usingLoyaltyPoint = this.matches[5]==='TRUE';
        passenger.extraBaggage = this.matches[6]==='TRUE';

        // Loyalty points
        if (passenger.currentLoyaltyPoints && passenger.usingLoyaltyPoint) {
          this.summary.totalLoyaltyPointsRedeemed += passenger.currentLoyaltyPoints;
        }

        // Excess baggage
        if (passenger.extraBaggage) {
          this.summary.totalNumberOfBags++;
        }

        break;
    }

    this.summary.totalAdjustedRevenue = this.summary.totalUnadjustedTicketRevenue
      - (this.summary.totalLoyaltyPointsRedeemed + (this.summary.airlinePassengerCount * this.summary.ticketPrice));

    this.summary.canFlightProceed = (this.summary.totalAdjustedRevenue > this.summary.totalCostOfFlight)
      && (this.summary.totalPassengerCount <= this.summary.numberOfSeats)
      && (((this.summary.generalPassengerCount + this.summary.loyaltyPassengerCount) / this.summary.numberOfSeats) * 100)
      > this.summary.minimumTakeoffLoadPercentage;

    this.summary.passengers.push(passenger);
    return true;
  }
}
AddPassenger.prototype = Input.prototype;
AddPassenger.prototype.constructor = AddPassenger;

module.exports = AddPassenger;