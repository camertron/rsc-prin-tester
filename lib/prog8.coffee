# displays 1 up to 10

Tests = {} unless Tests?

class Tests.Prog8
  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setOutputs([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      )
    ]
