var Immutable = require('immutable');
var {Store, msg} = require('iflux');


/**
 * generate uuid
 */
var uuid = (function() {
  var i = 0;
  return function() {
    return '' + (++i);
  }
})();


/**
 * 整个应用的数据中心
 *
 */
var appStore = module.exports = Store({
  todo: {},
  inputValue: ''
});

msg.on('inputChange', (value) => {
  appStore.cursor().set('inputValue', value);
});


msg.on('todoListToggle', (id) => {
  appStore.cursor().updateIn(['todo', id, 'done'], function(done) {
    return !done;
  })
});


msg.on('destroyTodoList', (id) => {
  appStore.cursor().deleteIn(['todo', id]);
});

msg.on('todoListToggleAll', (checked) => {
  appStore.cursor().get('todo').withMutations(function(cursor) {
    cursor.forEach(function(_, k) {
      cursor.setIn([k, 'done'], checked);
    })
  });
});


msg.on('saveTodo', (value) => {
  //batch update
  appStore.cursor().withMutations(function(cursor) {
    //clean input text
    cursor.set('inputValue', '');

    //update todo
    var id = uuid();
    cursor.setIn(['todo', id], Immutable.Map({
      id: id,
      text: value,
      done: false
    }));
  });
})
