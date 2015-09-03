# prints the numbers that divide evenly into the
# given input

Tests = {} unless Tests?

class Tests.Prog12
  @tightSteps = 21

  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([12])
        testCase.setOutputs([1, 2, 3, 4, 6, 12])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([7])
        testCase.setOutputs([1, 7])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([0])
        testCase.setOutputs([])
      ),

      # doesn't handle negatives
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-8])
        testCase.setOutputs([])
      )
    ]
