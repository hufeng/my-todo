var Immutable = require('immutable');


/**
 * 创建todo类型
 */
var Todo = Immutable.Record({
  id: '',
  text: '',
  done: false
});


module.exports = Todo;
