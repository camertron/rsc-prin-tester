# averages three input numbers

Tests = {} unless Tests?

class Tests.Prog2
  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([3, 4, 5]);
        testCase.setOutputs([4]);
      )
    ]
