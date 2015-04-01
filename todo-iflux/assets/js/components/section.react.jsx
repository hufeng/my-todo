var React = require('react');
var {msg} = require('iflux');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var constant = require('../const');

/**
 * 封装section组件
 */
var Section = module.exports = React.createClass({
  mixins: [PureRenderMixin],

  toggle(id) {
    msg.emit(constant.TODO_LIST_TOGGLE, id);
  },

  destroy(id) {
    msg.emit(constant.TODO_LIST_DESTROY, id);
  },

  toggleAll(e) {
    var state = e.target.checked;

    msg.emit(constant.TODO_LIST_TOGGLE_ALL, state);
  },


  /**
   * virtualdom
   */
  render: function() {
    console.log('section render....');
    var todoList = this.props.data;

    return (
      <section id="main">
        <input id="toggle-all" type="checkbox" onChange={this.toggleAll}/>
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
          {todoList.toSeq().map(function(v, k) {
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
          }, this).toList().reverse().toJS()}
        </ul>
        </section>
      );
    }
  });
