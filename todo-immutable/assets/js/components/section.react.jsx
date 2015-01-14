var React = require('react');
var immutableMixin = require('../mixins/immutableHelp');


/**
 * 封装section组件
 */
var Section = module.exports = React.createClass({
  mixins: [immutableMixin],

  toggle: function (id) {
    this.props.cursor.updateIn(['todo', id, 'done'], function(done) {
      return !done;
    })
  },

  destroy: function (id) {
    this.props.cursor.deleteIn(['todo', id]);
  },

  toggleAll: function (e) {
    var state = e.target.checked;

    this.props.cursor.get('todo').withMutations(function(cursor) {
      cursor.forEach(function(_, k) {
        cursor.setIn([k, 'done'], state);
      })
    });
  },

  getTodoList: function () {
    var todo = this.props.cursor.get('todo').toMap();
    var todoList = [];
    todo.map(function(v, k) {
      todoList.push(v);
    });
    return todoList;
  },

  render: function() {
    var todoList = this.getTodoList();

    return (
      <section id="main">
        <input id="toggle-all" type="checkbox" onChange={this.toggleAll}/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
          {todoList.map(function(v, k) {
              return (
                <li key={k} className={v.get('done') ? 'done' : ''}>
                  <input
                    type="checkbox"
                    checked={v.get('done')}
                    onChange={this.toggle.bind(this, v.get('id'))}/>
                    { v.get('text') + " "}
                    <a onClick={this.destroy.bind(this, v.get('id'))}>x</a>
                  </li>
              );
          }, this)}
        </ul>
        </section>
      );
    }
  });
