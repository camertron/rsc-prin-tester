(function() {
  var Prog1, Rsc, TestSuite, fs, glob, path;

  Prog1 = (function() {
    function Prog1() {}

    Prog1.test = function(program) {
      return Rsc.runTestCase(program, function(testCase) {
        testCase.setInputs([3, 4, 5]);
        return testCase.setOutputs([12]);
      });
    };

    return Prog1;

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
      var file, i, len, ref, results;
      ref = this.files;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        file = ref[i];
        results.push(this.runFile(file));
      }
      return results;
    };

    TestSuite.prototype.runFile = function(file) {
      var program, result;
      program = fs.readFileSync(file, 'ascii');
      result = Prog1.test(program);
      if (result.didSucceed()) {
        return console.log("Succeeded!");
      } else {
        console.log("Failed!");
        return console.log(result.message);
      }
    };

    return TestSuite;

  })();

  (typeof exports !== "undefined" && exports !== null ? exports : this).TestSuite = TestSuite;

}).call(this);
