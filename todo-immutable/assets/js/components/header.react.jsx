var React = require('react');
var Immutable = require('immutable');
var appStore = require('../todo-store');
var PureMixin = require('fine/mixins/pure-mixin');



/**
 * generate uuid
 */
var uuid = (function() {
  var i = 0;
  return function() {
    return '' + (++i);
  }
})();



/**
 * 封装header
 */
var Header = module.exports = React.createClass({

  mixins: [PureMixin],


  /**
   * 输入框change
   */
  onChange(e) {
    var cursor = appStore.cursor();
    cursor.set('inputValue', e.target.value);
  },

  /**
   * ENTER保存
   */
  onKeyDown(e) {
    var keyCode = e.keyCode;
    var value = this.props.data;
    var cursor = appStore.cursor();

    if (keyCode == 13 && value) {
      //batch update
      cursor.withMutations(function(cursor) {
        //clean input text
        cursor.set('inputValue', '');

        //update todo
        var id = uuid();
        cursor.setIn(['todo', id], Immutable.Map({
          id: id,
          text: value,
          done: false
        }));
      });
    }
  },

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
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}/>
        </header>
      );
    }
  });
