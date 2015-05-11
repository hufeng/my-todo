import React from 'react';
import PureComponent from './pure-component';


/**
 * footer
 */
export default class Footer extends PureComponent {

  render() {
    console.log('footer rendering....');

    return (
      <footer id="info">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    );
  }
}
