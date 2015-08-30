fs = require('fs')
Rsc = require('rsc')
atob = require('atob')
colors = require('colors')

class TestSuite
  constructor: (@file) ->

  run: ->
    allResults = []
    failed = 0

    programs = JSON.parse(fs.readFileSync(@file, 'ascii'))

    for programData in programs
      results = @testProgram(programData)
      allResults = allResults.concat(results)
      failed += 1 for result in results when !result.didSucceed()

    console.log('')
    console.log("#{allResults.length} examples, #{failed} failures")

  testProgram: (programData) ->
    identifier = programData[0]
    program = @loadProgram(programData[1])
    testClass = @getTestClass(identifier)
    return [] unless testClass

    results = testClass.run(program)

    for result in results
      if result.didSucceed()
        process.stdout.write('.')
      else
        process.stdout.write('F'.red)
        console.log(result.message)

    results

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
