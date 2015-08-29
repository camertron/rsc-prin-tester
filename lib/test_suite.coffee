path = require('path')
glob = require('glob')
fs = require('fs')
Rsc = require('rsc')

class TestSuite
  constructor: (@path) ->
    @files = glob.sync(path.join(@path, '*.txt'))

  run: ->
    @runFile(file) for file in @files

  runFile: (file) ->
    program = fs.readFileSync(file, 'ascii')
    results = @getTestClass(file).run(program)

    for result in results
      if result.didSucceed()
        console.log("Succeeded!")
      else
        console.log("Failed!")
        console.log(result.message)

  getTestClass: (file) ->
    prog = @capitalize(path.basename(file, '.txt'))
    Tests[prog]

  capitalize: (str) ->
    str[0].toUpperCase() + str.slice(1).toLowerCase()

(exports ? @).TestSuite = TestSuite
