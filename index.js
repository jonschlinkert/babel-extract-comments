/*!
 * babel-extract-comments <https://github.com/jonschlinkert/babel-extract-comments>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Extract code comments from the given `string`.
 *
 * ```js
 * var extract = require('babel-extract-comments');
 * extract('// this is a code comment');
 * ```
 * @param  {String} `string` String of javascript
 * @param  {Function} `fn` Optional. Functionto transform commend objects (AST tokens)
 * @return {Object} Object of code comments.
 * @api public
 */

module.exports = function(str, fn) {
  var babel = require('babel-core');
  var res = babel.transform(str, {
    ast: true,
    comments: true,
    code: false
  });

  var comments = res.ast.comments;
  var len = comments.length, i = -1;
  while (++i < len) {
    var comment = comments[i];
    comment.range = [comment.start, comment.end];
    if (typeof fn === 'function') {
      var obj = fn(comment);
      if (obj) {
        comment = obj;
      }
    }
  }
  return comments;
};
