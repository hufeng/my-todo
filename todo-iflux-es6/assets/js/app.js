import React, {Component} from 'react';
import Header from './components/header.react';
import Section from './components/section.react';
import Footer from './components/footer.react';
import {msg} from 'iflux';
//数据中心
import store from './todo-store';

/**
 * TodoApp
 */
class TodoApp extends Component {

  render() {
    var store = this.props.store;

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
}


//data change, re-render
store.onStoreChange(store => {
  React.render(<TodoApp store={store}/>, document.body);
});


//render
React.render(<TodoApp store={store.data()}/>, document.body);
