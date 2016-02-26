"use strict";

var fs = require('fs');
var Summary = require('./summary');

if (process.argv.length < 4) {
  console.log('Not enough arguments!');
}

var input = process.argv[2]; // Input file
var output = process.argv[3]; // Output file

var inputStr = fs.readFileSync(input, 'utf8');

var summary = new Summary(inputStr);
summary.writeSummary(output);
