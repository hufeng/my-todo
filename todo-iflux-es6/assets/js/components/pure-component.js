import React, {Component} from 'react/addons';
let PureRenderMixin = React.addons.PureRenderMixin;


/**
 * PureComponent
 */
export default class PureComponent extends Component {
  /**
   * replace PureRenderMixin
   */
  shouldComponentUpdate() {
    return PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
  }

  /**
   * virtualdom
   */
  render() {}
}
