var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var dispatcher = require('../dispatcher/dispatcher');
var constant = require('../common/const');

var i = 0;
var todo = {};
var CHANGE = 'CHANGE';

/**
 * 对外暴露的对象
 */
var todoStore = module.exports = assign({}, EventEmitter.prototype, {
  todoList: function() {
      var todoList = [];
      for (var key in todo) {
          todoList.push(todo[key]);
      }
      return todoList;
  },

  addChangeListener: function(callback) {
      this.on(CHANGE, callback);
  },

  removeChangeListener: function(callback) {
      this.removeListener(CHANGE, callback);
  },

  emitChange: function() {
      this.emit(CHANGE);
  }
});

/**
 * add
 */
var add = function(text) {
  var id = ++i;
  todo[id] = {
      id: id,
      text: text,
      done: false
  };
};

var destroy = function(id) {
  delete todo[id];
};

var toggle = function(id) {
  todo[id].done = !todo[id].done;
};

var toggleAll = function() {
  for (var key in todo) {
      todo[key].done = !todo[key].done;
  }
};

/**
 * 告诉dispatcher，你可以做什么
 */
dispatcher.register(function(msg) {
  var action = msg.action;

  switch(action) {
  case constant.ADD:
      add(msg.text);
      break;
  case constant.DESTROY:
      destroy(msg.id);
      break;
  case constant.TOGGLE:
      toggle(msg.id);
      break;
  case constant.TOGGLEALL:
      toggleAll();
      break;
  }

  todoStore.emitChange();
});
