(function() {
  var Rsc, TestSuite, Tests, atob, colors, fs;

  if (typeof Tests === "undefined" || Tests === null) {
    Tests = {};
  }

  Tests.Prog1 = (function() {
    function Prog1() {}

    Prog1.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([3, 4, 5]);
          return testCase.setOutputs([12]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([1.2, 7, 4.3]);
          return testCase.setOutputs([12.6]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-8, 1.1, -0.4]);
          return testCase.setOutputs([-7.3]);
        })
      ];
    };

    return Prog1;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog2 = (function() {
    function Prog2() {}

    Prog2.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([3, 4, 5]);
          return testCase.setOutputs([4.0]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([3.3, 1.9, 5]);
          return testCase.setOutputs([3.4]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([3.3, -7, -5.4]);
          return testCase.setOutputs([-3.0]);
        })
      ];
    };

    return Prog2;

  })();

  fs = require('fs');

  Rsc = require('rsc');

  atob = require('atob');

  colors = require('colors');

  TestSuite = (function() {
    function TestSuite(file) {
      this.file = file;
    }

    TestSuite.prototype.run = function() {
      var j, len, programData, programs;
      programs = JSON.parse(fs.readFileSync(this.file, 'ascii'));
      for (j = 0, len = programs.length; j < len; j++) {
        programData = programs[j];
        this.testProgram(programData);
      }
      return console.log('');
    };

    TestSuite.prototype.testProgram = function(programData) {
      var identifier, j, len, program, result, results, results1, testClass;
      identifier = programData[0];
      program = this.loadProgram(programData[1]);
      testClass = this.getTestClass(identifier);
      if (!testClass) {
        return;
      }
      results = testClass.run(program);
      results1 = [];
      for (j = 0, len = results.length; j < len; j++) {
        result = results[j];
        if (result.didSucceed()) {
          results1.push(process.stdout.write('.'));
        } else {
          results1.push(process.stdout.write('F'.red));
        }
      }
      return results1;
    };

    TestSuite.prototype.loadProgram = function(text) {
      var i, instructions, k, program, v;
      instructions = JSON.parse(atob(text.slice(text.indexOf('#') + 1)));
      program = (function() {
        var j, ref, results1;
        results1 = [];
        for (i = j = 0, ref = Rsc.defaultNumRows * Rsc.defaultNumColumns; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          results1.push('');
        }
        return results1;
      })();
      for (k in instructions) {
        v = instructions[k];
        program[k] = v;
      }
      return program.join("\n");
    };

    TestSuite.prototype.getTestClass = function(identifier) {
      return Tests[this.capitalize(identifier)];
    };

    TestSuite.prototype.capitalize = function(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    };

    return TestSuite;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).TestSuite = TestSuite;

}).call(this);
