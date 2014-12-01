/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var vm = __webpack_require__(2);


	/**
	 * 无极生太极，太极生两仪
	 */
	vm.main();




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $msg = __webpack_require__(3);
	var _ = __webpack_require__(4);
	var template = __webpack_require__(6);


	//执手看伊人，仍如初见时
	$(function() {
	    //新增
	    $('#new-todo').on('keyup', todoAdd);

	    //完成or取消
	    $("#todo-list").on('change', ':checkbox' , toggle);

	    //删除
	    $('#todo-list').on('click', 'a', destroy);

	    //全选
	    $('#toggle-all').on('click', toggleAll);
	    

	    //订阅-重新刷新todolist
	    $msg.on('todo:list', loadTodoList);

	    //订阅-错误消息
	    $msg.on('todo:error', error);

	    
	});

	function todoAdd(e) {
	    var keyCode = e.keyCode;
	    var value = e.target.value;
	    _.log("keyCode:%s, text: %s", keyCode, value);
	    
	    if (keyCode === 13 && value != '') {
	        _.log('tigger todo:add arg: %s', value);
	        $(e.target).val('');
	        $msg.trigger('todo:add', value);
	    }
	}

	function loadTodoList(event, todoList) {
	    $("#todo-list").html(template(todoList));
	    $("#main")[todoList.length == 0 ? "hide" : "show"]();
	}

	function toggle(e) {
	    var id = $(e.target).parent().attr('id');
	    $msg.trigger('todo:toggle', id);

	}

	function toggleAll(e) {
	    console.log("toggleAll");
	    $msg.trigger('todo:toggleAll');
	}

	function error(err) {
	    alert(err.message);
	}

	function destroy(e) {
	    var id = $(e.target).parent().attr('id');
	    $msg.trigger('todo:destroy', id);
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var $msg = __webpack_require__(3);
	var model = __webpack_require__(5);

	$(function() {
	    //添加
	    $msg.on('todo:add', function(event, text) {
	        model.add(text).always(function(err, todoList) {
	            err
	                ? $msg.trigger('todo:error', err)
	                : $msg.trigger('todo:list', todoList);
	        });
	    });

	    //删除
	    $msg.on('todo:destroy', function(event, id) {
	        model.destroy(id).always(function(err, todoList) {
	            err
	                ? $msg.trigger('todo:error')
	                : $msg.trigger('todo:list', todoList);
	                
	        }); 
	    });

	    //改变状态
	    $msg.on('todo:toggle', function(event, id) {
	        model.toggle(id).always(function(err, todoList) {
	            err
	                ? $msg.trigger('todo:error')
	                : $msg.trigger('todo:list', todoList);
	        }); 
	    });

	    //全选择
	    $msg.on('todo:toggleAll', function(event) {
	        model.toggleAll().always(function(err, todoList) {
	            err
	                ? $msg.trigger('todo:error')
	                : $msg.trigger('todo:list', todoList);
	        });
	    });
	});


	//系统入口
	exports.main = function() {
	    model.todoList().always(function(err, todoList) {
	        err
	            ? $msg.trigger('todo:error')
	            : $msg .trigger('todo:list', todoList);
	    });
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//美源于我们内心对优雅的不懈追求
	//
	//usage:
	//
	//订阅:
	//msg.on('daddy', function where(event, data) {console.log(data);)});
	//
	//发布:
	//msg.trigger('daddy', {msg: 'where to go?'});
	module.exports = $({});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4);
	var todoList = [];

	exports.add = function(text) {
	    return _.promise(function(deferred) {
	        //正式的代码应该是ajax调用
	        //$.post(url, {text: text}
	        //  .done(function(res) {
	        //     deferred.resolve(null, res.todoList);  
	        //  }))
	        //  .fail(function() {
	        //    deferred.reject(new Error('添加todo失败')));
	        //  });
	        todoList.push({
	            id: _.uuid(),
	            text: text,
	            done: false
	        });
	        deferred.resolve(null, {todoList: todoList});
	    });
	};

	exports.toggle = function(id) {
	    return _.promise(function(deferred) {
	        //正式环境的ajax调用
	        //$.post(url).done(function(res) {
	        //    deferred.resolve(null, res.todoList);
	        //}).fail(function() {
	        //    deferred.reject(new Error('更新状态失败'));
	        //});
	        _.some(todoList, function(item, i) {
	            if (item.id == id) {
	                item.done = !item.done;
	                deferred.resolve(null, {todoList: todoList});
	            } 
	        });
	    });
	};

	exports.destroy = function(id) {
	    return _.promise(function(deferred) {
	        //正式的环境ajax调用
	        //$.post(url).done(function(res) {
	        //    deferred.resolve(null, res.todoList);
	        //}).fail(function() {
	        //    deferred.reject(new Error('Oops, 删除失败！'));
	        //});
	        _.some(todoList, function(item, i) {
	            if (item.id == id) {
	                todoList.splice(i, 1);
	                deferred.resolve(null, {todoList: todoList});
	            }  
	        });
	    });
	};

	exports.toggleAll = function() {
	    return _.promise(function(deferred) {
	        for (var i = 0; i < todoList.length; i++) {
	            todoList[i].done = true;
	        }
	        deferred.resolve(null, {todoList: todoList});
	    });
	};


	exports.todoList = function() {
	    return _.promise(function(deferred) {
	        //正式环境应该是ajax获取初始化数据
	        //$.get(url).done(function(res) {
	        //    deferred.resolve(null, res.todoList);
	        //}).fail(function() {
	        //    deferred.reject(new Error('Oops,获取初始化数据错误'););
	        //});
	        deferred.resolve(null, {todoList: todoList});
	    });  
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8).default.template(function (Handlebars,depth0,helpers,partials,data) {
	  this.compilerInfo = [4,'>= 1.0.0'];
	helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
	  var stack1, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

	function program1(depth0,data) {
	  
	  var buffer = "", stack1;
	  buffer += "\n";
	  stack1 = self.invokePartial(__webpack_require__(7), 'todo', depth0, helpers, partials, data);
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n";
	  return buffer;
	  }

	  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.todoList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1)),blockHelperMissing.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}));
	  if(stack1 || stack1 === 0) { return stack1; }
	  else { return ''; }
	  });

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8).default.template(function (Handlebars,depth0,helpers,partials,data) {
	  this.compilerInfo = [4,'>= 1.0.0'];
	helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
	  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


	  buffer += "<li id=\""
	    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
	    + "\">\n  <input type=\"checkbox\" "
	    + escapeExpression(__webpack_require__(9).call(depth0, (depth0 && depth0.done), {hash:{},data:data}))
	    + "/>\n  <span "
	    + escapeExpression(__webpack_require__(10).call(depth0, (depth0 && depth0.done), {hash:{},data:data}))
	    + ">"
	    + escapeExpression(((stack1 = (depth0 && depth0.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
	    + "</span>\n  <a href='javascript:;'>x</a> \n</li>";
	  return buffer;
	  });

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(11);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  return this.done ? 'checked="checked"' : '';
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  return this.done ? 'class=done' : '';
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*globals Handlebars: true */
	var base = __webpack_require__(12);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	var SafeString = __webpack_require__(13)["default"];
	var Exception = __webpack_require__(14)["default"];
	var Utils = __webpack_require__(15);
	var runtime = __webpack_require__(16);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	var create = function() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = SafeString;
	  hb.Exception = Exception;
	  hb.Utils = Utils;

	  hb.VM = runtime;
	  hb.template = function(spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	};

	var Handlebars = create();
	Handlebars.create = create;

	exports["default"] = Handlebars;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(15);
	var Exception = __webpack_require__(14)["default"];

	var VERSION = "1.3.0";
	exports.VERSION = VERSION;var COMPILER_REVISION = 4;
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '>= 1.0.0'
	};
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function(name, fn, inverse) {
	    if (toString.call(name) === objectType) {
	      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
	      Utils.extend(this.helpers, name);
	    } else {
	      if (inverse) { fn.not = inverse; }
	      this.helpers[name] = fn;
	    }
	  },

	  registerPartial: function(name, str) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials,  name);
	    } else {
	      this.partials[name] = str;
	    }
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function(arg) {
	    if(arguments.length === 2) {
	      return undefined;
	    } else {
	      throw new Exception("Missing helper: '" + arg + "'");
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function(context, options) {
	    var inverse = options.inverse || function() {}, fn = options.fn;

	    if (isFunction(context)) { context = context.call(this); }

	    if(context === true) {
	      return fn(this);
	    } else if(context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if(context.length > 0) {
	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      return fn(context);
	    }
	  });

	  instance.registerHelper('each', function(context, options) {
	    var fn = options.fn, inverse = options.inverse;
	    var i = 0, ret = "", data;

	    if (isFunction(context)) { context = context.call(this); }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    if(context && typeof context === 'object') {
	      if (isArray(context)) {
	        for(var j = context.length; i<j; i++) {
	          if (data) {
	            data.index = i;
	            data.first = (i === 0);
	            data.last  = (i === (context.length-1));
	          }
	          ret = ret + fn(context[i], { data: data });
	        }
	      } else {
	        for(var key in context) {
	          if(context.hasOwnProperty(key)) {
	            if(data) { 
	              data.key = key; 
	              data.index = i;
	              data.first = (i === 0);
	            }
	            ret = ret + fn(context[key], {data: data});
	            i++;
	          }
	        }
	      }
	    }

	    if(i === 0){
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function(conditional, options) {
	    if (isFunction(conditional)) { conditional = conditional.call(this); }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function(conditional, options) {
	    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
	  });

	  instance.registerHelper('with', function(context, options) {
	    if (isFunction(context)) { context = context.call(this); }

	    if (!Utils.isEmpty(context)) return options.fn(context);
	  });

	  instance.registerHelper('log', function(context, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, context);
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 3,

	  // can be overridden in the host environment
	  log: function(level, obj) {
	    if (logger.level <= level) {
	      var method = logger.methodMap[level];
	      if (typeof console !== 'undefined' && console[method]) {
	        console[method].call(console, obj);
	      }
	    }
	  }
	};
	exports.logger = logger;
	function log(level, obj) { logger.log(level, obj); }

	exports.log = log;var createFrame = function(object) {
	  var obj = {};
	  Utils.extend(obj, object);
	  return obj;
	};
	exports.createFrame = createFrame;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = function() {
	  return "" + this.string;
	};

	exports["default"] = SafeString;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var line;
	  if (node && node.firstLine) {
	    line = node.firstLine;

	    message += ' - ' + line + ':' + node.firstColumn;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (line) {
	    this.lineNumber = line;
	    this.column = node.firstColumn;
	  }
	}

	Exception.prototype = new Error();

	exports["default"] = Exception;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*jshint -W004 */
	var SafeString = __webpack_require__(13)["default"];

	var escape = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': "&quot;",
	  "'": "&#x27;",
	  "`": "&#x60;"
	};

	var badChars = /[&<>"'`]/g;
	var possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr] || "&amp;";
	}

	function extend(obj, value) {
	  for(var key in value) {
	    if(Object.prototype.hasOwnProperty.call(value, key)) {
	      obj[key] = value[key];
	    }
	  }
	}

	exports.extend = extend;var toString = Object.prototype.toString;
	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	var isFunction = function(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	if (isFunction(/x/)) {
	  isFunction = function(value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	var isArray = Array.isArray || function(value) {
	  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
	};
	exports.isArray = isArray;

	function escapeExpression(string) {
	  // don't escape SafeStrings, since they're already safe
	  if (string instanceof SafeString) {
	    return string.toString();
	  } else if (!string && string !== 0) {
	    return "";
	  }

	  // Force a string conversion as this will be done by the append regardless and
	  // the regex test will do this transparently behind the scenes, causing issues if
	  // an object's to string has escaped characters in it.
	  string = "" + string;

	  if(!possible.test(string)) { return string; }
	  return string.replace(badChars, escapeChar);
	}

	exports.escapeExpression = escapeExpression;function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	exports.isEmpty = isEmpty;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(15);
	var Exception = __webpack_require__(14)["default"];
	var COMPILER_REVISION = __webpack_require__(12).COMPILER_REVISION;
	var REVISION_CHANGES = __webpack_require__(12).REVISION_CHANGES;

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = REVISION_CHANGES[currentRevision],
	          compilerVersions = REVISION_CHANGES[compilerRevision];
	      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
	            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
	            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
	    }
	  }
	}

	exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

	function template(templateSpec, env) {
	  if (!env) {
	    throw new Exception("No environment passed to template");
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
	    var result = env.VM.invokePartial.apply(this, arguments);
	    if (result != null) { return result; }

	    if (env.compile) {
	      var options = { helpers: helpers, partials: partials, data: data };
	      partials[name] = env.compile(partial, { data: data !== undefined }, env);
	      return partials[name](context, options);
	    } else {
	      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
	    }
	  };

	  // Just add water
	  var container = {
	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,
	    programs: [],
	    program: function(i, fn, data) {
	      var programWrapper = this.programs[i];
	      if(data) {
	        programWrapper = program(i, fn, data);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = program(i, fn);
	      }
	      return programWrapper;
	    },
	    merge: function(param, common) {
	      var ret = param || common;

	      if (param && common && (param !== common)) {
	        ret = {};
	        Utils.extend(ret, common);
	        Utils.extend(ret, param);
	      }
	      return ret;
	    },
	    programWithDepth: env.VM.programWithDepth,
	    noop: env.VM.noop,
	    compilerInfo: null
	  };

	  return function(context, options) {
	    options = options || {};
	    var namespace = options.partial ? options : env,
	        helpers,
	        partials;

	    if (!options.partial) {
	      helpers = options.helpers;
	      partials = options.partials;
	    }
	    var result = templateSpec.call(
	          container,
	          namespace, context,
	          helpers,
	          partials,
	          options.data);

	    if (!options.partial) {
	      env.VM.checkRevision(container.compilerInfo);
	    }

	    return result;
	  };
	}

	exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
	  var args = Array.prototype.slice.call(arguments, 3);

	  var prog = function(context, options) {
	    options = options || {};

	    return fn.apply(this, [context, options.data || data].concat(args));
	  };
	  prog.program = i;
	  prog.depth = args.length;
	  return prog;
	}

	exports.programWithDepth = programWithDepth;function program(i, fn, data) {
	  var prog = function(context, options) {
	    options = options || {};

	    return fn(context, options.data || data);
	  };
	  prog.program = i;
	  prog.depth = 0;
	  return prog;
	}

	exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
	  var options = { partial: true, helpers: helpers, partials: partials, data: data };

	  if(partial === undefined) {
	    throw new Exception("The partial " + name + " could not be found");
	  } else if(partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	exports.invokePartial = invokePartial;function noop() { return ""; }

	exports.noop = noop;

/***/ }
/******/ ])