var React = window.React = require('react');
var Header = require('./components/header.react');
var Section = require('./components/section.react');
var Footer = require('./components/footer.react');
var dispatcher = require('./dispatcher/dispatcher');
var constant = require('./common/const');


var TodoApp = React.createClass({
  onToggleAll: function() {
    dispatcher.dispatch({
      action: constant.TOGGLEALL
    });
  },
  onToggle: function(id) {
    dispatcher.dispatch({
      action: constant.TOGGLE,
      id: id
    });
  },
  onDestroy: function(id) {
    dispatcher.dispatch({
      action: constant.DESTROY,
      id: id
    });
  },
  onSave: function(text) {
    dispatcher.dispatch({
      action: constant.ADD,
      text: text
    });
  },
  render: function() {
      return (
        <div>
          <section id="todoapp">
            <Header onSave={this.onSave}/>
            <Section
              onToggleAll={this.onToggleAll}
              onToggle={this.onToggle}
              onDestroy={this.onDestroy}/>
          </section>
          <Footer/>
        </div>
      );
  }
});

React.render(<TodoApp/>, document.body);
