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
    result = Prog1.test(program)

    if result.didSucceed()
      console.log("Succeeded!")
    else
      console.log("Failed!")
      console.log(result.message)

(exports ? @).TestSuite = TestSuite
