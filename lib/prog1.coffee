# sums the three input numbers

Tests = {} unless Tests?

class Tests.Prog1
  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([3, 4, 5]);
        testCase.setOutputs([12]);
      )

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([1.2, 7, 4.3]);
        testCase.setOutputs([4.7]);
      )
    ]
