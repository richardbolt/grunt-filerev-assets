'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.filerev_assets = {
  setUp: function(done) {
    // Setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var created = grunt.file.isFile('tmp/assets.json');
    test.equal(true, created, 'should save filerev.summary to disk.');

    var actual = grunt.file.readJSON('tmp/assets.json');
    var expected = grunt.file.readJSON('test/expected/expected.json');
    test.deepEqual(actual, expected, 'should strip the given prefix.');

    test.done();
  },
  prettyPrint: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/assets-pretty.json');
    var expected = grunt.file.read('test/expected/expected.json');

    test.deepEqual(actual, expected, 'Should save in pretty-print format');

    test.done();
  }
};
