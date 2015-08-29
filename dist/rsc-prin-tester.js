(function() {
  var Rsc, TestSuite, Tests, fs, glob, path;

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
          return testCase.setOutputs([4.7]);
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
          return testCase.setOutputs([4]);
        })
      ];
    };

    return Prog2;

  })();

  path = require('path');

  glob = require('glob');

  fs = require('fs');

  Rsc = require('rsc');

  TestSuite = (function() {
    function TestSuite(path1) {
      this.path = path1;
      this.files = glob.sync(path.join(this.path, '*.txt'));
    }

    TestSuite.prototype.run = function() {
      var file, i, len, ref, results1;
      ref = this.files;
      results1 = [];
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        results1.push(this.runFile(file));
      }
      return results1;
    };

    TestSuite.prototype.runFile = function(file) {
      var i, len, program, result, results, results1;
      program = fs.readFileSync(file, 'ascii');
      results = this.getTestClass(file).run(program);
      results1 = [];
      for (i = 0, len = results.length; i < len; i++) {
        result = results[i];
        if (result.didSucceed()) {
          results1.push(console.log("Succeeded!"));
        } else {
          console.log("Failed!");
          results1.push(console.log(result.message));
        }
      }
      return results1;
    };

    TestSuite.prototype.getTestClass = function(file) {
      var prog;
      prog = this.capitalize(path.basename(file, '.txt'));
      return Tests[prog];
    };

    TestSuite.prototype.capitalize = function(str) {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    };

    return TestSuite;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).TestSuite = TestSuite;

}).call(this);
