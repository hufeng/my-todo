var React = require('react');
var Immutable = require('immutable');
var immutableMixin = require('../mixins/immutableHelp');


var uuid = (function() {
  var i = 0;
  return function() {
    return '' + (++i);
  }
})();
//

/**
 * 封装header
 */
var Header = module.exports = React.createClass({
  mixins: [immutableMixin],
  /**
   * 输入框change
   */
  onChange: function(e) {
    this.props.cursor.set('inputValue', e.target.value);
  },

  /**
   * ENTER保存
   */
  onKeyDown: function(e) {
    var keyCode = e.keyCode;
    var value = this.props.cursor.get('inputValue');

    if (keyCode == 13 && value) {
      //batch update
      this.props.cursor.withMutations(function(cursor) {
        //clean input text
        cursor.set('inputValue', '');

        //update todo
        var id = uuid();
        cursor.setIn(['todo', id], Immutable.fromJS({
          id: id,
          text: value,
          done: false
        }));
      });
    }
  },

  render: function() {
    return (
      <header id="header">
        <h1>todos</h1>
        <input
          id="new-todo"
          placeholder="What needs to be done?"
          autofocus
          value={this.props.cursor.get('inputValue')}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}/>
        </header>
      );
    }
  });
