var expect = require('chai').expect;
var Summary = require('../summary');
var fs = require('fs');

describe('Flight Summary', function () {
  var input = fs.readFileSync('test/data/input1', 'utf8');
  var summary = new Summary(input);

  it('should return a flight summary object', function () {
    expect(summary.getSummary()).to.be.an('object');
  });

  it('should write the flight summary to a file', function () {
    var outputPath = 'test/data/output';
    summary.writeSummary(outputPath);

    var output = fs.readFileSync(outputPath, 'utf8');
    var expectedOutput = fs.readFileSync('test/data/output1', 'utf8');
    expect(output).to.equal(expectedOutput);

    // Clean up
    fs.unlinkSync(outputPath);
  });
});