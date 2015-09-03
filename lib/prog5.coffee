# prints 0 if x is 0, 1 if x is > 0, and 2 if x < 0

Tests = {} unless Tests?

class Tests.Prog5
  @tightSteps = 10

  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([0])
        testCase.setOutputs([0])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([2])
        testCase.setOutputs([1])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-3])
        testCase.setOutputs([2])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-0.1])
        testCase.setOutputs([2])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([0.1])
        testCase.setOutputs([1])
      )
    ]
