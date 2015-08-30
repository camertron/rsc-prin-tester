# If x is exactly 60, output zero (0)
# if x is greater than 60, output one (1)
# if less than 60, output two (2)

Tests = {} unless Tests?

class Tests.Prog6
  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([60])
        testCase.setOutputs([0])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([61])
        testCase.setOutputs([1])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([59])
        testCase.setOutputs([2])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([543])
        testCase.setOutputs([1])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-87])
        testCase.setOutputs([2])
      )
    ]
