var React = window.React = require('react');
var Header = require('./components/header.react');
var Section = require('./components/section.react');
var Footer = require('./components/footer.react');

//数据中心
var appStore = require('./todo-store');
//将immutable数据minxin进入app
var StoreMixin = require('iflux').mixins.StoreMixin;



/**
 * TodoApp
 */
var TodoApp = React.createClass({
  mixins: [StoreMixin(appStore)],

  render() {
    return (
      <div>
        <section id="todoapp">
          <Header data={this.state.get('inputValue')}/>
          <Section data={this.state.get('todo')}/>
        </section>
        <Footer/>
      </div>
    );
  }
});


//render
React.render(<TodoApp />, document.body);
