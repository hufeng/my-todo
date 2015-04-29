/**
 * todo model
 *
 * 假装在连接数据库
 * 使用ActiveRecord模式
 */
var todo = {};


function Todo(todo) {
  if (!(this instanceof Todo)) return new Todo(todo);

  todo = todo || {};
  
  //copy property
  for (var key in todo) {
    if (todo.hasOwnProperty(key)) {
      this[key] = todo[key];
    }
  }
}


/**
 * uuid
 */
function uuid() {
  return new Date().getTime();
}



/**
 * save
 *
 * change function => thunk
 */
Todo.prototype.save = function() {
  var self = this;
  
  return function(callback) {
    //假装在异步
    setTimeout(function() {
      var id = uuid();
      todo[id] = {
	id: id,
	text: self.text,
	done: self.done
      };
      callback(null, id);
    }, 100);
  };
};


Todo.prototype.destroy = function() {
  var id = this.id;
  
  return function(callback) {
    setTimeout(function() {
      delete todo[id];
      callback(null);
    }, 100);
  };
};


/**
 * update
 * 
 * thunk
 */
Todo.prototype.toggle = function() {
  var id = this.id;
  
  return function(callback) {
    setTimeout(function() {
      todo[id].done = todo[id].done === 'false' ? 'true' : 'false';
      callback(null, id);
    }, 100);
  };
};


Todo.toggleAll = function(status) {
  return function(callback) {
    setTimeout(function() {
      Object.keys(todo).forEach(function(v) {
	todo[v].done = status;
      });
      callback(null);
    }, 100);
  };
};



/**
 * list
 *
 * thunk
 */
Todo.list = function() {
  return function(callback) {
    setTimeout(function() {
      var todoList = Object.keys(todo).map(function(v) {
	return todo[v];
      });
      callback(null, todoList);
    }, 1000);
  };
};





module.exports = Todo;
