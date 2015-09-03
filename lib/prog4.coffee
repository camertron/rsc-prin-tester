# computes the value of 3(a + bc) + bc

Tests = {} unless Tests?

class Tests.Prog4
  @tightSteps = 14

  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([1, 2, 3])
        testCase.setOutputs([27])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-17, 8, 4.9])
        testCase.setOutputs([105.8])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([0, 0, 0])
        testCase.setOutputs([0])
      )

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-2.1, -6.3, 2])
        testCase.setOutputs([-56.7])
      )
    ]
