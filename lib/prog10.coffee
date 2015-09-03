# calculates the average of an unknown number of inputs,
# user enters a negative number to halt

Tests = {} unless Tests?

class Tests.Prog10
  @tightSteps = 17

  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([1, 6, 7, 4, 8, 2, 10, 14, 6, 3, -1])
        testCase.setOutputs([6])
      ),

      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([1.1, 6.3, 7.3, 4.5, 8.2, 10, 14.7, -1])
        testCase.setOutputs([7.4])
      )
    ]
