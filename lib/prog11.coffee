# calculates how many times 2 divides evenly into
# the given input

Tests = {} unless Tests?

class Tests.Prog11
  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([6])
        testCase.setOutputs([3])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([9])
        testCase.setOutputs([4])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([0])
        testCase.setOutputs([0])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([1])
        testCase.setOutputs([0])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([2])
        testCase.setOutputs([1])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([2.9])
        testCase.setOutputs([1])
      )
    ]
