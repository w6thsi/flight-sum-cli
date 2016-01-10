"use strict";

module.exports = function (input) {
  var flight = {
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
  };

  var regex = {};
  // add-route = "add route" SP origin SP destination SP cost-per-passenger SP ticket-price SP minimum-takeoff-load-percentage
  regex.addRoute = /add route\s([a-z]+)\s([a-z]+)\s([0-9]+)\s([0-9]+)\s([0-9]{0,3})/i;
  // add-aircraft = "add aircraft" SP aircraft-title SP number-of-seats
  regex.addAircraft = /add aircraft\s([\w-]+)\s([0-9]{0,3})/i;
  // add-passenger = "add" SP (general-passenger / airline-passenger / loyalty-passenger) CRLF
  regex.addPassenger = /add\s(general|airline|loyalty)\s([a-z]+)\s([0-9]+)\s?([0-9]*)?\s?(TRUE|FALSE)?\s?(TRUE|FALSE)?/i;

  var lines = input.split("\n");

  lines.forEach(function (line) {

    var matches = null;
    switch (true) {
      case !!(matches = line.match(regex.addRoute)):
        flight.origin = matches[1];
        flight.destination = matches[2];
        flight.costPerPassenger = parseInt(matches[3]);
        flight.ticketPrice = parseInt(matches[4]);
        flight.minimumTakeoffLoadPercentage = parseInt(matches[5]);
        break;

      case !!(matches = line.match(regex.addAircraft)):
        flight.aircraftTitle = matches[1];
        flight.numberOfSeats = matches[2];
        break;

      case !!(matches = line.match(regex.addPassenger)):
        var passenger = {};
        passenger.type = matches[1];
        passenger.firstName = matches[2];
        passenger.age = matches[3];

        flight.totalPassengerCount++;
        flight.totalNumberOfBags++;
        flight.totalCostOfFlight += flight.costPerPassenger;
        flight.totalUnadjustedTicketRevenue += flight.ticketPrice;

        switch (passenger.type) {
          case 'general':
            flight.generalPassengerCount++;
            break;

          case 'airline':
            flight.airlinePassengerCount++;
            break;

          case 'loyalty':
            flight.loyaltyPassengerCount++;

            passenger.currentLoyaltyPoints = parseInt(matches[4]);
            passenger.usingLoyaltyPoint = matches[5]==='TRUE';
            passenger.extraBaggage = matches[6]==='TRUE';

            // Loyalty points
            if (passenger.currentLoyaltyPoints && passenger.usingLoyaltyPoint) {
              flight.totalLoyaltyPointsRedeemed += passenger.currentLoyaltyPoints;
            }

            // Excess baggage
            if (passenger.extraBaggage) {
              flight.totalNumberOfBags++;
            }

            break;
        }
        flight.passengers.push(passenger);
        break;
    }

    flight.totalAdjustedRevenue = flight.totalUnadjustedTicketRevenue
      - (flight.totalLoyaltyPointsRedeemed + (flight.airlinePassengerCount * flight.ticketPrice));

  });

  flight.canFlightProceed = (flight.totalAdjustedRevenue > flight.totalCostOfFlight)
    && (flight.totalPassengerCount <= flight.numberOfSeats)
    && (((flight.generalPassengerCount + flight.loyaltyPassengerCount) / flight.numberOfSeats) * 100) > flight.minimumTakeoffLoadPercentage;


  //output-line = total-passenger-count SP
  //general-passenger-count SP
  //airline-passenger-count SP
  //loyalty-passenger-count SP
  //total-number-of-bags SP *
  //total-loyalty-points-redeemed SP *
  //total-cost-of-flight SP
  //total-unadjusted-ticket-revenue SP
  //total-adjusted-revenue SP
  //can-flight-proceed

  return flight.totalPassengerCount + ' '
    + flight.generalPassengerCount + ' '
    + flight.airlinePassengerCount + ' '
    + flight.loyaltyPassengerCount + ' '
    + flight.totalNumberOfBags + ' '
    + flight.totalLoyaltyPointsRedeemed + ' '
    + flight.totalCostOfFlight + ' '
    + flight.totalUnadjustedTicketRevenue + ' '
    + flight.totalAdjustedRevenue + ' '
    + (flight.canFlightProceed ? 'TRUE' : 'FALSE');
}