import React from 'react/addons';
import {INPUT_CHANGE, TODO_SAVE} from '../const';
import {msg} from 'iflux';

/**
 * 封装header
 */
export default class Header extends React.Component {

  /**
   * 输入框change
   */
  onChange(e) {
    msg.emit(INPUT_CHANGE, e.target.value);
  }

  /**
   * ENTER保存
   */
  onKeyDown(e) {
    var keyCode = e.keyCode;
    var value = this.props.data;

    if (keyCode == 13 && value) {
      msg.emit(TODO_SAVE, value);
    }
  }

  render() {
    console.log('header reader....');

    return (
      <header id="header">
        <h1>todos</h1>
        <input
          id="new-todo"
          placeholder="What needs to be done?"
          autofocus
          value={this.props.data}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}/>
        </header>
      );
  }
};


Header.prototype.shouldComponentUpdate = React.addons.PureRenderMixin.shouldComponentUpdate;
