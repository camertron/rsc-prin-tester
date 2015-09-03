(function() {
  var Grader, Rsc, TestResult, TestSuite, Tests, atob, colors, fs;

  Grader = (function() {
    Grader.MAX_POINTS = 50.0;

    Grader.MAX_POINTS_PER_PROGRAM = 10.0;

    function Grader(testResults1) {
      this.testResults = testResults1;
    }

    Grader.prototype.calculateGrades = function() {
      return this.selectHighestGrades(this.calculateGradesPerProgram(this.testResults));
    };

    Grader.prototype.calculateFinalGrades = function() {
      var extra, grade, gradesPerProgram, identifier, required;
      gradesPerProgram = this.selectHighestGrades(this.calculateGradesPerProgram(this.testResults));
      required = this.filterByRequiredPrograms(gradesPerProgram);
      extra = this.filterByExtraCreditPrograms(gradesPerProgram);
      for (identifier in extra) {
        grade = extra[identifier];
        required[identifier] = grade;
      }
      return required;
    };

    Grader.prototype.calculateFinalGrade = function() {
      var grade, grades, identifier, totalPoints;
      totalPoints = 0;
      grades = this.calculateFinalGrades(this.testResults);
      for (identifier in grades) {
        grade = grades[identifier];
        totalPoints += grade;
      }
      return totalPoints;
    };

    Grader.prototype.calculateGradePercentage = function(grade, max) {
      return Math.round((grade / max) * 1000) / 10;
    };

    Grader.prototype.filterByRequiredPrograms = function(grades) {
      var j, len, maxId, progs, ref, required;
      required = {
        prog1: grades.prog1,
        prog2: grades.prog2
      };
      ref = [['prog3', 'prog4'], ['prog5', 'prog6'], ['prog7', 'prog8']];
      for (j = 0, len = ref.length; j < len; j++) {
        progs = ref[j];
        maxId = this.selectMaxBetween(progs[0], progs[1], grades);
        required[maxId] = grades[maxId] != null ? grades[maxId] : 0;
      }
      return required;
    };

    Grader.prototype.filterByExtraCreditPrograms = function(grades) {
      var extraCreditGrades, grade, identifier;
      extraCreditGrades = {};
      for (identifier in grades) {
        grade = grades[identifier];
        if (['prog9', 'prog10', 'prog11', 'prog12'].indexOf(identifier) > -1) {
          extraCreditGrades[identifier] = grade;
        }
      }
      return extraCreditGrades;
    };

    Grader.prototype.selectMaxBetween = function(identifier1, identifier2, grades) {
      if (grades[identifier1] != null) {
        if (grades[identifier2] != null) {
          if (grades[identifier1] > grades[identifier2]) {
            return identifier1;
          } else {
            return identifier2;
          }
        } else {
          return identifier1;
        }
      } else {
        return identifier2;
      }
    };

    Grader.prototype.selectHighestGrades = function(grades) {
      var gradeList, highestGrades, identifier;
      highestGrades = {};
      for (identifier in grades) {
        gradeList = grades[identifier];
        highestGrades[identifier] = Math.max.apply(null, gradeList);
      }
      return highestGrades;
    };

    Grader.prototype.calculateGradesPerProgram = function(testResults) {
      var j, len, programGrades, testResult;
      programGrades = {};
      for (j = 0, len = testResults.length; j < len; j++) {
        testResult = testResults[j];
        if (programGrades[testResult.identifier] == null) {
          programGrades[testResult.identifier] = [];
        }
        programGrades[testResult.identifier].push(this.calculateGradeForProgram(testResult));
      }
      return programGrades;
    };

    Grader.prototype.calculateGradeForProgram = function(testResult) {
      var percentage, percentagePointsPerCase;
      percentage = this.calculateParPercentage(testResult);
      if (!testResult.didSucceed()) {
        percentagePointsPerCase = percentage / testResult.testCases.length;
        percentage -= testResult.numFailed() * percentagePointsPerCase;
      }
      return Grader.MAX_POINTS_PER_PROGRAM * percentage;
    };

    Grader.prototype.calculateParPercentage = function(testResult) {
      var command, j, len, par, ref, totalCommands;
      totalCommands = 0;
      ref = testResult.program.split("\n");
      for (j = 0, len = ref.length; j < len; j++) {
        command = ref[j];
        if (command.length > 0) {
          totalCommands += 1;
        }
      }
      par = totalCommands - testResult.testClass.tightSteps;
      if (par <= 0) {
        return 1;
      } else if (par > 0 && par <= 2) {
        return 0.899;
      } else {
        return 0.799;
      }
    };

    return Grader;

  })();

  if (typeof Tests === "undefined" || Tests === null) {
    Tests = {};
  }

  Tests.Prog1 = (function() {
    function Prog1() {}

    Prog1.tightSteps = 9;

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

    Prog10.tightSteps = 17;

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

    Prog11.tightSteps = 13;

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

    Prog12.tightSteps = 21;

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

    Prog2.tightSteps = 12;

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

    Prog3.tightSteps = 16;

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

    Prog4.tightSteps = 14;

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

    Prog5.tightSteps = 10;

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

    Prog6.tightSteps = 12;

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

    Prog7.tightSteps = 7;

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

    Prog8.tightSteps = 10;

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

    Prog9.tightSteps = 12;

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

  TestResult = (function() {
    function TestResult(identifier3, program1, testCases1, testClass1) {
      this.identifier = identifier3;
      this.program = program1;
      this.testCases = testCases1;
      this.testClass = testClass1;
    }

    TestResult.prototype.numFailed = function() {
      var failed, j, len, ref, testCase;
      failed = 0;
      ref = this.testCases;
      for (j = 0, len = ref.length; j < len; j++) {
        testCase = ref[j];
        if (!testCase.didSucceed()) {
          failed += 1;
        }
      }
      return failed;
    };

    TestResult.prototype.didSucceed = function() {
      var j, len, ref, testCase;
      ref = this.testCases;
      for (j = 0, len = ref.length; j < len; j++) {
        testCase = ref[j];
        if (!testCase.didSucceed()) {
          return false;
        }
      }
      return true;
    };

    TestResult.prototype.eachCase = function(callback) {
      var j, len, ref, testCase;
      ref = this.testCases;
      for (j = 0, len = ref.length; j < len; j++) {
        testCase = ref[j];
        callback(testCase);
      }
    };

    return TestResult;

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
      var failed, finalGrade, finalGrades, grade, grader, grades, identifier, idx, j, l, len, len1, program, programData, programs, testResult, testResults;
      testResults = [];
      failed = 0;
      programs = JSON.parse(fs.readFileSync(this.file, 'ascii'));
      for (j = 0, len = programs.length; j < len; j++) {
        programData = programs[j];
        identifier = programData[0];
        program = this.loadProgram(programData[1]);
        testResult = this.testProgram(identifier, program);
        testResults.push(testResult);
        failed += testResult.numFailed();
      }
      console.log('');
      console.log('');
      for (idx = l = 0, len1 = testResults.length; l < len1; idx = ++l) {
        testResult = testResults[idx];
        testResult.eachCase(function(testCase) {
          if (!testCase.didSucceed()) {
            console.log(idx + ") " + testResult.identifier);
            return console.log("   " + testCase.message);
          }
        });
      }
      console.log('');
      console.log(testResults.length + " examples, " + failed + " failures");
      console.log('');
      grader = new Grader(testResults);
      grades = grader.calculateGrades();
      finalGrades = grader.calculateFinalGrades();
      console.log('Grades:');
      for (identifier in grades) {
        grade = grades[identifier];
        console.log(identifier + ": " + grade + " points, " + (grader.calculateGradePercentage(grade, Grader.MAX_POINTS_PER_PROGRAM)) + "%");
      }
      console.log('');
      console.log('Final Grades:');
      for (identifier in finalGrades) {
        grade = finalGrades[identifier];
        console.log(identifier + ": " + grade + " points, " + (grader.calculateGradePercentage(grade, Grader.MAX_POINTS_PER_PROGRAM)) + "%");
      }
      console.log('');
      finalGrade = grader.calculateFinalGrade(testResults);
      return console.log("Final grade: " + finalGrade + " points, " + (grader.calculateGradePercentage(finalGrade, Grader.MAX_POINTS)) + "%");
    };

    TestSuite.prototype.testProgram = function(identifier, program) {
      var j, len, testCase, testCases, testClass;
      testClass = this.getTestClass(identifier);
      if (!testClass) {
        return [];
      }
      testCases = testClass.run(program);
      for (j = 0, len = testCases.length; j < len; j++) {
        testCase = testCases[j];
        if (testCase.didSucceed()) {
          process.stdout.write('.');
        } else {
          process.stdout.write('F'.red);
        }
      }
      return new TestResult(identifier, program, testCases, testClass);
    };

    TestSuite.prototype.loadProgram = function(text) {
      var i, instructions, k, program, v;
      instructions = JSON.parse(atob(text.slice(text.indexOf('#') + 1)));
      program = (function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = Rsc.defaultNumRows * Rsc.defaultNumColumns; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          results.push('');
        }
        return results;
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
