class TestResult
  constructor: (@identifier, @program, @testCases, @testClass) ->

  numFailed: ->
    failed = 0
    failed += 1 for testCase in @testCases when !testCase.didSucceed()
    failed

  didSucceed: ->
    return false for testCase in @testCases when !testCase.didSucceed()
    true

  eachCase: (callback) ->
    callback(testCase) for testCase in @testCases
    return
