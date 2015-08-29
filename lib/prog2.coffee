# averages three input numbers

Tests = {} unless Tests?

class Tests.Prog2
  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([3, 4, 5]);
        testCase.setOutputs([4.0]);
      )

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([3.3, 1.9, 5]);
        testCase.setOutputs([3.4]);
      )

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([3.3, -7, -5.4]);
        testCase.setOutputs([-3.0]);
      )
    ]
