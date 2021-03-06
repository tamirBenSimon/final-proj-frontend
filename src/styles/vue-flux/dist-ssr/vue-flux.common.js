module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "07e3":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0fc9":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "1173":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1654":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("71c1")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("30f1")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "1691":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1bc3":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("f772");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "1d36":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueFlux_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a5f1");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueFlux_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueFlux_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VueFlux_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1dec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPreloader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("afd3");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPreloader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPreloader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPreloader_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1ec9":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
var document = __webpack_require__("e53d").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "241e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "24c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var global = __webpack_require__("e53d");
var ctx = __webpack_require__("d864");
var classof = __webpack_require__("40c3");
var $export = __webpack_require__("63b6");
var isObject = __webpack_require__("f772");
var aFunction = __webpack_require__("79aa");
var anInstance = __webpack_require__("1173");
var forOf = __webpack_require__("a22a");
var speciesConstructor = __webpack_require__("f201");
var task = __webpack_require__("4178").set;
var microtask = __webpack_require__("aba2")();
var newPromiseCapabilityModule = __webpack_require__("656e");
var perform = __webpack_require__("4439");
var userAgent = __webpack_require__("bc13");
var promiseResolve = __webpack_require__("cd78");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("5168")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("5c95")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("45f2")($Promise, PROMISE);
__webpack_require__("4c95")(PROMISE);
Wrapper = __webpack_require__("584a")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("4ee1")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "25eb":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "281b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxParallax_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8961");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxParallax_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxParallax_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxParallax_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "294c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "3024":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "30f1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("b8e3");
var $export = __webpack_require__("63b6");
var redefine = __webpack_require__("9138");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var $iterCreate = __webpack_require__("8f60");
var setToStringTag = __webpack_require__("45f2");
var getPrototypeOf = __webpack_require__("53e2");
var ITERATOR = __webpack_require__("5168")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "32fc":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("e53d").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "335c":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("6b4c");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "35e8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var createDesc = __webpack_require__("aebd");
module.exports = __webpack_require__("8e60") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "36c3":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("335c");
var defined = __webpack_require__("25eb");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "3702":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("481b");
var ITERATOR = __webpack_require__("5168")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "37c8":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("2b4c");


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a38":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "3a72":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var LIBRARY = __webpack_require__("2d00");
var wksExt = __webpack_require__("37c8");
var defineProperty = __webpack_require__("86cc").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "3c11":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__("63b6");
var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var speciesConstructor = __webpack_require__("f201");
var promiseResolve = __webpack_require__("cd78");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "40c3":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("6b4c");
var TAG = __webpack_require__("5168")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "4178":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("d864");
var invoke = __webpack_require__("3024");
var html = __webpack_require__("32fc");
var cel = __webpack_require__("1ec9");
var global = __webpack_require__("e53d");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("6b4c")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "43fc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__("63b6");
var newPromiseCapability = __webpack_require__("656e");
var perform = __webpack_require__("4439");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "4439":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "454f":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("46a7");
var $Object = __webpack_require__("584a").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "45f2":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("d9f6").f;
var has = __webpack_require__("07e3");
var TAG = __webpack_require__("5168")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "46a7":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("63b6");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("8e60"), 'Object', { defineProperty: __webpack_require__("d9f6").f });


/***/ }),

/***/ "481b":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "4c95":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var dP = __webpack_require__("d9f6");
var DESCRIPTORS = __webpack_require__("8e60");
var SPECIES = __webpack_require__("5168")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "4ee1":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("5168")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "50ed":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "5168":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("dbdb")('wks');
var uid = __webpack_require__("62a0");
var Symbol = __webpack_require__("e53d").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "53e2":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("07e3");
var toObject = __webpack_require__("241e");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5559":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("dbdb")('keys');
var uid = __webpack_require__("62a0");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "55e7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "584a":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "5a88":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxIndex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("af0d");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxIndex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxIndex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxIndex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5b4e":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("36c3");
var toLength = __webpack_require__("b447");
var toAbsoluteIndex = __webpack_require__("0fc9");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "5c95":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("35e8");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "6022":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "62a0":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "63b6":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var core = __webpack_require__("584a");
var ctx = __webpack_require__("d864");
var hide = __webpack_require__("35e8");
var has = __webpack_require__("07e3");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "656e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("79aa");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "67ab":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("ca5a")('meta');
var isObject = __webpack_require__("d3f4");
var has = __webpack_require__("69a8");
var setDesc = __webpack_require__("86cc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("79e5")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "696e":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c207");
__webpack_require__("1654");
__webpack_require__("6c1c");
__webpack_require__("24c5");
__webpack_require__("3c11");
__webpack_require__("43fc");
module.exports = __webpack_require__("584a").Promise;


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b4c":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "6c1c":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("c367");
var global = __webpack_require__("e53d");
var hide = __webpack_require__("35e8");
var Iterators = __webpack_require__("481b");
var TO_STRING_TAG = __webpack_require__("5168")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "6fc2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPagination_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("55e7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPagination_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPagination_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxPagination_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7065":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "71c1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("3a38");
var defined = __webpack_require__("25eb");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "794b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("8e60") && !__webpack_require__("294c")(function () {
  return Object.defineProperty(__webpack_require__("1ec9")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "795b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("696e");

/***/ }),

/***/ "79aa":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7bbc":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("6821");
var gOPN = __webpack_require__("9093").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "7cd6":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("40c3");
var ITERATOR = __webpack_require__("5168")('iterator');
var Iterators = __webpack_require__("481b");
module.exports = __webpack_require__("584a").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "7e90":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("d9f6");
var anObject = __webpack_require__("e4ae");
var getKeys = __webpack_require__("c3a1");

module.exports = __webpack_require__("8e60") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8436":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "85f2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("454f");

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "87af":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxCaption_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7065");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxCaption_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxCaption_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxCaption_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8961":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8a81":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var DESCRIPTORS = __webpack_require__("9e1e");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var META = __webpack_require__("67ab").KEY;
var $fails = __webpack_require__("79e5");
var shared = __webpack_require__("5537");
var setToStringTag = __webpack_require__("7f20");
var uid = __webpack_require__("ca5a");
var wks = __webpack_require__("2b4c");
var wksExt = __webpack_require__("37c8");
var wksDefine = __webpack_require__("3a72");
var enumKeys = __webpack_require__("d4c0");
var isArray = __webpack_require__("1169");
var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var toObject = __webpack_require__("4bf8");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var createDesc = __webpack_require__("4630");
var _create = __webpack_require__("2aeb");
var gOPNExt = __webpack_require__("7bbc");
var $GOPD = __webpack_require__("11e9");
var $GOPS = __webpack_require__("2621");
var $DP = __webpack_require__("86cc");
var $keys = __webpack_require__("0d58");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("9093").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("52a7").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("2d00")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("32e9")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8ca2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("6022");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxButton_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8e60":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("294c")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "8f60":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("a159");
var descriptor = __webpack_require__("aebd");
var setToStringTag = __webpack_require__("45f2");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("35e8")(IteratorPrototype, __webpack_require__("5168")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9138":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("35e8");


/***/ }),

/***/ "96cf":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a159":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("e4ae");
var dPs = __webpack_require__("7e90");
var enumBugKeys = __webpack_require__("1691");
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("1ec9")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("32fc").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "a22a":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("d864");
var call = __webpack_require__("b0dc");
var isArrayIter = __webpack_require__("3702");
var anObject = __webpack_require__("e4ae");
var toLength = __webpack_require__("b447");
var getIterFn = __webpack_require__("7cd6");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "a5f1":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "aba2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var macrotask = __webpack_require__("4178").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("6b4c")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "ac4d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3a72")('asyncIterator');


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "aebd":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "af0d":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "afd3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "b0dc":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("e4ae");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "b447":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("3a38");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "b8e3":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "bc13":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("e53d");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c207":
/***/ (function(module, exports) {



/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("8436");
var step = __webpack_require__("50ed");
var Iterators = __webpack_require__("481b");
var toIObject = __webpack_require__("36c3");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("30f1")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "c3a1":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("e6f3");
var enumBugKeys = __webpack_require__("1691");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "cd78":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var isObject = __webpack_require__("f772");
var newPromiseCapability = __webpack_require__("656e");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d4c0":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d864":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("79aa");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "d9ab":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d9f6":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("e4ae");
var IE8_DOM_DEFINE = __webpack_require__("794b");
var toPrimitive = __webpack_require__("1bc3");
var dP = Object.defineProperty;

exports.f = __webpack_require__("8e60") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "dbdb":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("584a");
var global = __webpack_require__("e53d");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("b8e3") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e4ae":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("f772");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "e53d":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "e671":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxTransition_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f251");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxTransition_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxTransition_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxTransition_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e6f3":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("07e3");
var toIObject = __webpack_require__("36c3");
var arrayIndexOf = __webpack_require__("5b4e")(false);
var IE_PROTO = __webpack_require__("5559")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f201":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("e4ae");
var aFunction = __webpack_require__("79aa");
var SPECIES = __webpack_require__("5168")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f251":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "f772":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "f83b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxControls_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d9ab");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxControls_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxControls_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_index_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FluxControls_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "FluxButton", function() { return /* reexport */ FluxButton; });
__webpack_require__.d(__webpack_exports__, "FluxCube", function() { return /* reexport */ FluxCube; });
__webpack_require__.d(__webpack_exports__, "FluxGrid", function() { return /* reexport */ FluxGrid; });
__webpack_require__.d(__webpack_exports__, "FluxImage", function() { return /* reexport */ FluxImage; });
__webpack_require__.d(__webpack_exports__, "FluxParallax", function() { return /* reexport */ FluxParallax; });
__webpack_require__.d(__webpack_exports__, "FluxTransition", function() { return /* reexport */ FluxTransition; });
__webpack_require__.d(__webpack_exports__, "FluxVortex", function() { return /* reexport */ FluxVortex; });
__webpack_require__.d(__webpack_exports__, "FluxWrapper", function() { return /* reexport */ FluxWrapper; });
__webpack_require__.d(__webpack_exports__, "VueFlux", function() { return /* reexport */ VueFlux; });
__webpack_require__.d(__webpack_exports__, "FluxCaption", function() { return /* reexport */ FluxCaption; });
__webpack_require__.d(__webpack_exports__, "FluxControls", function() { return /* reexport */ FluxControls; });
__webpack_require__.d(__webpack_exports__, "FluxIndex", function() { return /* reexport */ FluxIndex; });
__webpack_require__.d(__webpack_exports__, "FluxPagination", function() { return /* reexport */ FluxPagination; });
__webpack_require__.d(__webpack_exports__, "FluxPreloader", function() { return /* reexport */ FluxPreloader; });
__webpack_require__.d(__webpack_exports__, "BaseComplement", function() { return /* reexport */ BaseComplement; });
__webpack_require__.d(__webpack_exports__, "BaseComponent", function() { return /* reexport */ BaseComponent; });
__webpack_require__.d(__webpack_exports__, "BaseTransition", function() { return /* reexport */ BaseTransition; });

// NAMESPACE OBJECT: ./src/transitions/index.js
var transitions_namespaceObject = {};
__webpack_require__.r(transitions_namespaceObject);
__webpack_require__.d(transitions_namespaceObject, "TransitionFade", function() { return fade; });
__webpack_require__.d(transitions_namespaceObject, "TransitionKenburn", function() { return kenburn; });
__webpack_require__.d(transitions_namespaceObject, "TransitionSwipe", function() { return swipe; });
__webpack_require__.d(transitions_namespaceObject, "TransitionSlide", function() { return slide; });
__webpack_require__.d(transitions_namespaceObject, "TransitionWaterfall", function() { return waterfall; });
__webpack_require__.d(transitions_namespaceObject, "TransitionZip", function() { return zip; });
__webpack_require__.d(transitions_namespaceObject, "TransitionBlinds2d", function() { return blinds2d; });
__webpack_require__.d(transitions_namespaceObject, "TransitionBlocks1", function() { return blocks1; });
__webpack_require__.d(transitions_namespaceObject, "TransitionBlocks2", function() { return blocks2; });
__webpack_require__.d(transitions_namespaceObject, "TransitionConcentric", function() { return concentric; });
__webpack_require__.d(transitions_namespaceObject, "TransitionWarp", function() { return warp; });
__webpack_require__.d(transitions_namespaceObject, "TransitionCamera", function() { return camera; });
__webpack_require__.d(transitions_namespaceObject, "TransitionCube", function() { return cube; });
__webpack_require__.d(transitions_namespaceObject, "TransitionBook", function() { return book; });
__webpack_require__.d(transitions_namespaceObject, "TransitionFall", function() { return fall; });
__webpack_require__.d(transitions_namespaceObject, "TransitionWave", function() { return wave; });
__webpack_require__.d(transitions_namespaceObject, "TransitionBlinds3d", function() { return blinds3d; });
__webpack_require__.d(transitions_namespaceObject, "TransitionRound1", function() { return round1; });
__webpack_require__.d(transitions_namespaceObject, "TransitionRound2", function() { return round2; });
__webpack_require__.d(transitions_namespaceObject, "TransitionExplode", function() { return explode; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxButton.vue?vue&type=template&id=5ddc8803&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"flux-button",staticStyle:{"outline":"0"},attrs:{"type":"button"},on:{"click":function($event){return _vm.$emit('click')}}},[_c('svg',{attrs:{"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg","version":"1.1"}},[_c('circle',{attrs:{"cx":"50","cy":"50","r":"49"}}),_c('svg',{attrs:{"viewBox":"-20 -20 140 140"}},[_vm._t("default")],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxButton.vue?vue&type=template&id=5ddc8803&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxButton.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FluxButtonvue_type_script_lang_js_ = ({
  name: 'FluxButton'
});
// CONCATENATED MODULE: ./src/components/FluxButton.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxButtonvue_type_script_lang_js_ = (FluxButtonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FluxButton.vue?vue&type=style&index=0&lang=scss&
var FluxButtonvue_type_style_index_0_lang_scss_ = __webpack_require__("8ca2");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/FluxButton.vue






/* normalize component */

var component = normalizeComponent(
  components_FluxButtonvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxButton = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxCube.vue?vue&type=template&id=29c36570&
var FluxCubevue_type_template_id_29c36570_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"cube",style:(_vm.style)},_vm._l((_vm.sides),function(side){return _c('flux-image',{key:side.name,ref:side.name,refInFor:true,style:(side.style),attrs:{"size":side.size,"view-size":side.viewSize,"image":side.img,"color":side.color,"offset":side.offset}})}),1)}
var FluxCubevue_type_template_id_29c36570_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxCube.vue?vue&type=template&id=29c36570&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js
var define_property = __webpack_require__("85f2");
var define_property_default = /*#__PURE__*/__webpack_require__.n(define_property);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  if (key in obj) {
    define_property_default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__("ac4d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__("8a81");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxImage.vue?vue&type=template&id=076bef75&
var FluxImagevue_type_template_id_076bef75_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"flux-image",style:(_vm.style)})}
var FluxImagevue_type_template_id_076bef75_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxImage.vue?vue&type=template&id=076bef75&

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    define_property_default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./src/libraries/Dom.js



var Dom_Dom = /*#__PURE__*/function () {
  function Dom(node) {
    _classCallCheck(this, Dom);

    this.node = node;
  }

  _createClass(Dom, [{
    key: "getWidth",
    value: function getWidth() {
      var width = getComputedStyle(this.node).width;
      return parseFloat(width);
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      var height = getComputedStyle(this.node).height;
      return parseFloat(height);
    }
  }, {
    key: "size",
    get: function get() {
      return {
        width: this.getWidth(),
        height: this.getHeight()
      };
    }
  }], [{
    key: "sizeFrom",
    value: function sizeFrom(node) {
      return new Dom(node).size;
    }
  }]);

  return Dom;
}();


// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// CONCATENATED MODULE: ./src/libraries/Img.js





var Img_Img = /*#__PURE__*/function () {
  function Img(src) {
    _classCallCheck(this, Img);

    _defineProperty(this, "status", void 0);

    _defineProperty(this, "index", void 0);

    _defineProperty(this, "aspectRatio", void 0);

    _defineProperty(this, "size", void 0);

    this.src = src;
  }

  _createClass(Img, [{
    key: "load",
    value: function load() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.status) resolve();
        var img = new Image();

        img.onload = function () {
          _this.size = {
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height
          };
          _this.aspectRatio = _this.size.width / _this.size.height;
          _this.status = 'loaded';
          resolve();
        };

        img.onerror = function () {
          _this.status = 'error';
          reject("Image ".concat(_this.src, " could not be loaded"));
        };

        img.src = _this.src;
      });
    }
  }, {
    key: "getCoverProps",
    value: function getCoverProps(viewSize) {
      if (!viewSize || this.status !== 'loaded') return undefined;
      var view = {
        size: viewSize,
        aspectRatio: viewSize.width / viewSize.height
      };
      var cover = {
        size: this.getCoverSize(view)
      };
      cover.position = this.getCoverPosition(view, cover.size);
      return cover;
    }
  }, {
    key: "getCoverSize",
    value: function getCoverSize(view) {
      if (this.aspectRatio <= view.aspectRatio) {
        return {
          width: view.size.width,
          height: view.size.width / this.aspectRatio
        };
      }

      return {
        width: this.aspectRatio * view.size.height,
        height: view.size.height
      };
    }
  }, {
    key: "getCoverPosition",
    value: function getCoverPosition(view, coverSize) {
      if (this.aspectRatio <= view.aspectRatio) {
        return {
          top: (view.size.height - coverSize.height) / 2,
          left: 0
        };
      }

      return {
        top: 0,
        left: (view.size.width - coverSize.width) / 2
      };
    }
  }]);

  return Img;
}();


// CONCATENATED MODULE: ./src/mixins/BaseComponent.js






function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



/* harmony default export */ var BaseComponent = ({
  props: {
    color: String,
    colors: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    image: [String, Object],
    images: Object,
    size: {
      type: Object
    },
    viewSize: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    offset: Object,
    offsets: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    css: Object
  },
  data: function data() {
    return {
      img: undefined,
      imgs: undefined,
      baseStyle: {}
    };
  },
  computed: {
    domSize: function domSize() {
      return Dom_Dom.sizeFrom(this.$el);
    },
    sizeStyle: function sizeStyle() {
      if (!this.size) return {};
      var size = this.size;
      var _this$viewSize = this.viewSize,
          _this$viewSize$width = _this$viewSize.width,
          width = _this$viewSize$width === void 0 ? size.width : _this$viewSize$width,
          _this$viewSize$height = _this$viewSize.height,
          height = _this$viewSize$height === void 0 ? size.height : _this$viewSize$height;
      return {
        width: width + 'px',
        height: height + 'px'
      };
    },
    style: function style() {
      return _objectSpread({}, this.sizeStyle, {}, this.colorStyle, {}, this.imageStyle, {}, this.css, {}, this.baseStyle);
    }
  },
  watch: {
    image: function image() {
      this.initImg();
    },
    images: function images() {
      this.initImgs();
    }
  },
  created: function created() {
    this.initImg();
    this.initImgs();
  },
  methods: {
    initImg: function initImg() {
      if (!this.image) return this.img = undefined;
      if (this.image.src) return this.img = this.image;
      this.img = new Img_Img(this.image);
      this.img.load();
    },
    initImgs: function initImgs() {
      if (!this.images) return this.imgs = undefined;
      var img;
      var imgs = {};

      for (var side in this.images) {
        img = this.images[side];

        if (!img.src) {
          img = new Img_Img(img);
          img.load();
        }

        imgs[side] = img;
      }

      this.imgs = imgs;
    },
    setCss: function setCss(css) {
      this.baseStyle = _objectSpread({}, this.baseStyle, {}, css);
    },
    transform: function transform(css) {
      this.$el.clientHeight;
      this.setCss(css);
    },
    show: function show() {
      this.setCss({
        visibility: 'visible'
      });
    },
    hide: function hide() {
      this.setCss({
        visibility: 'hidden'
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxImage.vue?vue&type=script&lang=js&
//
//
//
//

/* harmony default export */ var FluxImagevue_type_script_lang_js_ = ({
  name: 'FluxImage',
  mixins: [BaseComponent],
  data: function data() {
    return {
      baseStyle: {
        overflow: 'hidden'
      }
    };
  },
  computed: {
    colorStyle: function colorStyle() {
      if (!this.color) return {};
      return {
        backgroundColor: this.color
      };
    },
    imageStyle: function imageStyle() {
      var img = this.img;
      if (!img || img.status !== 'loaded') return {};

      var _img$getCoverProps = img.getCoverProps(this.size || this.domSize),
          size = _img$getCoverProps.size,
          position = _img$getCoverProps.position;

      if (this.offset) {
        for (var _i = 0, _arr = ['top', 'left']; _i < _arr.length; _i++) {
          var side = _arr[_i];
          position[side] -= this.offset[side] || 0;
        }
      }

      return {
        backgroundImage: "url(".concat(this.img.src, ")"),
        backgroundSize: "".concat(size.width, "px ").concat(size.height, "px"),
        backgroundPosition: "".concat(position.left, "px ").concat(position.top, "px"),
        backgroundRepeat: 'no-repeat'
      };
    }
  }
});
// CONCATENATED MODULE: ./src/components/FluxImage.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxImagevue_type_script_lang_js_ = (FluxImagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FluxImage.vue





/* normalize component */

var FluxImage_component = normalizeComponent(
  components_FluxImagevue_type_script_lang_js_,
  FluxImagevue_type_template_id_076bef75_render,
  FluxImagevue_type_template_id_076bef75_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxImage = (FluxImage_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxCube.vue?vue&type=script&lang=js&











function FluxCubevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function FluxCubevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { FluxCubevue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { FluxCubevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var rotate = {
  x: {
    top: '90',
    bottom: '-90'
  },
  y: {
    back: '180',
    backr: '180',
    backl: '-180',
    left: '-90',
    right: '90'
  }
};
var translate = {
  x: {
    left: '-50',
    right: '50'
  },
  y: {
    top: '-50',
    bottom: '50'
  }
};
/* harmony default export */ var FluxCubevue_type_script_lang_js_ = ({
  name: 'FluxCube',
  components: {
    FluxImage: FluxImage
  },
  mixins: [BaseComponent],
  props: {
    depth: {
      type: Number,
      default: 0
    },
    sidesCss: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      sideNames: ['front', 'back', 'top', 'bottom', 'left', 'right'],
      baseStyle: {
        transformStyle: 'preserve-3d'
      }
    };
  },
  computed: {
    sides: function sides() {
      var side;
      var sides = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.definedSides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sideName = _step.value;
          side = {
            name: sideName,
            img: this.imgs[sideName],
            color: this.colors[sideName] || this.color,
            offset: this.offsets[sideName] || this.offset
          };
          side.size = FluxCubevue_type_script_lang_js_objectSpread({}, this.size);
          side.viewSize = FluxCubevue_type_script_lang_js_objectSpread({}, this.viewSize);

          if (['left', 'right'].includes(sideName)) {
            side.viewSize.width = this.depth;
            side.size.width = this.depth;
          }

          if (['top', 'bottom'].includes(sideName)) {
            side.viewSize.height = this.depth;
            side.size.height = this.depth;
          }

          side.style = FluxCubevue_type_script_lang_js_objectSpread({}, this.sidesCss[sideName], {
            position: 'absolute',
            transform: this.getTransform(sideName),
            backfaceVisibility: 'hidden'
          });
          sides[sideName] = side;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return sides;
    },
    definedSides: function definedSides() {
      var _this = this;

      return this.sideNames.filter(function (side) {
        return _this.sideDefined(side);
      });
    },
    translateZ: function translateZ() {
      var _this$size = this.size,
          width = _this$size.width,
          height = _this$size.height,
          _this$viewSize = this.viewSize,
          viewWidth = _this$viewSize.width,
          viewHeight = _this$viewSize.height,
          depth = this.depth;
      var halfDepth = depth / 2;
      return {
        top: halfDepth,
        bottom: viewHeight ? viewHeight - halfDepth : height - halfDepth,
        left: halfDepth,
        right: viewWidth ? viewWidth - halfDepth : width - halfDepth,
        back: depth
      };
    }
  },
  methods: {
    sideDefined: function sideDefined(side) {
      if (this.images[side] || this.colors[side]) return true;
      return false;
    },
    getSide: function getSide(side) {
      return this.$refs[side];
    },
    getTransform: function getTransform(side) {
      var rx = rotate.x[side] || 0;
      var ry = rotate.y[side] || 0;
      var tx = translate.x[side] || 0;
      var ty = translate.y[side] || 0;
      var tz = this.translateZ[side] || 0;
      return "rotateX(".concat(rx, "deg) rotateY(").concat(ry, "deg) translate3d(").concat(tx, "%, ").concat(ty, "%, ").concat(tz, "px)");
    },
    turn: function turn(side) {
      this.transform({
        transform: this.getTransform(side)
      });
    },
    turnTop: function turnTop() {
      this.turn('top');
    },
    turnBack: function turnBack() {
      this.turn('back');
    },
    turnBottom: function turnBottom() {
      this.turn('bottom');
    },
    turnLeft: function turnLeft() {
      this.turn('left');
    },
    turnRight: function turnRight() {
      this.turn('right');
    }
  }
});
// CONCATENATED MODULE: ./src/components/FluxCube.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxCubevue_type_script_lang_js_ = (FluxCubevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FluxCube.vue





/* normalize component */

var FluxCube_component = normalizeComponent(
  components_FluxCubevue_type_script_lang_js_,
  FluxCubevue_type_template_id_29c36570_render,
  FluxCubevue_type_template_id_29c36570_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxCube = (FluxCube_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxGrid.vue?vue&type=template&id=39644318&
var FluxGridvue_type_template_id_39644318_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"grid",style:(_vm.style)},_vm._l((_vm.tiles),function(tile,index){return _c(_vm.component,{key:index,ref:"tiles",refInFor:true,tag:"component",attrs:{"size":_vm.size,"view-size":tile.viewSize,"color":_vm.color,"colors":_vm.colors,"image":_vm.img,"images":_vm.imgs,"offset":tile.offset,"depth":_vm.depth,"css":tile.css,"sides-css":tile.sidesCss}})}),1)}
var FluxGridvue_type_template_id_39644318_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxGrid.vue?vue&type=template&id=39644318&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxGrid.vue?vue&type=script&lang=js&







function FluxGridvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function FluxGridvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { FluxGridvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { FluxGridvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var FluxGridvue_type_script_lang_js_ = ({
  name: 'FluxGrid',
  components: {
    FluxCube: FluxCube,
    FluxImage: FluxImage
  },
  mixins: [BaseComponent],
  props: {
    rows: {
      type: Number,
      default: 1
    },
    cols: {
      type: Number,
      default: 1
    },
    depth: {
      type: Number,
      default: 0
    },
    tileCss: Object
  },
  data: function data() {
    return {
      baseStyle: {
        position: 'relative'
      }
    };
  },
  computed: {
    component: function component() {
      return this.images ? 'FluxCube' : 'FluxImage';
    },
    numRows: function numRows() {
      return Math.ceil(parseFloat(this.rows));
    },
    numCols: function numCols() {
      return Math.ceil(parseFloat(this.cols));
    },
    numTiles: function numTiles() {
      return this.numRows * this.numCols;
    },
    tileSize: function tileSize() {
      return {
        width: Math.floor(this.size.width / this.numCols),
        height: Math.floor(this.size.height / this.numRows)
      };
    },
    tiles: function tiles() {
      var tile;
      var tiles = [];

      for (var i = 0; i < this.numTiles; i++) {
        tile = {
          row: this.getRowNumber(i),
          col: this.getColNumber(i)
        };
        var _this$tileSize = this.tileSize,
            width = _this$tileSize.width,
            height = _this$tileSize.height;
        if (tile.row + 1 === this.numRows) height = this.size.height - tile.row * height;
        if (tile.col + 1 === this.numCols) width = this.size.width - tile.col * width;
        tile.viewSize = {
          width: width,
          height: height
        };
        tile.offset = {
          top: tile.row * this.tileSize.height,
          left: tile.col * this.tileSize.width
        };
        tile.css = FluxGridvue_type_script_lang_js_objectSpread({}, this.tileCss, {
          position: 'absolute',
          left: tile.offset.left + 'px',
          top: tile.offset.top + 'px',
          zIndex: i + 1 < this.numTiles / 2 ? i + 1 : this.numTiles - i
        });
        tiles.push(tile);
      }

      return tiles;
    }
  },
  methods: {
    getRowNumber: function getRowNumber(i) {
      return Math.floor(i / this.numCols);
    },
    getColNumber: function getColNumber(i) {
      return i % this.numCols;
    },
    transform: function transform(func) {
      this.$refs.tiles.forEach(function (tile, i) {
        return func(tile, i);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/FluxGrid.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxGridvue_type_script_lang_js_ = (FluxGridvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FluxGrid.vue





/* normalize component */

var FluxGrid_component = normalizeComponent(
  components_FluxGridvue_type_script_lang_js_,
  FluxGridvue_type_template_id_39644318_render,
  FluxGridvue_type_template_id_39644318_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxGrid = (FluxGrid_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxParallax.vue?vue&type=template&id=5a81ab61&
var FluxParallaxvue_type_template_id_5a81ab61_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"parallax",style:(_vm.style)},[(_vm.type === 'fixed')?_c('div',{style:(_vm.fixedParentStyle)},[_c('div',{style:(_vm.fixedChildStyle)})]):_vm._e(),(_vm.type !== 'fixed' && !_vm.loaded)?_c('img',{ref:"image",attrs:{"src":_vm.src},on:{"load":_vm.setProperties,"error":_vm.setProperties}}):_vm._e(),_vm._t("default")],2)}
var FluxParallaxvue_type_template_id_5a81ab61_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxParallax.vue?vue&type=template&id=5a81ab61&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxParallax.vue?vue&type=script&lang=js&








function FluxParallaxvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function FluxParallaxvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { FluxParallaxvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { FluxParallaxvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var FluxParallaxvue_type_script_lang_js_ = ({
  name: 'FluxParallax',
  props: {
    src: {
      type: String,
      required: true
    },

    /* eslint-disable vue/require-prop-types */
    holder: {
      default: function _default() {
        return window;
      }
    },
    type: {
      type: String,
      default: 'relative'
    },
    offset: {
      type: [Number, String],
      default: '100%'
    }
  },
  data: function data() {
    return {
      loaded: false,
      view: {
        height: undefined
      },
      parallax: {
        top: undefined,
        width: undefined,
        height: undefined
      },
      background: {
        top: undefined,
        left: undefined,
        width: undefined,
        height: undefined
      },
      image: {
        src: undefined,
        width: undefined,
        height: undefined
      },
      style: {
        position: 'relative'
      },
      fixedParentStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        clip: 'rect(auto auto auto auto)'
      }
    };
  },
  computed: {
    parallaxSize: function parallaxSize() {
      return {
        width: this.$refs.parallax.clientWidth,
        height: this.$refs.parallax.clientHeight
      };
    },
    offsetHeight: function offsetHeight() {
      var height;

      if (/^[0-9]+px$/.test(this.offset)) {
        height = {
          px: parseFloat(this.offset),
          pct: height.px * 100 / this.background.height
        };
      } else if (/^[0-9]+%$/.test(this.offset)) {
        height = {
          px: Math.ceil(this.parallaxSize.height * parseFloat(this.offset) / 100),
          pct: parseFloat(parseFloat(this.offset))
        };
      }

      return height;
    },
    backgroundHeight: function backgroundHeight() {
      return this.parallaxSize.height + this.offsetHeight.px;
    },
    remainderHeight: function remainderHeight() {
      return this.background.height - this.backgroundHeight;
    },
    fixedChildStyle: function fixedChildStyle() {
      return {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "url(\"".concat(this.src, "\") no-repeat center center fixed")
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.type === 'fixed') return;
    this.setCss({
      background: "url(\"".concat(this.src, "\") no-repeat")
    });
    window.addEventListener('resize', this.resize, {
      passive: true
    });
    setTimeout(function () {
      _this.holder.addEventListener('scroll', _this.handleScroll, {
        passive: true
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.type === 'fixed') return;
    window.removeEventListener('resize', this.resize);
    this.holder.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    setProperties: function setProperties() {
      var img = this.$refs.image;

      if (img.naturalWidth || img.width) {
        Object.assign(this.image, {
          src: img.src,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height
        });
      }

      this.loaded = true;
      this.resize();
    },
    resize: function resize() {
      this.view.height = this.holder.scrollHeight || this.holder.innerHeight;
      this.parallax = FluxParallaxvue_type_script_lang_js_objectSpread({}, this.parallax, {}, this.parallaxSize, {
        top: this.$refs.parallax.offsetTop
      });
      var imageRatio = this.image.height / this.image.width;
      var parallaxRatio = this.parallax.height / this.parallax.width;

      if (imageRatio >= parallaxRatio) {
        this.background.width = this.parallax.width;
        this.background.height = Math.floor(this.parallax.width * this.image.height / this.image.width);
      } else {
        this.background.height = this.backgroundHeight;
        this.background.width = Math.floor(this.background.height * this.image.width / this.image.height);
      }

      this.setCss({
        backgroundSize: "".concat(this.background.width, "px ").concat(this.background.height, "px"),
        backgroundPosition: "center 0"
      });
      this.handleScroll();
    },
    setCss: function setCss(css) {
      this.style = FluxParallaxvue_type_script_lang_js_objectSpread({}, this.style, {}, css);
    },
    moveBackgroundByPct: function moveBackgroundByPct(pct) {
      if (this.remainderHeight > 0) pct = pct * this.offsetHeight.pct / 100 + 50 - this.offsetHeight.pct / 2;
      this.setCss({
        backgroundPositionY: pct.toFixed(2) + '%'
      });
    },
    handleScroll: function handleScroll() {
      if (this.loaded === false) return;
      var scrollTop = this.holder.scrollY || this.holder.scrollTop || this.holder.pageYOffset || 0;
      if (this.holder !== window) return this.handleRelative(scrollTop);
      if (scrollTop + this.view.height < this.parallax.top) return;
      if (scrollTop > this.parallax.top + this.parallax.height) return;
      var positionY = scrollTop - this.parallax.top + this.view.height;
      if (this.type === 'visible') this.handleVisible(positionY);else if (this.type === 'relative') this.handleRelative(positionY);
    },
    handleVisible: function handleVisible(positionY) {
      var pct = 0;
      if (positionY < this.parallax.height) pct = 0;else if (positionY > this.view.height) pct = 100;else pct = (positionY - this.parallax.height) * 100 / (this.view.height - this.parallax.height);
      this.moveBackgroundByPct(pct);
    },
    handleRelative: function handleRelative(positionY) {
      var pct;
      if (this.holder === window) pct = positionY * 100 / (this.view.height + this.parallax.height);else pct = positionY * 100 / (this.view.height - this.holder.clientHeight);
      this.moveBackgroundByPct(pct);
    }
  }
});
// CONCATENATED MODULE: ./src/components/FluxParallax.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxParallaxvue_type_script_lang_js_ = (FluxParallaxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FluxParallax.vue?vue&type=style&index=0&lang=scss&
var FluxParallaxvue_type_style_index_0_lang_scss_ = __webpack_require__("281b");

// CONCATENATED MODULE: ./src/components/FluxParallax.vue






/* normalize component */

var FluxParallax_component = normalizeComponent(
  components_FluxParallaxvue_type_script_lang_js_,
  FluxParallaxvue_type_template_id_5a81ab61_render,
  FluxParallaxvue_type_template_id_5a81ab61_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxParallax = (FluxParallax_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxTransition.vue?vue&type=template&id=cc3f9bd0&
var FluxTransitionvue_type_template_id_cc3f9bd0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"mask",staticClass:"flux-transition",style:(_vm.style)},[(_vm.componentName)?_c(_vm.componentName,{ref:"transition",tag:"component",attrs:{"size":_vm.size,"from":_vm.from,"to":_vm.to,"current":_vm.current,"options":_vm.options,"images":_vm.images}}):_vm._e()],1)}
var FluxTransitionvue_type_template_id_cc3f9bd0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxTransition.vue?vue&type=template&id=cc3f9bd0&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/fade.vue?vue&type=template&id=5313d3fe&
var fadevue_type_template_id_5313d3fe_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-image',{ref:"from",attrs:{"image":_vm.from,"size":_vm.size,"css":_vm.imageCss}})}
var fadevue_type_template_id_5313d3fe_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/fade.vue?vue&type=template&id=5313d3fe&

// CONCATENATED MODULE: ./src/mixins/BaseTransition.js




/* harmony default export */ var BaseTransition = ({
  data: function data() {
    return {
      totalDuration: 1
    };
  },
  props: {
    size: Object,
    from: {
      type: [String, Object],
      required: true
    },
    to: [String, Object],
    current: Object,
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  computed: {
    mask: function mask() {
      return this.$parent.baseStyle;
    }
  },
  created: function created() {
    Object.assign(this, {
      direction: 'next'
    }, this.options);
    var direction = this.direction;
    var setup = {
      prev: this.setupPrev,
      next: this.setupNext
    };
    setup[direction] && setup[direction]();
  },
  played: function played() {
    var direction = this.direction;
    var play = {
      prev: this.playPrev,
      next: this.playNext
    };
    play[direction] && play[direction]();
  },
  methods: {
    getDelay: function getDelay(i) {
      var direction = this.direction;
      var getDelay = {
        prev: this.getDelayPrev,
        next: this.getDelayNext
      };
      return getDelay[direction](i);
    },
    getReadyness: function getReadyness() {
      var min = 80;

      var getNumChilds = function getNumChilds(el) {
        var numChilds = el.$children.length;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = el.$children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;
            numChilds += getNumChilds(child);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return numChilds;
      };

      var time = getNumChilds(this) * 3;
      return time < min ? min : time;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/fade.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//


/* harmony default export */ var fadevue_type_script_lang_js_ = ({
  name: 'TransitionFade',
  components: {
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      totalDuration: 1200,
      easing: 'ease-in',
      imageCss: {
        zIndex: 1
      }
    };
  },
  played: function played() {
    this.$refs.from.transform({
      transition: "opacity ".concat(this.totalDuration, "ms ").concat(this.easing),
      opacity: 0
    });
  }
});
// CONCATENATED MODULE: ./src/transitions/fade.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_fadevue_type_script_lang_js_ = (fadevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/fade.vue





/* normalize component */

var fade_component = normalizeComponent(
  transitions_fadevue_type_script_lang_js_,
  fadevue_type_template_id_5313d3fe_render,
  fadevue_type_template_id_5313d3fe_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var fade = (fade_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/kenburn.vue?vue&type=template&id=73d93b3e&
var kenburnvue_type_template_id_73d93b3e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-image',{ref:"image",attrs:{"image":_vm.from,"size":_vm.size,"css":_vm.css}})}
var kenburnvue_type_template_id_73d93b3e_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/kenburn.vue?vue&type=template&id=73d93b3e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/kenburn.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//


/* harmony default export */ var kenburnvue_type_script_lang_js_ = ({
  name: 'TransitionKenburn',
  components: {
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      totalDuration: 1500,
      easing: 'linear',
      transform: {},
      css: {}
    };
  },
  created: function created() {
    this.transform = this.getTransform();
    this.css.transformOrigin = this.transform.originX + ' ' + this.transform.originY;
  },
  played: function played() {
    this.$refs.image.transform({
      transition: "all ".concat(this.totalDuration, "ms ").concat(this.easing),
      transform: "scale(".concat(this.transform.scale, ") translate(").concat(this.transform.translateX, ", ").concat(this.transform.translateY, ")"),
      opacity: 0
    });
  },
  methods: {
    getTransform: function getTransform() {
      var origin = Math.floor(Math.random() * 4 + 1);

      if (origin === 1) {
        return {
          scale: '1.7',
          translateX: '-35%',
          translateY: '-35%',
          originX: 'top',
          originY: 'left'
        };
      }

      if (origin === 2) {
        return {
          scale: '1.7',
          translateX: '35%',
          translateY: '-35%',
          originX: 'top',
          originY: 'right'
        };
      }

      if (origin === 3) {
        return {
          scale: '1.7',
          translateX: '-35%',
          translateY: '35%',
          originX: 'bottom',
          originY: 'left'
        };
      }

      return {
        scale: '1.7',
        translateX: '35%',
        translateY: '35%',
        originX: 'bottom',
        originY: 'right'
      };
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/kenburn.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_kenburnvue_type_script_lang_js_ = (kenburnvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/kenburn.vue





/* normalize component */

var kenburn_component = normalizeComponent(
  transitions_kenburnvue_type_script_lang_js_,
  kenburnvue_type_template_id_73d93b3e_render,
  kenburnvue_type_template_id_73d93b3e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var kenburn = (kenburn_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/swipe.vue?vue&type=template&id=6c7c2e53&
var swipevue_type_template_id_6c7c2e53_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-wrapper',{ref:"wrapper",attrs:{"size":_vm.size,"css":_vm.wrapperCss}},[_c('flux-image',{ref:"image",attrs:{"image":_vm.from,"size":_vm.size,"css":_vm.imageCss}})],1)}
var swipevue_type_template_id_6c7c2e53_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/swipe.vue?vue&type=template&id=6c7c2e53&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxWrapper.vue?vue&type=template&id=4bb944ad&
var FluxWrappervue_type_template_id_4bb944ad_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"wrapper",style:(_vm.style)},[_vm._t("default")],2)}
var FluxWrappervue_type_template_id_4bb944ad_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxWrapper.vue?vue&type=template&id=4bb944ad&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxWrapper.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var FluxWrappervue_type_script_lang_js_ = ({
  name: 'FluxWrapper',
  mixins: [BaseComponent],
  data: function data() {
    return {
      baseStyle: {
        overflow: 'hidden'
      }
    };
  }
});
// CONCATENATED MODULE: ./src/components/FluxWrapper.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxWrappervue_type_script_lang_js_ = (FluxWrappervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FluxWrapper.vue





/* normalize component */

var FluxWrapper_component = normalizeComponent(
  components_FluxWrappervue_type_script_lang_js_,
  FluxWrappervue_type_template_id_4bb944ad_render,
  FluxWrappervue_type_template_id_4bb944ad_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxWrapper = (FluxWrapper_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/swipe.vue?vue&type=script&lang=js&






function swipevue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function swipevue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { swipevue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { swipevue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var swipevue_type_script_lang_js_ = ({
  name: 'TransitionSwipe',
  components: {
    FluxWrapper: FluxWrapper,
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      totalDuration: 1400,
      easing: 'ease-in-out',
      wrapperCss: {
        position: 'absolute',
        top: 0,
        display: 'flex',
        flexWrap: 'nowrap'
      },
      imageCss: {
        flex: '0 0 auto'
      }
    };
  },
  played: function played() {
    this.$refs.wrapper.transform({
      transition: "width ".concat(this.totalDuration, "ms ").concat(this.easing),
      width: 0
    });
  },
  methods: {
    setupPrev: function setupPrev() {
      this.wrapperCss = swipevue_type_script_lang_js_objectSpread({}, this.wrapperCss, {
        right: 0,
        justifyContent: 'flex-end'
      });
    },
    setupNext: function setupNext() {
      this.wrapperCss = swipevue_type_script_lang_js_objectSpread({}, this.wrapperCss, {
        left: 0,
        justifyContent: 'flex-start'
      });
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/swipe.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_swipevue_type_script_lang_js_ = (swipevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/swipe.vue





/* normalize component */

var swipe_component = normalizeComponent(
  transitions_swipevue_type_script_lang_js_,
  swipevue_type_template_id_6c7c2e53_render,
  swipevue_type_template_id_6c7c2e53_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var swipe = (swipe_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/slide.vue?vue&type=template&id=b4e38088&
var slidevue_type_template_id_b4e38088_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-wrapper',{ref:"wrapper",attrs:{"size":_vm.wrapperSize,"css":_vm.wrapperCss}},[_c('flux-image',{ref:"left",attrs:{"image":_vm.left,"size":_vm.size}}),_c('flux-image',{ref:"right",attrs:{"image":_vm.right,"size":_vm.size}})],1)}
var slidevue_type_template_id_b4e38088_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/slide.vue?vue&type=template&id=b4e38088&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/slide.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var slidevue_type_script_lang_js_ = ({
  name: 'TransitionSlide',
  components: {
    FluxWrapper: FluxWrapper,
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      totalDuration: 1400,
      easing: 'ease-in-out',
      left: undefined,
      right: undefined,
      wrapperSize: {},
      wrapperCss: {
        display: 'flex',
        flexWrap: 'nowrap'
      }
    };
  },
  computed: {
    transition: function transition() {
      return "transform ".concat(this.totalDuration, "ms ").concat(this.easing);
    }
  },
  created: function created() {
    this.wrapperSize = {
      width: this.size.width * 2,
      height: this.size.height
    };
  },
  methods: {
    setupPrev: function setupPrev() {
      this.left = this.to;
      this.right = this.from;
      this.wrapperCss.transform = 'translateX(-50%)';
    },
    setupNext: function setupNext() {
      this.left = this.from;
      this.right = this.to;
    },
    playPrev: function playPrev() {
      this.$refs.wrapper.transform({
        transition: this.transition,
        transform: 'translateX(0)'
      });
    },
    playNext: function playNext() {
      this.$refs.wrapper.transform({
        transition: this.transition,
        transform: 'translateX(-50%)'
      });
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/slide.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_slidevue_type_script_lang_js_ = (slidevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/slide.vue





/* normalize component */

var slide_component = normalizeComponent(
  transitions_slidevue_type_script_lang_js_,
  slidevue_type_template_id_b4e38088_render,
  slidevue_type_template_id_b4e38088_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var slide = (slide_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/waterfall.vue?vue&type=template&id=413286f8&
var waterfallvue_type_template_id_413286f8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"image":_vm.from}})}
var waterfallvue_type_template_id_413286f8_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/waterfall.vue?vue&type=template&id=413286f8&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/waterfall.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var waterfallvue_type_script_lang_js_ = ({
  name: 'TransitionWaterfall',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 1,
      cols: 10,
      tileDuration: 600,
      totalDuration: 0,
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      tileDelay: 90
    };
  },
  created: function created() {
    this.totalDuration = this.tileDelay * this.cols + this.tileDuration;
  },
  played: function played() {
    var _this = this;

    this.$refs.grid.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        opacity: '0.1',
        transform: "translateY(100%)"
      });
    });
  },
  methods: {
    getDelayPrev: function getDelayPrev(i) {
      return (this.cols - i - 1) * this.tileDelay;
    },
    getDelayNext: function getDelayNext(i) {
      return i * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/waterfall.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_waterfallvue_type_script_lang_js_ = (waterfallvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/waterfall.vue





/* normalize component */

var waterfall_component = normalizeComponent(
  transitions_waterfallvue_type_script_lang_js_,
  waterfallvue_type_template_id_413286f8_render,
  waterfallvue_type_template_id_413286f8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var waterfall = (waterfall_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/zip.vue?vue&type=template&id=a6e245dc&
var zipvue_type_template_id_a6e245dc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"image":_vm.from}})}
var zipvue_type_template_id_a6e245dc_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/zip.vue?vue&type=template&id=a6e245dc&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/zip.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var zipvue_type_script_lang_js_ = ({
  name: 'TransitionZip',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 1,
      cols: 10,
      tileDuration: 600,
      totalDuration: 0,
      easing: 'ease-in',
      tileDelay: 80
    };
  },
  created: function created() {
    this.totalDuration = this.tileDelay * this.cols + this.tileDuration;
  },
  played: function played() {
    var _this = this;

    this.$refs.grid.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        opacity: '0.1',
        transform: "translateY(".concat(i % 2 ? '-' : '', "100%)")
      });
    });
  },
  methods: {
    getDelayPrev: function getDelayPrev(i) {
      return (this.cols - i - 1) * this.tileDelay;
    },
    getDelayNext: function getDelayNext(i) {
      return i * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/zip.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_zipvue_type_script_lang_js_ = (zipvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/zip.vue





/* normalize component */

var zip_component = normalizeComponent(
  transitions_zipvue_type_script_lang_js_,
  zipvue_type_template_id_a6e245dc_render,
  zipvue_type_template_id_a6e245dc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var zip = (zip_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blinds2d.vue?vue&type=template&id=5ec0fefd&
var blinds2dvue_type_template_id_5ec0fefd_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"image":_vm.from}})}
var blinds2dvue_type_template_id_5ec0fefd_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/blinds2d.vue?vue&type=template&id=5ec0fefd&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blinds2d.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var blinds2dvue_type_script_lang_js_ = ({
  name: 'TransitionBlinds2d',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 1,
      cols: 10,
      tileDuration: 800,
      totalDuration: 0,
      easing: 'linear',
      tileDelay: 100
    };
  },
  created: function created() {
    this.totalDuration = this.tileDelay * this.cols + this.tileDuration;
  },
  played: function played() {
    var _this = this;

    this.$refs.grid.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        opacity: '0.1',
        transform: 'scaleX(0)'
      });
    });
  },
  methods: {
    getDelayPrev: function getDelayPrev(i) {
      return (this.cols - i - 1) * this.tileDelay;
    },
    getDelayNext: function getDelayNext(i) {
      return i * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/blinds2d.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_blinds2dvue_type_script_lang_js_ = (blinds2dvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/blinds2d.vue





/* normalize component */

var blinds2d_component = normalizeComponent(
  transitions_blinds2dvue_type_script_lang_js_,
  blinds2dvue_type_template_id_5ec0fefd_render,
  blinds2dvue_type_template_id_5ec0fefd_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var blinds2d = (blinds2d_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blocks1.vue?vue&type=template&id=68628289&
var blocks1vue_type_template_id_68628289_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"image":_vm.from}})}
var blocks1vue_type_template_id_68628289_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/blocks1.vue?vue&type=template&id=68628289&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blocks1.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var blocks1vue_type_script_lang_js_ = ({
  name: 'TransitionBlocks1',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 8,
      cols: 8,
      tileDuration: 300,
      totalDuration: 0,
      easing: 'linear',
      tileDelay: 1000
    };
  },
  created: function created() {
    if (!this.options.rows) {
      var divider = this.size.width / this.cols;
      this.rows = Math.floor(this.size.height / divider);
    }

    this.totalDuration = this.tileDelay + this.tileDuration;
  },
  played: function played() {
    var _this = this;

    this.$refs.grid.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        opacity: '0',
        transform: 'scale(0.3, 0.3)'
      });
    });
  },
  methods: {
    getDelay: function getDelay() {
      var delay = Math.random() * this.tileDelay;
      return Math.floor(delay);
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/blocks1.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_blocks1vue_type_script_lang_js_ = (blocks1vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/blocks1.vue





/* normalize component */

var blocks1_component = normalizeComponent(
  transitions_blocks1vue_type_script_lang_js_,
  blocks1vue_type_template_id_68628289_render,
  blocks1vue_type_template_id_68628289_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var blocks1 = (blocks1_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blocks2.vue?vue&type=template&id=5c322e80&
var blocks2vue_type_template_id_5c322e80_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"image":_vm.gridImage,"tile-css":_vm.tileCss,"css":_vm.gridCss}}),(_vm.backgroundImage)?_c('flux-image',{ref:"background",attrs:{"size":_vm.size,"image":_vm.backgroundImage,"css":_vm.backgroundCss}}):_vm._e()],1)}
var blocks2vue_type_template_id_5c322e80_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/blocks2.vue?vue&type=template&id=5c322e80&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blocks2.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var blocks2vue_type_script_lang_js_ = ({
  name: 'TransitionBlocks2',
  components: {
    FluxGrid: FluxGrid,
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 8,
      cols: 8,
      tileDuration: 800,
      totalDuration: 0,
      easing: 'ease',
      tileDelay: 80,
      gridImage: undefined,
      tileCss: {},
      gridCss: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2
      },
      backgroundImage: undefined,
      backgroundCss: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
      }
    };
  },
  created: function created() {
    if (!this.options.rows) {
      var divider = this.size.width / this.cols;
      this.rows = Math.floor(this.size.height / divider);
    }

    this.totalDuration = this.tileDelay * (this.rows + this.cols) + this.tileDuration;
  },
  methods: {
    setupPrev: function setupPrev() {
      this.gridImage = this.to;
      this.backgroundImage = this.from;
      this.tileCss = {
        opacity: 0,
        transform: 'scale(0.3)'
      };
    },
    setupNext: function setupNext() {
      this.gridImage = this.from;
    },
    playPrev: function playPrev() {
      var _this = this;

      this.$refs.grid.transform(function (tile, i) {
        tile.transform({
          transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i, 'prev'), "ms"),
          opacity: 1,
          transform: 'scale(1)'
        });
      });
    },
    playNext: function playNext() {
      var _this2 = this;

      this.$refs.grid.transform(function (tile, i) {
        tile.transform({
          transition: "all ".concat(_this2.tileDuration, "ms ").concat(_this2.easing, " ").concat(_this2.getDelay(i, 'next'), "ms"),
          opacity: 0,
          transform: 'scale(0.3)'
        });
      });
    },
    getDelay: function getDelay(i, direction) {
      var row = this.$refs.grid.getRowNumber(i);
      var col = this.$refs.grid.getColNumber(i);
      var delay = col + row;
      if (direction === 'prev') delay = this.rows + this.cols - delay - 1;
      return delay * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/blocks2.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_blocks2vue_type_script_lang_js_ = (blocks2vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/blocks2.vue





/* normalize component */

var blocks2_component = normalizeComponent(
  transitions_blocks2vue_type_script_lang_js_,
  blocks2vue_type_template_id_5c322e80_render,
  blocks2vue_type_template_id_5c322e80_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var blocks2 = (blocks2_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/concentric.vue?vue&type=template&id=73cb37bc&
var concentricvue_type_template_id_73cb37bc_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-vortex',{ref:"vortex",attrs:{"size":_vm.size,"circles":_vm.circles,"image":_vm.from}})}
var concentricvue_type_template_id_73cb37bc_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/concentric.vue?vue&type=template&id=73cb37bc&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxVortex.vue?vue&type=template&id=3b4961ac&
var FluxVortexvue_type_template_id_3b4961ac_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"vortex",style:(_vm.style)},_vm._l((_vm.tiles),function(tile,index){return _c('flux-image',{key:index,ref:"tiles",refInFor:true,attrs:{"size":_vm.size,"image":_vm.img,"offset":tile.offset,"css":tile.css}})}),1)}
var FluxVortexvue_type_template_id_3b4961ac_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FluxVortex.vue?vue&type=template&id=3b4961ac&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxVortex.vue?vue&type=script&lang=js&







function FluxVortexvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function FluxVortexvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { FluxVortexvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { FluxVortexvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var FluxVortexvue_type_script_lang_js_ = ({
  name: 'FluxVortex',
  components: {
    FluxImage: FluxImage
  },
  mixins: [BaseComponent],
  props: {
    circles: {
      type: Number,
      default: 1
    },
    tileCss: Object
  },
  data: function data() {
    return {
      baseStyle: {
        position: 'relative',
        overflow: 'hidden'
      }
    };
  },
  computed: {
    numCircles: function numCircles() {
      return Math.round(parseFloat(this.circles));
    },
    diag: function diag() {
      var _this$size = this.size,
          width = _this$size.width,
          height = _this$size.height;
      return Math.ceil(Math.sqrt(width * width + height * height));
    },
    radius: function radius() {
      return Math.ceil(this.diag / 2 / this.numCircles);
    },
    topGap: function topGap() {
      return Math.ceil(this.size.height / 2 - this.radius * this.numCircles);
    },
    leftGap: function leftGap() {
      return Math.ceil(this.size.width / 2 - this.radius * this.numCircles);
    },
    tiles: function tiles() {
      var tile;
      var tiles = [];

      for (var i = 0; i < this.numCircles; i++) {
        var size = (this.numCircles - i) * this.radius * 2;
        var gap = this.radius * i;
        tile = {
          offset: {
            top: this.topGap + gap,
            left: this.leftGap + gap
          }
        };
        tile.css = FluxVortexvue_type_script_lang_js_objectSpread({}, this.tileCss, {
          position: 'absolute',
          left: tile.offset.left + 'px',
          top: tile.offset.top + 'px',
          width: size + 'px',
          height: size + 'px',
          backgroundRepeat: 'repeat',
          borderRadius: '50%',
          zIndex: i
        });
        tiles.push(tile);
      }

      return tiles;
    }
  },
  methods: {
    transform: function transform(func) {
      this.$refs.tiles.forEach(function (tile, i) {
        return func(tile, i);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/FluxVortex.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxVortexvue_type_script_lang_js_ = (FluxVortexvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FluxVortex.vue





/* normalize component */

var FluxVortex_component = normalizeComponent(
  components_FluxVortexvue_type_script_lang_js_,
  FluxVortexvue_type_template_id_3b4961ac_render,
  FluxVortexvue_type_template_id_3b4961ac_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxVortex = (FluxVortex_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/concentric.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//


/* harmony default export */ var concentricvue_type_script_lang_js_ = ({
  name: 'TransitionConcentric',
  components: {
    FluxVortex: FluxVortex
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      circles: 7,
      tileDuration: 800,
      totalDuration: 0,
      easing: 'linear',
      tileDelay: 150
    };
  },
  created: function created() {
    this.totalDuration = this.tileDelay * this.circles + this.tileDuration;
  },
  played: function played() {
    var _this = this;

    var deg = this.direction === 'next' ? '90' : '-90';
    this.$refs.vortex.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        opacity: '0',
        transform: "rotateZ(".concat(deg, "deg)")
      });
    });
  },
  methods: {
    getDelay: function getDelay(i) {
      return i * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/concentric.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_concentricvue_type_script_lang_js_ = (concentricvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/concentric.vue





/* normalize component */

var concentric_component = normalizeComponent(
  transitions_concentricvue_type_script_lang_js_,
  concentricvue_type_template_id_73cb37bc_render,
  concentricvue_type_template_id_73cb37bc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var concentric = (concentric_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/warp.vue?vue&type=template&id=cfe61080&
var warpvue_type_template_id_cfe61080_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-vortex',{ref:"vortex",attrs:{"size":_vm.size,"circles":_vm.circles,"image":_vm.from}})}
var warpvue_type_template_id_cfe61080_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/warp.vue?vue&type=template&id=cfe61080&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/warp.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//


/* harmony default export */ var warpvue_type_script_lang_js_ = ({
  name: 'TransitionWarp',
  components: {
    FluxVortex: FluxVortex
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      circles: 7,
      tileDuration: 800,
      totalDuration: 0,
      easing: 'linear',
      tileDelay: 150
    };
  },
  created: function created() {
    this.totalDuration = this.tileDelay * this.circles + this.tileDuration;
  },
  played: function played() {
    var _this = this;

    this.$refs.vortex.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        opacity: '0',
        transform: "rotateZ(".concat(_this.getDeg(i), "deg)")
      });
    });
  },
  methods: {
    getDelayPrev: function getDelayPrev(i) {
      return (this.circles - i - 1) * this.tileDelay;
    },
    getDelayNext: function getDelayNext(i) {
      return i * this.tileDelay;
    },
    getDeg: function getDeg(i) {
      return i % 2 === 0 ? '-90' : '90';
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/warp.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_warpvue_type_script_lang_js_ = (warpvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/warp.vue





/* normalize component */

var warp_component = normalizeComponent(
  transitions_warpvue_type_script_lang_js_,
  warpvue_type_template_id_cfe61080_render,
  warpvue_type_template_id_cfe61080_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var warp = (warp_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/camera.vue?vue&type=template&id=dc4d88f2&
var cameravue_type_template_id_dc4d88f2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-wrapper',{ref:"wrapper",attrs:{"size":_vm.wrapperSize,"css":_vm.wrapperCss}},[_c('flux-image',{ref:"image",attrs:{"image":_vm.image,"size":_vm.size,"css":_vm.imageCss}})],1)}
var cameravue_type_template_id_dc4d88f2_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/camera.vue?vue&type=template&id=dc4d88f2&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/camera.vue?vue&type=script&lang=js&






function cameravue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function cameravue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { cameravue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { cameravue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var cameravue_type_script_lang_js_ = ({
  name: 'TransitionCamera',
  components: {
    FluxWrapper: FluxWrapper,
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      circles: 2,
      totalDuration: 900,
      easing: 'cubic-bezier(0.385, 0, 0.795, 0.560)',
      backgroundColor: '#111',
      image: undefined,
      diag: undefined,
      wrapperSize: {},
      wrapperCss: {
        boxSizing: 'border-box',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '50%'
      },
      imageCss: {
        alignSelf: 'center',
        flex: 'none'
      }
    };
  },
  created: function created() {
    this.image = this.from;
    var _this$size = this.size,
        width = _this$size.width,
        height = _this$size.height;
    var diag = this.diag = Math.ceil(Math.sqrt(width * width + height * height));
    this.wrapperSize = {
      width: diag,
      height: diag
    };
    this.wrapperCss = cameravue_type_script_lang_js_objectSpread({}, this.wrapperCss, {
      border: '0 solid ' + this.backgroundColor,
      top: (height - diag) / 2 + 'px',
      left: (width - diag) / 2 + 'px'
    });
  },
  played: function played() {
    var _this = this;

    this.$refs.wrapper.transform({
      transition: "all ".concat(this.totalDuration / 2 - 50, "ms ").concat(this.easing, " 0ms"),
      borderWidth: this.diag / 2 + 'px'
    });
    setTimeout(function () {
      _this.$refs.image.hide();

      _this.$refs.wrapper.transform({
        transition: "all ".concat(_this.totalDuration / 2 - 50, "ms ").concat(_this.easing, " 0ms"),
        borderWidth: 0
      });
    }, this.totalDuration / 2 + 50);
  }
});
// CONCATENATED MODULE: ./src/transitions/camera.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_cameravue_type_script_lang_js_ = (cameravue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/camera.vue





/* normalize component */

var camera_component = normalizeComponent(
  transitions_cameravue_type_script_lang_js_,
  cameravue_type_template_id_dc4d88f2_render,
  cameravue_type_template_id_dc4d88f2_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var camera = (camera_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/cube.vue?vue&type=template&id=346286ca&
var cubevue_type_template_id_346286ca_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-cube',{ref:"cube",attrs:{"images":_vm.images,"size":_vm.size,"depth":_vm.size.width,"css":_vm.cubeCss}})}
var cubevue_type_template_id_346286ca_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/cube.vue?vue&type=template&id=346286ca&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/cube.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var cubevue_type_script_lang_js_ = ({
  name: 'TransitionCube',
  components: {
    FluxCube: FluxCube
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      totalDuration: 1400,
      easing: 'ease-out',
      images: undefined,
      cubeCss: {}
    };
  },
  created: function created() {
    Object.assign(this.mask, {
      perspective: '1600px',
      overflow: 'visible'
    });
    this.cubeCss.transition = "all ".concat(this.totalDuration, "ms ").concat(this.easing);
    this.images = {
      front: this.from,
      left: this.to,
      right: this.to
    };
  },
  played: function played() {
    if (this.current) this.current.hide();
    var sides = {
      next: 'left',
      prev: 'right'
    };
    this.$refs.cube.turn(sides[this.direction]);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.current) this.current.show();
  }
});
// CONCATENATED MODULE: ./src/transitions/cube.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_cubevue_type_script_lang_js_ = (cubevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/cube.vue





/* normalize component */

var cube_component = normalizeComponent(
  transitions_cubevue_type_script_lang_js_,
  cubevue_type_template_id_346286ca_render,
  cubevue_type_template_id_346286ca_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var cube = (cube_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/book.vue?vue&type=template&id=a102960e&
var bookvue_type_template_id_a102960e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('flux-image',{ref:"from",attrs:{"image":_vm.from,"size":_vm.size,"view-size":_vm.viewSize,"offset":_vm.image.offset,"css":_vm.image.css}}),_c('flux-cube',{ref:"cube",attrs:{"images":_vm.cube.images,"size":_vm.size,"view-size":_vm.viewSize,"offsets":_vm.cube.offsets,"sides-css":_vm.cube.sidesCss,"css":_vm.cube.css}})],1)}
var bookvue_type_template_id_a102960e_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/book.vue?vue&type=template&id=a102960e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/book.vue?vue&type=script&lang=js&







function bookvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bookvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bookvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bookvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var bookvue_type_script_lang_js_ = ({
  name: 'TransitionBook',
  components: {
    FluxCube: FluxCube,
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      totalDuration: 1200,
      easing: 'ease-out',
      viewSize: {},
      image: {
        offset: {},
        css: {
          position: 'absolute',
          top: 0,
          left: 0
        }
      },
      cube: {
        images: {},
        offsets: {},
        css: {
          position: 'absolute',
          top: 0,
          left: 0
        }
      }
    };
  },
  computed: {
    halfWidth: function halfWidth() {
      return Math.ceil(this.size.width / 2);
    },
    halfWidthPx: function halfWidthPx() {
      return this.halfWidth + 'px';
    }
  },
  created: function created() {
    Object.assign(this.mask, {
      perspective: '1600px',
      overflow: 'visible'
    });
    this.viewSize = {
      width: Math.ceil(this.size.width / 2),
      height: this.size.height
    };
    this.cube.images = {
      front: this.from,
      back: this.to
    };
  },
  played: function played() {
    this.$refs.cube.transform({
      transition: "transform ".concat(this.totalDuration, "ms ").concat(this.easing),
      transform: "rotateY(".concat(this.getDeg(), "deg)")
    });
  },
  methods: {
    setupPrev: function setupPrev() {
      this.image.offset.left = this.halfWidth;
      this.image.css.left = this.halfWidthPx;
      this.cube.offsets.back = {
        left: this.halfWidth
      };
      this.cube.css = bookvue_type_script_lang_js_objectSpread({}, this.cube.css, {
        transformOrigin: 'right center'
      });
    },
    setupNext: function setupNext() {
      this.cube.offsets.front = {
        left: this.halfWidth
      };
      this.cube.css = bookvue_type_script_lang_js_objectSpread({}, this.cube.css, {
        left: this.halfWidthPx,
        transformOrigin: 'left center'
      });
    },
    getDeg: function getDeg() {
      var sides = {
        next: '-180',
        prev: '180'
      };
      return sides[this.direction];
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/book.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_bookvue_type_script_lang_js_ = (bookvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/book.vue





/* normalize component */

var book_component = normalizeComponent(
  transitions_bookvue_type_script_lang_js_,
  bookvue_type_template_id_a102960e_render,
  bookvue_type_template_id_a102960e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var book = (book_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/fall.vue?vue&type=template&id=7781151c&
var fallvue_type_template_id_7781151c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-image',{ref:"image",style:(_vm.style),attrs:{"image":_vm.from,"size":_vm.size}})}
var fallvue_type_template_id_7781151c_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/fall.vue?vue&type=template&id=7781151c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/fall.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//


/* harmony default export */ var fallvue_type_script_lang_js_ = ({
  name: 'TransitionFall',
  components: {
    FluxImage: FluxImage
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      totalDuration: 1600,
      easing: 'ease-in',
      style: {
        transformOrigin: 'center bottom'
      }
    };
  },
  created: function created() {
    Object.assign(this.mask, {
      perspective: '1600px',
      overflow: 'visible'
    });
  },
  played: function played() {
    this.$refs.image.transform({
      transition: "transform ".concat(this.totalDuration, "ms ").concat(this.easing),
      transform: 'rotateX(-83deg)'
    });
  }
});
// CONCATENATED MODULE: ./src/transitions/fall.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_fallvue_type_script_lang_js_ = (fallvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/fall.vue





/* normalize component */

var fall_component = normalizeComponent(
  transitions_fallvue_type_script_lang_js_,
  fallvue_type_template_id_7781151c_render,
  fallvue_type_template_id_7781151c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var fall = (fall_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/wave.vue?vue&type=template&id=2d5f0e5a&
var wavevue_type_template_id_2d5f0e5a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"images":_vm.images,"colors":_vm.colors,"depth":_vm.size.height,"css":_vm.gridCss}})}
var wavevue_type_template_id_2d5f0e5a_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/wave.vue?vue&type=template&id=2d5f0e5a&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/wave.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var wavevue_type_script_lang_js_ = ({
  name: 'TransitionWave',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 1,
      cols: 8,
      tileDuration: 900,
      totalDuration: 0,
      easing: 'cubic-bezier(0.3, -0.3, 0.735, 0.285)',
      tileDelay: 110,
      sideColor: '#333',
      gridCss: {
        overflow: 'visible',
        perspective: '1200px'
      },
      images: {},
      colors: {}
    };
  },
  created: function created() {
    this.mask.overflow = 'visible';
    this.totalDuration = this.tileDelay * this.cols + this.tileDuration;
    this.images = {
      front: this.from,
      top: this.to
    };
  },
  played: function played() {
    var _this = this;

    if (this.current) this.current.hide();
    this.colors = {
      left: this.sideColor,
      right: this.sideColor
    };
    this.$refs.grid.transform(function (tile, i) {
      tile.setCss({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms")
      });
      tile.turnBottom();
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.current) this.current.show();
  },
  methods: {
    getDelayPrev: function getDelayPrev(i) {
      return (this.cols - i - 1) * this.tileDelay;
    },
    getDelayNext: function getDelayNext(i) {
      return i * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/wave.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_wavevue_type_script_lang_js_ = (wavevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/wave.vue





/* normalize component */

var wave_component = normalizeComponent(
  transitions_wavevue_type_script_lang_js_,
  wavevue_type_template_id_2d5f0e5a_render,
  wavevue_type_template_id_2d5f0e5a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var wave = (wave_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blinds3d.vue?vue&type=template&id=ca48a740&
var blinds3dvue_type_template_id_ca48a740_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"images":_vm.images,"css":_vm.gridCss}})}
var blinds3dvue_type_template_id_ca48a740_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/blinds3d.vue?vue&type=template&id=ca48a740&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/blinds3d.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var blinds3dvue_type_script_lang_js_ = ({
  name: 'TransitionBlinds3d',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 1,
      cols: 6,
      tileDuration: 800,
      totalDuration: 0,
      easing: 'ease-out',
      tileDelay: 150,
      gridCss: {
        perspective: '800px'
      },
      images: undefined
    };
  },
  created: function created() {
    this.mask.overflow = 'visible';
    this.totalDuration = this.tileDelay * this.cols + this.tileDuration;
    this.images = {
      front: this.from,
      back: this.to
    };
  },
  played: function played() {
    var _this = this;

    if (this.current) this.current.hide();
    var sides = {
      prev: 'backl',
      next: 'backr'
    };
    this.$refs.grid.transform(function (tile, i) {
      tile.setCss({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms")
      });
      tile.turn(sides[_this.direction]);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.current) this.current.show();
  },
  methods: {
    getDelayPrev: function getDelayPrev(i) {
      return (this.cols - i - 1) * this.tileDelay;
    },
    getDelayNext: function getDelayNext(i) {
      return i * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/blinds3d.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_blinds3dvue_type_script_lang_js_ = (blinds3dvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/blinds3d.vue





/* normalize component */

var blinds3d_component = normalizeComponent(
  transitions_blinds3dvue_type_script_lang_js_,
  blinds3dvue_type_template_id_ca48a740_render,
  blinds3dvue_type_template_id_ca48a740_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var blinds3d = (blinds3d_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/round1.vue?vue&type=template&id=bf13c292&
var round1vue_type_template_id_bf13c292_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"images":_vm.images,"css":_vm.gridCss}})}
var round1vue_type_template_id_bf13c292_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/round1.vue?vue&type=template&id=bf13c292&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/round1.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var round1vue_type_script_lang_js_ = ({
  name: 'TransitionRound1',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 8,
      cols: 8,
      tileDuration: 800,
      totalDuration: 0,
      easing: 'ease-out',
      tileDelay: 150,
      images: undefined,
      gridCss: {
        perspective: '800px'
      }
    };
  },
  created: function created() {
    this.mask.overflow = 'visible';

    if (!this.options.rows) {
      var divider = this.size.width / this.cols;
      this.rows = Math.floor(this.size.height / divider);
    }

    var multiplier = this.rows > this.cols ? this.rows : this.cols;
    this.totalDuration = this.tileDelay * multiplier * 2;
    this.images = {
      front: this.from,
      back: this.to
    };
  },
  played: function played() {
    var _this = this;

    if (this.current) this.current.hide();
    var sides = {
      prev: 'backl',
      next: 'backr'
    };
    this.$refs.grid.transform(function (tile, i) {
      tile.setCss({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms")
      });
      tile.turn(sides[_this.direction]);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.current) this.current.show();
  },
  methods: {
    getDelay: function getDelay(i) {
      var grid = this.$refs.grid;
      var row = grid.getRowNumber(i);
      var col = grid.getColNumber(i);
      var delay = col + row;
      if (this.direction === 'prev') delay = this.rows + this.cols - delay - 1;
      return delay * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/round1.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_round1vue_type_script_lang_js_ = (round1vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/round1.vue





/* normalize component */

var round1_component = normalizeComponent(
  transitions_round1vue_type_script_lang_js_,
  round1vue_type_template_id_bf13c292_render,
  round1vue_type_template_id_bf13c292_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var round1 = (round1_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/round2.vue?vue&type=template&id=7fa2d328&
var round2vue_type_template_id_7fa2d328_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"depth":0,"image":_vm.from,"css":_vm.gridCss,"tile-css":_vm.tileCss}})}
var round2vue_type_template_id_7fa2d328_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/round2.vue?vue&type=template&id=7fa2d328&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/round2.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var round2vue_type_script_lang_js_ = ({
  name: 'TransitionRound2',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 9,
      cols: 9,
      tileDuration: 800,
      totalDuration: 0,
      rotateX: '-540',
      easing: 'linear',
      tileDelay: 100,
      gridCss: {
        perspective: '1200px'
      },
      tileCss: {
        backfaceVisibility: 'hidden'
      }
    };
  },
  created: function created() {
    this.mask.overflow = 'visible';

    if (!this.options.rows) {
      var divider = this.size.width / this.cols;
      this.rows = Math.floor(this.size.height / divider);
    }

    this.totalDuration = (this.cols / 2 + this.rows) * (this.tileDelay * 2);
  },
  played: function played() {
    var _this = this;

    this.$refs.grid.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        opacity: '0',
        transform: "rotateY(".concat(_this.rotateX, "deg)")
      });
    });
  },
  methods: {
    getDelay: function getDelay(i) {
      var grid = this.$refs.grid;
      var row = grid.getRowNumber(i);
      var col = grid.getColNumber(i);
      var rowDelay, colDelay;

      if (this.direction === 'prev') {
        rowDelay = Math.abs(this.rows / 2 - 0.5 - row);
        colDelay = Math.abs(this.cols - col);
      } else {
        rowDelay = Math.abs(this.rows / 2 - 0.5 - row);
        colDelay = Math.abs(col);
      }

      var delay = rowDelay + colDelay - 1;
      return delay * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/round2.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_round2vue_type_script_lang_js_ = (round2vue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/round2.vue





/* normalize component */

var round2_component = normalizeComponent(
  transitions_round2vue_type_script_lang_js_,
  round2vue_type_template_id_7fa2d328_render,
  round2vue_type_template_id_7fa2d328_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var round2 = (round2_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/explode.vue?vue&type=template&id=0f0ff063&
var explodevue_type_template_id_0f0ff063_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('flux-grid',{ref:"grid",attrs:{"rows":_vm.rows,"cols":_vm.cols,"size":_vm.size,"image":_vm.from,"css":_vm.cssGrid}})}
var explodevue_type_template_id_0f0ff063_staticRenderFns = []


// CONCATENATED MODULE: ./src/transitions/explode.vue?vue&type=template&id=0f0ff063&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/transitions/explode.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var explodevue_type_script_lang_js_ = ({
  name: 'TransitionExplode',
  components: {
    FluxGrid: FluxGrid
  },
  mixins: [BaseTransition],
  data: function data() {
    return {
      rows: 9,
      cols: 9,
      tileDuration: 300,
      totalDuration: 0,
      easing: 'linear',
      tileDelay: 100,
      cssGrid: {
        overflow: 'visible'
      }
    };
  },
  created: function created() {
    this.mask.overflow = 'visible';

    if (!this.options.rows) {
      var divider = this.size.width / this.cols;
      this.rows = Math.floor(this.size.height / divider);
    }

    this.totalDuration = (this.cols / 2 + this.rows / 2) * (this.tileDelay * 2);
  },
  played: function played() {
    var _this = this;

    this.$refs.grid.transform(function (tile, i) {
      tile.transform({
        transition: "all ".concat(_this.tileDuration, "ms ").concat(_this.easing, " ").concat(_this.getDelay(i), "ms"),
        borderRadius: '100%',
        opacity: '0',
        transform: 'scale(1.6, 1.6)'
      });
    });
  },
  methods: {
    getDelay: function getDelay(i) {
      var grid = this.$refs.grid;
      var row = grid.getRowNumber(i);
      var col = grid.getColNumber(i);
      var rowDelay = Math.abs(this.rows / 2 - 0.5 - row);
      var colDelay = Math.abs(this.cols / 2 - 0.5 - col);
      var delay = rowDelay + colDelay - 1;
      return delay * this.tileDelay;
    }
  }
});
// CONCATENATED MODULE: ./src/transitions/explode.vue?vue&type=script&lang=js&
 /* harmony default export */ var transitions_explodevue_type_script_lang_js_ = (explodevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/transitions/explode.vue





/* normalize component */

var explode_component = normalizeComponent(
  transitions_explodevue_type_script_lang_js_,
  explodevue_type_template_id_0f0ff063_render,
  explodevue_type_template_id_0f0ff063_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var explode = (explode_component.exports);
// CONCATENATED MODULE: ./src/transitions/index.js




















// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FluxTransition.vue?vue&type=script&lang=js&







function FluxTransitionvue_type_script_lang_js_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function FluxTransitionvue_type_script_lang_js_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { FluxTransitionvue_type_script_lang_js_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { FluxTransitionvue_type_script_lang_js_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FluxTransitionvue_type_script_lang_js_ = ({
  name: 'FluxTransition',
  components: FluxTransitionvue_type_script_lang_js_objectSpread({}, transitions_namespaceObject),
  props: {
    size: {
      type: Object,
      required: true
    },
    transition: {
      type: [String, Object],
      required: true
    },
    from: {
      type: [String, Object],
      required: true
    },
    to: {
      type: [String, Object],
      required: true
    },
    current: Object,
    options: Object,
    images: Array
  },
  data: function data() {
    return {
      baseStyle: {
        overflow: 'hidden',
        perspective: 'none',
        zIndex: 3
      }
    };
  },
  computed: {
    style: function style() {
      var _this$size = this.size,
          width = _this$size.width,
          height = _this$size.height;
      return FluxTransitionvue_type_script_lang_js_objectSpread({}, this.baseStyle, {
        width: width + 'px',
        height: height + 'px'
      });
    },
    componentName: function componentName() {
      if (this.transition.component) {
        if (this.transition.name) return this.transition.name;
        var vfURL = 'https://deulos.github.com/vue-flux-docs/documentation-6/Components/VueFlux';
        throw new ReferenceError("Transition undefined, check ".concat(vfURL));
      }

      var name = this.transition.name || this.transition;
      name = 'Transition' + name[0].toUpperCase() + name.slice(1);

      if (name in transitions_namespaceObject === false) {
        name = this.transition.name || this.transition;
        throw new ReferenceError("Transition ".concat(name, " does not exist"));
      }

      return name;
    }
  },
  created: function created() {
    if (this.transition.component) this.$options.components[this.componentName] = this.transition.component;
  },
  mounted: function mounted() {
    var _this = this;

    setTimeout(function () {
      _this.$emit('ready');
    }, this.$refs.transition.getReadyness());
  },
  methods: {
    start: function start() {
      var _this2 = this;

      this.$refs.transition.$options.played.call(this.$refs.transition);
      this.$emit('start', {
        transition: this.transition,
        from: this.from,
        to: this.to,
        options: this.options
      });
      setTimeout(function () {
        _this2.end();
      }, this.getDuration());
    },
    end: function end() {
      this.$emit('end', {
        transition: this.transition,
        from: this.from,
        to: this.to,
        options: this.options
      });
    },
    getDuration: function getDuration() {
      if (!this.$refs.transition) return 1;
      return this.$refs.transition.totalDuration;
    }
  }
});
// CONCATENATED MODULE: ./src/components/FluxTransition.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FluxTransitionvue_type_script_lang_js_ = (FluxTransitionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FluxTransition.vue?vue&type=style&index=0&lang=scss&
var FluxTransitionvue_type_style_index_0_lang_scss_ = __webpack_require__("e671");

// CONCATENATED MODULE: ./src/components/FluxTransition.vue






/* normalize component */

var FluxTransition_component = normalizeComponent(
  components_FluxTransitionvue_type_script_lang_js_,
  FluxTransitionvue_type_template_id_cc3f9bd0_render,
  FluxTransitionvue_type_template_id_cc3f9bd0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxTransition = (FluxTransition_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueFlux.vue?vue&type=template&id=81c55f9a&
var VueFluxvue_type_template_id_81c55f9a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",staticClass:"vue-flux",style:(_vm.style),on:{"mousemove":function($event){return _vm.toggleMouseOver(true)},"mouseleave":function($event){return _vm.toggleMouseOver(false)},"dblclick":function($event){return _vm.Display.toggleFullScreen()},"touchstart":function($event){return _vm.Touches.start($event)},"touchend":function($event){return _vm.Touches.end($event)}}},[(_vm.Transitions.current)?_c('flux-transition',{ref:"transition",attrs:{"transition":_vm.Transitions.current,"size":_vm.size,"from":_vm.Transitions.from,"to":_vm.Transitions.to,"current":_vm.$refs.image,"options":_vm.Transitions.current.options,"images":_vm.Images.imgs},on:{"ready":function($event){return _vm.Transitions.ready()},"start":function($event){return _vm.Transitions.start()},"end":function($event){return _vm.Transitions.end()}}}):_vm._e(),(_vm.Images.current)?_c('flux-image',{ref:"image",attrs:{"size":_vm.size,"image":_vm.Images.current}}):_vm._e(),(_vm.size)?_c('div',{staticClass:"complements"},[_vm._t("preloader"),_vm._t("caption"),_c('div',{staticStyle:{"height":"48%"}}),_vm._t("controls"),_vm._t("index"),(_vm.loaded)?_vm._t("pagination"):_vm._e()],2):_vm._e()],1)}
var VueFluxvue_type_template_id_81c55f9a_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/VueFlux.vue?vue&type=template&id=81c55f9a&

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/promise.js
var promise = __webpack_require__("795b");
var promise_default = /*#__PURE__*/__webpack_require__.n(promise);

// CONCATENATED MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    promise_default.a.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new promise_default.a(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./src/controllers/Display.js






var Display_DisplayController = /*#__PURE__*/function () {
  function DisplayController(vf) {
    _classCallCheck(this, DisplayController);

    this.vf = vf;
  }

  _createClass(DisplayController, [{
    key: "toggleFullScreen",
    value: function toggleFullScreen() {
      this.inFullScreen ? this.exitFullScreen() : this.enterFullScreen();
    }
  }, {
    key: "enterFullScreen",
    value: function () {
      var _enterFullScreen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var vf, methods, element;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vf = this.vf;

                if (this.vf.config.allowFullscreen) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return");

              case 3:
                methods = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'];
                element = vf.$refs.container;
                methods.find(function (method) {
                  return method in element ? element[method]() || true : false;
                });
                vf.$emit('fullscreen-enter');

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function enterFullScreen() {
        return _enterFullScreen.apply(this, arguments);
      }

      return enterFullScreen;
    }()
  }, {
    key: "exitFullScreen",
    value: function () {
      var _exitFullScreen = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var vf, methods;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                vf = this.vf;
                methods = ['exitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen', 'msExitFullscreen'];
                methods.find(function (method) {
                  return method in document ? document[method]() || true : false;
                });
                vf.$emit('fullscreen-exit');

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function exitFullScreen() {
        return _exitFullScreen.apply(this, arguments);
      }

      return exitFullScreen;
    }()
  }, {
    key: "inFullScreen",
    get: function get() {
      var props = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'];
      return !!document[props.find(function (prop) {
        return prop in document;
      })];
    }
  }]);

  return DisplayController;
}();


// CONCATENATED MODULE: ./src/controllers/Timers.js






var Timers_TimersController = /*#__PURE__*/function () {
  function TimersController() {
    _classCallCheck(this, TimersController);

    this.timers = {};
  }

  _createClass(TimersController, [{
    key: "set",
    value: function set(timer, time, cb) {
      this.clear(timer);
      this.timers[timer] = setTimeout(cb, time);
    }
  }, {
    key: "clear",
    value: function clear(timer) {
      var _this = this;

      var timers = timer ? [timer] : Object.keys(this.timers);
      timers.forEach(function (timer) {
        return clearTimeout(_this.timers[timer]);
      });
    }
  }]);

  return TimersController;
}();


// CONCATENATED MODULE: ./src/controllers/Transitions.js





var Transitions_TransitionsController = /*#__PURE__*/function () {
  function TransitionsController(vf) {
    _classCallCheck(this, TransitionsController);

    this.vf = vf;
    this.reset(true);
  }

  _createClass(TransitionsController, [{
    key: "reset",
    value: function reset() {
      var hard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (hard) {
        this.last = undefined;
        this.transitions = [];
      }

      this.current = undefined;
      this.from = undefined;
      this.to = undefined;
    }
  }, {
    key: "update",
    value: function update(transitions) {
      this.reset(true);
      this.transitions = transitions.map(function (transition, i) {
        return {
          index: i,
          name: transition.name || transition,
          options: transition.options
        };
      });
      this.last = this.transitions[this.transitions.length - 1];
      this.vf.$emit('transitions-updated');
    }
  }, {
    key: "run",
    value: function run(transition, from, to, direction) {
      this.vf.Timers.clear('transition');

      if (transition) {
        var name = transition.name || transition;
        var found = this.transitions.find(function (each) {
          return each.name === name;
        });
        if (!found) throw new ReferenceError("Transition ".concat(transition, " not found"));
        transition = JSON.parse(JSON.stringify(found));
      } else {
        transition = JSON.parse(JSON.stringify(this.next));
      }

      if (!transition.options) transition.options = {};

      if (!transition.options.direction) {
        if (!direction) direction = from.index < to.index ? 'next' : 'prev';
        transition.options.direction = direction;
      }

      this.from = from;
      this.to = to;
      this.current = transition;
    }
  }, {
    key: "ready",
    value: function ready() {
      this.vf.$refs.transition.start();
    }
  }, {
    key: "start",
    value: function start() {
      this.vf.Images.current = this.to;
      this.vf.$emit('transition-start', {
        transition: this.current,
        from: this.from,
        to: this.to
      });
    }
  }, {
    key: "end",
    value: function end() {
      var _this = this;

      var cancel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var vf = this.vf;
      this.last = this.current;
      this.reset();
      vf.$nextTick(function () {
        vf.Images.last = vf.Images.current;

        if (!vf.config.infinite && vf.Images.next.index === 0) {
          vf.stop();
          return;
        }

        if (vf.config.autoplay) {
          vf.Timers.set('transition', vf.config.delay, function () {
            vf.show();
          });
        }

        vf.$emit(cancel ? 'transition-cancel' : 'transition-end', {
          transition: _this.current,
          from: _this.from,
          to: _this.to
        });
      });
    }
  }, {
    key: "current",
    get: function get() {
      return this.$current;
    },
    set: function set(transition) {
      if (this.current) this.last = this.current;
      this.$current = transition;
    }
  }, {
    key: "next",
    get: function get() {
      var index = this.last.index + 1;
      if (index >= this.transitions.length) index = 0;
      return this.transitions[index];
    }
  }]);

  return TransitionsController;
}();


// CONCATENATED MODULE: ./src/controllers/Images.js






var Images_ImagesController = /*#__PURE__*/function () {
  function ImagesController(vf) {
    _classCallCheck(this, ImagesController);

    _defineProperty(this, "$current", void 0);

    _defineProperty(this, "$last", void 0);

    this.vf = vf;
    this.reset(true);
  }

  _createClass(ImagesController, [{
    key: "reset",
    value: function reset() {
      var hard = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (hard) this.$last = undefined;
      this.srcs = [];
      this.imgs = [];
      this.loaded = 0;
      this.progress = 0;
      this.preloading = false;
      this.lazyloading = false;
      this.$current = undefined;
    }
  }, {
    key: "update",
    value: function update(images) {
      this.reset();
      this.srcs = images.slice(0);
      this.preloadStart();
    }
  }, {
    key: "preloadStart",
    value: function preloadStart() {
      var _this = this;

      var vf = this.vf;
      this.preloading = true;
      var preload = this.srcs.length;
      if (vf.config.lazyLoad) preload = vf.config.lazyLoadAfter;
      var srcs = this.srcs.slice(0, preload);
      srcs.forEach(function (src) {
        return _this.addImg(src);
      });
      vf.$emit('images-preload-start');
    }
  }, {
    key: "preloadEnd",
    value: function preloadEnd() {
      this.preloading = false;
      this.vf.$emit('images-preload-end');
      if (this.imgs.length < this.srcs.length) this.lazyLoadStart();else this.removeErrorImgs();
      this.vf.init();
    }
  }, {
    key: "lazyLoadStart",
    value: function lazyLoadStart() {
      var _this2 = this;

      this.lazyloading = true;
      var srcs = this.srcs.slice(this.imgs.length);
      srcs.forEach(function (src) {
        return _this2.addImg(src);
      });
      this.vf.$emit('images-lazy-load-start');
    }
  }, {
    key: "lazyLoadEnd",
    value: function lazyLoadEnd() {
      this.lazyloading = false;
      this.removeErrorImgs();
      this.vf.$emit('images-lazy-load-end');
    }
  }, {
    key: "addImg",
    value: function addImg(src) {
      var _this3 = this;

      var img = new Img_Img(this.vf.config.path + src);
      this.imgs.push(img);
      img.load().then(function () {
        _this3.loadSuccess(img);
      }).catch(function (error) {
        _this3.loadError(error);
      });
    }
  }, {
    key: "loadSuccess",
    value: function loadSuccess() {
      this.loaded++;

      if (!this.current) {
        for (var i = 0; i < this.imgs.length; i++) {
          var status = this.imgs[i].status;
          if (status === 'error') continue;
          if (status === 'loaded') this.current = this.imgs[i];
          break;
        }
      }

      if (this.preloading) this.updateProgress();
      if (this.loaded === this.imgs.length) this.preloading ? this.preloadEnd() : this.lazyLoadEnd();
    }
  }, {
    key: "loadError",
    value: function loadError(error) {
      // eslint-disable-next-line
      console.warn(error);
    }
  }, {
    key: "updateProgress",
    value: function updateProgress() {
      this.progress = Math.ceil(this.loaded * 100 / this.imgs.length) || 0;
    }
  }, {
    key: "removeErrorImgs",
    value: function removeErrorImgs() {
      this.imgs = this.imgs.filter(function (img) {
        return img.status === 'loaded';
      });
      this.imgs.forEach(function (img, index) {
        img.index = index;
      });
    }
  }, {
    key: "getByIndex",
    value: function getByIndex(index) {
      if (index === 'next') return this.next;
      if (index === 'prev') return this.prev;
      if (!this.imgs[index]) throw new ReferenceError("Image ".concat(index, " not found"));
      return this.imgs[index];
    }
  }, {
    key: "prev",
    get: function get() {
      var index = this.$current.index - 1;
      if (index < 0) index = this.imgs.length - 1;
      return this.imgs[index];
    }
  }, {
    key: "last",
    get: function get() {
      return this.$last;
    },
    set: function set(image) {
      this.$last = image;
    }
  }, {
    key: "current",
    get: function get() {
      return this.$current;
    },
    set: function set(image) {
      if (this.$current) this.last = this.$current;
      this.$current = image;
    }
  }, {
    key: "next",
    get: function get() {
      var index = this.$current.index + 1;
      if (index >= this.imgs.length) index = 0;
      return this.imgs[index];
    }
  }]);

  return ImagesController;
}();


// CONCATENATED MODULE: ./src/controllers/Touches.js



var Touches_TouchesController = /*#__PURE__*/function () {
  function TouchesController(vf) {
    _classCallCheck(this, TouchesController);

    this.vf = vf;
    this.startX = 0;
    this.startY = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.prevTouchTime = 0; // Max distance in pixels from start until end

    this.tapThreshold = 5; // Max time in ms from first to second tap

    this.doubleTapThreshold = 200; // Distance in percentage to trigger slide

    this.slideTrigger = 0.3;
  }

  _createClass(TouchesController, [{
    key: "start",
    value: function start(event) {
      if (!this.vf.config.enableGestures) return;
      this.startTime = Date.now();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    }
  }, {
    key: "end",
    value: function end(event) {
      var vf = this.vf;
      this.prevTouchTime = this.endTime;
      this.endTime = Date.now();
      var offsetX = event.changedTouches[0].clientX - this.startX;
      var offsetY = event.changedTouches[0].clientY - this.startY;

      if (this.tap(offsetX, offsetY)) {
        vf.toggleMouseOver(true);
        return;
      }

      if (!vf.config.enableGestures) return;
      if (this.slideRight(offsetX)) vf.show('prev');else if (this.slideLeft(offsetX)) vf.show('next');
    }
  }, {
    key: "tap",
    value: function tap(offsetX, offsetY) {
      return Math.abs(offsetX) < this.tapThreshold && Math.abs(offsetY) < this.tapThreshold;
    }
  }, {
    key: "doubleTap",
    value: function doubleTap() {
      return this.endTime - this.prevTouchTime < this.doubleTapThreshold;
    }
  }, {
    key: "slideLeft",
    value: function slideLeft(offsetX) {
      return offsetX < 0 && offsetX < -(this.vf.size.width * this.slideTrigger);
    }
  }, {
    key: "slideRight",
    value: function slideRight(offsetX) {
      return offsetX > 0 && offsetX > this.vf.size.width * this.slideTrigger;
    }
  }, {
    key: "slideUp",
    value: function slideUp(offsetY) {
      return offsetY < 0 && offsetY < -(this.vf.size.height * this.slideTrigger);
    }
  }, {
    key: "slideDown",
    value: function slideDown(offsetY) {
      return offsetY > 0 && offsetY > this.vf.size.height * this.slideTrigger;
    }
  }]);

  return TouchesController;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/VueFlux.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Libraries
 // Controllers





 // Components



/* harmony default export */ var VueFluxvue_type_script_lang_js_ = ({
  name: 'VueFlux',
  components: {
    FluxImage: FluxImage,
    FluxTransition: FluxTransition
  },
  props: {
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    transitions: {
      type: Array,
      required: true
    },
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    captions: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      config: {
        allowFullscreen: false,
        allowToSkipTransition: true,
        autohideTime: 2500,
        autoplay: false,
        bindKeys: false,
        delay: 5000,
        enableGestures: false,
        infinite: true,
        lazyLoad: true,
        lazyLoadAfter: 3,
        path: ''
      },
      size: undefined,
      loaded: false,
      mouseOver: false,
      Display: undefined,
      Timers: undefined,
      Transitions: undefined,
      Touches: undefined,
      Images: undefined
    };
  },
  computed: {
    style: function style() {
      if (!this.size) return {};

      if (this.Display.inFullScreen) {
        return {
          width: '100% !important',
          height: '100% !important'
        };
      }

      var _this$size = this.size,
          width = _this$size.width,
          height = _this$size.height;
      return {
        width: width ? width + 'px' : 'auto',
        height: height ? height + 'px' : 'auto'
      };
    }
  },
  watch: {
    options: {
      handler: function handler() {
        this.updateOptions();
      },
      deep: true
    },
    transitions: function transitions() {
      var wasPlaying = this.config.autoplay;
      this.stop(true);
      this.Transitions.update(this.transitions);
      wasPlaying && this.play();
    },
    images: function images() {
      var wasPlaying = this.config.autoplay;
      this.stop(true);
      this.loaded = false;
      this.Images.update(this.images);
      wasPlaying && this.play();
    }
  },
  created: function created() {
    this.Display = new Display_DisplayController(this);
    this.Timers = new Timers_TimersController(this);
    this.Images = new Images_ImagesController(this);
    this.Touches = new Touches_TouchesController(this);
    this.Transitions = new Transitions_TransitionsController(this);
    this.updateOptions();
    this.$emit('created');
  },
  mounted: function mounted() {
    this.resize();
    this.Images.update(this.images);
    this.Transitions.update(this.transitions);
    this.$emit('mounted');
  },
  beforeDestroy: function beforeDestroy() {
    this.removeListeners();
    this.Timers.clear();
    this.$emit('destroyed');
  },
  methods: {
    updateOptions: function updateOptions() {
      Object.assign(this.config, this.options);
      if (this.config.autohideTime === 0) this.mouseOver = true;
      this.removeListeners();
      window.addEventListener('resize', this.resize, {
        passive: true
      });

      if (this.config.bindKeys) {
        window.addEventListener('keydown', this.keydown, {
          passive: true
        });
      }

      this.$emit('options-updated');
    },
    resize: function () {
      var _resize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var size;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.$refs.container) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (this.Transitions.current) this.Transitions.end(true);
                this.size = undefined;
                _context.next = 6;
                return this.$nextTick();

              case 6:
                size = Dom_Dom.sizeFrom(this.$refs.container);
                if (!size.height) size.height = size.width / 16 * 9;
                this.size = size;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resize() {
        return _resize.apply(this, arguments);
      }

      return resize;
    }(),
    init: function init() {
      this.loaded = true;
      if (this.config.autoplay === true) this.play();
      this.$emit('ready');
    },
    toggleMouseOver: function toggleMouseOver(over) {
      var _this = this;

      if (this.config.autohideTime === 0) return;
      this.Timers.clear('mouseOver');
      this.mouseOver = over;

      if (this.mouseOver) {
        this.Timers.set('mouseOver', this.config.autohideTime, function () {
          _this.mouseOver = false;
        });
      } else {
        this.mouseOver = false;
        this.Timers.clear('mouseOver');
      }
    },
    play: function play() {
      var _this2 = this;

      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';
      var delay = arguments.length > 1 ? arguments[1] : undefined;
      this.config.autoplay = true;

      if (!this.Transitions.current) {
        this.Timers.set('transition', delay || this.config.delay, function () {
          _this2.show(index);
        });
      }

      this.$emit('play', {
        index: index
      });
    },
    stop: function stop(cancelTransition) {
      this.config.autoplay = false;
      this.Timers.clear('transition');
      if (this.Transitions.current && cancelTransition) this.Transitions.end(true);
      this.$emit('stop');
    },
    show: function show() {
      var _this3 = this;

      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';
      var transition = arguments.length > 1 ? arguments[1] : undefined;
      if (!this.loaded || !this.$refs.image) return;

      if (this.Transitions.current) {
        if (this.config.allowToSkipTransition) {
          this.Transitions.end(true);
          this.$nextTick(function () {
            _this3.show(index, transition);
          });
        }

        return;
      }

      var from = this.Images.current;
      var to = this.Images.getByIndex(index);
      var direction = ['prev', 'next'].includes(index) ? index : undefined;
      this.Transitions.run(transition, from, to, direction);
      this.$emit('show', {
        transition: transition,
        from: from,
        to: to,
        direction: direction
      });
    },
    keydown: function keydown(event) {
      if (/ArrowLeft|Left/.test(event.key)) this.show('prev');else if (/ArrowRight|Right/.test(event.key)) this.show('next');
    },
    removeListeners: function removeListeners() {
      window.removeEventListener('resize', this.resize);
      window.removeEventListener('keydown', this.keydown);
    }
  }
});
// CONCATENATED MODULE: ./src/components/VueFlux.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_VueFluxvue_type_script_lang_js_ = (VueFluxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/VueFlux.vue?vue&type=style&index=0&lang=scss&
var VueFluxvue_type_style_index_0_lang_scss_ = __webpack_require__("1d36");

// CONCATENATED MODULE: ./src/components/VueFlux.vue






/* normalize component */

var VueFlux_component = normalizeComponent(
  components_VueFluxvue_type_script_lang_js_,
  VueFluxvue_type_template_id_81c55f9a_render,
  VueFluxvue_type_template_id_81c55f9a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueFlux = (VueFlux_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxCaption.vue?vue&type=template&id=4c927760&
var FluxCaptionvue_type_template_id_4c927760_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.caption)?_vm._t("default",[_c('div',{staticClass:"flux-caption"},[_vm._v("\n\t\t\t"+_vm._s(_vm.getCaptionText())+"\n\t\t")])],{"caption":_vm.caption,"text":_vm.getCaptionText()}):_vm._e()],2)}
var FluxCaptionvue_type_template_id_4c927760_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/complements/FluxCaption.vue?vue&type=template&id=4c927760&

// CONCATENATED MODULE: ./src/mixins/BaseComplement.js

/* harmony default export */ var BaseComplement = ({
  props: {
    slider: Object
  },
  computed: {
    vf: function vf() {
      if (this.slider) return this.slider;
      if (this.$parent.$options.name === 'VueFlux') return this.$parent;
      throw new ReferenceError('slider not referenced, check https://deulos.github.com/vue-flux-docs/ for help');
    },
    captions: function captions() {
      return this.vf && this.vf.captions ? this.vf.captions : {};
    },
    Transitions: function Transitions() {
      return this.vf.Transitions;
    },
    Images: function Images() {
      return this.vf.Images;
    }
  },
  methods: {
    getCaption: function getCaption(index) {
      if (index === undefined) index = this.Images.current.index;
      return this.captions[index] || '';
    },
    getCaptionText: function getCaptionText(index) {
      var caption = this.getCaption(index);
      return caption.text || caption || '';
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxCaption.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FluxCaptionvue_type_script_lang_js_ = ({
  name: 'FluxCaption',
  mixins: [BaseComplement],
  computed: {
    caption: function caption() {
      if (!this.vf) return '';
      if (!this.vf.loaded) return '';
      if (this.Transitions.current) return '';
      return this.getCaption();
    }
  }
});
// CONCATENATED MODULE: ./src/components/complements/FluxCaption.vue?vue&type=script&lang=js&
 /* harmony default export */ var complements_FluxCaptionvue_type_script_lang_js_ = (FluxCaptionvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/complements/FluxCaption.vue?vue&type=style&index=0&lang=scss&
var FluxCaptionvue_type_style_index_0_lang_scss_ = __webpack_require__("87af");

// CONCATENATED MODULE: ./src/components/complements/FluxCaption.vue






/* normalize component */

var FluxCaption_component = normalizeComponent(
  complements_FluxCaptionvue_type_script_lang_js_,
  FluxCaptionvue_type_template_id_4c927760_render,
  FluxCaptionvue_type_template_id_4c927760_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxCaption = (FluxCaption_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxControls.vue?vue&type=template&id=6036149c&
var FluxControlsvue_type_template_id_6036149c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.display)?_c('div',{staticClass:"flux-controls"},[_c('flux-button',{staticClass:"prev top left",on:{"click":function($event){return _vm.vf.show('prev')}}},[_c('polyline',{attrs:{"points":"64,18 22,50 64,82"}})]),(!_vm.vf.config.autoplay)?_c('flux-button',{staticClass:"play",on:{"click":function($event){return _vm.vf.play('next', 1)}}},[_c('polygon',{attrs:{"points":"32,12 82,50 32,88"}})]):_vm._e(),(_vm.vf.config.autoplay)?_c('flux-button',{staticClass:"pause",on:{"click":function($event){return _vm.vf.stop()}}},[_c('line',{attrs:{"x1":"32","y1":"22","x2":"32","y2":"78"}}),_c('line',{attrs:{"x1":"68","y1":"22","x2":"68","y2":"78"}})]):_vm._e(),_c('flux-button',{staticClass:"next top right",on:{"click":function($event){return _vm.vf.show('next')}}},[_c('polyline',{attrs:{"points":"36,18 78,50 36,82"}})])],1):_vm._e()])}
var FluxControlsvue_type_template_id_6036149c_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/complements/FluxControls.vue?vue&type=template&id=6036149c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxControls.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var FluxControlsvue_type_script_lang_js_ = ({
  name: 'FluxControls',
  components: {
    FluxButton: FluxButton
  },
  mixins: [BaseComplement],
  computed: {
    display: function display() {
      if (!this.vf) return false;
      if (!this.vf.loaded) return false;
      if (!this.vf.mouseOver) return false;
      return true;
    }
  }
});
// CONCATENATED MODULE: ./src/components/complements/FluxControls.vue?vue&type=script&lang=js&
 /* harmony default export */ var complements_FluxControlsvue_type_script_lang_js_ = (FluxControlsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/complements/FluxControls.vue?vue&type=style&index=0&lang=scss&
var FluxControlsvue_type_style_index_0_lang_scss_ = __webpack_require__("f83b");

// CONCATENATED MODULE: ./src/components/complements/FluxControls.vue






/* normalize component */

var FluxControls_component = normalizeComponent(
  complements_FluxControlsvue_type_script_lang_js_,
  FluxControlsvue_type_template_id_6036149c_render,
  FluxControlsvue_type_template_id_6036149c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxControls = (FluxControls_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxIndex.vue?vue&type=template&id=403e31e0&
var FluxIndexvue_type_template_id_403e31e0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.display)?_c('div',{staticClass:"flux-index"},[_c('transition',{attrs:{"name":"fade"}},[(_vm.displayButton)?_c('flux-button',{staticClass:"toggle bottom left",on:{"click":function($event){return _vm.showIndex($event)}}},_vm._l((_vm.coords),function(coord,i){return _c('rect',{key:i,attrs:{"x":coord.x,"y":coord.y,"width":_vm.buttonRectSize +'px',"height":_vm.buttonRectSize +'px'}})}),0):_vm._e()],1),_c('nav',{class:_vm.listClass,on:{"click":function($event){return _vm.hideIndex()}}},[_c('ul',{ref:"index"},_vm._l((_vm.images),function(image,i){return _c('li',{key:i,class:_vm.thumbClass(i),on:{"click":function($event){return _vm.showImage(i)}}},[_c('flux-image',{ref:"thumbs",refInFor:true,attrs:{"image":_vm.images[i],"size":_vm.thumbSize,"title":_vm.getCaptionText(i)}})],1)}),0)])],1):_vm._e()}
var FluxIndexvue_type_template_id_403e31e0_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/complements/FluxIndex.vue?vue&type=template&id=403e31e0&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxIndex.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var FluxIndexvue_type_script_lang_js_ = ({
  name: 'FluxIndex',
  components: {
    FluxButton: FluxButton,
    FluxImage: FluxImage
  },
  mixins: [BaseComplement],
  props: {
    buttonRows: {
      type: Number,
      default: 3
    },
    buttonCols: {
      type: Number,
      default: 3
    },
    buttonRectSize: {
      type: Number,
      default: 12
    },
    buttonPadding: {
      type: Number,
      default: 6
    }
  },
  data: function data() {
    return {
      visible: false,
      rectSize: 14,
      delay: 500,
      coords: []
    };
  },
  computed: {
    images: function images() {
      if (!this.vf) return [];
      return this.Images.imgs;
    },
    display: function display() {
      return this.vf && this.vf.loaded;
    },
    displayButton: function displayButton() {
      return this.vf.mouseOver;
    },
    listClass: function listClass() {
      var listClass = '';
      if (this.visible) listClass += 'visible';
      if (this.vf.mouseOver) listClass += ' mouse-over';
      return listClass;
    },
    thumbSize: function thumbSize() {
      var _this$vf$size = this.vf.size,
          width = _this$vf$size.width,
          height = _this$vf$size.height;
      width = width / 4.2;
      height = width * 90 / 160;

      if (width > 160) {
        width = 160;
        height = 90;
      }

      return {
        width: width,
        height: height
      };
    }
  },
  created: function created() {
    var rowsGap = (100 - this.buttonPadding * 2 - this.rectSize * this.buttonRows) / (this.buttonRows + 1);
    var colsGap = (100 - this.buttonPadding * 2 - this.rectSize * this.buttonCols) / (this.buttonCols + 1);

    for (var r = 0; r < this.buttonRows; r++) {
      for (var c = 0; c < this.buttonCols; c++) {
        this.coords.push({
          x: this.buttonPadding + rowsGap + rowsGap * r + this.rectSize * r,
          y: this.buttonPadding + colsGap + colsGap * c + this.rectSize * c
        });
      }
    }
  },
  methods: {
    showIndex: function showIndex() {
      this.vf.stop();
      this.visible = true;
      var index = this.$refs.index;
      this.$nextTick(function () {
        index.clientHeight;
        index.style.marginTop = 0;
      });
    },
    hideIndex: function hideIndex(imageIndex) {
      var _this = this;

      var index = this.$refs.index;
      index.clientHeight;
      index.style.marginTop = '100%';
      setTimeout(function () {
        _this.visible = false;
        if (imageIndex !== undefined) _this.showImage(imageIndex);
      }, this.delay);
    },
    thumbClass: function thumbClass(imageIndex) {
      return this.Images.current.index === imageIndex ? 'current' : '';
    },
    showImage: function showImage(imageIndex) {
      if (this.visible) {
        this.hideIndex(imageIndex);
        return;
      }

      if (this.Images.current.index !== imageIndex) this.vf.show(imageIndex);
    }
  }
});
// CONCATENATED MODULE: ./src/components/complements/FluxIndex.vue?vue&type=script&lang=js&
 /* harmony default export */ var complements_FluxIndexvue_type_script_lang_js_ = (FluxIndexvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/complements/FluxIndex.vue?vue&type=style&index=0&lang=scss&
var FluxIndexvue_type_style_index_0_lang_scss_ = __webpack_require__("5a88");

// CONCATENATED MODULE: ./src/components/complements/FluxIndex.vue






/* normalize component */

var FluxIndex_component = normalizeComponent(
  complements_FluxIndexvue_type_script_lang_js_,
  FluxIndexvue_type_template_id_403e31e0_render,
  FluxIndexvue_type_template_id_403e31e0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxIndex = (FluxIndex_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxPagination.vue?vue&type=template&id=1487eff5&
var FluxPaginationvue_type_template_id_1487eff5_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.display)?_c('nav',{staticClass:"flux-pagination"},[_c('ul',_vm._l((_vm.Images.srcs.length),function(i){return _c('li',{key:i},[_vm._t("default",[_c('span',{staticClass:"pagination-item",class:_vm.getClass(i - 1),attrs:{"title":_vm.getCaptionText(i - 1)},on:{"click":function($event){return _vm.show(i - 1)}}})],{"item":_vm.getItem(i - 1)})],2)}),0)]):_vm._e()}
var FluxPaginationvue_type_template_id_1487eff5_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/complements/FluxPagination.vue?vue&type=template&id=1487eff5&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxPagination.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FluxPaginationvue_type_script_lang_js_ = ({
  name: 'FluxPagination',
  mixins: [BaseComplement],
  computed: {
    display: function display() {
      if (!this.vf) return false;
      return true;
    }
  },
  methods: {
    getItem: function getItem(i) {
      return {
        index: i,
        title: this.getCaptionText(i),
        onClick: this.show,
        active: this.getClass(i) === 'active'
      };
    },
    getClass: function getClass(i) {
      if (this.Transitions.current !== undefined && this.Transitions.from.index === i) return 'active';
      if (this.Transitions.current === undefined && this.Images.current.index === i) return 'active';
      return '';
    },
    show: function show(index, event) {
      this.vf.show(index);
      if (event) event.preventDefault();
    }
  }
});
// CONCATENATED MODULE: ./src/components/complements/FluxPagination.vue?vue&type=script&lang=js&
 /* harmony default export */ var complements_FluxPaginationvue_type_script_lang_js_ = (FluxPaginationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/complements/FluxPagination.vue?vue&type=style&index=0&lang=scss&
var FluxPaginationvue_type_style_index_0_lang_scss_ = __webpack_require__("6fc2");

// CONCATENATED MODULE: ./src/components/complements/FluxPagination.vue






/* normalize component */

var FluxPagination_component = normalizeComponent(
  complements_FluxPaginationvue_type_script_lang_js_,
  FluxPaginationvue_type_template_id_1487eff5_render,
  FluxPaginationvue_type_template_id_1487eff5_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxPagination = (FluxPagination_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"639f3ecc-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxPreloader.vue?vue&type=template&id=7c41e377&
var FluxPreloadervue_type_template_id_7c41e377_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"preloader"},[_vm._t("spinner",[(_vm.displaySpinner)?_c('div',{staticClass:"spinner"},[_c('div',{staticClass:"pct"},[_vm._v("\n\t\t\t\t"+_vm._s(_vm.Images.progress)+"%\n\t\t\t")]),_c('div',{staticClass:"border"})]):_vm._e()])],2)}
var FluxPreloadervue_type_template_id_7c41e377_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/complements/FluxPreloader.vue?vue&type=template&id=7c41e377&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/complements/FluxPreloader.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var FluxPreloadervue_type_script_lang_js_ = ({
  name: 'FluxPreloader',
  mixins: [BaseComplement],
  props: {
    spinner: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      transitionName: undefined,
      imageCss: {
        zIndex: 13
      }
    };
  },
  computed: {
    displaySpinner: function displaySpinner() {
      return this.spinner && this.vf.Images.preloading;
    }
  },
  watch: {
    'vf.images': function vfImages() {
      var Images = this.Images,
          Transitions = this.Transitions;
      if (Images.last && !Transitions.current) Images.current = Images.last;
    },
    'vf.Images.preloading': function vfImagesPreloading(preloading) {
      var Images = this.Images;
      if (!Images.last || preloading) return;
      if (Images.current === Images.last) this.transitionStart();
    }
  },
  methods: {
    transitionStart: function transitionStart() {
      var Images = this.Images,
          Transitions = this.Transitions;
      if (Transitions.current) Transitions.end(true);
      Transitions.run(undefined, Images.current, Images.imgs[0], 'next');
    }
  }
});
// CONCATENATED MODULE: ./src/components/complements/FluxPreloader.vue?vue&type=script&lang=js&
 /* harmony default export */ var complements_FluxPreloadervue_type_script_lang_js_ = (FluxPreloadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/complements/FluxPreloader.vue?vue&type=style&index=0&lang=scss&
var FluxPreloadervue_type_style_index_0_lang_scss_ = __webpack_require__("1dec");

// CONCATENATED MODULE: ./src/components/complements/FluxPreloader.vue






/* normalize component */

var FluxPreloader_component = normalizeComponent(
  complements_FluxPreloadervue_type_script_lang_js_,
  FluxPreloadervue_type_template_id_7c41e377_render,
  FluxPreloadervue_type_template_id_7c41e377_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FluxPreloader = (FluxPreloader_component.exports);
// CONCATENATED MODULE: ./src/components/index.js
// Components








 // Complements





 // Mixins




// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
//# sourceMappingURL=vue-flux.common.js.map