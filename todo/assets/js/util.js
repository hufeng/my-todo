//致敬underscore(简单，优雅，纯净)

var _ = module.exports = {};

/**
 * 生成唯一id
 */
_.uuid = (function() {
    var i = 0;
    return function() {
        return ++i;
    };
})();


/**
 * 搜索数组中第一个匹配的元素，执行callback
 */
_.some = function(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i], i)) {
            return callback(arr[i], i);
        }
    }
};

/**
 * 简单抽象promise的模板
 */
_.promise = function(callback) {
    var deferred = new $.Deferred;
    callback(deferred);
    return deferred.promise();
};

/**
 * 简单，安全，放心的console.log 
 */
_.log = function() {
    var isDebug = window.location.hash === '#debug';
    console && isDebug && console.log.apply(console, arguments);
};
