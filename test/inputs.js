var expect = require('chai').expect;
var AddRoute = require('../inputs/add-route.js');
var AddAircraft = require('../inputs/add-aircraft.js');
var AddPassenger = require('../inputs/add-passenger.js');

describe('Inputs', function () {

  describe('add-route', function () {
    it('should process add-route input', function () {
      var summary = {};
      var addRoute = new AddRoute();
      expect(addRoute.process(summary, "add route London Dublin 100 150 75")).to.equal(true);
      expect(summary.origin).to.equal("London");
      expect(summary.destination).to.equal("Dublin");
      expect(summary.costPerPassenger).to.equal(100);
      expect(summary.ticketPrice).to.equal(150);
      expect(summary.minimumTakeoffLoadPercentage).to.equal(75);
    });
  });

  describe('add-aircraft', function () {
    it('should process add-aircraft input', function () {
      var summary = {
        origin: "London",
        destination: "Dublin",
        costPerPassenger: 100,
        ticketPrice: 150,
        minimumTakeoffLoadPercentage: 75
      };
      var addAircraft = new AddAircraft();
      expect(addAircraft.process(summary, "add aircraft Gulfstream-G550 8")).to.equal(true);
      expect(summary.aircraftTitle).to.equal("Gulfstream-G550");
      expect(summary.numberOfSeats).to.equal(8);
    });
  });

  describe('add-passenger', function () {
    it('should process add-passenger input', function () {
      var summary = {
        origin: "London",
        destination: "Dublin",
        costPerPassenger: 100,
        ticketPrice: 150,
        minimumTakeoffLoadPercentage: 75,
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
      var addPassenger = new AddPassenger();
      expect(addPassenger.process(summary, 'add general Mark 35')).to.equal(true);
      expect(summary.totalPassengerCount).to.equal(1);
      expect(summary.totalNumberOfBags).to.equal(1);
      expect(summary.totalCostOfFlight).to.equal(100);
      expect(summary.totalUnadjustedTicketRevenue).to.equal(150);



    });
  });
});