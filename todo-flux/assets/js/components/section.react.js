var React = require('react');
var todoStore = require('../store/todostore');

var Section = module.exports = React.createClass({
    getInitialState: function() {
      return {todoList: []};
    },
    componentDidMount: function() {
      todoStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
      todoStore.removeChangeListener(this.onChange);
    },
    onChange: function() {
      this.setState({todoList: todoStore.todoList()});
    },
    toggle: function(id) {
      this.props.onToggle(id);
    },
    destroy: function(id) {
      this.props.onDestroy(id);
    },
    toggleAll: function() {
      this.props.onToggleAll();
    },
    render: function() {
        return (
          <section id="main">
            <input id="toggle-all" type="checkbox" onChange={this.toggleAll}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul id="todo-list">
            {
              this.state.todoList.map(function(item, i) {
                return (
                  <li key={item.id} className={item.done ? 'done' : ''}>
                    <input
                    type="checkbox"
                    checked={item.done}
                    onChange={this.toggle.bind(this, item.id)}/>
                    { item.text + " "}
                    <a onClick={this.destroy.bind(this, item.id)}>x</a>
                  </li>
                );
              }, this)
            }
            </ul>
          </section>
        );
    }
});
