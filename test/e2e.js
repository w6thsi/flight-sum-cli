var expect = require('chai').expect;
var fs = require('fs');
var flightSummary = require('../index.js');

describe('Flight Summary', function () {
  var input = fs.readFileSync('test/data/input1', 'utf8');
  var output = fs.readFileSync('test/data/output1', 'utf8');

  it('should out put this data', function () {
    expect(flightSummary(input)).to.equal(output);
  });
});