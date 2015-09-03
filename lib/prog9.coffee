# User enters an unknown number of inputs, program counts
# negative inputs. User inputs a 0 to halt, program prints
# number of negatives.

Tests = {} unless Tests?

class Tests.Prog9
  @tightSteps = 12

  @run = (program) ->
    [
      Rsc.runTestCase(program, (testCase) ->
        testCase.setInputs([3, 4, -8, -2, 1, -44, 16, -5, -6, 2, 0])
        testCase.setOutputs([5])
      )
    ]
