var React = window.React = require('react');
var Header = require('./components/header.react');
var Section = require('./components/section.react');
var Footer = require('./components/footer.react');

var Immutable = require('immutable');
var Cursor = require('immutable/contrib/cursor');

var data = Immutable.fromJS({todo:{}, inputValue: ''});
var cursor = Cursor.from(data, onChange);

/**
 * cursor change state
 */
function onChange(nextState, preState) {
  if (preState != data) {
    throw new Error('attempted to alter expired data');
  }
  //sync state
  data = nextState;
  cursor = Cursor.from(data, onChange);

  //log
  console.log('data=>', data.toJS());
  console.log(cursor.toString());

  //render
  React.render(<TodoApp cursor={cursor}/>, document.body);
}


/**
 * TodoApp
 */
var TodoApp = React.createClass({
    render: function() {
      return (
        <div>
          <section id="todoapp">
            <Header cursor={this.props.cursor}/>
            <Section cursor={this.props.cursor}/>
          </section>
          <Footer/>
        </div>
      );
    }
});

//render
React.render(<TodoApp cursor={cursor}/>, document.body);
