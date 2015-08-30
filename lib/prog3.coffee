# computes the value of x^2 + 2xy + y^2

Tests = {} unless Tests?

class Tests.Prog3
  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([5, 9])
        testCase.setOutputs([196])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([6.4, 18.3])
        testCase.setOutputs([610.1])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([0, 0])
        testCase.setOutputs([0])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([-5, 4.3])
        testCase.setOutputs([0.5])
      )
    ]
