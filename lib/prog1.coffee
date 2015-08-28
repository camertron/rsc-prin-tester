# sums the three input numbers
class Prog1
  @test = (program) ->
    Rsc.runTestCase(program, (testCase) ->
      testCase.setInputs([3, 4, 5]);
      testCase.setOutputs([12]);
    )
