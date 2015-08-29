fs = require('fs')
Rsc = require('rsc')
atob = require('atob')
colors = require('colors')

class TestSuite
  constructor: (@file) ->

  run: ->
    programs = JSON.parse(fs.readFileSync(@file, 'ascii'))
    @testProgram(programData) for programData in programs
    console.log('')

  testProgram: (programData) ->
    identifier = programData[0]
    program = @loadProgram(programData[1])
    testClass = @getTestClass(identifier)
    return unless testClass

    results = testClass.run(program)

    for result in results
      if result.didSucceed()
        process.stdout.write('.')
      else
        process.stdout.write('F'.red)
        # console.log(result.message)

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
