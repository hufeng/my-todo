var React = require('react');

var ImmutableHelp = module.exports = {
  shouldComponentUpdate: function (nextProps, nextState) {
    return nextProps != this.props;
  }
};
