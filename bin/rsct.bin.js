#!/usr/bin/env node

var RscPrinTester = require('../dist/rsc-prin-tester')
var suite = new RscPrinTester.TestSuite(process.argv[2]);
suite.run();
