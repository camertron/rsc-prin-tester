fs = require('fs')
Rsc = require('rsc')
atob = require('atob')
colors = require('colors')

class TestSuite
  constructor: (@file) ->

  run: ->
    testResults = []
    failed = 0

    programs = JSON.parse(fs.readFileSync(@file, 'ascii'))

    for programData in programs
      identifier = programData[0]
      program = @loadProgram(programData[1])
      testResult = @testProgram(identifier, program)
      testResults.push(testResult)
      failed += testResult.numFailed()

    console.log('')
    console.log('')

    for testResult, idx in testResults
      testResult.eachCase (testCase) ->
        unless testCase.didSucceed()
          console.log("#{idx}) #{testResult.identifier}")
          console.log("   #{testCase.message}")

    console.log('')
    console.log("#{testResults.length} examples, #{failed} failures")
    console.log('')

    grader = new Grader(testResults)
    grades = grader.calculateGrades()
    finalGrades = grader.calculateFinalGrades()

    console.log('Grades:')
    for identifier, grade of grades
      console.log("#{identifier}: #{grade} points, #{grader.calculateGradePercentage(grade, Grader.MAX_POINTS_PER_PROGRAM)}%")

    console.log('')
    console.log('Final Grades:')
    for identifier, grade of finalGrades
      console.log("#{identifier}: #{grade} points, #{grader.calculateGradePercentage(grade, Grader.MAX_POINTS_PER_PROGRAM)}%")

    console.log('')
    finalGrade = grader.calculateFinalGrade(testResults)
    console.log("Final grade: #{finalGrade} points, #{grader.calculateGradePercentage(finalGrade, Grader.MAX_POINTS)}%")

  testProgram: (identifier, program) ->
    testClass = @getTestClass(identifier)
    return [] unless testClass

    testCases = testClass.run(program)

    for testCase in testCases
      if testCase.didSucceed()
        process.stdout.write('.')
      else
        process.stdout.write('F'.red)

    new TestResult(identifier, program, testCases, testClass)

  loadProgram: (text) ->
    instructions = JSON.parse(atob(text.slice(text.indexOf('#') + 1)))
    program = ('' for i in [0..(Rsc.defaultNumRows * Rsc.defaultNumColumns)])

    for k, v of instructions
      program[k] = v

    program.join("\n")

  getTestClass: (identifier) ->
    Tests[@capitalize(identifier)]

  capitalize: (str) ->
    str[0].toUpperCase() + str.slice(1).toLowerCase()

(exports ? @).TestSuite = TestSuite
