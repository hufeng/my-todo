import React from 'react';
import PureComponent from './pure-component';
import {
  TODO_LIST_TOGGLE,
  TODO_LIST_DESTROY,
  TODO_LIST_TOGGLE_ALL} from '../const';
import {msg} from 'iflux';

/**
 * 封装section组件
 */
export default class Section extends PureComponent {

  /**
   * virtualdom
   */
  render() {
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


  toggle(id) {
    msg.emit(TODO_LIST_TOGGLE, id);
  }

  destroy(id) {
    msg.emit(TODO_LIST_DESTROY, id);
  }

  toggleAll(e) {
    let state = e.target.checked;
    msg.emit(TODO_LIST_TOGGLE_ALL, state);
  }
}
