describe("sum of three numbers", function() {
  var Rsc = require('../../node_modules/rsc.js/dist/rsc.js');
  var program = 'INP 32\nLDA 32\nINP 32\nADD 32\nINP 32\nADD 32\nSTA 33\nOUT 33\nSTP'

  beforeEach(function() {
    this.runner = new Rsc.TestRunner(program);
  });

  it('does something', function() {
    this.runner.setInputs([3, 4, 5]);
    this.runner.setNumberOfOutputs(1);
    this.runner.run();

    expect(this.runner.outputs).toContain(12)
  });
});
