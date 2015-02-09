var Store = require('fine/store');


/**
 * 整个应用的数据中心
 *
 */
var appStore = new Store({
  todo: {},
  inputValue: ''
});


module.exports = appStore;
