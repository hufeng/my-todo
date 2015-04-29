var Immutable = require('immutable');
var {Store, msg} = require('iflux');
var Todo = require('./record/todo');
var constant = require('./const');
var webApi = require('./webapi');


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
  todo: [],
  inputValue: ''
});

//init
webApi
  .list()
  .then((data) => {
    appStore.cursor().set('todo', Immutable.fromJS(data));
  });


//dispatcher
msg
  .on(constant.INPUT_CHANGE, handleInputChange)
  .on(constant.TODO_LIST_TOGGLE, handleToggle)
  .on(constant.TODO_LIST_DESTROY, destroy)
  .on(constant.TODO_LIST_TOGGLE_ALL, handleToggleAll)
  .on(constant.TODO_SAVE, handleSave);


function updateTodo(todo, cursor) {
  cursor = cursor || appStore.cursor();
  cursor.set('todo', Immutable.fromJS(todo));
}


function handleInputChange(value) {
  appStore.cursor().set('inputValue', value);
}


function handleSave(text) {
  var todo = {
    text: text,
    done: false
  };
  
  webApi
    .save(todo)
    .then(() => {
      appStore.cursor().set('inputValue', '');
      return webApi.list();
    })
    .then((data) => {
      updateTodo(data);
    });
}

function handleToggle(id) {
  webApi
    .toggle(id)
    .then(() => {
      return webApi.list()
    })
    .then((data) => {
      updateTodo(data);
    });
}

function handleToggleAll(status) {
  console.log(status);
  
  webApi
    .toggleAll(status)
    .then(() => {
      return webApi.list();
    })
    .then((data) => {
      updateTodo(data);
    });
}

function destroy(id) {
  webApi
    .destroy(id)
    .then(() => {
      return webApi.list()
    })
    .then((data) => {
      updateTodo(data);
    });
}
