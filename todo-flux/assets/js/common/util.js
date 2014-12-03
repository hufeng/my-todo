//致敬underscore
var _ = module.exports = {};


//缓存全局的调试状态，不需要每个方法都去判断
var isDebug = top.window.location.hash === '#debug';

/**
 * 更安全，放心的log，从此可以安心的使用console.log了
 */
_.log = function() {
  isDebug && console && console.log.apply(console, arguments);
};
