var _ = require('./util');
var todoList = [];

exports.add = function(text) {
    return _.promise(function(deferred) {
        //正式的代码应该是ajax调用
        //$.post(url, {text: text}
        //  .done(function(res) {
        //     deferred.resolve(null, res.todoList);  
        //  }))
        //  .fail(function() {
        //    deferred.reject(new Error('添加todo失败')));
        //  });
        todoList.push({
            id: _.uuid(),
            text: text,
            done: false
        });
        deferred.resolve(null, {todoList: todoList});
    });
};

exports.toggle = function(id) {
    return _.promise(function(deferred) {
        //正式环境的ajax调用
        //$.post(url).done(function(res) {
        //    deferred.resolve(null, res.todoList);
        //}).fail(function() {
        //    deferred.reject(new Error('更新状态失败'));
        //});
        _.some(todoList, function(item, i) {
            if (item.id == id) {
                item.done = !item.done;
                deferred.resolve(null, {todoList: todoList});
            } 
        });
    });
};

exports.destroy = function(id) {
    return _.promise(function(deferred) {
        //正式的环境ajax调用
        //$.post(url).done(function(res) {
        //    deferred.resolve(null, res.todoList);
        //}).fail(function() {
        //    deferred.reject(new Error('Oops, 删除失败！'));
        //});
        _.some(todoList, function(item, i) {
            if (item.id == id) {
                todoList.splice(i, 1);
                deferred.resolve(null, {todoList: todoList});
            }  
        });
    });
};

exports.toggleAll = function() {
    return _.promise(function(deferred) {
        for (var i = 0; i < todoList.length; i++) {
            todoList[i].done = true;
        }
        deferred.resolve(null, {todoList: todoList});
    });
};


exports.todoList = function() {
    return _.promise(function(deferred) {
        //正式环境应该是ajax获取初始化数据
        //$.get(url).done(function(res) {
        //    deferred.resolve(null, res.todoList);
        //}).fail(function() {
        //    deferred.reject(new Error('Oops,获取初始化数据错误'););
        //});
        deferred.resolve(null, {todoList: todoList});
    });  
};
