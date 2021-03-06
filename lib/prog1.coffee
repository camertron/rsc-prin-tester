# sums the three input numbers

Tests = {} unless Tests?

class Tests.Prog1
  @tightSteps = 9

  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([3, 4, 5]);
        testCase.setOutputs([12]);
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([1.2, 7, 4.3]);
        testCase.setOutputs([12.6]);
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-8, 1.1, -0.4]);
        testCase.setOutputs([-7.3]);
      )
    ]
