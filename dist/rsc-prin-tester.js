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

  Tests.Prog10 = (function() {
    function Prog10() {}

    Prog10.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([1, 6, 7, 4, 8, 2, 10, 14, 6, 3, -1]);
          return testCase.setOutputs([6]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([1.1, 6.3, 7.3, 4.5, 8.2, 10, 14.7, -1]);
          return testCase.setOutputs([7.4]);
        })
      ];
    };

    return Prog10;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog11 = (function() {
    function Prog11() {}

    Prog11.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([6]);
          return testCase.setOutputs([3]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([9]);
          return testCase.setOutputs([4]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([0]);
          return testCase.setOutputs([0]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([1]);
          return testCase.setOutputs([0]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([2]);
          return testCase.setOutputs([1]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([2.9]);
          return testCase.setOutputs([1]);
        })
      ];
    };

    return Prog11;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog12 = (function() {
    function Prog12() {}

    Prog12.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([12]);
          return testCase.setOutputs([1, 2, 3, 4, 6, 12]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([7]);
          return testCase.setOutputs([1, 7]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([0]);
          return testCase.setOutputs([]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-8]);
          return testCase.setOutputs([]);
        })
      ];
    };

    return Prog12;

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

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog3 = (function() {
    function Prog3() {}

    Prog3.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([5, 9]);
          return testCase.setOutputs([196]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([6.4, 18.3]);
          return testCase.setOutputs([610.1]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([0, 0]);
          return testCase.setOutputs([0]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-5, 4.3]);
          return testCase.setOutputs([0.5]);
        })
      ];
    };

    return Prog3;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog4 = (function() {
    function Prog4() {}

    Prog4.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([1, 2, 3]);
          return testCase.setOutputs([27]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-17, 8, 4.9]);
          return testCase.setOutputs([105.8]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([0, 0, 0]);
          return testCase.setOutputs([0]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-2.1, -6.3, 2]);
          return testCase.setOutputs([-56.7]);
        })
      ];
    };

    return Prog4;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog5 = (function() {
    function Prog5() {}

    Prog5.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([0]);
          return testCase.setOutputs([0]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([2]);
          return testCase.setOutputs([1]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-3]);
          return testCase.setOutputs([2]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-0.1]);
          return testCase.setOutputs([2]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([0.1]);
          return testCase.setOutputs([1]);
        })
      ];
    };

    return Prog5;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog6 = (function() {
    function Prog6() {}

    Prog6.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([60]);
          return testCase.setOutputs([0]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([61]);
          return testCase.setOutputs([1]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([59]);
          return testCase.setOutputs([2]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([543]);
          return testCase.setOutputs([1]);
        }), Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([-87]);
          return testCase.setOutputs([2]);
        })
      ];
    };

    return Prog6;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog7 = (function() {
    function Prog7() {}

    Prog7.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          return testCase.setOutputs([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
        })
      ];
    };

    return Prog7;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog8 = (function() {
    function Prog8() {}

    Prog8.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          return testCase.setOutputs([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        })
      ];
    };

    return Prog8;

  })();

  if (Tests == null) {
    Tests = {};
  }

  Tests.Prog9 = (function() {
    function Prog9() {}

    Prog9.run = function(program) {
      return [
        Rsc.runTestCase(program, function(testCase) {
          testCase.setInputs([3, 4, -8, -2, 1, -44, 16, -5, -6, 2, 0]);
          return testCase.setOutputs([5]);
        })
      ];
    };

    return Prog9;

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
      var allResults, failed, j, l, len, len1, programData, programs, result, results;
      allResults = [];
      failed = 0;
      programs = JSON.parse(fs.readFileSync(this.file, 'ascii'));
      for (j = 0, len = programs.length; j < len; j++) {
        programData = programs[j];
        results = this.testProgram(programData);
        allResults = allResults.concat(results);
        for (l = 0, len1 = results.length; l < len1; l++) {
          result = results[l];
          if (!result.didSucceed()) {
            failed += 1;
          }
        }
      }
      console.log('');
      return console.log(allResults.length + " examples, " + failed + " failures");
    };

    TestSuite.prototype.testProgram = function(programData) {
      var identifier, j, len, program, result, results, testClass;
      identifier = programData[0];
      program = this.loadProgram(programData[1]);
      testClass = this.getTestClass(identifier);
      if (!testClass) {
        return [];
      }
      results = testClass.run(program);
      for (j = 0, len = results.length; j < len; j++) {
        result = results[j];
        if (result.didSucceed()) {
          process.stdout.write('.');
        } else {
          process.stdout.write('F'.red);
          console.log(result.message);
        }
      }
      return results;
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
