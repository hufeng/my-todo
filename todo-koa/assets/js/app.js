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
    console.log('render todo app...');
    var store = appStore.data();
    return (
      <div>
        <section id="todoapp">
          <Header data={store.get('inputValue')}/>
          <Section data={store.get('todo')}/>
        </section>
        <Footer/>
      </div>
    );
  }
});


//render
React.render(<TodoApp />, document.body);
