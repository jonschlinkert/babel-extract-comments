'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const assert = require('assert');
const extract = require('..');
const read = name => fs.readFileSync(path.join(__dirname, `fixtures/${name}`), 'utf8');

function isBlock(c) {
  return c.type === 'CommentBlock';
}
function isLine(c) {
  return c.type === 'CommentLine';
}

describe('babel-extract-comments', function() {
  describe('main export', function() {
    it('should extract line comments', function() {
      const comments = extract('foo // bar');
      assert(Array.isArray(comments));
      assert.equal(comments.filter(isLine).length, 1);
      assert.equal(comments.filter(isLine)[0].value, ' bar');
    });

    it('should extract block comments', function() {
      const comments = extract(read('app.js'));
      assert(comments.filter(isBlock).length > 1);
    });

    it('should extract line and block comments', function() {
      const str = fs.readFileSync(path.join(__dirname, '../index.js'), 'utf8');
      const comments = extract(str);
      assert(Array.isArray(comments));
      assert(comments.length >= 1);
      assert(/babel-extract-comments/.test(comments[0].value));
    });

    it('should extract complex comments', function() {
      const comments = extract(read('angular.js'), { allowReturnOutsideFunction: true });
      assert.equal(comments[comments.length - 1].loc.start.line, 29702);
    });
  });

  describe('.file', function() {
    it('should extract block comments from a file', function() {
      const comments = extract.file('app.js', { cwd: path.join(__dirname, 'fixtures') });
      assert(comments.filter(isBlock).length > 1);
    });

    it('should extract line comments from a file', function() {
      const comments = extract.file('app.js', { cwd: path.join(__dirname, 'fixtures') });
      assert(comments.filter(isLine).length >= 1);
    });
  });
});

