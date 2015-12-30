'use strict';

var fs = require('fs');
var util = require('util');
var assert = require('assert');
var extract = require('./');

function read(fp) {
  return fs.readFileSync('fixtures/' + fp, 'utf8');
}

describe('extract comments', function () {
  it('should expose a function as the main export', function() {
    assert(typeof extract === 'function');
  });

  it('should extract line comments', function() {
    var comments = extract('foo // bar');
    assert(Array.isArray(comments));
    assert.equal(comments.length, 1);
  });

  it('should support a transform function as the second argument', function() {
    var comments = extract('foo // bar', function(comment) {
      comment.foo = 'bar';
    });
    assert.equal(comments[0].foo, 'bar');
  });

  it('should extract block comments', function() {
    var comments = util.inspect(extract(read('app.js')), null, 10);
    assert(comments.length > 1);
  });
});

