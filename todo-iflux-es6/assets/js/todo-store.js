import {Store, msg} from 'iflux';
import Todo from './record/todo';
import {
  INPUT_CHANGE,
  TODO_LIST_TOGGLE,
  TODO_LIST_DESTROY,
  TODO_LIST_TOGGLE_ALL,
  TODO_SAVE
} from './const';

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
let appStore =  Store({
  todo: {},
  inputValue: ''
});


export default appStore;


msg.on(INPUT_CHANGE, (value) => {
  appStore.cursor().set('inputValue', value);
});


msg.on(TODO_LIST_TOGGLE, (id) => {
  appStore.cursor().updateIn(['todo', id, 'done'], function(done) {
    return !done;
  })
});


msg.on(TODO_LIST_DESTROY, (id) => {
  appStore.cursor().deleteIn(['todo', id]);
});

msg.on(TODO_LIST_TOGGLE_ALL, (checked) => {
  appStore.cursor().get('todo').withMutations(function(cursor) {
    cursor.forEach(function(_, k) {
      cursor.setIn([k, 'done'], checked);
    })
  });
});


msg.on(TODO_SAVE, (value) => {
  //batch update
  appStore.cursor().withMutations(function(cursor) {
    //clean input text
    cursor.set('inputValue', '');

    //update todo
    var id = uuid();
    cursor.setIn(['todo', id], new Todo({
      id: id,
      text: value,
      done: false
    }));
  });
})
