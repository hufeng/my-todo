var $msg = require('./msg');
var model = require('./model');

$(function() {
    //添加
    $msg.on('todo:add', function(event, text) {
        model.add(text).always(function(err, todoList) {
            err
                ? $msg.trigger('todo:error', err)
                : $msg.trigger('todo:list', todoList);
        });
    });

    //删除
    $msg.on('todo:destroy', function(event, id) {
        model.destroy(id).always(function(err, todoList) {
            err
                ? $msg.trigger('todo:error')
                : $msg.trigger('todo:list', todoList);
                
        }); 
    });

    //改变状态
    $msg.on('todo:toggle', function(event, id) {
        model.toggle(id).always(function(err, todoList) {
            err
                ? $msg.trigger('todo:error')
                : $msg.trigger('todo:list', todoList);
        }); 
    });

    //全选择
    $msg.on('todo:toggleAll', function(event) {
        model.toggleAll().always(function(err, todoList) {
            err
                ? $msg.trigger('todo:error')
                : $msg.trigger('todo:list', todoList);
        });
    });
});


//系统入口
exports.main = function() {
    model.todoList().always(function(err, todoList) {
        err
            ? $msg.trigger('todo:error')
            : $msg .trigger('todo:list', todoList);
    });
}
