var _ = require('../common/util');
var _callback = [];

/**
 * dispatch msg
 */
exports.dispatch = function(msg) {
  for (var i = 0; i < _callback.length; i++) {
    _.log('msg=>', msg);
    _callback[i](msg);
  }
};

/**
 * register store
 */
exports.register = function(callback) {
  _callback.push(callback);
};
