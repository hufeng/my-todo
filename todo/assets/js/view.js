var $msg = require('./msg');
var _ = require('./util');
var template = require('../tpl/todolist.handlebars');


//执手看伊人，仍如初见时
$(function() {
    //新增
    $('#new-todo').on('keyup', todoAdd);

    //完成or取消
    $("#todo-list").on('change', ':checkbox' , toggle);

    //删除
    $('#todo-list').on('click', 'a', destroy);

    //全选
    $('#toggle-all').on('click', toggleAll);
    

    //订阅-重新刷新todolist
    $msg.on('todo:list', loadTodoList);

    //订阅-错误消息
    $msg.on('todo:error', error);

    
});

function todoAdd(e) {
    var keyCode = e.keyCode;
    var value = e.target.value;
    _.log("keyCode:%s, text: %s", keyCode, value);
    
    if (keyCode === 13 && value != '') {
        _.log('tigger todo:add arg: %s', value);
        $(e.target).val('');
        $msg.trigger('todo:add', value);
    }
}

function loadTodoList(event, todoList) {
    $("#todo-list").html(template(todoList));
    $("#main")[todoList.length == 0 ? "hide" : "show"]();
}

function toggle(e) {
    var id = $(e.target).parent().attr('id');
    $msg.trigger('todo:toggle', id);

}

function toggleAll(e) {
    console.log("toggleAll");
    $msg.trigger('todo:toggleAll');
}

function error(err) {
    alert(err.message);
}

function destroy(e) {
    var id = $(e.target).parent().attr('id');
    $msg.trigger('todo:destroy', id);
}
