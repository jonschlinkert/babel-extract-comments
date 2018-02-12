'use strict';

/**
 * Create an instance of App with `options`.
 *
 * @param {Object} options
 * @api public
 */

function App(options) {
  this.options = options || {};
  this.cache = {};
}

/**
 * Set `key` on cache with the given `value`
 *
 * @param {String} `key`
 * @param {any} `value`
 * @api public
 */

// this is a line comment
App.prototype.set = function(key, value) {};

/**
 * Get `key` from cache.
 *
 * @param {String} `key`
 * @api public
 */

App.prototype.get = function(key) {};

/**
 * Delete `key` from cache
 *
 * @param {String} `key`
 * @param {any} value
 * @api public
 */

App.prototype.del = function(key) {};
