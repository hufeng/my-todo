var Todo = require('../models/todo');


exports.init = function(app) {

  
  app.get('/', function *renderHome() {
    yield this.render('index');
  });

  
  app.get('/todo', function *renderList() {
    try {
      this.body = yield Todo.list();
    } catch(err) {
      //简单处理
      console.log(err);
      this.body = [];
    }
  });


  app.post('/todo/save', function *renderSave() {
    try {
      var todo = Todo(this.request.body);
      yield todo.save();
      this.body = 'success';
    } catch(err) {
      console.log(err);
      this.body = 'fail';
    }
  });


  app.get('/todo/destroy/:id', function *renderDestroy() {
    var todo = Todo({id: this.params.id});
    
    try {
      yield todo.destroy();
      this.body = 'success';
    } catch(err) {
      console.log(err);
      this.body = 'fail'
    }
  });


  app.post('/todo/toggle/:id', function *renderUpdate() {
    var todo = Todo({
      id: this.params.id
    });
    try {
      yield todo.toggle();
      this.body = 'success';
    } catch(err) {
      console.log(err);
      this.body = 'fail';
    }
  });


  app.post('/todo/toggleall', function *renderToggleAll() {
    var status = this.request.body.status;

    try {
      yield Todo.toggleAll(status);
      this.body = 'success';
    } catch(err) {
      console.log(err);
      this.body = 'fail';
    }
  });
};
