# displays 10 down to 1

Tests = {} unless Tests?

class Tests.Prog7
  @tightSteps = 7

  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setOutputs([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
      )
    ]
