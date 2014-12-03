var React = require('react');
var constant = require('../common/const');


var Header = module.exports = React.createClass({
    getInitialState: function() {
      return {value: ''};
    },
    onChange: function(e) {
        this.setState({value: e.target.value});
    },
    onKeyDown: function(e) {
        var value = this.state.value;
        var keyCode = e.keyCode;
        if (value && keyCode === 13) {
            this.setState({value: ''});
            this.props.onSave(value);
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
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}/>
          </header>
        );
    }
});
