// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Config = {
  DEBUG: false,
  LIB_VERSION: '1.0.0'
};
var _default = Config;
exports.default = _default;
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigator = exports.document = exports.window = exports.console = exports.userAgent = exports._ = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// since es6 imports are static and we run unit tests from the console, window won't be defined when importing this file
var win;
exports.window = win;

if (typeof window === 'undefined') {
  var loc = {
    hostname: ''
  };
  exports.window = win = {
    navigator: {
      userAgent: ''
    },
    document: {
      location: loc,
      referrer: ''
    },
    screen: {
      width: 0,
      height: 0
    },
    location: loc
  };
} else {
  exports.window = win = window;
}
/*
 * Saved references to long variable names, so that closure compiler can
 * minimize file size.
 */


var ArrayProto = Array.prototype,
    FuncProto = Function.prototype,
    ObjProto = Object.prototype,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty,
    windowConsole = win.console,
    navigator = win.navigator,
    document = win.document,
    windowOpera = win.opera,
    screen = win.screen,
    userAgent = navigator.userAgent;
exports.userAgent = userAgent;
exports.document = document;
exports.navigator = navigator;
var nativeBind = FuncProto.bind,
    nativeForEach = ArrayProto.forEach,
    nativeIndexOf = ArrayProto.indexOf,
    nativeIsArray = Array.isArray,
    breaker = {};
var DOMAIN_MATCH_REGEX = /[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i;
var _ = {
  trim: function trim(str) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
}; // Console override

exports._ = _;
var console = {
  /** @type {function(...*)} */
  log: function log() {
    if (_config.default.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
      try {
        windowConsole.log.apply(windowConsole, arguments);
      } catch (err) {
        _.each(arguments, function (arg) {
          windowConsole.log(arg);
        });
      }
    }
  },

  /** @type {function(...*)} */
  error: function error() {
    if (_config.default.DEBUG && !_.isUndefined(windowConsole) && windowConsole) {
      var args = ['PostHog error:'].concat(_.toArray(arguments));

      try {
        windowConsole.error.apply(windowConsole, args);
      } catch (err) {
        _.each(args, function (arg) {
          windowConsole.error(arg);
        });
      }
    }
  },

  /** @type {function(...*)} */
  critical: function critical() {
    if (!_.isUndefined(windowConsole) && windowConsole) {
      var args = ['PostHog error:'].concat(_.toArray(arguments));

      try {
        windowConsole.error.apply(windowConsole, args);
      } catch (err) {
        _.each(args, function (arg) {
          windowConsole.error(arg);
        });
      }
    }
  }
}; // UNDERSCORE
// Embed part of the Underscore Library

exports.console = console;

_.bind = function (func, context) {
  var args, _bound;

  if (nativeBind && func.bind === nativeBind) {
    return nativeBind.apply(func, slice.call(arguments, 1));
  }

  if (!_.isFunction(func)) {
    throw new TypeError();
  }

  args = slice.call(arguments, 2);

  _bound = function bound() {
    if (!(this instanceof _bound)) {
      return func.apply(context, args.concat(slice.call(arguments)));
    }

    var ctor = {};
    ctor.prototype = func.prototype;
    var self = new ctor();
    ctor.prototype = null;
    var result = func.apply(self, args.concat(slice.call(arguments)));

    if (Object(result) === result) {
      return result;
    }

    return self;
  };

  return _bound;
};

_.bind_instance_methods = function (obj) {
  for (var func in obj) {
    if (typeof obj[func] === 'function') {
      obj[func] = _.bind(obj[func], obj);
    }
  }
};
/**
 * @param {*=} obj
 * @param {function(...*)=} iterator
 * @param {Object=} context
 */


_.each = function (obj, iterator, context) {
  if (obj === null || obj === undefined) {
    return;
  }

  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
        return;
      }
    }
  } else {
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) {
          return;
        }
      }
    }
  }
};

_.escapeHTML = function (s) {
  var escaped = s;

  if (escaped && _.isString(escaped)) {
    escaped = escaped.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  return escaped;
};

_.extend = function (obj) {
  _.each(slice.call(arguments, 1), function (source) {
    for (var prop in source) {
      if (source[prop] !== void 0) {
        obj[prop] = source[prop];
      }
    }
  });

  return obj;
};

_.isArray = nativeIsArray || function (obj) {
  return toString.call(obj) === '[object Array]';
}; // from a comment on http://dbj.org/dbj/?p=286
// fails on only one very rare and deliberate custom object:
// var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};


_.isFunction = function (f) {
  try {
    return /^\s*\bfunction\b/.test(f);
  } catch (x) {
    return false;
  }
};

_.isArguments = function (obj) {
  return !!(obj && hasOwnProperty.call(obj, 'callee'));
};

_.toArray = function (iterable) {
  if (!iterable) {
    return [];
  }

  if (iterable.toArray) {
    return iterable.toArray();
  }

  if (_.isArray(iterable)) {
    return slice.call(iterable);
  }

  if (_.isArguments(iterable)) {
    return slice.call(iterable);
  }

  return _.values(iterable);
};

_.keys = function (obj) {
  var results = [];

  if (obj === null) {
    return results;
  }

  _.each(obj, function (value, key) {
    results[results.length] = key;
  });

  return results;
};

_.values = function (obj) {
  var results = [];

  if (obj === null) {
    return results;
  }

  _.each(obj, function (value) {
    results[results.length] = value;
  });

  return results;
};

_.identity = function (value) {
  return value;
};

_.include = function (obj, target) {
  var found = false;

  if (obj === null) {
    return found;
  }

  if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
    return obj.indexOf(target) != -1;
  }

  _.each(obj, function (value) {
    if (found || (found = value === target)) {
      return breaker;
    }
  });

  return found;
};

_.includes = function (str, needle) {
  return str.indexOf(needle) !== -1;
}; // Underscore Addons


_.inherit = function (subclass, superclass) {
  subclass.prototype = new superclass();
  subclass.prototype.constructor = subclass;
  subclass.superclass = superclass.prototype;
  return subclass;
};

_.isObject = function (obj) {
  return obj === Object(obj) && !_.isArray(obj);
};

_.isEmptyObject = function (obj) {
  if (_.isObject(obj)) {
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        return false;
      }
    }

    return true;
  }

  return false;
};

_.isUndefined = function (obj) {
  return obj === void 0;
};

_.isString = function (obj) {
  return toString.call(obj) == '[object String]';
};

_.isDate = function (obj) {
  return toString.call(obj) == '[object Date]';
};

_.isNumber = function (obj) {
  return toString.call(obj) == '[object Number]';
};

_.isElement = function (obj) {
  return !!(obj && obj.nodeType === 1);
};

_.encodeDates = function (obj) {
  _.each(obj, function (v, k) {
    if (_.isDate(v)) {
      obj[k] = _.formatDate(v);
    } else if (_.isObject(v)) {
      obj[k] = _.encodeDates(v); // recurse
    }
  });

  return obj;
};

_.timestamp = function () {
  Date.now = Date.now || function () {
    return +new Date();
  };

  return Date.now();
};

_.formatDate = function (d) {
  // YYYY-MM-DDTHH:MM:SS in UTC
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
};

_.safewrap = function (f) {
  return function () {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      console.critical('Implementation error. Please turn on debug and contact support@posthog.com.');

      if (_config.default.DEBUG) {
        console.critical(e);
      }
    }
  };
};

_.safewrap_class = function (klass, functions) {
  for (var i = 0; i < functions.length; i++) {
    klass.prototype[functions[i]] = _.safewrap(klass.prototype[functions[i]]);
  }
};

_.safewrap_instance_methods = function (obj) {
  for (var func in obj) {
    if (typeof obj[func] === 'function') {
      obj[func] = _.safewrap(obj[func]);
    }
  }
};

_.strip_empty_properties = function (p) {
  var ret = {};

  _.each(p, function (v, k) {
    if (_.isString(v) && v.length > 0) {
      ret[k] = v;
    }
  });

  return ret;
};
/*
 * this function returns a copy of object after truncating it.  If
 * passed an Array or Object it will iterate through obj and
 * truncate all the values recursively.
 */


_.truncate = function (obj, length) {
  var ret;

  if (typeof obj === 'string') {
    ret = obj.slice(0, length);
  } else if (_.isArray(obj)) {
    ret = [];

    _.each(obj, function (val) {
      ret.push(_.truncate(val, length));
    });
  } else if (_.isObject(obj)) {
    ret = {};

    _.each(obj, function (val, key) {
      ret[key] = _.truncate(val, length);
    });
  } else {
    ret = obj;
  }

  return ret;
};

_.JSONEncode = function () {
  return function (mixed_val) {
    var value = mixed_val;

    var quote = function quote(string) {
      var escapable = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g; // eslint-disable-line no-control-regex

      var meta = {
        // table of character substitutions
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
      };
      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c : "\\u" + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
    };

    var str = function str(key, holder) {
      var gap = '';
      var indent = '    ';
      var i = 0; // The loop counter.

      var k = ''; // The member key.

      var v = ''; // The member value.

      var length = 0;
      var mind = gap;
      var partial = [];
      var value = holder[key]; // If the value has a toJSON method, call it to obtain a replacement value.

      if (value && _typeof(value) === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(key);
      } // What happens next depends on the value's type.


      switch (_typeof(value)) {
        case 'string':
          return quote(value);

        case 'number':
          // JSON numbers must be finite. Encode non-finite numbers as null.
          return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':
          // If the value is a boolean or null, convert it to a string. Note:
          // typeof null does not produce 'null'. The case is included here in
          // the remote chance that this gets fixed someday.
          return String(value);

        case 'object':
          // If the type is 'object', we might be dealing with an object or an array or
          // null.
          // Due to a specification blunder in ECMAScript, typeof null is 'object',
          // so watch out for that case.
          if (!value) {
            return 'null';
          } // Make an array to hold the partial results of stringifying this object value.


          gap += indent;
          partial = []; // Is the value an array?

          if (toString.apply(value) === '[object Array]') {
            // The value is an array. Stringify every element. Use null as a placeholder
            // for non-JSON values.
            length = value.length;

            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || 'null';
            } // Join all of the elements together, separated with commas, and wrap them in
            // brackets.


            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
            gap = mind;
            return v;
          } // Iterate through all of the keys in the object.


          for (k in value) {
            if (hasOwnProperty.call(value, k)) {
              v = str(k, value);

              if (v) {
                partial.push(quote(k) + (gap ? ': ' : ':') + v);
              }
            }
          } // Join all of the member texts together, separated with commas,
          // and wrap them in braces.


          v = partial.length === 0 ? '{}' : gap ? '{' + partial.join(',') + '' + mind + '}' : '{' + partial.join(',') + '}';
          gap = mind;
          return v;
      }
    }; // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.


    return str('', {
      '': value
    });
  };
}();
/**
 * From https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
 * Slightly modified to throw a real Error rather than a POJO
 */


_.JSONDecode = function () {
  var at,
      // The index of the current character
  ch,
      // The current character
  escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    'b': '\b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t'
  },
      text,
      error = function error(m) {
    var e = new SyntaxError(m);
    e.at = at;
    e.text = text;
    throw e;
  },
      next = function next(c) {
    // If a c parameter is provided, verify that it matches the current character.
    if (c && c !== ch) {
      error('Expected \'' + c + '\' instead of \'' + ch + '\'');
    } // Get the next character. When there are no more characters,
    // return the empty string.


    ch = text.charAt(at);
    at += 1;
    return ch;
  },
      number = function number() {
    // Parse a number value.
    var number,
        string = '';

    if (ch === '-') {
      string = '-';
      next('-');
    }

    while (ch >= '0' && ch <= '9') {
      string += ch;
      next();
    }

    if (ch === '.') {
      string += '.';

      while (next() && ch >= '0' && ch <= '9') {
        string += ch;
      }
    }

    if (ch === 'e' || ch === 'E') {
      string += ch;
      next();

      if (ch === '-' || ch === '+') {
        string += ch;
        next();
      }

      while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
    }

    number = +string;

    if (!isFinite(number)) {
      error('Bad number');
    } else {
      return number;
    }
  },
      string = function string() {
    // Parse a string value.
    var hex,
        i,
        string = '',
        uffff; // When parsing for string values, we must look for " and \ characters.

    if (ch === '"') {
      while (next()) {
        if (ch === '"') {
          next();
          return string;
        }

        if (ch === '\\') {
          next();

          if (ch === 'u') {
            uffff = 0;

            for (i = 0; i < 4; i += 1) {
              hex = parseInt(next(), 16);

              if (!isFinite(hex)) {
                break;
              }

              uffff = uffff * 16 + hex;
            }

            string += String.fromCharCode(uffff);
          } else if (typeof escapee[ch] === 'string') {
            string += escapee[ch];
          } else {
            break;
          }
        } else {
          string += ch;
        }
      }
    }

    error('Bad string');
  },
      white = function white() {
    // Skip whitespace.
    while (ch && ch <= ' ') {
      next();
    }
  },
      word = function word() {
    // true, false, or null.
    switch (ch) {
      case 't':
        next('t');
        next('r');
        next('u');
        next('e');
        return true;

      case 'f':
        next('f');
        next('a');
        next('l');
        next('s');
        next('e');
        return false;

      case 'n':
        next('n');
        next('u');
        next('l');
        next('l');
        return null;
    }

    error('Unexpected "' + ch + '"');
  },
      value,
      // Placeholder for the value function.
  array = function array() {
    // Parse an array value.
    var array = [];

    if (ch === '[') {
      next('[');
      white();

      if (ch === ']') {
        next(']');
        return array; // empty array
      }

      while (ch) {
        array.push(value());
        white();

        if (ch === ']') {
          next(']');
          return array;
        }

        next(',');
        white();
      }
    }

    error('Bad array');
  },
      object = function object() {
    // Parse an object value.
    var key,
        object = {};

    if (ch === '{') {
      next('{');
      white();

      if (ch === '}') {
        next('}');
        return object; // empty object
      }

      while (ch) {
        key = string();
        white();
        next(':');

        if (Object.hasOwnProperty.call(object, key)) {
          error('Duplicate key "' + key + '"');
        }

        object[key] = value();
        white();

        if (ch === '}') {
          next('}');
          return object;
        }

        next(',');
        white();
      }
    }

    error('Bad object');
  };

  value = function value() {
    // Parse a JSON value. It could be an object, an array, a string,
    // a number, or a word.
    white();

    switch (ch) {
      case '{':
        return object();

      case '[':
        return array();

      case '"':
        return string();

      case '-':
        return number();

      default:
        return ch >= '0' && ch <= '9' ? number() : word();
    }
  }; // Return the json_parse function. It will have access to all of the
  // above functions and variables.


  return function (source) {
    var result;
    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();

    if (ch) {
      error('Syntax error');
    }

    return result;
  };
}();

_.base64Encode = function (data) {
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1,
      o2,
      o3,
      h1,
      h2,
      h3,
      h4,
      bits,
      i = 0,
      ac = 0,
      enc = '',
      tmp_arr = [];

  if (!data) {
    return data;
  }

  data = _.utf8Encode(data);

  do {
    // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);
    bits = o1 << 16 | o2 << 8 | o3;
    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f; // use hexets to index into b64, and append result to encoded string

    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  switch (data.length % 3) {
    case 1:
      enc = enc.slice(0, -2) + '==';
      break;

    case 2:
      enc = enc.slice(0, -1) + '=';
      break;
  }

  return enc;
};

_.utf8Encode = function (string) {
  string = (string + '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  var utftext = '',
      start,
      end;
  var stringl = 0,
      n;
  start = end = 0;
  stringl = string.length;

  for (n = 0; n < stringl; n++) {
    var c1 = string.charCodeAt(n);
    var enc = null;

    if (c1 < 128) {
      end++;
    } else if (c1 > 127 && c1 < 2048) {
      enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
    } else {
      enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
    }

    if (enc !== null) {
      if (end > start) {
        utftext += string.substring(start, end);
      }

      utftext += enc;
      start = end = n + 1;
    }
  }

  if (end > start) {
    utftext += string.substring(start, string.length);
  }

  return utftext;
};

_.UUID = function () {
  // Time/ticks information
  // 1*new Date() is a cross browser version of Date.now()
  var T = function T() {
    var d = 1 * new Date(),
        i = 0; // this while loop figures how many browser ticks go by
    // before 1*new Date() returns a new number, ie the amount
    // of ticks that go by per millisecond

    while (d == 1 * new Date()) {
      i++;
    }

    return d.toString(16) + i.toString(16);
  }; // Math.Random entropy


  var R = function R() {
    return Math.random().toString(16).replace('.', '');
  }; // User agent entropy
  // This function takes the user agent string, and then xors
  // together each sequence of 8 bytes.  This produces a final
  // sequence of 8 bytes which it returns as hex.


  var UA = function UA() {
    var ua = userAgent,
        i,
        ch,
        buffer = [],
        ret = 0;

    function xor(result, byte_array) {
      var j,
          tmp = 0;

      for (j = 0; j < byte_array.length; j++) {
        tmp |= buffer[j] << j * 8;
      }

      return result ^ tmp;
    }

    for (i = 0; i < ua.length; i++) {
      ch = ua.charCodeAt(i);
      buffer.unshift(ch & 0xFF);

      if (buffer.length >= 4) {
        ret = xor(ret, buffer);
        buffer = [];
      }
    }

    if (buffer.length > 0) {
      ret = xor(ret, buffer);
    }

    return ret.toString(16);
  };

  return function () {
    var se = (screen.height * screen.width).toString(16);
    return T() + '-' + R() + '-' + UA() + '-' + se + '-' + T();
  };
}(); // _.isBlockedUA()
// This is to block various web spiders from executing our JS and
// sending false captureing data


_.isBlockedUA = function (ua) {
  if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(ua)) {
    return true;
  }

  return false;
};
/**
 * @param {Object=} formdata
 * @param {string=} arg_separator
 */


_.HTTPBuildQuery = function (formdata, arg_separator) {
  var use_val,
      use_key,
      tph_arr = [];

  if (_.isUndefined(arg_separator)) {
    arg_separator = '&';
  }

  _.each(formdata, function (val, key) {
    use_val = encodeURIComponent(val.toString());
    use_key = encodeURIComponent(key);
    tph_arr[tph_arr.length] = use_key + '=' + use_val;
  });

  return tph_arr.join(arg_separator);
};

_.getQueryParam = function (url, param) {
  // Expects a raw URL
  param = param.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regexS = '[\\?&]' + param + '=([^&#]*)',
      regex = new RegExp(regexS),
      results = regex.exec(url);

  if (results === null || results && typeof results[1] !== 'string' && results[1].length) {
    return '';
  } else {
    var result = results[1];

    try {
      result = decodeURIComponent(result);
    } catch (err) {
      console.error('Skipping decoding for malformed query param: ' + result);
    }

    return result.replace(/\+/g, ' ');
  }
};

_.getHashParam = function (hash, param) {
  var matches = hash.match(new RegExp(param + '=([^&]*)'));
  return matches ? matches[1] : null;
}; // _.cookie
// Methods partially borrowed from quirksmode.org/js/cookies.html


_.cookie = {
  get: function get(name) {
    try {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
    } catch (err) {}

    return null;
  },
  parse: function parse(name) {
    var cookie;

    try {
      cookie = _.JSONDecode(_.cookie.get(name)) || {};
    } catch (err) {// noop
    }

    return cookie;
  },
  set_seconds: function set_seconds(name, value, seconds, cross_subdomain, is_secure) {
    try {
      var cdomain = '',
          expires = '',
          secure = '';

      if (cross_subdomain) {
        var matches = document.location.hostname.match(DOMAIN_MATCH_REGEX),
            domain = matches ? matches[0] : '';
        cdomain = domain ? '; domain=.' + domain : '';
      }

      if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + seconds * 1000);
        expires = '; expires=' + date.toGMTString();
      }

      if (is_secure) {
        secure = '; secure';
      }

      document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
    } catch (err) {
      return;
    }
  },
  set: function set(name, value, days, cross_subdomain, is_secure) {
    try {
      var cdomain = '',
          expires = '',
          secure = '';

      if (cross_subdomain) {
        var matches = document.location.hostname.match(DOMAIN_MATCH_REGEX),
            domain = matches ? matches[0] : '';
        cdomain = domain ? '; domain=.' + domain : '';
      }

      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toGMTString();
      }

      if (is_secure) {
        secure = '; secure';
      }

      var new_cookie_val = name + '=' + encodeURIComponent(value) + expires + '; path=/' + cdomain + secure;
      document.cookie = new_cookie_val;
      return new_cookie_val;
    } catch (err) {
      return;
    }
  },
  remove: function remove(name, cross_subdomain) {
    try {
      _.cookie.set(name, '', -1, cross_subdomain);
    } catch (err) {
      return;
    }
  }
}; // _.localStorage

var _localStorage_supported = null;
_.localStorage = {
  is_supported: function is_supported() {
    if (_localStorage_supported !== null) {
      return _localStorage_supported;
    }

    var supported = true;

    try {
      var key = '__mplssupport__',
          val = 'xyz';

      _.localStorage.set(key, val);

      if (_.localStorage.get(key) !== val) {
        supported = false;
      }

      _.localStorage.remove(key);
    } catch (err) {
      supported = false;
    }

    if (!supported) {
      console.error('localStorage unsupported; falling back to cookie store');
    }

    _localStorage_supported = supported;
    return supported;
  },
  error: function error(msg) {
    console.error('localStorage error: ' + msg);
  },
  get: function get(name) {
    try {
      return window.localStorage.getItem(name);
    } catch (err) {
      _.localStorage.error(err);
    }

    return null;
  },
  parse: function parse(name) {
    try {
      return _.JSONDecode(_.localStorage.get(name)) || {};
    } catch (err) {// noop
    }

    return null;
  },
  set: function set(name, value) {
    try {
      window.localStorage.setItem(name, value);
    } catch (err) {
      _.localStorage.error(err);
    }
  },
  remove: function remove(name) {
    try {
      window.localStorage.removeItem(name);
    } catch (err) {
      _.localStorage.error(err);
    }
  }
};

_.register_event = function () {
  // written by Dean Edwards, 2005
  // with input from Tino Zijdel - crisp@xs4all.nl
  // with input from Carl Sverre - mail@carlsverre.com
  // with input from PostHog
  // http://dean.edwards.name/weblog/2005/10/add-event/
  // https://gist.github.com/1930440

  /**
   * @param {Object} element
   * @param {string} type
   * @param {function(...*)} handler
   * @param {boolean=} oldSchool
   * @param {boolean=} useCapture
   */
  var register_event = function register_event(element, type, handler, oldSchool, useCapture) {
    if (!element) {
      console.error('No valid element provided to register_event');
      return;
    }

    if (element.addEventListener && !oldSchool) {
      element.addEventListener(type, handler, !!useCapture);
    } else {
      var ontype = 'on' + type;
      var old_handler = element[ontype]; // can be undefined

      element[ontype] = makeHandler(element, handler, old_handler);
    }
  };

  function makeHandler(element, new_handler, old_handlers) {
    var handler = function handler(event) {
      event = event || fixEvent(window.event); // this basically happens in firefox whenever another script
      // overwrites the onload callback and doesn't pass the event
      // object to previously defined callbacks.  All the browsers
      // that don't define window.event implement addEventListener
      // so the dom_loaded handler will still be fired as usual.

      if (!event) {
        return undefined;
      }

      var ret = true;
      var old_result, new_result;

      if (_.isFunction(old_handlers)) {
        old_result = old_handlers(event);
      }

      new_result = new_handler.call(element, event);

      if (false === old_result || false === new_result) {
        ret = false;
      }

      return ret;
    };

    return handler;
  }

  function fixEvent(event) {
    if (event) {
      event.preventDefault = fixEvent.preventDefault;
      event.stopPropagation = fixEvent.stopPropagation;
    }

    return event;
  }

  fixEvent.preventDefault = function () {
    this.returnValue = false;
  };

  fixEvent.stopPropagation = function () {
    this.cancelBubble = true;
  };

  return register_event;
}();

var TOKEN_MATCH_REGEX = new RegExp('^(\\w*)\\[(\\w+)([=~\\|\\^\\$\\*]?)=?"?([^\\]"]*)"?\\]$');

_.dom_query = function () {
  /* document.getElementsBySelector(selector)
  - returns an array of element objects from the current document
  matching the CSS selector. Selectors can contain element names,
  class names and ids and can be nested. For example:
   elements = document.getElementsBySelector('div#main p a.external')
   Will return an array of all 'a' elements with 'external' in their
  class attribute that are contained inside 'p' elements that are
  contained inside the 'div' element which has id="main"
   New in version 0.4: Support for CSS2 and CSS3 attribute selectors:
  See http://www.w3.org/TR/css3-selectors/#attribute-selectors
   Version 0.4 - Simon Willison, March 25th 2003
  -- Works in Phoenix 0.5, Mozilla 1.3, Opera 7, Internet Explorer 6, Internet Explorer 5 on Windows
  -- Opera 7 fails
   Version 0.5 - Carl Sverre, Jan 7th 2013
  -- Now uses jQuery-esque `hasClass` for testing class name
  equality.  This fixes a bug related to '-' characters being
  considered not part of a 'word' in regex.
  */
  function getAllChildren(e) {
    // Returns all children of element. Workaround required for IE5/Windows. Ugh.
    return e.all ? e.all : e.getElementsByTagName('*');
  }

  var bad_whitespace = /[\t\r\n]/g;

  function hasClass(elem, selector) {
    var className = ' ' + selector + ' ';
    return (' ' + elem.className + ' ').replace(bad_whitespace, ' ').indexOf(className) >= 0;
  }

  function getElementsBySelector(selector) {
    // Attempt to fail gracefully in lesser browsers
    if (!document.getElementsByTagName) {
      return [];
    } // Split selector in to tokens


    var tokens = selector.split(' ');
    var token, bits, tagName, found, foundCount, i, j, k, elements, currentContextIndex;
    var currentContext = [document];

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i].replace(/^\s+/, '').replace(/\s+$/, '');

      if (token.indexOf('#') > -1) {
        // Token is an ID selector
        bits = token.split('#');
        tagName = bits[0];
        var id = bits[1];
        var element = document.getElementById(id);

        if (!element || tagName && element.nodeName.toLowerCase() != tagName) {
          // element not found or tag with that ID not found, return false
          return [];
        } // Set currentContext to contain just this element


        currentContext = [element];
        continue; // Skip to next token
      }

      if (token.indexOf('.') > -1) {
        // Token contains a class selector
        bits = token.split('.');
        tagName = bits[0];
        var className = bits[1];

        if (!tagName) {
          tagName = '*';
        } // Get elements matching tag, filter them for class selector


        found = [];
        foundCount = 0;

        for (j = 0; j < currentContext.length; j++) {
          if (tagName == '*') {
            elements = getAllChildren(currentContext[j]);
          } else {
            elements = currentContext[j].getElementsByTagName(tagName);
          }

          for (k = 0; k < elements.length; k++) {
            found[foundCount++] = elements[k];
          }
        }

        currentContext = [];
        currentContextIndex = 0;

        for (j = 0; j < found.length; j++) {
          if (found[j].className && _.isString(found[j].className) && // some SVG elements have classNames which are not strings
          hasClass(found[j], className)) {
            currentContext[currentContextIndex++] = found[j];
          }
        }

        continue; // Skip to next token
      } // Code to deal with attribute selectors


      var token_match = token.match(TOKEN_MATCH_REGEX);

      if (token_match) {
        tagName = token_match[1];
        var attrName = token_match[2];
        var attrOperator = token_match[3];
        var attrValue = token_match[4];

        if (!tagName) {
          tagName = '*';
        } // Grab all of the tagName elements within current context


        found = [];
        foundCount = 0;

        for (j = 0; j < currentContext.length; j++) {
          if (tagName == '*') {
            elements = getAllChildren(currentContext[j]);
          } else {
            elements = currentContext[j].getElementsByTagName(tagName);
          }

          for (k = 0; k < elements.length; k++) {
            found[foundCount++] = elements[k];
          }
        }

        currentContext = [];
        currentContextIndex = 0;
        var checkFunction; // This function will be used to filter the elements

        switch (attrOperator) {
          case '=':
            // Equality
            checkFunction = function checkFunction(e) {
              return e.getAttribute(attrName) == attrValue;
            };

            break;

          case '~':
            // Match one of space seperated words
            checkFunction = function checkFunction(e) {
              return e.getAttribute(attrName).match(new RegExp('\\b' + attrValue + '\\b'));
            };

            break;

          case '|':
            // Match start with value followed by optional hyphen
            checkFunction = function checkFunction(e) {
              return e.getAttribute(attrName).match(new RegExp('^' + attrValue + '-?'));
            };

            break;

          case '^':
            // Match starts with value
            checkFunction = function checkFunction(e) {
              return e.getAttribute(attrName).indexOf(attrValue) === 0;
            };

            break;

          case '$':
            // Match ends with value - fails with "Warning" in Opera 7
            checkFunction = function checkFunction(e) {
              return e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length;
            };

            break;

          case '*':
            // Match ends with value
            checkFunction = function checkFunction(e) {
              return e.getAttribute(attrName).indexOf(attrValue) > -1;
            };

            break;

          default:
            // Just test for existence of attribute
            checkFunction = function checkFunction(e) {
              return e.getAttribute(attrName);
            };

        }

        currentContext = [];
        currentContextIndex = 0;

        for (j = 0; j < found.length; j++) {
          if (checkFunction(found[j])) {
            currentContext[currentContextIndex++] = found[j];
          }
        } // alert('Attribute Selector: '+tagName+' '+attrName+' '+attrOperator+' '+attrValue);


        continue; // Skip to next token
      } // If we get here, token is JUST an element (not a class or ID selector)


      tagName = token;
      found = [];
      foundCount = 0;

      for (j = 0; j < currentContext.length; j++) {
        elements = currentContext[j].getElementsByTagName(tagName);

        for (k = 0; k < elements.length; k++) {
          found[foundCount++] = elements[k];
        }
      }

      currentContext = found;
    }

    return currentContext;
  }

  return function (query) {
    if (_.isElement(query)) {
      return [query];
    } else if (_.isObject(query) && !_.isUndefined(query.length)) {
      return query;
    } else {
      return getElementsBySelector.call(this, query);
    }
  };
}();

_.info = {
  campaignParams: function campaignParams() {
    var campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term'.split(' '),
        kw = '',
        params = {};

    _.each(campaign_keywords, function (kwkey) {
      kw = _.getQueryParam(document.URL, kwkey);

      if (kw.length) {
        params[kwkey] = kw;
      }
    });

    return params;
  },
  searchEngine: function searchEngine(referrer) {
    if (referrer.search('https?://(.*)google.([^/?]*)') === 0) {
      return 'google';
    } else if (referrer.search('https?://(.*)bing.com') === 0) {
      return 'bing';
    } else if (referrer.search('https?://(.*)yahoo.com') === 0) {
      return 'yahoo';
    } else if (referrer.search('https?://(.*)duckduckgo.com') === 0) {
      return 'duckduckgo';
    } else {
      return null;
    }
  },
  searchInfo: function searchInfo(referrer) {
    var search = _.info.searchEngine(referrer),
        param = search != 'yahoo' ? 'q' : 'p',
        ret = {};

    if (search !== null) {
      ret['$search_engine'] = search;

      var keyword = _.getQueryParam(referrer, param);

      if (keyword.length) {
        ret['ph_keyword'] = keyword;
      }
    }

    return ret;
  },

  /**
   * This function detects which browser is running this script.
   * The order of the checks are important since many user agents
   * include key words used in later checks.
   */
  browser: function browser(user_agent, vendor, opera) {
    vendor = vendor || ''; // vendor is undefined for at least IE9

    if (opera || _.includes(user_agent, ' OPR/')) {
      if (_.includes(user_agent, 'Mini')) {
        return 'Opera Mini';
      }

      return 'Opera';
    } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
      return 'BlackBerry';
    } else if (_.includes(user_agent, 'IEMobile') || _.includes(user_agent, 'WPDesktop')) {
      return 'Internet Explorer Mobile';
    } else if (_.includes(user_agent, 'SamsungBrowser/')) {
      // https://developer.samsung.com/internet/user-agent-string-format
      return 'Samsung Internet';
    } else if (_.includes(user_agent, 'Edge') || _.includes(user_agent, 'Edg/')) {
      return 'Microsoft Edge';
    } else if (_.includes(user_agent, 'FBIOS')) {
      return 'Facebook Mobile';
    } else if (_.includes(user_agent, 'Chrome')) {
      return 'Chrome';
    } else if (_.includes(user_agent, 'CriOS')) {
      return 'Chrome iOS';
    } else if (_.includes(user_agent, 'UCWEB') || _.includes(user_agent, 'UCBrowser')) {
      return 'UC Browser';
    } else if (_.includes(user_agent, 'FxiOS')) {
      return 'Firefox iOS';
    } else if (_.includes(vendor, 'Apple')) {
      if (_.includes(user_agent, 'Mobile')) {
        return 'Mobile Safari';
      }

      return 'Safari';
    } else if (_.includes(user_agent, 'Android')) {
      return 'Android Mobile';
    } else if (_.includes(user_agent, 'Konqueror')) {
      return 'Konqueror';
    } else if (_.includes(user_agent, 'Firefox')) {
      return 'Firefox';
    } else if (_.includes(user_agent, 'MSIE') || _.includes(user_agent, 'Trident/')) {
      return 'Internet Explorer';
    } else if (_.includes(user_agent, 'Gecko')) {
      return 'Mozilla';
    } else {
      return '';
    }
  },

  /**
   * This function detects which browser version is running this script,
   * parsing major and minor version (e.g., 42.1). User agent strings from:
   * http://www.useragentstring.com/pages/useragentstring.php
   */
  browserVersion: function browserVersion(userAgent, vendor, opera) {
    var browser = _.info.browser(userAgent, vendor, opera);

    var versionRegexs = {
      'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
      'Microsoft Edge': /Edge?\/(\d+(\.\d+)?)/,
      'Chrome': /Chrome\/(\d+(\.\d+)?)/,
      'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
      'UC Browser': /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
      'Safari': /Version\/(\d+(\.\d+)?)/,
      'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
      'Opera': /(Opera|OPR)\/(\d+(\.\d+)?)/,
      'Firefox': /Firefox\/(\d+(\.\d+)?)/,
      'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
      'Konqueror': /Konqueror:(\d+(\.\d+)?)/,
      'BlackBerry': /BlackBerry (\d+(\.\d+)?)/,
      'Android Mobile': /android\s(\d+(\.\d+)?)/,
      'Samsung Internet': /SamsungBrowser\/(\d+(\.\d+)?)/,
      'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
      'Mozilla': /rv:(\d+(\.\d+)?)/
    };
    var regex = versionRegexs[browser];

    if (regex === undefined) {
      return null;
    }

    var matches = userAgent.match(regex);

    if (!matches) {
      return null;
    }

    return parseFloat(matches[matches.length - 2]);
  },
  os: function os() {
    var a = userAgent;

    if (/Windows/i.test(a)) {
      if (/Phone/.test(a) || /WPDesktop/.test(a)) {
        return 'Windows Phone';
      }

      return 'Windows';
    } else if (/(iPhone|iPad|iPod)/.test(a)) {
      return 'iOS';
    } else if (/Android/.test(a)) {
      return 'Android';
    } else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
      return 'BlackBerry';
    } else if (/Mac/i.test(a)) {
      return 'Mac OS X';
    } else if (/Linux/.test(a)) {
      return 'Linux';
    } else if (/CrOS/.test(a)) {
      return 'Chrome OS';
    } else {
      return '';
    }
  },
  device: function device(user_agent) {
    if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
      return 'Windows Phone';
    } else if (/iPad/.test(user_agent)) {
      return 'iPad';
    } else if (/iPod/.test(user_agent)) {
      return 'iPod Touch';
    } else if (/iPhone/.test(user_agent)) {
      return 'iPhone';
    } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
      return 'BlackBerry';
    } else if (/Android/.test(user_agent)) {
      return 'Android';
    } else {
      return '';
    }
  },
  referringDomain: function referringDomain(referrer) {
    var split = referrer.split('/');

    if (split.length >= 3) {
      return split[2];
    }

    return '';
  },
  properties: function properties() {
    return _.extend(_.strip_empty_properties({
      '$os': _.info.os(),
      '$browser': _.info.browser(userAgent, navigator.vendor, windowOpera),
      '$referrer': document.referrer,
      '$referring_domain': _.info.referringDomain(document.referrer),
      '$device': _.info.device(userAgent)
    }), {
      '$current_url': win.location.href,
      '$browser_version': _.info.browserVersion(userAgent, navigator.vendor, windowOpera),
      '$screen_height': screen.height,
      '$screen_width': screen.width,
      '$lib': 'web',
      '$lib_version': _config.default.LIB_VERSION,
      '$insert_id': Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
      '$time': _.timestamp() / 1000 // epoch time in seconds

    });
  },
  people_properties: function people_properties() {
    return _.extend(_.strip_empty_properties({
      '$os': _.info.os(),
      '$browser': _.info.browser(userAgent, navigator.vendor, windowOpera)
    }), {
      '$browser_version': _.info.browserVersion(userAgent, navigator.vendor, windowOpera)
    });
  }
}; // EXPORTS (for closure compiler)

_['toArray'] = _.toArray;
_['isObject'] = _.isObject;
_['JSONEncode'] = _.JSONEncode;
_['JSONDecode'] = _.JSONDecode;
_['isBlockedUA'] = _.isBlockedUA;
_['isEmptyObject'] = _.isEmptyObject;
_['info'] = _.info;
_['info']['device'] = _.info.device;
_['info']['browser'] = _.info.browser;
_['info']['browserVersion'] = _.info.browserVersion;
_['info']['properties'] = _.info.properties;
},{"./config":"config.js"}],"autocapture-utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassName = getClassName;
exports.getSafeText = getSafeText;
exports.isElementNode = isElementNode;
exports.isTag = isTag;
exports.isTextNode = isTextNode;
exports.shouldCaptureDomEvent = shouldCaptureDomEvent;
exports.shouldCaptureElement = shouldCaptureElement;
exports.shouldCaptureValue = shouldCaptureValue;
exports.usefulElements = void 0;

var _utils = require("./utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 * Get the className of an element, accounting for edge cases where element.className is an object
 * @param {Element} el - element to get the className of
 * @returns {string} the element's class
 */
function getClassName(el) {
  switch (_typeof(el.className)) {
    case 'string':
      return el.className;

    case 'object':
      // handle cases where className might be SVGAnimatedString or some other type
      return el.className.baseVal || el.getAttribute('class') || '';

    default:
      // future proof
      return '';
  }
}
/*
 * Get the direct text content of an element, protecting against sensitive data collection.
 * Concats textContent of each of the element's text node children; this avoids potential
 * collection of sensitive data that could happen if we used element.textContent and the
 * element had sensitive child elements, since element.textContent includes child content.
 * Scrubs values that look like they could be sensitive (i.e. cc or ssn number).
 * @param {Element} el - element to get the text of
 * @returns {string} the element's direct text content
 */


function getSafeText(el) {
  var elText = '';

  if (shouldCaptureElement(el) && el.childNodes && el.childNodes.length) {
    _utils._.each(el.childNodes, function (child) {
      if (isTextNode(child) && child.textContent) {
        elText += _utils._.trim(child.textContent) // scrub potentially sensitive values
        .split(/(\s+)/).filter(shouldCaptureValue).join('') // normalize whitespace
        .replace(/[\r\n]/g, ' ').replace(/[ ]+/g, ' ') // truncate
        .substring(0, 255);
      }
    });
  }

  return _utils._.trim(elText);
}
/*
 * Check whether an element has nodeType Node.ELEMENT_NODE
 * @param {Element} el - element to check
 * @returns {boolean} whether el is of the correct nodeType
 */


function isElementNode(el) {
  return el && el.nodeType === 1; // Node.ELEMENT_NODE - use integer constant for browser portability
}
/*
 * Check whether an element is of a given tag type.
 * Due to potential reference discrepancies (such as the webcomponents.js polyfill),
 * we want to match tagNames instead of specific references because something like
 * element === document.body won't always work because element might not be a native
 * element.
 * @param {Element} el - element to check
 * @param {string} tag - tag name (e.g., "div")
 * @returns {boolean} whether el is of the given tag type
 */


function isTag(el, tag) {
  return el && el.tagName && el.tagName.toLowerCase() === tag.toLowerCase();
}
/*
 * Check whether an element has nodeType Node.TEXT_NODE
 * @param {Element} el - element to check
 * @returns {boolean} whether el is of the correct nodeType
 */


function isTextNode(el) {
  return el && el.nodeType === 3; // Node.TEXT_NODE - use integer constant for browser portability
}

var usefulElements = ['a', 'button', 'form', 'input', 'select', 'textarea', 'label'];
/*
 * Check whether a DOM event should be "captureed" or if it may contain sentitive data
 * using a variety of heuristics.
 * @param {Element} el - element to check
 * @param {Event} event - event to check
 * @returns {boolean} whether the event should be captureed
 */

exports.usefulElements = usefulElements;

function shouldCaptureDomEvent(el, event) {
  if (!el || isTag(el, 'html') || !isElementNode(el)) {
    return false;
  }

  var parentIsUsefulElement = false;
  var targetElementList = [el];
  var curEl = el;

  while (curEl.parentNode && !isTag(curEl, 'body')) {
    if (usefulElements.indexOf(curEl.parentNode.tagName.toLowerCase()) > -1) parentIsUsefulElement = true;
    targetElementList.push(curEl.parentNode);
    curEl = curEl.parentNode;
  }

  var tag = el.tagName.toLowerCase();

  switch (tag) {
    case 'html':
      return false;

    case 'form':
      return event.type === 'submit';

    case 'input':
      return event.type === 'change' || event.type === 'click';

    case 'select':
    case 'textarea':
      return event.type === 'change' || event.type === 'click';

    default:
      if (parentIsUsefulElement) return event.type == 'click';
      return event.type === 'click' && (usefulElements.indexOf(tag) > -1 || el.getAttribute('contenteditable') === 'true');
  }
}
/*
 * Check whether a DOM element should be "captureed" or if it may contain sentitive data
 * using a variety of heuristics.
 * @param {Element} el - element to check
 * @returns {boolean} whether the element should be captureed
 */


function shouldCaptureElement(el) {
  for (var curEl = el; curEl.parentNode && !isTag(curEl, 'body'); curEl = curEl.parentNode) {
    var classes = getClassName(curEl).split(' ');

    if (_utils._.includes(classes, 'ph-sensitive') || _utils._.includes(classes, 'ph-no-capture')) {
      return false;
    }
  }

  if (_utils._.includes(getClassName(el).split(' '), 'ph-include')) {
    return true;
  } // don't send data from inputs or similar elements since there will always be
  // a risk of clientside javascript placing sensitive data in attributes


  if (isTag(el, 'input') && el.type != 'button' || isTag(el, 'select') || isTag(el, 'textarea') || el.getAttribute('contenteditable') === 'true') {
    return false;
  } // don't include hidden or password fields


  var type = el.type || '';

  if (typeof type === 'string') {
    // it's possible for el.type to be a DOM element if el is a form with a child input[name="type"]
    switch (type.toLowerCase()) {
      case 'hidden':
        return false;

      case 'password':
        return false;
    }
  } // filter out data from fields that look like sensitive fields


  var name = el.name || el.id || '';

  if (typeof name === 'string') {
    // it's possible for el.name or el.id to be a DOM element if el is a form with a child input[name="name"]
    var sensitiveNameRegex = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i;

    if (sensitiveNameRegex.test(name.replace(/[^a-zA-Z0-9]/g, ''))) {
      return false;
    }
  }

  return true;
}
/*
 * Check whether a string value should be "captureed" or if it may contain sentitive data
 * using a variety of heuristics.
 * @param {string} value - string value to check
 * @returns {boolean} whether the element should be captureed
 */


function shouldCaptureValue(value) {
  if (value === null || _utils._.isUndefined(value)) {
    return false;
  }

  if (typeof value === 'string') {
    value = _utils._.trim(value); // check to see if input value looks like a credit card number
    // see: https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s20.html

    var ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;

    if (ccRegex.test((value || '').replace(/[- ]/g, ''))) {
      return false;
    } // check to see if input value looks like a social security number


    var ssnRegex = /(^\d{3}-?\d{2}-?\d{4}$)/;

    if (ssnRegex.test(value)) {
      return false;
    }
  }

  return true;
}
},{"./utils":"utils.js"}],"autocapture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autocapture = void 0;

var _utils = require("./utils");

var _autocaptureUtils = require("./autocapture-utils");

var autocapture = {
  _initializedTokens: [],
  _previousElementSibling: function _previousElementSibling(el) {
    if (el.previousElementSibling) {
      return el.previousElementSibling;
    } else {
      do {
        el = el.previousSibling;
      } while (el && !(0, _autocaptureUtils.isElementNode)(el));

      return el;
    }
  },
  _loadScript: function _loadScript(scriptUrlToLoad, callback) {
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = scriptUrlToLoad;
    scriptTag.onload = callback;
    var scripts = document.getElementsByTagName('script');

    if (scripts.length > 0) {
      scripts[0].parentNode.insertBefore(scriptTag, scripts[0]);
    } else {
      document.body.appendChild(scriptTag);
    }
  },
  _getPropertiesFromElement: function _getPropertiesFromElement(elem) {
    var tag_name = elem.tagName.toLowerCase();
    var props = {
      'tag_name': tag_name
    };
    if (_autocaptureUtils.usefulElements.indexOf(tag_name) > -1) props['$el_text'] = (0, _autocaptureUtils.getSafeText)(elem);
    var classes = (0, _autocaptureUtils.getClassName)(elem);
    if (classes.length > 0) props['classes'] = classes.split(' ');

    if ((0, _autocaptureUtils.shouldCaptureElement)(elem)) {
      _utils._.each(elem.attributes, function (attr) {
        if ((0, _autocaptureUtils.shouldCaptureValue)(attr.value)) {
          props['attr__' + attr.name] = attr.value;
        }
      });
    }

    var nthChild = 1;
    var nthOfType = 1;
    var currentElem = elem;

    while (currentElem = this._previousElementSibling(currentElem)) {
      // eslint-disable-line no-cond-assign
      nthChild++;

      if (currentElem.tagName === elem.tagName) {
        nthOfType++;
      }
    }

    props['nth_child'] = nthChild;
    props['nth_of_type'] = nthOfType;
    return props;
  },
  _getDefaultProperties: function _getDefaultProperties(eventType) {
    return {
      '$event_type': eventType,
      '$ce_version': 1,
      '$host': window.location.host,
      '$pathname': window.location.pathname
    };
  },
  _extractCustomPropertyValue: function _extractCustomPropertyValue(customProperty) {
    var propValues = [];

    _utils._.each(document.querySelectorAll(customProperty['css_selector']), function (matchedElem) {
      var value;

      if (['input', 'select'].indexOf(matchedElem.tagName.toLowerCase()) > -1) {
        value = matchedElem['value'];
      } else if (matchedElem['textContent']) {
        value = matchedElem['textContent'];
      }

      if ((0, _autocaptureUtils.shouldCaptureValue)(value)) {
        propValues.push(value);
      }
    });

    return propValues.join(', ');
  },
  _getCustomProperties: function _getCustomProperties(targetElementList) {
    var props = {};

    _utils._.each(this._customProperties, function (customProperty) {
      _utils._.each(customProperty['event_selectors'], function (eventSelector) {
        var eventElements = document.querySelectorAll(eventSelector);

        _utils._.each(eventElements, function (eventElement) {
          if (_utils._.includes(targetElementList, eventElement) && (0, _autocaptureUtils.shouldCaptureElement)(eventElement)) {
            props[customProperty['name']] = this._extractCustomPropertyValue(customProperty);
          }
        }, this);
      }, this);
    }, this);

    return props;
  },
  _getEventTarget: function _getEventTarget(e) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
    if (typeof e.target === 'undefined') {
      return e.srcElement;
    } else {
      return e.target;
    }
  },
  _captureEvent: function _captureEvent(e, instance) {
    /*** Don't mess with this code without running IE8 tests on it ***/
    var target = this._getEventTarget(e);

    if ((0, _autocaptureUtils.isTextNode)(target)) {
      // defeat Safari bug (see: http://www.quirksmode.org/js/events_properties.html)
      target = target.parentNode;
    }

    if ((0, _autocaptureUtils.shouldCaptureDomEvent)(target, e)) {
      var targetElementList = [target];
      var curEl = target;

      while (curEl.parentNode && !(0, _autocaptureUtils.isTag)(curEl, 'body')) {
        targetElementList.push(curEl.parentNode);
        curEl = curEl.parentNode;
      }

      var elementsJson = [];
      var href,
          explicitNoCapture = false;

      _utils._.each(targetElementList, function (el) {
        var shouldCaptureEl = (0, _autocaptureUtils.shouldCaptureElement)(el); // if the element or a parent element is an anchor tag
        // include the href as a property

        if (el.tagName.toLowerCase() === 'a') {
          href = el.getAttribute('href');
          href = shouldCaptureEl && (0, _autocaptureUtils.shouldCaptureValue)(href) && href;
        } // allow users to programatically prevent captureing of elements by adding class 'ph-no-capture'


        var classes = (0, _autocaptureUtils.getClassName)(el).split(' ');

        if (_utils._.includes(classes, 'ph-no-capture')) {
          explicitNoCapture = true;
        }

        elementsJson.push(this._getPropertiesFromElement(el));
      }, this);

      elementsJson[0]['$el_text'] = (0, _autocaptureUtils.getSafeText)(target);

      if (explicitNoCapture) {
        return false;
      } // only populate text content from target element (not parents)
      // to prevent text within a sensitive element from being collected
      // as part of a parent's el.textContent


      var elementText;
      var safeElementText = (0, _autocaptureUtils.getSafeText)(target);

      if (safeElementText && safeElementText.length) {
        elementText = safeElementText;
      }

      var props = _utils._.extend(this._getDefaultProperties(e.type), {
        '$elements': elementsJson
      }, this._getCustomProperties(targetElementList));

      instance.capture('$autocapture', props);
      return true;
    }
  },
  // only reason is to stub for unit tests
  // since you can't override window.location props
  _navigate: function _navigate(href) {
    window.location.href = href;
  },
  _addDomEventHandlers: function _addDomEventHandlers(instance) {
    var handler = _utils._.bind(function (e) {
      e = e || window.event;

      this._captureEvent(e, instance);
    }, this);

    _utils._.register_event(document, 'submit', handler, false, true);

    _utils._.register_event(document, 'change', handler, false, true);

    _utils._.register_event(document, 'click', handler, false, true);
  },
  _customProperties: {},
  init: function init(instance) {
    if (!(document && document.body)) {
      console.log('document not ready yet, trying again in 500 milliseconds...');
      var that = this;
      setTimeout(function () {
        that.init(instance);
      }, 500);
      return;
    }

    var token = instance.get_config('token');

    if (this._initializedTokens.indexOf(token) > -1) {
      console.log('autocapture already initialized for token "' + token + '"');
      return;
    }

    this._initializedTokens.push(token);

    if (!this._maybeLoadEditor(instance)) {
      // don't autocapture actions when the editor is enabled
      var parseDecideResponse = _utils._.bind(function (response) {
        if (response && response['config'] && response['config']['enable_collect_everything'] === true) {
          if (response['custom_properties']) {
            this._customProperties = response['custom_properties'];
          }

          this._addDomEventHandlers(instance);
        } else {
          instance['__autocapture_enabled'] = false;
        }
      }, this);

      instance._send_request(instance.get_config('api_host') + '/decide/', {
        'verbose': true,
        'version': '1',
        'lib': 'web',
        'token': token
      }, {
        method: 'GET'
      }, instance._prepare_callback(parseDecideResponse));
    }
  },
  _editorParamsFromHash: function _editorParamsFromHash(instance, hash) {
    var editorParams;

    try {
      var state = _utils._.getHashParam(hash, 'state');

      state = JSON.parse(decodeURIComponent(state));

      var expiresInSeconds = _utils._.getHashParam(hash, 'expires_in');

      editorParams = {
        'accessToken': _utils._.getHashParam(hash, 'access_token'),
        'accessTokenExpiresAt': new Date().getTime() + Number(expiresInSeconds) * 1000,
        'actionId': state['actionId'],
        'projectToken': state['token'],
        'apiURL': state['apiURL'],
        'temporaryToken': state['temporaryToken']
      };
      window.sessionStorage.setItem('editorParams', JSON.stringify(editorParams));
      window.sessionStorage.setItem('editorActionId', editorParams['actionId']);

      if (state['desiredHash']) {
        window.location.hash = state['desiredHash'];
      } else if (window.history) {
        history.replaceState('', document.title, window.location.pathname + window.location.search); // completely remove hash
      } else {
        window.location.hash = ''; // clear hash (but leaves # unfortunately)
      }
    } catch (e) {
      console.error('Unable to parse data from hash', e);
    }

    return editorParams;
  },

  /**
   * To load the visual editor, we need an access token and other state. That state comes from one of three places:
   * 1. In the URL hash params if the customer is using an old snippet
   * 2. From session storage under the key `_mpcehash` if the snippet already parsed the hash
   * 3. From session storage under the key `editorParams` if the editor was initialized on a previous page
   */
  _maybeLoadEditor: function _maybeLoadEditor(instance) {
    try {
      var parseFromUrl = false;

      if (_utils._.getHashParam(window.location.hash, 'state')) {
        var state = _utils._.getHashParam(window.location.hash, 'state');

        state = JSON.parse(decodeURIComponent(state));
        parseFromUrl = state['action'] === 'mpeditor';
      }

      var parseFromStorage = !!window.sessionStorage.getItem('_mpcehash');
      var editorParams;

      if (parseFromUrl) {
        // happens if they are initializing the editor using an old snippet
        editorParams = this._editorParamsFromHash(instance, window.location.hash);
      } else if (parseFromStorage) {
        // happens if they are initialized the editor and using the new snippet
        editorParams = this._editorParamsFromHash(instance, window.sessionStorage.getItem('_mpcehash'));
        window.sessionStorage.removeItem('_mpcehash');
      } else {
        // get credentials from sessionStorage from a previous initialzation
        editorParams = JSON.parse(window.sessionStorage.getItem('editorParams') || '{}');
      }

      if (editorParams['projectToken'] && instance.get_config('token') === editorParams['projectToken']) {
        this._loadEditor(instance, editorParams);

        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  },
  _loadEditor: function _loadEditor(instance, editorParams) {
    if (!window['_mpEditorLoaded']) {
      // only load the codeless event editor once, even if there are multiple instances of PostHogLib
      window['_mpEditorLoaded'] = true;
      var editorUrl = instance.get_config('api_host') + '/static/editor.js?_ts=' + new Date().getTime();

      this._loadScript(editorUrl, function () {
        window['ph_load_editor'](editorParams);
      });

      return true;
    }

    return false;
  },
  // this is a mechanism to ramp up CE with no server-side interaction.
  // when CE is active, every page load results in a decide request. we
  // need to gently ramp this up so we don't overload decide. this decides
  // deterministically if CE is enabled for this project by modding the char
  // value of the project token.
  enabledForProject: function enabledForProject(token, numBuckets, numEnabledBuckets) {
    numBuckets = !_utils._.isUndefined(numBuckets) ? numBuckets : 10;
    numEnabledBuckets = !_utils._.isUndefined(numEnabledBuckets) ? numEnabledBuckets : 10;
    var charCodeSum = 0;

    for (var i = 0; i < token.length; i++) {
      charCodeSum += token.charCodeAt(i);
    }

    return charCodeSum % numBuckets < numEnabledBuckets;
  },
  isBrowserSupported: function isBrowserSupported() {
    return _utils._.isFunction(document.querySelectorAll);
  }
};
exports.autocapture = autocapture;

_utils._.bind_instance_methods(autocapture);

_utils._.safewrap_instance_methods(autocapture);
},{"./utils":"utils.js","./autocapture-utils":"autocapture-utils.js"}],"dom-capture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkCapture = exports.FormCapture = void 0;

var _utils = require("./utils");

/* eslint camelcase: "off" */

/**
 * DomCapture Object
 * @constructor
 */
var DomCapture = function DomCapture() {}; // interface


DomCapture.prototype.create_properties = function () {};

DomCapture.prototype.event_handler = function () {};

DomCapture.prototype.after_capture_handler = function () {};

DomCapture.prototype.init = function (posthog_instance) {
  this.mp = posthog_instance;
  return this;
};
/**
 * @param {Object|string} query
 * @param {string} event_name
 * @param {Object=} properties
 * @param {function=} user_callback
 */


DomCapture.prototype.capture = function (query, event_name, properties, user_callback) {
  var that = this;

  var elements = _utils._.dom_query(query);

  if (elements.length === 0) {
    _utils.console.error('The DOM query (' + query + ') returned 0 elements');

    return;
  }

  _utils._.each(elements, function (element) {
    _utils._.register_event(element, this.override_event, function (e) {
      var options = {};
      var props = that.create_properties(properties, this);
      var timeout = that.mp.get_config('capture_links_timeout');
      that.event_handler(e, this, options); // in case the posthog servers don't get back to us in time

      window.setTimeout(that.capture_callback(user_callback, props, options, true), timeout); // fire the captureing event

      that.mp.capture(event_name, props, that.capture_callback(user_callback, props, options));
    });
  }, this);

  return true;
};
/**
 * @param {function} user_callback
 * @param {Object} props
 * @param {boolean=} timeout_occured
 */


DomCapture.prototype.capture_callback = function (user_callback, props, options, timeout_occured) {
  timeout_occured = timeout_occured || false;
  var that = this;
  return function () {
    // options is referenced from both callbacks, so we can have
    // a 'lock' of sorts to ensure only one fires
    if (options.callback_fired) {
      return;
    }

    options.callback_fired = true;

    if (user_callback && user_callback(timeout_occured, props) === false) {
      // user can prevent the default functionality by
      // returning false from their callback
      return;
    }

    that.after_capture_handler(props, options, timeout_occured);
  };
};

DomCapture.prototype.create_properties = function (properties, element) {
  var props;

  if (typeof properties === 'function') {
    props = properties(element);
  } else {
    props = _utils._.extend({}, properties);
  }

  return props;
};
/**
 * LinkCapture Object
 * @constructor
 * @extends DomCapture
 */


var LinkCapture = function LinkCapture() {
  this.override_event = 'click';
};

exports.LinkCapture = LinkCapture;

_utils._.inherit(LinkCapture, DomCapture);

LinkCapture.prototype.create_properties = function (properties, element) {
  var props = LinkCapture.superclass.create_properties.apply(this, arguments);

  if (element.href) {
    props['url'] = element.href;
  }

  return props;
};

LinkCapture.prototype.event_handler = function (evt, element, options) {
  options.new_tab = evt.which === 2 || evt.metaKey || evt.ctrlKey || element.target === '_blank';
  options.href = element.href;

  if (!options.new_tab) {
    evt.preventDefault();
  }
};

LinkCapture.prototype.after_capture_handler = function (props, options) {
  if (options.new_tab) {
    return;
  }

  setTimeout(function () {
    window.location = options.href;
  }, 0);
};
/**
 * FormCapture Object
 * @constructor
 * @extends DomCapture
 */


var FormCapture = function FormCapture() {
  this.override_event = 'submit';
};

exports.FormCapture = FormCapture;

_utils._.inherit(FormCapture, DomCapture);

FormCapture.prototype.event_handler = function (evt, element, options) {
  options.element = element;
  evt.preventDefault();
};

FormCapture.prototype.after_capture_handler = function (props, options) {
  setTimeout(function () {
    options.element.submit();
  }, 0);
};
},{"./utils":"utils.js"}],"gdpr-utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optIn = optIn;
exports.optOut = optOut;
exports.hasOptedIn = hasOptedIn;
exports.hasOptedOut = hasOptedOut;
exports.addOptOutCheckPostHogLib = addOptOutCheckPostHogLib;
exports.addOptOutCheckPostHogPeople = addOptOutCheckPostHogPeople;
exports.addOptOutCheckPostHogGroup = addOptOutCheckPostHogGroup;
exports.clearOptInOut = clearOptInOut;

var _utils = require("./utils");

/**
 * GDPR utils
 *
 * The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection
 * and privacy for all individuals within the European Union. It addresses the export of personal
 * data outside the EU. The GDPR aims primarily to give control back to citizens and residents
 * over their personal data and to simplify the regulatory environment for international business
 * by unifying the regulation within the EU.
 *
 * This set of utilities is intended to enable opt in/out functionality in the PostHog JS SDK.
 * These functions are used internally by the SDK and are not intended to be publicly exposed.
 */

/**
 * A function used to capture a PostHog event (e.g. PostHogLib.capture)
 * @callback captureFunction
 * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
 * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
 * @param {Function} [callback] If provided, the callback function will be called after captureing the event.
 */

/** Public **/
var GDPR_DEFAULT_PERSISTENCE_PREFIX = '__ph_opt_in_out_';
/**
 * Opt the user in to data captureing and cookies/localstorage for the given token
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {captureFunction} [options.capture] - function used for captureing a PostHog event to record the opt-in action
 * @param {string} [options.captureEventName] - event name to be used for captureing the opt-in action
 * @param {Object} [options.captureProperties] - set of properties to be captureed along with the opt-in action
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */

function optIn(token, options) {
  _optInOut(true, token, options);
}
/**
 * Opt the user out of data captureing and cookies/localstorage for the given token
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-out cookie expires
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-out cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-out cookie is set as secure or not
 */


function optOut(token, options) {
  _optInOut(false, token, options);
}
/**
 * Check whether the user has opted in to data captureing and cookies/localstorage for the given token
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} whether the user has opted in to the given opt type
 */


function hasOptedIn(token, options) {
  return _getStorageValue(token, options) === '1';
}
/**
 * Check whether the user has opted out of data captureing and cookies/localstorage for the given token
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} whether the user has opted out of the given opt type
 */


function hasOptedOut(token, options) {
  if (_hasDoNotCaptureFlagOn(options)) {
    return true;
  }

  return _getStorageValue(token, options) === '0';
}
/**
 * Wrap a PostHogLib method with a check for whether the user is opted out of data captureing and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */


function addOptOutCheckPostHogLib(method) {
  return _addOptOutCheck(method, function (name) {
    return this.get_config(name);
  });
}
/**
 * Wrap a PostHogPeople method with a check for whether the user is opted out of data captureing and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */


function addOptOutCheckPostHogPeople(method) {
  return _addOptOutCheck(method, function (name) {
    return this._get_config(name);
  });
}
/**
 * Wrap a PostHogGroup method with a check for whether the user is opted out of data captureing and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */


function addOptOutCheckPostHogGroup(method) {
  return _addOptOutCheck(method, function (name) {
    return this._get_config(name);
  });
}
/**
 * Clear the user's opt in/out status of data captureing and cookies/localstorage for the given token
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */


function clearOptInOut(token, options) {
  options = options || {};

  _getStorage(options).remove(_getStorageKey(token, options), !!options.crossSubdomainCookie);
}
/** Private **/

/**
 * Get storage util
 * @param {Object} [options]
 * @param {string} [options.persistenceType]
 * @returns {object} either _.cookie or _.localstorage
 */


function _getStorage(options) {
  options = options || {};
  return options.persistenceType === 'localStorage' ? _utils._.localStorage : _utils._.cookie;
}
/**
 * Get the name of the cookie that is used for the given opt type (captureing, cookie, etc.)
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the name of the cookie for the given opt type
 */


function _getStorageKey(token, options) {
  options = options || {};
  return (options.persistencePrefix || GDPR_DEFAULT_PERSISTENCE_PREFIX) + token;
}
/**
 * Get the value of the cookie that is used for the given opt type (captureing, cookie, etc.)
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the value of the cookie for the given opt type
 */


function _getStorageValue(token, options) {
  return _getStorage(options).get(_getStorageKey(token, options));
}
/**
 * Check whether the user has set the DNT/doNotCapture setting to true in their browser
 * @param {Object} [options]
 * @param {string} [options.window] - alternate window object to check; used to force various DNT settings in browser tests
 * @returns {boolean} whether the DNT setting is true
 */


function _hasDoNotCaptureFlagOn(options) {
  var win = options && options.window || _utils.window;
  var nav = win['navigator'] || {};
  var hasDntOn = false;

  _utils._.each([nav['doNotCapture'], // standard
  nav['msDoNotCapture'], win['doNotCapture']], function (dntValue) {
    if (_utils._.includes([true, 1, '1', 'yes'], dntValue)) {
      hasDntOn = true;
    }
  });

  return hasDntOn;
}
/**
 * Set cookie/localstorage for the user indicating that they are opted in or out for the given opt type
 * @param {boolean} optValue - whether to opt the user in or out for the given opt type
 * @param {string} token - PostHog project captureing token
 * @param {Object} [options]
 * @param {captureFunction} [options.capture] - function used for captureing a PostHog event to record the opt-in action
 * @param {string} [options.captureEventName] - event name to be used for captureing the opt-in action
 * @param {Object} [options.captureProperties] - set of properties to be captureed along with the opt-in action
 * @param {string} [options.persistencePrefix=__ph_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */


function _optInOut(optValue, token, options) {
  if (!_utils._.isString(token) || !token.length) {
    console.error('gdpr.' + (optValue ? 'optIn' : 'optOut') + ' called with an invalid token');
    return;
  }

  options = options || {};

  _getStorage(options).set(_getStorageKey(token, options), optValue ? 1 : 0, _utils._.isNumber(options.cookieExpiration) ? options.cookieExpiration : null, !!options.crossSubdomainCookie, !!options.secureCookie);

  if (options.capture && optValue) {
    // only capture event if opting in (optValue=true)
    options.capture(options.captureEventName || '$opt_in', options.captureProperties);
  }
}
/**
 * Wrap a method with a check for whether the user is opted out of data captureing and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @param {function} getConfigValue - getter function for the PostHog API token and other options to be used with opt-out check
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */


function _addOptOutCheck(method, getConfigValue) {
  return function () {
    var optedOut = false;

    try {
      var token = getConfigValue.call(this, 'token');
      var persistenceType = getConfigValue.call(this, 'opt_out_captureing_persistence_type');
      var persistencePrefix = getConfigValue.call(this, 'opt_out_captureing_cookie_prefix');
      var win = getConfigValue.call(this, 'window'); // used to override window during browser tests

      if (token) {
        // if there was an issue getting the token, continue method execution as normal
        optedOut = hasOptedOut(token, {
          persistenceType: persistenceType,
          persistencePrefix: persistencePrefix,
          window: win
        });
      }
    } catch (err) {
      console.error('Unexpected error when checking captureing opt-out status: ' + err);
    }

    if (!optedOut) {
      return method.apply(this, arguments);
    }

    var callback = arguments[arguments.length - 1];

    if (typeof callback === 'function') {
      callback(0);
    }

    return;
  };
}
},{"./utils":"utils.js"}],"api-actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiActions = exports.DELETE_ACTION = exports.REMOVE_ACTION = exports.UNION_ACTION = exports.APPEND_ACTION = exports.ADD_ACTION = exports.UNSET_ACTION = exports.SET_ONCE_ACTION = exports.SET_ACTION = void 0;

var _utils = require("./utils");

/* eslint camelcase: "off" */

/** @const */
var SET_ACTION = '$set';
/** @const */

exports.SET_ACTION = SET_ACTION;
var SET_ONCE_ACTION = '$set_once';
/** @const */

exports.SET_ONCE_ACTION = SET_ONCE_ACTION;
var UNSET_ACTION = '$unset';
/** @const */

exports.UNSET_ACTION = UNSET_ACTION;
var ADD_ACTION = '$add';
/** @const */

exports.ADD_ACTION = ADD_ACTION;
var APPEND_ACTION = '$append';
/** @const */

exports.APPEND_ACTION = APPEND_ACTION;
var UNION_ACTION = '$union';
/** @const */

exports.UNION_ACTION = UNION_ACTION;
var REMOVE_ACTION = '$remove';
/** @const */

exports.REMOVE_ACTION = REMOVE_ACTION;
var DELETE_ACTION = '$delete'; // Common internal methods for posthog.people and posthog.group APIs.
// These methods shouldn't involve network I/O.

exports.DELETE_ACTION = DELETE_ACTION;
var apiActions = {
  set_action: function set_action(prop, to) {
    var data = {};
    var $set = {};

    if (_utils._.isObject(prop)) {
      _utils._.each(prop, function (v, k) {
        if (!this._is_reserved_property(k)) {
          $set[k] = v;
        }
      }, this);
    } else {
      $set[prop] = to;
    }

    data[SET_ACTION] = $set;
    return data;
  },
  unset_action: function unset_action(prop) {
    var data = {};
    var $unset = [];

    if (!_utils._.isArray(prop)) {
      prop = [prop];
    }

    _utils._.each(prop, function (k) {
      if (!this._is_reserved_property(k)) {
        $unset.push(k);
      }
    }, this);

    data[UNSET_ACTION] = $unset;
    return data;
  },
  set_once_action: function set_once_action(prop, to) {
    var data = {};
    var $set_once = {};

    if (_utils._.isObject(prop)) {
      _utils._.each(prop, function (v, k) {
        if (!this._is_reserved_property(k)) {
          $set_once[k] = v;
        }
      }, this);
    } else {
      $set_once[prop] = to;
    }

    data[SET_ONCE_ACTION] = $set_once;
    return data;
  },
  union_action: function union_action(list_name, values) {
    var data = {};
    var $union = {};

    if (_utils._.isObject(list_name)) {
      _utils._.each(list_name, function (v, k) {
        if (!this._is_reserved_property(k)) {
          $union[k] = _utils._.isArray(v) ? v : [v];
        }
      }, this);
    } else {
      $union[list_name] = _utils._.isArray(values) ? values : [values];
    }

    data[UNION_ACTION] = $union;
    return data;
  },
  append_action: function append_action(list_name, value) {
    var data = {};
    var $append = {};

    if (_utils._.isObject(list_name)) {
      _utils._.each(list_name, function (v, k) {
        if (!this._is_reserved_property(k)) {
          $append[k] = v;
        }
      }, this);
    } else {
      $append[list_name] = value;
    }

    data[APPEND_ACTION] = $append;
    return data;
  },
  remove_action: function remove_action(list_name, value) {
    var data = {};
    var $remove = {};

    if (_utils._.isObject(list_name)) {
      _utils._.each(list_name, function (v, k) {
        if (!this._is_reserved_property(k)) {
          $remove[k] = v;
        }
      }, this);
    } else {
      $remove[list_name] = value;
    }

    data[REMOVE_ACTION] = $remove;
    return data;
  },
  delete_action: function delete_action() {
    var data = {};
    data[DELETE_ACTION] = '';
    return data;
  }
};
exports.apiActions = apiActions;
},{"./utils":"utils.js"}],"posthog-group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostHogGroup = void 0;

var _gdprUtils = require("./gdpr-utils");

var _apiActions = require("./api-actions");

var _utils = require("./utils");

/* eslint camelcase: "off" */

/**
 * PostHog Group Object
 * @constructor
 */
var PostHogGroup = function PostHogGroup() {};

exports.PostHogGroup = PostHogGroup;

_utils._.extend(PostHogGroup.prototype, _apiActions.apiActions);

PostHogGroup.prototype._init = function (posthog_instance, group_key, group_id) {
  this._posthog = posthog_instance;
  this._group_key = group_key;
  this._group_id = group_id;
};
/**
 * Set properties on a group.
 *
 * ### Usage:
 *
 *     posthog.get_group('company', 'posthog').set('Location', '405 Howard');
 *
 *     // or set multiple properties at once
 *     posthog.get_group('company', 'posthog').set({
 *          'Location': '405 Howard',
 *          'Founded' : 2009,
 *     });
 *     // properties can be strings, integers, dates, or lists
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the captureing event
 */


PostHogGroup.prototype.set = (0, _gdprUtils.addOptOutCheckPostHogGroup)(function (prop, to, callback) {
  var data = this.set_action(prop, to);

  if (_utils._.isObject(prop)) {
    callback = to;
  }

  return this._send_request(data, callback);
});
/**
 * Set properties on a group, only if they do not yet exist.
 * This will not overwrite previous group property values, unlike
 * group.set().
 *
 * ### Usage:
 *
 *     posthog.get_group('company', 'posthog').set_once('Location', '405 Howard');
 *
 *     // or set multiple properties at once
 *     posthog.get_group('company', 'posthog').set_once({
 *          'Location': '405 Howard',
 *          'Founded' : 2009,
 *     });
 *     // properties can be strings, integers, lists or dates
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the captureing event
 */

PostHogGroup.prototype.set_once = (0, _gdprUtils.addOptOutCheckPostHogGroup)(function (prop, to, callback) {
  var data = this.set_once_action(prop, to);

  if (_utils._.isObject(prop)) {
    callback = to;
  }

  return this._send_request(data, callback);
});
/**
 * Unset properties on a group permanently.
 *
 * ### Usage:
 *
 *     posthog.get_group('company', 'posthog').unset('Founded');
 *
 * @param {String} prop The name of the property.
 * @param {Function} [callback] If provided, the callback will be called after the captureing event
 */

PostHogGroup.prototype.unset = (0, _gdprUtils.addOptOutCheckPostHogGroup)(function (prop, callback) {
  var data = this.unset_action(prop);
  return this._send_request(data, callback);
});
/**
 * Merge a given list with a list-valued group property, excluding duplicate values.
 *
 * ### Usage:
 *
 *     // merge a value to a list, creating it if needed
 *     posthog.get_group('company', 'posthog').union('Location', ['San Francisco', 'London']);
 *
 * @param {String} list_name Name of the property.
 * @param {Array} values Values to merge with the given property
 * @param {Function} [callback] If provided, the callback will be called after the captureing event
 */

PostHogGroup.prototype.union = (0, _gdprUtils.addOptOutCheckPostHogGroup)(function (list_name, values, callback) {
  if (_utils._.isObject(list_name)) {
    callback = values;
  }

  var data = this.union_action(list_name, values);
  return this._send_request(data, callback);
});
/**
 * Permanently delete a group.
 *
 * ### Usage:
 *     posthog.get_group('company', 'posthog').delete();
 */

PostHogGroup.prototype['delete'] = (0, _gdprUtils.addOptOutCheckPostHogGroup)(function (callback) {
  var data = this.delete_action();
  return this._send_request(data, callback);
});
/**
 * Remove a property from a group. The value will be ignored if doesn't exist.
 *
 * ### Usage:
 *
 *     posthog.get_group('company', 'posthog').remove('Location', 'London');
 *
 * @param {String} list_name Name of the property.
 * @param {Object} value Value to remove from the given group property
 * @param {Function} [callback] If provided, the callback will be called after the captureing event
 */

PostHogGroup.prototype.remove = (0, _gdprUtils.addOptOutCheckPostHogGroup)(function (list_name, value, callback) {
  var data = this.remove_action(list_name, value);
  return this._send_request(data, callback);
});

PostHogGroup.prototype._send_request = function (data, callback) {
  data['$group_key'] = this._group_key;
  data['$group_id'] = this._group_id;
  data['$token'] = this._get_config('token');

  var date_encoded_data = _utils._.encodeDates(data);

  var truncated_data = _utils._.truncate(date_encoded_data, 255);

  var json_data = _utils._.JSONEncode(date_encoded_data);

  var encoded_data = _utils._.base64Encode(json_data);

  _utils.console.log(data);

  this._posthog._send_request(this._posthog.get_config('api_host') + '/groups/', {
    'data': encoded_data
  }, this._posthog._prepare_callback(callback, truncated_data));

  return truncated_data;
};

PostHogGroup.prototype._is_reserved_property = function (prop) {
  return prop === '$group_key' || prop === '$group_id';
};

PostHogGroup.prototype._get_config = function (conf) {
  return this._posthog.get_config(conf);
};

PostHogGroup.prototype.toString = function () {
  return this._posthog.toString() + '.group.' + this._group_key + '.' + this._group_id;
}; // PostHogGroup Exports


PostHogGroup.prototype['remove'] = PostHogGroup.prototype.remove;
PostHogGroup.prototype['set'] = PostHogGroup.prototype.set;
PostHogGroup.prototype['set_once'] = PostHogGroup.prototype.set_once;
PostHogGroup.prototype['union'] = PostHogGroup.prototype.union;
PostHogGroup.prototype['unset'] = PostHogGroup.prototype.unset;
PostHogGroup.prototype['toString'] = PostHogGroup.prototype.toString;
},{"./gdpr-utils":"gdpr-utils.js","./api-actions":"api-actions.js","./utils":"utils.js"}],"posthog-people.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostHogPeople = void 0;

var _gdprUtils = require("./gdpr-utils");

var _apiActions = require("./api-actions");

var _utils = require("./utils");

/* eslint camelcase: "off" */

/**
 * PostHog People Object
 * @constructor
 */
var PostHogPeople = function PostHogPeople() {};

exports.PostHogPeople = PostHogPeople;

_utils._.extend(PostHogPeople.prototype, _apiActions.apiActions);

PostHogPeople.prototype._init = function (posthog_instance) {
  this._posthog = posthog_instance;
};
/*
* Set properties on a user record.
*
* ### Usage:
*
*     posthog.people.set('gender', 'm');
*
*     // or set multiple properties at once
*     posthog.people.set({
*         'Company': 'Acme',
*         'Plan': 'Premium',
*         'Upgrade date': new Date()
*     });
*     // properties can be strings, integers, dates, or lists
*
* @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [to] A value to set on the given property name
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/


PostHogPeople.prototype.set = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (prop, to, callback) {
  var data = this.set_action(prop, to);

  if (_utils._.isObject(prop)) {
    callback = to;
  } // make sure that the referrer info has been updated and saved


  if (this._get_config('save_referrer')) {
    this._posthog['persistence'].update_referrer_info(document.referrer);
  } // update $set object with default people properties


  data[_apiActions.SET_ACTION] = _utils._.extend({}, _utils._.info.people_properties(), this._posthog['persistence'].get_referrer_info(), data[_apiActions.SET_ACTION]);
  return this._send_request(data, callback);
});
/*
* Set properties on a user record, only if they do not yet exist.
* This will not overwrite previous people property values, unlike
* people.set().
*
* ### Usage:
*
*     posthog.people.set_once('First Login Date', new Date());
*
*     // or set multiple properties at once
*     posthog.people.set_once({
*         'First Login Date': new Date(),
*         'Starting Plan': 'Premium'
*     });
*
*     // properties can be strings, integers or dates
*
* @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [to] A value to set on the given property name
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/

PostHogPeople.prototype.set_once = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (prop, to, callback) {
  var data = this.set_once_action(prop, to);

  if (_utils._.isObject(prop)) {
    callback = to;
  }

  return this._send_request(data, callback);
});
/*
* Unset properties on a user record (permanently removes the properties and their values from a profile).
*
* ### Usage:
*
*     posthog.people.unset('gender');
*
*     // or unset multiple properties at once
*     posthog.people.unset(['gender', 'Company']);
*
* @param {Array|String} prop If a string, this is the name of the property. If an array, this is a list of property names.
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/

PostHogPeople.prototype.unset = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (prop, callback) {
  var data = this.unset_action(prop);
  return this._send_request(data, callback);
});
/*
* Increment/decrement numeric people analytics properties.
*
* ### Usage:
*
*     posthog.people.increment('page_views', 1);
*
*     // or, for convenience, if you're just incrementing a counter by
*     // 1, you can simply do
*     posthog.people.increment('page_views');
*
*     // to decrement a counter, pass a negative number
*     posthog.people.increment('credits_left', -1);
*
*     // like posthog.people.set(), you can increment multiple
*     // properties at once:
*     posthog.people.increment({
*         counter1: 1,
*         counter2: 6
*     });
*
* @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and numeric values.
* @param {Number} [by] An amount to increment the given property
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/

PostHogPeople.prototype.increment = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (prop, by, callback) {
  var data = {};
  var $add = {};

  if (_utils._.isObject(prop)) {
    _utils._.each(prop, function (v, k) {
      if (!this._is_reserved_property(k)) {
        if (isNaN(parseFloat(v))) {
          _utils.console.error('Invalid increment value passed to posthog.people.increment - must be a number');

          return;
        } else {
          $add[k] = v;
        }
      }
    }, this);

    callback = by;
  } else {
    // convenience: posthog.people.increment('property'); will
    // increment 'property' by 1
    if (_utils._.isUndefined(by)) {
      by = 1;
    }

    $add[prop] = by;
  }

  data[_apiActions.ADD_ACTION] = $add;
  return this._send_request(data, callback);
});
/*
* Append a value to a list-valued people analytics property.
*
* ### Usage:
*
*     // append a value to a list, creating it if needed
*     posthog.people.append('pages_visited', 'homepage');
*
*     // like posthog.people.set(), you can append multiple
*     // properties at once:
*     posthog.people.append({
*         list1: 'bob',
*         list2: 123
*     });
*
* @param {Object|String} list_name If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [value] value An item to append to the list
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/

PostHogPeople.prototype.append = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (list_name, value, callback) {
  if (_utils._.isObject(list_name)) {
    callback = value;
  }

  var data = this.append_action(list_name, value);
  return this._send_request(data, callback);
});
/*
* Remove a value from a list-valued people analytics property.
*
* ### Usage:
*
*     posthog.people.remove('School', 'UCB');
*
* @param {Object|String} list_name If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [value] value Item to remove from the list
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/

PostHogPeople.prototype.remove = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (list_name, value, callback) {
  if (_utils._.isObject(list_name)) {
    callback = value;
  }

  var data = this.remove_action(list_name, value);
  return this._send_request(data, callback);
});
/*
* Merge a given list with a list-valued people analytics property,
* excluding duplicate values.
*
* ### Usage:
*
*     // merge a value to a list, creating it if needed
*     posthog.people.union('pages_visited', 'homepage');
*
*     // like posthog.people.set(), you can append multiple
*     // properties at once:
*     posthog.people.union({
*         list1: 'bob',
*         list2: 123
*     });
*
*     // like posthog.people.append(), you can append multiple
*     // values to the same list:
*     posthog.people.union({
*         list1: ['bob', 'billy']
*     });
*
* @param {Object|String} list_name If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [value] Value / values to merge with the given property
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/

PostHogPeople.prototype.union = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (list_name, values, callback) {
  if (_utils._.isObject(list_name)) {
    callback = values;
  }

  var data = this.union_action(list_name, values);
  return this._send_request(data, callback);
});
/*
* Record that you have charged the current user a certain amount
* of money. Charges recorded with capture_charge() will appear in the
* PostHog revenue report.
*
* ### Usage:
*
*     // charge a user $50
*     posthog.people.capture_charge(50);
*
*     // charge a user $30.50 on the 2nd of january
*     posthog.people.capture_charge(30.50, {
*         '$time': new Date('jan 1 2012')
*     });
*
* @param {Number} amount The amount of money charged to the current user
* @param {Object} [properties] An associative array of properties associated with the charge
* @param {Function} [callback] If provided, the callback will be called when the server responds
*/

PostHogPeople.prototype.capture_charge = (0, _gdprUtils.addOptOutCheckPostHogPeople)(function (amount, properties, callback) {
  if (!_utils._.isNumber(amount)) {
    amount = parseFloat(amount);

    if (isNaN(amount)) {
      _utils.console.error('Invalid value passed to posthog.people.capture_charge - must be a number');

      return;
    }
  }

  return this.append('$transactions', _utils._.extend({
    '$amount': amount
  }, properties), callback);
});
/*
* Permanently clear all revenue report transactions from the
* current user's people analytics profile.
*
* ### Usage:
*
*     posthog.people.clear_charges();
*
* @param {Function} [callback] If provided, the callback will be called after captureing the event.
*/

PostHogPeople.prototype.clear_charges = function (callback) {
  return this.set('$transactions', [], callback);
};
/*
* Permanently deletes the current people analytics profile from
* PostHog (using the current distinct_id).
*
* ### Usage:
*
*     // remove the all data you have stored about the current user
*     posthog.people.delete_user();
*
*/


PostHogPeople.prototype.delete_user = function () {
  if (!this._identify_called()) {
    _utils.console.error('posthog.people.delete_user() requires you to call identify() first');

    return;
  }

  var data = {
    '$delete': this._posthog.get_distinct_id()
  };
  return this._send_request(data);
};

PostHogPeople.prototype.toString = function () {
  return this._posthog.toString() + '.people';
};

PostHogPeople.prototype._send_request = function (data, callback) {
  data['$token'] = this._get_config('token');
  data['$distinct_id'] = this._posthog.get_distinct_id();

  var device_id = this._posthog.get_property('$device_id');

  var user_id = this._posthog.get_property('$user_id');

  var had_persisted_distinct_id = this._posthog.get_property('$had_persisted_distinct_id');

  if (device_id) {
    data['$device_id'] = device_id;
  }

  if (user_id) {
    data['$user_id'] = user_id;
  }

  if (had_persisted_distinct_id) {
    data['$had_persisted_distinct_id'] = had_persisted_distinct_id;
  }

  var date_encoded_data = _utils._.encodeDates(data);

  var truncated_data = _utils._.truncate(date_encoded_data, 255);

  var json_data = _utils._.JSONEncode(date_encoded_data);

  var encoded_data = _utils._.base64Encode(json_data);

  if (!this._identify_called()) {
    this._enqueue(data);

    if (!_utils._.isUndefined(callback)) {
      if (this._get_config('verbose')) {
        callback({
          status: -1,
          error: null
        });
      } else {
        callback(-1);
      }
    }

    return truncated_data;
  }

  _utils.console.log('POSTHOG PEOPLE REQUEST:');

  _utils.console.log(truncated_data);

  this._posthog._send_request(this._get_config('api_host') + '/engage/', {
    'data': encoded_data
  }, this._posthog._prepare_callback(callback, truncated_data));

  return truncated_data;
};

PostHogPeople.prototype._get_config = function (conf_var) {
  return this._posthog.get_config(conf_var);
};

PostHogPeople.prototype._identify_called = function () {
  return this._posthog._flags.identify_called === true;
}; // Queue up engage operations if identify hasn't been called yet.


PostHogPeople.prototype._enqueue = function (data) {
  if (_apiActions.SET_ACTION in data) {
    this._posthog['persistence']._add_to_people_queue(_apiActions.SET_ACTION, data);
  } else if (_apiActions.SET_ONCE_ACTION in data) {
    this._posthog['persistence']._add_to_people_queue(_apiActions.SET_ONCE_ACTION, data);
  } else if (_apiActions.UNSET_ACTION in data) {
    this._posthog['persistence']._add_to_people_queue(_apiActions.UNSET_ACTION, data);
  } else if (_apiActions.ADD_ACTION in data) {
    this._posthog['persistence']._add_to_people_queue(_apiActions.ADD_ACTION, data);
  } else if (_apiActions.APPEND_ACTION in data) {
    this._posthog['persistence']._add_to_people_queue(_apiActions.APPEND_ACTION, data);
  } else if (_apiActions.REMOVE_ACTION in data) {
    this._posthog['persistence']._add_to_people_queue(_apiActions.REMOVE_ACTION, data);
  } else if (_apiActions.UNION_ACTION in data) {
    this._posthog['persistence']._add_to_people_queue(_apiActions.UNION_ACTION, data);
  } else {
    _utils.console.error('Invalid call to _enqueue():', data);
  }
};

PostHogPeople.prototype._flush_one_queue = function (action, action_method, callback, queue_to_params_fn) {
  var _this = this;

  var queued_data = _utils._.extend({}, this._posthog['persistence']._get_queue(action));

  var action_params = queued_data;

  if (!_utils._.isUndefined(queued_data) && _utils._.isObject(queued_data) && !_utils._.isEmptyObject(queued_data)) {
    _this._posthog['persistence']._pop_from_people_queue(action, queued_data);

    if (queue_to_params_fn) {
      action_params = queue_to_params_fn(queued_data);
    }

    action_method.call(_this, action_params, function (response, data) {
      // on bad response, we want to add it back to the queue
      if (response === 0) {
        _this._posthog['persistence']._add_to_people_queue(action, queued_data);
      }

      if (!_utils._.isUndefined(callback)) {
        callback(response, data);
      }
    });
  }
}; // Flush queued engage operations - order does not matter,
// and there are network level race conditions anyway


PostHogPeople.prototype._flush = function (_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback, _unset_callback, _remove_callback) {
  var _this = this;

  var $append_queue = this._posthog['persistence']._get_queue(_apiActions.APPEND_ACTION);

  var $remove_queue = this._posthog['persistence']._get_queue(_apiActions.REMOVE_ACTION);

  this._flush_one_queue(_apiActions.SET_ACTION, this.set, _set_callback);

  this._flush_one_queue(_apiActions.SET_ONCE_ACTION, this.set_once, _set_once_callback);

  this._flush_one_queue(_apiActions.UNSET_ACTION, this.unset, _unset_callback, function (queue) {
    return _utils._.keys(queue);
  });

  this._flush_one_queue(_apiActions.ADD_ACTION, this.increment, _add_callback);

  this._flush_one_queue(_apiActions.UNION_ACTION, this.union, _union_callback); // we have to fire off each $append individually since there is
  // no concat method server side


  if (!_utils._.isUndefined($append_queue) && _utils._.isArray($append_queue) && $append_queue.length) {
    var $append_item;

    var append_callback = function append_callback(response, data) {
      if (response === 0) {
        _this._posthog['persistence']._add_to_people_queue(_apiActions.APPEND_ACTION, $append_item);
      }

      if (!_utils._.isUndefined(_append_callback)) {
        _append_callback(response, data);
      }
    };

    for (var i = $append_queue.length - 1; i >= 0; i--) {
      $append_item = $append_queue.pop();

      if (!_utils._.isEmptyObject($append_item)) {
        _this.append($append_item, append_callback);
      }
    } // Save the shortened append queue


    _this._posthog['persistence'].save();
  } // same for $remove


  if (!_utils._.isUndefined($remove_queue) && _utils._.isArray($remove_queue) && $remove_queue.length) {
    var $remove_item;

    var remove_callback = function remove_callback(response, data) {
      if (response === 0) {
        _this._posthog['persistence']._add_to_people_queue(_apiActions.REMOVE_ACTION, $remove_item);
      }

      if (!_utils._.isUndefined(_remove_callback)) {
        _remove_callback(response, data);
      }
    };

    for (var j = $remove_queue.length - 1; j >= 0; j--) {
      $remove_item = $remove_queue.pop();

      if (!_utils._.isEmptyObject($remove_item)) {
        _this.remove($remove_item, remove_callback);
      }
    }

    _this._posthog['persistence'].save();
  }
};

PostHogPeople.prototype._is_reserved_property = function (prop) {
  return prop === '$distinct_id' || prop === '$token' || prop === '$device_id' || prop === '$user_id' || prop === '$had_persisted_distinct_id';
}; // PostHogPeople Exports


PostHogPeople.prototype['set'] = PostHogPeople.prototype.set;
PostHogPeople.prototype['set_once'] = PostHogPeople.prototype.set_once;
PostHogPeople.prototype['unset'] = PostHogPeople.prototype.unset;
PostHogPeople.prototype['increment'] = PostHogPeople.prototype.increment;
PostHogPeople.prototype['append'] = PostHogPeople.prototype.append;
PostHogPeople.prototype['remove'] = PostHogPeople.prototype.remove;
PostHogPeople.prototype['union'] = PostHogPeople.prototype.union;
PostHogPeople.prototype['capture_charge'] = PostHogPeople.prototype.capture_charge;
PostHogPeople.prototype['clear_charges'] = PostHogPeople.prototype.clear_charges;
PostHogPeople.prototype['delete_user'] = PostHogPeople.prototype.delete_user;
PostHogPeople.prototype['toString'] = PostHogPeople.prototype.toString;
},{"./gdpr-utils":"gdpr-utils.js","./api-actions":"api-actions.js","./utils":"utils.js"}],"posthog-persistence.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_TIMERS_KEY = exports.CAMPAIGN_IDS_KEY = exports.ALIAS_ID_KEY = exports.PEOPLE_DISTINCT_ID_KEY = exports.UNION_QUEUE_KEY = exports.REMOVE_QUEUE_KEY = exports.APPEND_QUEUE_KEY = exports.ADD_QUEUE_KEY = exports.UNSET_QUEUE_KEY = exports.SET_ONCE_QUEUE_KEY = exports.SET_QUEUE_KEY = exports.PostHogPersistence = void 0;

var _apiActions = require("./api-actions");

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint camelcase: "off" */

/*
 * Constants
 */

/** @const */
var SET_QUEUE_KEY = '__mps';
/** @const */

exports.SET_QUEUE_KEY = SET_QUEUE_KEY;
var SET_ONCE_QUEUE_KEY = '__mpso';
/** @const */

exports.SET_ONCE_QUEUE_KEY = SET_ONCE_QUEUE_KEY;
var UNSET_QUEUE_KEY = '__mpus';
/** @const */

exports.UNSET_QUEUE_KEY = UNSET_QUEUE_KEY;
var ADD_QUEUE_KEY = '__mpa';
/** @const */

exports.ADD_QUEUE_KEY = ADD_QUEUE_KEY;
var APPEND_QUEUE_KEY = '__mpap';
/** @const */

exports.APPEND_QUEUE_KEY = APPEND_QUEUE_KEY;
var REMOVE_QUEUE_KEY = '__mpr';
/** @const */

exports.REMOVE_QUEUE_KEY = REMOVE_QUEUE_KEY;
var UNION_QUEUE_KEY = '__mpu'; // This key is deprecated, but we want to check for it to see whether aliasing is allowed.

/** @const */

exports.UNION_QUEUE_KEY = UNION_QUEUE_KEY;
var PEOPLE_DISTINCT_ID_KEY = '$people_distinct_id';
/** @const */

exports.PEOPLE_DISTINCT_ID_KEY = PEOPLE_DISTINCT_ID_KEY;
var ALIAS_ID_KEY = '__alias';
/** @const */

exports.ALIAS_ID_KEY = ALIAS_ID_KEY;
var CAMPAIGN_IDS_KEY = '__cmpns';
/** @const */

exports.CAMPAIGN_IDS_KEY = CAMPAIGN_IDS_KEY;
var EVENT_TIMERS_KEY = '__timers';
/** @const */

exports.EVENT_TIMERS_KEY = EVENT_TIMERS_KEY;
var RESERVED_PROPERTIES = [SET_QUEUE_KEY, SET_ONCE_QUEUE_KEY, UNSET_QUEUE_KEY, ADD_QUEUE_KEY, APPEND_QUEUE_KEY, REMOVE_QUEUE_KEY, UNION_QUEUE_KEY, PEOPLE_DISTINCT_ID_KEY, ALIAS_ID_KEY, CAMPAIGN_IDS_KEY, EVENT_TIMERS_KEY];
/**
 * PostHog Persistence Object
 * @constructor
 */

var PostHogPersistence = function PostHogPersistence(config) {
  this['props'] = {};
  this.campaign_params_saved = false;

  if (config['persistence_name']) {
    this.name = 'ph_' + config['persistence_name'];
  } else {
    this.name = 'ph_' + config['token'] + '_posthog';
  }

  var storage_type = config['persistence'];

  if (storage_type !== 'cookie' && storage_type !== 'localStorage') {
    _utils.console.critical('Unknown persistence type ' + storage_type + '; falling back to cookie');

    storage_type = config['persistence'] = 'cookie';
  }

  if (storage_type === 'localStorage' && _utils._.localStorage.is_supported()) {
    this.storage = _utils._.localStorage;
  } else {
    this.storage = _utils._.cookie;
  }

  this.load();
  this.update_config(config);
  this.upgrade(config);
  this.save();
};

exports.PostHogPersistence = PostHogPersistence;

PostHogPersistence.prototype.properties = function () {
  var p = {}; // Filter out reserved properties

  _utils._.each(this['props'], function (v, k) {
    if (!_utils._.include(RESERVED_PROPERTIES, k)) {
      p[k] = v;
    }
  });

  return p;
};

PostHogPersistence.prototype.load = function () {
  if (this.disabled) {
    return;
  }

  var entry = this.storage.parse(this.name);

  if (entry) {
    this['props'] = _utils._.extend({}, entry);
  }
};

PostHogPersistence.prototype.upgrade = function (config) {
  var upgrade_from_old_lib = config['upgrade'],
      old_cookie_name,
      old_cookie;

  if (upgrade_from_old_lib) {
    old_cookie_name = 'ph_super_properties'; // Case where they had a custom cookie name before.

    if (typeof upgrade_from_old_lib === 'string') {
      old_cookie_name = upgrade_from_old_lib;
    }

    old_cookie = this.storage.parse(old_cookie_name); // remove the cookie

    this.storage.remove(old_cookie_name);
    this.storage.remove(old_cookie_name, true);

    if (old_cookie) {
      this['props'] = _utils._.extend(this['props'], old_cookie['all'], old_cookie['events']);
    }
  }

  if (!config['cookie_name'] && config['name'] !== 'posthog') {
    // special case to handle people with cookies of the form
    // ph_TOKEN_INSTANCENAME from the first release of this library
    old_cookie_name = 'ph_' + config['token'] + '_' + config['name'];
    old_cookie = this.storage.parse(old_cookie_name);

    if (old_cookie) {
      this.storage.remove(old_cookie_name);
      this.storage.remove(old_cookie_name, true); // Save the prop values that were in the cookie from before -
      // this should only happen once as we delete the old one.

      this.register_once(old_cookie);
    }
  }

  if (this.storage === _utils._.localStorage) {
    old_cookie = _utils._.cookie.parse(this.name);

    _utils._.cookie.remove(this.name);

    _utils._.cookie.remove(this.name, true);

    if (old_cookie) {
      this.register_once(old_cookie);
    }
  }
};

PostHogPersistence.prototype.save = function () {
  if (this.disabled) {
    return;
  }

  this._expire_notification_campaigns();

  this.storage.set(this.name, _utils._.JSONEncode(this['props']), this.expire_days, this.cross_subdomain, this.secure);
};

PostHogPersistence.prototype.remove = function () {
  // remove both domain and subdomain cookies
  this.storage.remove(this.name, false);
  this.storage.remove(this.name, true);
}; // removes the storage entry and deletes all loaded data
// forced name for tests


PostHogPersistence.prototype.clear = function () {
  this.remove();
  this['props'] = {};
};
/**
* @param {Object} props
* @param {*=} default_value
* @param {number=} days
*/


PostHogPersistence.prototype.register_once = function (props, default_value, days) {
  if (_utils._.isObject(props)) {
    if (typeof default_value === 'undefined') {
      default_value = 'None';
    }

    this.expire_days = typeof days === 'undefined' ? this.default_expiry : days;

    _utils._.each(props, function (val, prop) {
      if (!this['props'].hasOwnProperty(prop) || this['props'][prop] === default_value) {
        this['props'][prop] = val;
      }
    }, this);

    this.save();
    return true;
  }

  return false;
};
/**
* @param {Object} props
* @param {number=} days
*/


PostHogPersistence.prototype.register = function (props, days) {
  if (_utils._.isObject(props)) {
    this.expire_days = typeof days === 'undefined' ? this.default_expiry : days;

    _utils._.extend(this['props'], props);

    this.save();
    return true;
  }

  return false;
};

PostHogPersistence.prototype.unregister = function (prop) {
  if (prop in this['props']) {
    delete this['props'][prop];
    this.save();
  }
};

PostHogPersistence.prototype._expire_notification_campaigns = _utils._.safewrap(function () {
  var campaigns_shown = this['props'][CAMPAIGN_IDS_KEY],
      EXPIRY_TIME = _config.default.DEBUG ? 60 * 1000 : 60 * 60 * 1000; // 1 minute (Config.DEBUG) / 1 hour (PDXN)

  if (!campaigns_shown) {
    return;
  }

  for (var campaign_id in campaigns_shown) {
    if (1 * new Date() - campaigns_shown[campaign_id] > EXPIRY_TIME) {
      delete campaigns_shown[campaign_id];
    }
  }

  if (_utils._.isEmptyObject(campaigns_shown)) {
    delete this['props'][CAMPAIGN_IDS_KEY];
  }
});

PostHogPersistence.prototype.update_campaign_params = function () {
  if (!this.campaign_params_saved) {
    this.register_once(_utils._.info.campaignParams());
    this.campaign_params_saved = true;
  }
};

PostHogPersistence.prototype.update_search_keyword = function (referrer) {
  this.register(_utils._.info.searchInfo(referrer));
}; // EXPORTED METHOD, we test this directly.


PostHogPersistence.prototype.update_referrer_info = function (referrer) {
  // If referrer doesn't exist, we want to note the fact that it was type-in traffic.
  this.register_once({
    '$initial_referrer': referrer || '$direct',
    '$initial_referring_domain': _utils._.info.referringDomain(referrer) || '$direct'
  }, '');
};

PostHogPersistence.prototype.get_referrer_info = function () {
  return _utils._.strip_empty_properties({
    '$initial_referrer': this['props']['$initial_referrer'],
    '$initial_referring_domain': this['props']['$initial_referring_domain']
  });
}; // safely fills the passed in object with stored properties,
// does not override any properties defined in both
// returns the passed in object


PostHogPersistence.prototype.safe_merge = function (props) {
  _utils._.each(this['props'], function (val, prop) {
    if (!(prop in props)) {
      props[prop] = val;
    }
  });

  return props;
};

PostHogPersistence.prototype.update_config = function (config) {
  this.default_expiry = this.expire_days = config['cookie_expiration'];
  this.set_disabled(config['disable_persistence']);
  this.set_cross_subdomain(config['cross_subdomain_cookie']);
  this.set_secure(config['secure_cookie']);
};

PostHogPersistence.prototype.set_disabled = function (disabled) {
  this.disabled = disabled;

  if (this.disabled) {
    this.remove();
  } else {
    this.save();
  }
};

PostHogPersistence.prototype.set_cross_subdomain = function (cross_subdomain) {
  if (cross_subdomain !== this.cross_subdomain) {
    this.cross_subdomain = cross_subdomain;
    this.remove();
    this.save();
  }
};

PostHogPersistence.prototype.get_cross_subdomain = function () {
  return this.cross_subdomain;
};

PostHogPersistence.prototype.set_secure = function (secure) {
  if (secure !== this.secure) {
    this.secure = secure ? true : false;
    this.remove();
    this.save();
  }
};

PostHogPersistence.prototype._add_to_people_queue = function (queue, data) {
  var q_key = this._get_queue_key(queue),
      q_data = data[queue],
      set_q = this._get_or_create_queue(_apiActions.SET_ACTION),
      set_once_q = this._get_or_create_queue(_apiActions.SET_ONCE_ACTION),
      unset_q = this._get_or_create_queue(_apiActions.UNSET_ACTION),
      add_q = this._get_or_create_queue(_apiActions.ADD_ACTION),
      union_q = this._get_or_create_queue(_apiActions.UNION_ACTION),
      remove_q = this._get_or_create_queue(_apiActions.REMOVE_ACTION, []),
      append_q = this._get_or_create_queue(_apiActions.APPEND_ACTION, []);

  if (q_key === SET_QUEUE_KEY) {
    // Update the set queue - we can override any existing values
    _utils._.extend(set_q, q_data); // if there was a pending increment, override it
    // with the set.


    this._pop_from_people_queue(_apiActions.ADD_ACTION, q_data); // if there was a pending union, override it
    // with the set.


    this._pop_from_people_queue(_apiActions.UNION_ACTION, q_data);

    this._pop_from_people_queue(_apiActions.UNSET_ACTION, q_data);
  } else if (q_key === SET_ONCE_QUEUE_KEY) {
    // only queue the data if there is not already a set_once call for it.
    _utils._.each(q_data, function (v, k) {
      if (!(k in set_once_q)) {
        set_once_q[k] = v;
      }
    });

    this._pop_from_people_queue(_apiActions.UNSET_ACTION, q_data);
  } else if (q_key === UNSET_QUEUE_KEY) {
    _utils._.each(q_data, function (prop) {
      // undo previously-queued actions on this key
      _utils._.each([set_q, set_once_q, add_q, union_q], function (enqueued_obj) {
        if (prop in enqueued_obj) {
          delete enqueued_obj[prop];
        }
      });

      _utils._.each(append_q, function (append_obj) {
        if (prop in append_obj) {
          delete append_obj[prop];
        }
      });

      unset_q[prop] = true;
    });
  } else if (q_key === ADD_QUEUE_KEY) {
    _utils._.each(q_data, function (v, k) {
      // If it exists in the set queue, increment
      // the value
      if (k in set_q) {
        set_q[k] += v;
      } else {
        // If it doesn't exist, update the add
        // queue
        if (!(k in add_q)) {
          add_q[k] = 0;
        }

        add_q[k] += v;
      }
    }, this);

    this._pop_from_people_queue(_apiActions.UNSET_ACTION, q_data);
  } else if (q_key === UNION_QUEUE_KEY) {
    _utils._.each(q_data, function (v, k) {
      if (_utils._.isArray(v)) {
        if (!(k in union_q)) {
          union_q[k] = [];
        } // We may send duplicates, the server will dedup them.


        union_q[k] = union_q[k].concat(v);
      }
    });

    this._pop_from_people_queue(_apiActions.UNSET_ACTION, q_data);
  } else if (q_key === REMOVE_QUEUE_KEY) {
    remove_q.push(q_data);

    this._pop_from_people_queue(_apiActions.APPEND_ACTION, q_data);
  } else if (q_key === APPEND_QUEUE_KEY) {
    append_q.push(q_data);

    this._pop_from_people_queue(_apiActions.UNSET_ACTION, q_data);
  }

  _utils.console.log('POSTHOG PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):');

  _utils.console.log(data);

  this.save();
};

PostHogPersistence.prototype._pop_from_people_queue = function (queue, data) {
  var q = this._get_queue(queue);

  if (!_utils._.isUndefined(q)) {
    _utils._.each(data, function (v, k) {
      if (queue === _apiActions.APPEND_ACTION || queue === _apiActions.REMOVE_ACTION) {
        // list actions: only remove if both k+v match
        // e.g. remove should not override append in a case like
        // append({foo: 'bar'}); remove({foo: 'qux'})
        _utils._.each(q, function (queued_action) {
          if (queued_action[k] === v) {
            delete queued_action[k];
          }
        });
      } else {
        delete q[k];
      }
    }, this);

    this.save();
  }
};

PostHogPersistence.prototype._get_queue_key = function (queue) {
  if (queue === _apiActions.SET_ACTION) {
    return SET_QUEUE_KEY;
  } else if (queue === _apiActions.SET_ONCE_ACTION) {
    return SET_ONCE_QUEUE_KEY;
  } else if (queue === _apiActions.UNSET_ACTION) {
    return UNSET_QUEUE_KEY;
  } else if (queue === _apiActions.ADD_ACTION) {
    return ADD_QUEUE_KEY;
  } else if (queue === _apiActions.APPEND_ACTION) {
    return APPEND_QUEUE_KEY;
  } else if (queue === _apiActions.REMOVE_ACTION) {
    return REMOVE_QUEUE_KEY;
  } else if (queue === _apiActions.UNION_ACTION) {
    return UNION_QUEUE_KEY;
  } else {
    _utils.console.error('Invalid queue:', queue);
  }
};

PostHogPersistence.prototype._get_queue = function (queue) {
  return this['props'][this._get_queue_key(queue)];
};

PostHogPersistence.prototype._get_or_create_queue = function (queue, default_val) {
  var key = this._get_queue_key(queue);

  default_val = _utils._.isUndefined(default_val) ? {} : default_val;
  return this['props'][key] || (this['props'][key] = default_val);
};

PostHogPersistence.prototype.set_event_timer = function (event_name, timestamp) {
  var timers = this['props'][EVENT_TIMERS_KEY] || {};
  timers[event_name] = timestamp;
  this['props'][EVENT_TIMERS_KEY] = timers;
  this.save();
};

PostHogPersistence.prototype.remove_event_timer = function (event_name) {
  var timers = this['props'][EVENT_TIMERS_KEY] || {};
  var timestamp = timers[event_name];

  if (!_utils._.isUndefined(timestamp)) {
    delete this['props'][EVENT_TIMERS_KEY][event_name];
    this.save();
  }

  return timestamp;
};
},{"./api-actions":"api-actions.js","./config":"config.js","./utils":"utils.js"}],"posthog-core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init_from_snippet = init_from_snippet;
exports.init_as_module = init_as_module;

var _config = _interopRequireDefault(require("./config"));

var _utils = require("./utils");

var _autocapture = require("./autocapture");

var _domCapture = require("./dom-capture");

var _posthogGroup = require("./posthog-group");

var _posthogPeople = require("./posthog-people");

var _posthogPersistence = require("./posthog-persistence");

var _gdprUtils = require("./gdpr-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint camelcase: "off" */
// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name posthog-2.8.min.js
// ==/ClosureCompiler==

/*
SIMPLE STYLE GUIDE:

this.x === public function
this._x === internal - only use within this file
this.__x === private - only use within the class

Globals should be all caps
*/
var init_type; // MODULE or SNIPPET loader

var posthog_master; // main posthog instance / object

var INIT_MODULE = 0;
var INIT_SNIPPET = 1; // some globals for comparisons

var __NOOP = function __NOOP() {};

var __NOOPTIONS = {};
/** @const */

var PRIMARY_INSTANCE_NAME = 'posthog';
/*
 * Dynamic... constants? Is that an oxymoron?
 */
// http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
// https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest#withCredentials

var USE_XHR = _utils.window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest(); // IE<10 does not support cross-origin XHR's but script tags
// with defer won't block window.onload; ENQUEUE_REQUESTS
// should only be true for Opera<12

var ENQUEUE_REQUESTS = !USE_XHR && _utils.userAgent.indexOf('MSIE') === -1 && _utils.userAgent.indexOf('Mozilla') === -1; // save reference to navigator.sendBeacon so it can be minified

var sendBeacon = _utils.navigator['sendBeacon'];

if (sendBeacon) {
  sendBeacon = _utils._.bind(sendBeacon, _utils.navigator);
}
/*
 * Module-level globals
 */


var DEFAULT_CONFIG = {
  'api_host': 'https://t.posthog.com',
  'api_method': 'POST',
  'api_transport': 'XHR',
  'autocapture': true,
  'cdn': 'https://cdn.posthog.com',
  'cross_subdomain_cookie': _utils.document.location.hostname.indexOf('herokuapp.com') === -1,
  'persistence': 'cookie',
  'persistence_name': '',
  'cookie_name': '',
  'loaded': function loaded() {},
  'store_google': true,
  'save_referrer': true,
  'test': false,
  'verbose': false,
  'img': false,
  'capture_pageview': true,
  'debug': false,
  'capture_links_timeout': 300,
  'cookie_expiration': 365,
  'upgrade': false,
  'disable_persistence': false,
  'disable_cookie': false,
  'secure_cookie': false,
  'ip': true,
  'opt_out_captureing_by_default': false,
  'opt_out_persistence_by_default': false,
  'opt_out_captureing_persistence_type': 'localStorage',
  'opt_out_captureing_cookie_prefix': null,
  'property_blacklist': [],
  'xhr_headers': {},
  // { header: value, header2: value }
  'inapp_protocol': '//',
  'inapp_link_new_window': false,
  'request_batching': true
};
var DOM_LOADED = false;
/**
 * PostHog Library Object
 * @constructor
 */

var PostHogLib = function PostHogLib() {};
/**
 * create_mplib(token:string, config:object, name:string)
 *
 * This function is used by the init method of PostHogLib objects
 * as well as the main initializer at the end of the JSLib (that
 * initializes document.posthog as well as any additional instances
 * declared before this file has loaded).
 */


var create_mplib = function create_mplib(token, config, name) {
  var instance,
      target = name === PRIMARY_INSTANCE_NAME ? posthog_master : posthog_master[name];

  if (target && init_type === INIT_MODULE) {
    instance = target;
  } else {
    if (target && !_utils._.isArray(target)) {
      _utils.console.error('You have already initialized ' + name);

      return;
    }

    instance = new PostHogLib();
  }

  instance._cached_groups = {}; // cache groups in a pool

  instance._user_decide_check_complete = false;
  instance._events_captureed_before_user_decide_check_complete = [];

  instance._init(token, config, name);

  instance['people'] = new _posthogPeople.PostHogPeople();

  instance['people']._init(instance); // if any instance on the page has debug = true, we set the
  // global debug to be true


  _config.default.DEBUG = _config.default.DEBUG || instance.get_config('debug');
  instance['__autocapture_enabled'] = instance.get_config('autocapture');

  if (instance.get_config('autocapture')) {
    var num_buckets = 100;
    var num_enabled_buckets = 100;

    if (!_autocapture.autocapture.enabledForProject(instance.get_config('token'), num_buckets, num_enabled_buckets)) {
      instance['__autocapture_enabled'] = false;

      _utils.console.log('Not in active bucket: disabling Automatic Event Collection.');
    } else if (!_autocapture.autocapture.isBrowserSupported()) {
      instance['__autocapture_enabled'] = false;

      _utils.console.log('Disabling Automatic Event Collection because this browser is not supported');
    } else {
      _autocapture.autocapture.init(instance);
    }
  } // if target is not defined, we called init after the lib already
  // loaded, so there won't be an array of things to execute


  if (!_utils._.isUndefined(target) && _utils._.isArray(target)) {
    // Crunch through the people queue first - we queue this data up &
    // flush on identify, so it's better to do all these operations first
    instance._execute_array.call(instance['people'], target['people']);

    instance._execute_array(target);
  }

  return instance;
}; // Initialization methods

/**
 * This function initializes a new instance of the PostHog captureing object.
 * All new instances are added to the main posthog object as sub properties (such as
 * posthog.library_name) and also returned by this function. To define a
 * second instance on the page, you would call:
 *
 *     posthog.init('new token', { your: 'config' }, 'library_name');
 *
 * and use it like so:
 *
 *     posthog.library_name.capture(...);
 *
 * @param {String} token   Your PostHog API token
 * @param {Object} [config]  A dictionary of config options to override. <a href="https://github.com/posthog/posthog-js/blob/8b2e1f7b/src/posthog-core.js#L87-L110">See a list of default config options</a>.
 * @param {String} [name]    The name for the new posthog instance that you want created
 */


PostHogLib.prototype.init = function (token, config, name) {
  if (_utils._.isUndefined(name)) {
    _utils.console.error('You must name your new library: init(token, config, name)');

    return;
  }

  if (name === PRIMARY_INSTANCE_NAME) {
    _utils.console.error('You must initialize the main posthog object right after you include the PostHog js snippet');

    return;
  }

  var instance = create_mplib(token, config, name);
  posthog_master[name] = instance;

  instance._loaded();

  return instance;
}; // posthog._init(token:string, config:object, name:string)
//
// This function sets up the current instance of the posthog
// library.  The difference between this method and the init(...)
// method is this one initializes the actual instance, whereas the
// init(...) method sets up a new library and calls _init on it.
//


PostHogLib.prototype._init = function (token, config, name) {
  this['__loaded'] = true;
  this['config'] = {};
  this['_triggered_notifs'] = [];
  this.set_config(_utils._.extend({}, DEFAULT_CONFIG, config, {
    'name': name,
    'token': token,
    'callback_fn': (name === PRIMARY_INSTANCE_NAME ? name : PRIMARY_INSTANCE_NAME + '.' + name) + '._jsc'
  }));

  this['_jsc'] = function () {}; // batching requests variabls
  // TODO: add options to allow disabling of polling or intervals?


  this._event_queue = [];
  this._empty_queue_count = 0; // to track empty polls

  this._should_poll = true; // flag to continue to recursively poll or not

  this.__dom_loaded_queue = [];
  this.__request_queue = [];
  this.__disabled_events = [];
  this._flags = {
    'disable_all_events': false,
    'identify_called': false
  };
  this['persistence'] = this['cookie'] = new _posthogPersistence.PostHogPersistence(this['config']);

  this._gdpr_init();

  var uuid = _utils._.UUID();

  if (!this.get_distinct_id()) {
    // There is no need to set the distinct id
    // or the device id if something was already stored
    // in the persitence
    this.register_once({
      'distinct_id': uuid,
      '$device_id': uuid
    }, '');
  }
}; // Private methods


PostHogLib.prototype._loaded = function () {
  this.get_config('loaded')(this); // this happens after so a user can call identify/name_tag in
  // the loaded callback

  if (this.get_config('capture_pageview')) {
    this.capture_pageview();
  }
};

PostHogLib.prototype._dom_loaded = function () {
  _utils._.each(this.__dom_loaded_queue, function (item) {
    this._capture_dom.apply(this, item);
  }, this);

  if (!this.has_opted_out_captureing()) {
    _utils._.each(this.__request_queue, function (item) {
      this._send_request.apply(this, item);
    }, this);

    if (this.get_config('request_batching')) {
      this._event_queue_poll();
    }
  }

  delete this.__dom_loaded_queue;
  delete this.__request_queue;
};

PostHogLib.prototype._capture_dom = function (DomClass, args) {
  if (this.get_config('img')) {
    _utils.console.error('You can\'t use DOM captureing functions with img = true.');

    return false;
  }

  if (!DOM_LOADED) {
    this.__dom_loaded_queue.push([DomClass, args]);

    return false;
  }

  var dt = new DomClass().init(this);
  return dt.capture.apply(dt, args);
};
/**
 * _prepare_callback() should be called by callers of _send_request for use
 * as the callback argument.
 *
 * If there is no callback, this returns null.
 * If we are going to make XHR/XDR requests, this returns a function.
 * If we are going to use script tags, this returns a string to use as the
 * callback GET param.
 */


PostHogLib.prototype._prepare_callback = function (callback, data) {
  if (_utils._.isUndefined(callback)) {
    return null;
  }

  if (USE_XHR) {
    var callback_function = function callback_function(response) {
      callback(response, data);
    };

    return callback_function;
  } else {
    // if the user gives us a callback, we store as a random
    // property on this instances jsc function and update our
    // callback string to reflect that.
    var jsc = this['_jsc'];
    var randomized_cb = '' + Math.floor(Math.random() * 100000000);
    var callback_string = this.get_config('callback_fn') + '[' + randomized_cb + ']';

    jsc[randomized_cb] = function (response) {
      delete jsc[randomized_cb];
      callback(response, data);
    };

    return callback_string;
  }
};

PostHogLib.prototype._event_enqueue = function (url, data, options, callback) {
  this._event_queue.push({
    url: url,
    data: data,
    options: options,
    callback: callback
  });

  if (!this._should_poll) {
    this._should_poll = true;

    this._event_queue_poll();
  }
};

PostHogLib.prototype._event_queue_poll = function () {
  var _this2 = this;

  setTimeout(function () {
    if (_this2._event_queue.length > 0) {
      var requests = {};

      _utils._.each(_this2._event_queue, function (request) {
        var url = request.url,
            data = request.data;
        if (requests[url] === undefined) requests[url] = [];
        requests[url].push(data.data);
      });

      for (var url in requests) {
        _this2._send_request(url, requests[url], __NOOPTIONS, __NOOP);
      }

      _this2._event_queue.length = 0; // flush the _event_queue
    } else {
      _this2._empty_queue_count++;
    }

    if (_this2._empty_queue_count > 4) {
      _this2._should_poll = false;
      _this2._empty_queue_count = 0;
    }

    if (_this2._should_poll) {
      _this2._event_queue_poll();
    }
  }, 3000);
};

PostHogLib.prototype._send_request = function (url, data, options, callback) {
  if (ENQUEUE_REQUESTS) {
    this.__request_queue.push(arguments);

    return;
  }

  var DEFAULT_OPTIONS = {
    method: this.get_config('api_method'),
    transport: this.get_config('api_transport')
  };
  var body_data = null;

  if (!callback && (_utils._.isFunction(options) || typeof options === 'string')) {
    callback = options;
    options = null;
  }

  options = _utils._.extend(DEFAULT_OPTIONS, options || {});

  if (!USE_XHR) {
    options.method = 'GET';
  }

  var use_sendBeacon = sendBeacon && options.transport.toLowerCase() === 'sendbeacon';
  var use_post = use_sendBeacon || options.method === 'POST'; // needed to correctly format responses

  var verbose_mode = this.get_config('verbose');

  if (data['verbose']) {
    verbose_mode = true;
  }

  if (this.get_config('test')) {
    data['test'] = 1;
  }

  if (verbose_mode) {
    data['verbose'] = 1;
  }

  if (this.get_config('img')) {
    data['img'] = 1;
  }

  if (!USE_XHR) {
    if (callback) {
      data['callback'] = callback;
    } else if (verbose_mode || this.get_config('test')) {
      // Verbose output (from verbose mode, or an error in test mode) is a json blob,
      // which by itself is not valid javascript. Without a callback, this verbose output will
      // cause an error when returned via jsonp, so we force a no-op callback param.
      // See the ECMA script spec: http://www.ecma-international.org/ecma-262/5.1/#sec-12.4
      data['callback'] = '(function(){})';
    }
  }

  var args = {};
  args['ip'] = this.get_config('ip') ? 1 : 0;
  args['_'] = new Date().getTime().toString();
  url += '?' + _utils._.HTTPBuildQuery(args);

  if (use_post) {
    if (Array.isArray(data)) {
      body_data = JSON.stringify(data);
    } else {
      body_data = 'data=' + data['data'];
      delete data['data'];
    }
  }

  if ('img' in data) {
    var img = _utils.document.createElement('img');

    img.src = url;

    _utils.document.body.appendChild(img);
  } else if (use_sendBeacon) {
    try {
      sendBeacon(url, body_data);
    } catch (e) {
      _utils.console.error(e);
    }
  } else if (USE_XHR) {
    try {
      var req = new XMLHttpRequest();
      req.open(options.method, url, true);
      var headers = this.get_config('xhr_headers');

      if (use_post) {
        if (!Array.isArray(data)) {
          headers['Content-Type'] = 'application/x-www-form-urlencoded';
        } else {
          headers['Content-Type'] = 'application/json';
        }
      }

      _utils._.each(headers, function (headerValue, headerName) {
        req.setRequestHeader(headerName, headerValue);
      }); // send the ph_optout cookie
      // withCredentials cannot be modified until after calling .open on Android and Mobile Safari


      req.withCredentials = true;

      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          // XMLHttpRequest.DONE == 4, except in safari 4
          if (req.status === 200) {
            if (callback) {
              if (verbose_mode) {
                var response;

                try {
                  response = _utils._.JSONDecode(req.responseText);
                } catch (e) {
                  _utils.console.error(e);

                  return;
                }

                callback(response);
              } else {
                callback(Number(req.responseText));
              }
            }
          } else {
            var error = 'Bad HTTP status: ' + req.status + ' ' + req.statusText;

            _utils.console.error(error);

            if (callback) {
              if (verbose_mode) {
                callback({
                  status: 0,
                  error: error
                });
              } else {
                callback(0);
              }
            }
          }
        }
      };

      req.send(body_data);
    } catch (e) {
      _utils.console.error(e);
    }
  } else {
    var script = _utils.document.createElement('script');

    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = url;

    var s = _utils.document.getElementsByTagName('script')[0];

    s.parentNode.insertBefore(script, s);
  }
};
/**
 * _execute_array() deals with processing any posthog function
 * calls that were called before the PostHog library were loaded
 * (and are thus stored in an array so they can be called later)
 *
 * Note: we fire off all the posthog function calls && user defined
 * functions BEFORE we fire off posthog captureing calls. This is so
 * identify/register/set_config calls can properly modify early
 * captureing calls.
 *
 * @param {Array} array
 */


PostHogLib.prototype._execute_array = function (array) {
  var fn_name,
      alias_calls = [],
      other_calls = [],
      captureing_calls = [];

  _utils._.each(array, function (item) {
    if (item) {
      fn_name = item[0];

      if (_utils._.isArray(fn_name)) {
        captureing_calls.push(item); // chained call e.g. posthog.get_group().set()
      } else if (typeof item === 'function') {
        item.call(this);
      } else if (_utils._.isArray(item) && fn_name === 'alias') {
        alias_calls.push(item);
      } else if (_utils._.isArray(item) && fn_name.indexOf('capture') !== -1 && typeof this[fn_name] === 'function') {
        captureing_calls.push(item);
      } else {
        other_calls.push(item);
      }
    }
  }, this);

  var execute = function execute(calls, context) {
    _utils._.each(calls, function (item) {
      if (_utils._.isArray(item[0])) {
        // chained call
        var caller = context;

        _utils._.each(item, function (call) {
          caller = caller[call[0]].apply(caller, call.slice(1));
        });
      } else {
        this[item[0]].apply(this, item.slice(1));
      }
    }, context);
  };

  execute(alias_calls, this);
  execute(other_calls, this);
  execute(captureing_calls, this);
};
/**
 * push() keeps the standard async-array-push
 * behavior around after the lib is loaded.
 * This is only useful for external integrations that
 * do not wish to rely on our convenience methods
 * (created in the snippet).
 *
 * ### Usage:
 *     posthog.push(['register', { a: 'b' }]);
 *
 * @param {Array} item A [function_name, args...] array to be executed
 */


PostHogLib.prototype.push = function (item) {
  this._execute_array([item]);
};
/**
 * Disable events on the PostHog object. If passed no arguments,
 * this function disables captureing of any event. If passed an
 * array of event names, those events will be disabled, but other
 * events will continue to be captureed.
 *
 * Note: this function does not stop other posthog functions from
 * firing, such as register() or people.set().
 *
 * @param {Array} [events] An array of event names to disable
 */


PostHogLib.prototype.disable = function (events) {
  if (typeof events === 'undefined') {
    this._flags.disable_all_events = true;
  } else {
    this.__disabled_events = this.__disabled_events.concat(events);
  }
};
/**
 * Capture an event. This is the most important and
 * frequently used PostHog function.
 *
 * ### Usage:
 *
 *     // capture an event named 'Registered'
 *     posthog.capture('Registered', {'Gender': 'Male', 'Age': 21});
 *
 *     // capture an event using navigator.sendBeacon
 *     posthog.capture('Left page', {'duration_seconds': 35}, {transport: 'sendBeacon'});
 *
 * To capture link clicks or form submissions, see capture_links() or capture_forms().
 *
 * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
 * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
 * @param {Object} [options] Optional configuration for this capture request.
 * @param {String} [options.transport] Transport method for network request ('xhr' or 'sendBeacon').
 * @param {Function} [callback] If provided, the callback function will be called after captureing the event.
 */


PostHogLib.prototype.capture = (0, _gdprUtils.addOptOutCheckPostHogLib)(function (event_name, properties, options, callback) {
  if (!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }

  options = options || __NOOPTIONS;
  var transport = options['transport']; // external API, don't minify 'transport' prop

  if (transport) {
    options.transport = transport; // 'transport' prop name can be minified internally
  }

  if (typeof callback !== 'function') {
    callback = __NOOP;
  }

  if (_utils._.isUndefined(event_name)) {
    _utils.console.error('No event name provided to posthog.capture');

    return;
  }

  if (this._event_is_disabled(event_name)) {
    callback(0);
    return;
  } // set defaults


  properties = properties || {};
  properties['token'] = this.get_config('token'); // set $duration if time_event was previously called for this event

  var start_timestamp = this['persistence'].remove_event_timer(event_name);

  if (!_utils._.isUndefined(start_timestamp)) {
    var duration_in_ms = new Date().getTime() - start_timestamp;
    properties['$duration'] = parseFloat((duration_in_ms / 1000).toFixed(3));
  } // update persistence


  this['persistence'].update_search_keyword(_utils.document.referrer);

  if (this.get_config('store_google')) {
    this['persistence'].update_campaign_params();
  }

  if (this.get_config('save_referrer')) {
    this['persistence'].update_referrer_info(_utils.document.referrer);
  } // note: extend writes to the first object, so lets make sure we
  // don't write to the persistence properties object and info
  // properties object by passing in a new object
  // update properties with pageview info and super-properties


  properties = _utils._.extend({}, _utils._.info.properties(), this['persistence'].properties(), properties);
  var property_blacklist = this.get_config('property_blacklist');

  if (_utils._.isArray(property_blacklist)) {
    _utils._.each(property_blacklist, function (blacklisted_prop) {
      delete properties[blacklisted_prop];
    });
  } else {
    _utils.console.error('Invalid value for property_blacklist config: ' + property_blacklist);
  }

  var data = {
    'event': event_name,
    'properties': properties
  };

  var truncated_data = _utils._.truncate(data, 255);

  var json_data = _utils._.JSONEncode(truncated_data);

  var encoded_data = _utils._.base64Encode(json_data);

  var url = this.get_config('api_host') + '/e/';
  var data_object = {
    'data': encoded_data
  };

  var cb = this._prepare_callback(callback, truncated_data);

  var has_unique_traits = callback !== __NOOP || options !== __NOOPTIONS;
  var args = [url, data_object, options, cb];

  if (!this.get_config('request_batching') || has_unique_traits) {
    this._send_request.apply(this, args);
  } else {
    data_object.data = truncated_data;

    this._event_enqueue.apply(this, args);
  }

  return truncated_data;
});
/**
 * Register the current user into one/many groups.
 *
 * ### Usage:
 *
 *      posthog.set_group('company', ['posthog', 'google']) // an array of IDs
 *      posthog.set_group('company', 'posthog')
 *      posthog.set_group('company', 128746312)
 *
 * @param {String} group_key Group key
 * @param {Array|String|Number} group_ids An array of group IDs, or a singular group ID
 * @param {Function} [callback] If provided, the callback will be called after captureing the event.
 *
 */

PostHogLib.prototype.set_group = (0, _gdprUtils.addOptOutCheckPostHogLib)(function (group_key, group_ids, callback) {
  if (!_utils._.isArray(group_ids)) {
    group_ids = [group_ids];
  }

  var prop = {};
  prop[group_key] = group_ids;
  this.register(prop);
  return this['people'].set(group_key, group_ids, callback);
});
/**
 * Add a new group for this user.
 *
 * ### Usage:
 *
 *      posthog.add_group('company', 'posthog')
 *
 * @param {String} group_key Group key
 * @param {*} group_id A valid PostHog property type
 * @param {Function} [callback] If provided, the callback will be called after captureing the event.
 */

PostHogLib.prototype.add_group = (0, _gdprUtils.addOptOutCheckPostHogLib)(function (group_key, group_id, callback) {
  var old_values = this.get_property(group_key);

  if (old_values === undefined) {
    var prop = {};
    prop[group_key] = [group_id];
    this.register(prop);
  } else {
    if (old_values.indexOf(group_id) === -1) {
      old_values.push(group_id);
      this.register(prop);
    }
  }

  return this['people'].union(group_key, group_id, callback);
});
/**
 * Remove a group from this user.
 *
 * ### Usage:
 *
 *      posthog.remove_group('company', 'posthog')
 *
 * @param {String} group_key Group key
 * @param {*} group_id A valid PostHog property type
 * @param {Function} [callback] If provided, the callback will be called after captureing the event.
 */

PostHogLib.prototype.remove_group = (0, _gdprUtils.addOptOutCheckPostHogLib)(function (group_key, group_id, callback) {
  var old_value = this.get_property(group_key); // if the value doesn't exist, the persistent store is unchanged

  if (old_value !== undefined) {
    var idx = old_value.indexOf(group_id);

    if (idx > -1) {
      old_value.splice(idx, 1);
      this.register({
        group_key: old_value
      });
    }

    if (old_value.length === 0) {
      this.unregister(group_key);
    }
  }

  return this['people'].remove(group_key, group_id, callback);
});
/**
 * Capture an event with specific groups.
 *
 * ### Usage:
 *
 *      posthog.capture_with_groups('purchase', {'product': 'iphone'}, {'University': ['UCB', 'UCLA']})
 *
 * @param {String} event_name The name of the event (see `posthog.capture()`)
 * @param {Object=} properties A set of properties to include with the event you're sending (see `posthog.capture()`)
 * @param {Object=} groups An object mapping group name keys to one or more values
 * @param {Function} [callback] If provided, the callback will be called after captureing the event.
 */

PostHogLib.prototype.capture_with_groups = (0, _gdprUtils.addOptOutCheckPostHogLib)(function (event_name, properties, groups, callback) {
  var captureing_props = _utils._.extend({}, properties || {});

  _utils._.each(groups, function (v, k) {
    if (v !== null && v !== undefined) {
      captureing_props[k] = v;
    }
  });

  return this.capture(event_name, captureing_props, callback);
});

PostHogLib.prototype._create_map_key = function (group_key, group_id) {
  return group_key + '_' + JSON.stringify(group_id);
};

PostHogLib.prototype._remove_group_from_cache = function (group_key, group_id) {
  delete this._cached_groups[this._create_map_key(group_key, group_id)];
};
/**
 * Look up reference to a PostHog group
 *
 * ### Usage:
 *
 *       posthog.get_group(group_key, group_id)
 *
 * @param {String} group_key Group key
 * @param {Object} group_id A valid PostHog property type
 * @returns {Object} A PostHogGroup identifier
 */


PostHogLib.prototype.get_group = function (group_key, group_id) {
  var map_key = this._create_map_key(group_key, group_id);

  var group = this._cached_groups[map_key];

  if (group === undefined || group._group_key !== group_key || group._group_id !== group_id) {
    group = new _posthogGroup.PostHogGroup();

    group._init(this, group_key, group_id);

    this._cached_groups[map_key] = group;
  }

  return group;
};
/**
 * Capture a page view event, which is currently ignored by the server.
 * This function is called by default on page load unless the
 * capture_pageview configuration variable is false.
 *
 * @param {String} [page] The url of the page to record. If you don't include this, it defaults to the current url.
 * @api private
 */


PostHogLib.prototype.capture_pageview = function (page) {
  if (_utils._.isUndefined(page)) {
    page = _utils.document.location.href;
  }

  this.capture('$pageview');
};
/**
 * Capture clicks on a set of document elements. Selector must be a
 * valid query. Elements must exist on the page at the time capture_links is called.
 *
 * ### Usage:
 *
 *     // capture click for link id #nav
 *     posthog.capture_links('#nav', 'Clicked Nav Link');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the PostHog
 * servers to respond. If they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been captureed.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to posthog as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to capture
 * @param {Object|Function} [properties] A properties object or function that returns a dictionary of properties when passed a DOMElement
 */


PostHogLib.prototype.capture_links = function () {
  return this._capture_dom.call(this, _domCapture.LinkCapture, arguments);
};
/**
 * Capture form submissions. Selector must be a valid query.
 *
 * ### Usage:
 *
 *     // capture submission for form id 'register'
 *     posthog.capture_forms('#register', 'Created Account');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the posthog
 * servers to respond, if they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been captureed.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to posthog as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to capture
 * @param {Object|Function} [properties] This can be a set of properties, or a function that returns a set of properties after being passed a DOMElement
 */


PostHogLib.prototype.capture_forms = function () {
  return this._capture_dom.call(this, FormCaptureer, arguments);
};
/**
 * Time an event by including the time between this call and a
 * later 'capture' call for the same event in the properties sent
 * with the event.
 *
 * ### Usage:
 *
 *     // time an event named 'Registered'
 *     posthog.time_event('Registered');
 *     posthog.capture('Registered', {'Gender': 'Male', 'Age': 21});
 *
 * When called for a particular event name, the next capture call for that event
 * name will include the elapsed time between the 'time_event' and 'capture'
 * calls. This value is stored as seconds in the '$duration' property.
 *
 * @param {String} event_name The name of the event.
 */


PostHogLib.prototype.time_event = function (event_name) {
  if (_utils._.isUndefined(event_name)) {
    _utils.console.error('No event name provided to posthog.time_event');

    return;
  }

  if (this._event_is_disabled(event_name)) {
    return;
  }

  this['persistence'].set_event_timer(event_name, new Date().getTime());
};
/**
 * Register a set of super properties, which are included with all
 * events. This will overwrite previous super property values.
 *
 * ### Usage:
 *
 *     // register 'Gender' as a super property
 *     posthog.register({'Gender': 'Female'});
 *
 *     // register several super properties when a user signs up
 *     posthog.register({
 *         'Email': 'jdoe@example.com',
 *         'Account Type': 'Free'
 *     });
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {Number} [days] How many days since the user's last visit to store the super properties
 */


PostHogLib.prototype.register = function (props, days) {
  this['persistence'].register(props, days);
};
/**
 * Register a set of super properties only once. This will not
 * overwrite previous super property values, unlike register().
 *
 * ### Usage:
 *
 *     // register a super property for the first time only
 *     posthog.register_once({
 *         'First Login Date': new Date().toISOString()
 *     });
 *
 * ### Notes:
 *
 * If default_value is specified, current super properties
 * with that value will be overwritten.
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
 * @param {Number} [days] How many days since the users last visit to store the super properties
 */


PostHogLib.prototype.register_once = function (props, default_value, days) {
  this['persistence'].register_once(props, default_value, days);
};
/**
 * Delete a super property stored with the current user.
 *
 * @param {String} property The name of the super property to remove
 */


PostHogLib.prototype.unregister = function (property) {
  this['persistence'].unregister(property);
};

PostHogLib.prototype._register_single = function (prop, value) {
  var props = {};
  props[prop] = value;
  this.register(props);
};
/**
 * Identify a user with a unique ID instead of a PostHog
 * randomly generated distinct_id. If the method is never called,
 * then unique visitors will be identified by a UUID generated
 * the first time they visit the site.
 *
 * ### Notes:
 *
 * You can call this function to overwrite a previously set
 * unique ID for the current user. PostHog cannot translate
 * between IDs at this time, so when you change a user's ID
 * they will appear to be a new user.
 *
 * When used alone, posthog.identify will change the user's
 * distinct_id to the unique ID provided. When used in tandem
 * with posthog.alias, it will allow you to identify based on
 * unique ID and map that back to the original, anonymous
 * distinct_id given to the user upon her first arrival to your
 * site (thus connecting anonymous pre-signup activity to
 * post-signup activity). Though the two work together, do not
 * call identify() at the same time as alias(). Calling the two
 * at the same time can cause a race condition, so it is best
 * practice to call identify on the original, anonymous ID
 * right after you've aliased it.
 * <a href="https://posthog.com/help/questions/articles/how-should-i-handle-my-user-identity-with-the-posthog-javascript-library">Learn more about how posthog.identify and posthog.alias can be used</a>.
 *
 * @param {String} [unique_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
 */


PostHogLib.prototype.identify = function (new_distinct_id, _set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback, _unset_callback, _remove_callback) {
  // Optional Parameters
  //  _set_callback:function  A callback to be run if and when the People set queue is flushed
  //  _add_callback:function  A callback to be run if and when the People add queue is flushed
  //  _append_callback:function  A callback to be run if and when the People append queue is flushed
  //  _set_once_callback:function  A callback to be run if and when the People set_once queue is flushed
  //  _union_callback:function  A callback to be run if and when the People union queue is flushed
  //  _unset_callback:function  A callback to be run if and when the People unset queue is flushed
  var previous_distinct_id = this.get_distinct_id();
  this.register({
    '$user_id': new_distinct_id
  });

  if (!this.get_property('$device_id')) {
    // The persisted distinct id might not actually be a device id at all
    // it might be a distinct id of the user from before
    var device_id = previous_distinct_id;
    this.register_once({
      '$had_persisted_distinct_id': true,
      '$device_id': device_id
    }, '');
  } // identify only changes the distinct id if it doesn't match either the existing or the alias;
  // if it's new, blow away the alias as well.


  if (new_distinct_id !== previous_distinct_id && new_distinct_id !== this.get_property(_posthogPersistence.ALIAS_ID_KEY)) {
    this.unregister(_posthogPersistence.ALIAS_ID_KEY);
    this.register({
      'distinct_id': new_distinct_id
    });
  } // this._check_and_handle_notifications(this.get_distinct_id());


  this._flags.identify_called = true; // Flush any queued up people requests

  this['people']._flush(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback, _unset_callback, _remove_callback); // send an $identify event any time the distinct_id is changing - logic on the server
  // will determine whether or not to do anything with it.


  if (new_distinct_id !== previous_distinct_id) {
    this.capture('$identify', {
      'distinct_id': new_distinct_id,
      '$anon_distinct_id': previous_distinct_id
    });
  }
};
/**
 * Clears super properties and generates a new random distinct_id for this instance.
 * Useful for clearing data when a user logs out.
 */


PostHogLib.prototype.reset = function () {
  this['persistence'].clear();
  this._flags.identify_called = false;

  var uuid = _utils._.UUID();

  this.register_once({
    'distinct_id': uuid,
    '$device_id': uuid
  }, '');
};
/**
 * Returns the current distinct id of the user. This is either the id automatically
 * generated by the library or the id that has been passed by a call to identify().
 *
 * ### Notes:
 *
 * get_distinct_id() can only be called after the PostHog library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // set distinct_id after the posthog library has loaded
 *     posthog.init('YOUR PROJECT TOKEN', {
 *         loaded: function(posthog) {
 *             distinct_id = posthog.get_distinct_id();
 *         }
 *     });
 */


PostHogLib.prototype.get_distinct_id = function () {
  return this.get_property('distinct_id');
};
/**
 * Create an alias, which PostHog will use to link two distinct_ids going forward (not retroactively).
 * Multiple aliases can map to the same original ID, but not vice-versa. Aliases can also be chained - the
 * following is a valid scenario:
 *
 *     posthog.alias('new_id', 'existing_id');
 *     ...
 *     posthog.alias('newer_id', 'new_id');
 *
 * If the original ID is not passed in, we will use the current distinct_id - probably the auto-generated GUID.
 *
 * ### Notes:
 *
 * The best practice is to call alias() when a unique ID is first created for a user
 * (e.g., when a user first registers for an account and provides an email address).
 * alias() should never be called more than once for a given user, except to
 * chain a newer ID to a previously new ID, as described above.
 *
 * @param {String} alias A unique identifier that you want to use for this user in the future.
 * @param {String} [original] The current identifier being used for this user.
 */


PostHogLib.prototype.alias = function (alias, original) {
  // If the $people_distinct_id key exists in persistence, there has been a previous
  // posthog.people.identify() call made for this user. It is VERY BAD to make an alias with
  // this ID, as it will duplicate users.
  if (alias === this.get_property(_posthogPersistence.PEOPLE_DISTINCT_ID_KEY)) {
    _utils.console.critical('Attempting to create alias for existing People user - aborting.');

    return -2;
  }

  var _this = this;

  if (_utils._.isUndefined(original)) {
    original = this.get_distinct_id();
  }

  if (alias !== original) {
    this._register_single(_posthogPersistence.ALIAS_ID_KEY, alias);

    return this.capture('$create_alias', {
      'alias': alias,
      'distinct_id': original
    }, function () {
      // Flush the people queue
      _this.identify(alias);
    });
  } else {
    _utils.console.error('alias matches current distinct_id - skipping api call.');

    this.identify(alias);
    return -1;
  }
};
/**
 * Provide a string to recognize the user by. The string passed to
 * this method will appear in the PostHog Streams product rather
 * than an automatically generated name. Name tags do not have to
 * be unique.
 *
 * This value will only be included in Streams data.
 *
 * @param {String} name_tag A human readable name for the user
 * @api private
 */


PostHogLib.prototype.name_tag = function (name_tag) {
  this._register_single('ph_name_tag', name_tag);
};
/**
 * Update the configuration of a posthog library instance.
 *
 * The default config is:
 *
 *     {
 *       // HTTP method for captureing requests
 *       api_method: 'POST'
 *
 *       // transport for sending requests ('XHR' or 'sendBeacon')
 *       // NB: sendBeacon should only be used for scenarios such as
 *       // page unload where a "best-effort" attempt to send is
 *       // acceptable; the sendBeacon API does not support callbacks
 *       // or any way to know the result of the request. PostHog
 *       // captureing via sendBeacon will not support any event-
 *       // batching or retry mechanisms.
 *       api_transport: 'XHR'
 *
 *       // super properties cookie expiration (in days)
 *       cookie_expiration: 365
 *
 *       // super properties span subdomains
 *       cross_subdomain_cookie: true
 *
 *       // debug mode
 *       debug: false
 *
 *       // if this is true, the posthog cookie or localStorage entry
 *       // will be deleted, and no user persistence will take place
 *       disable_persistence: false
 *
 *       // if this is true, PostHog will automatically determine
 *       // City, Region and Country data using the IP address of
 *       //the client
 *       ip: true
 *
 *       // opt users out of captureing by this PostHog instance by default
 *       opt_out_captureing_by_default: false
 *
 *       // opt users out of browser data storage by this PostHog instance by default
 *       opt_out_persistence_by_default: false
 *
 *       // persistence mechanism used by opt-in/opt-out methods - cookie
 *       // or localStorage - falls back to cookie if localStorage is unavailable
 *       opt_out_captureing_persistence_type: 'localStorage'
 *
 *       // customize the name of cookie/localStorage set by opt-in/opt-out methods
 *       opt_out_captureing_cookie_prefix: null
 *
 *       // type of persistent store for super properties (cookie/
 *       // localStorage) if set to 'localStorage', any existing
 *       // posthog cookie value with the same persistence_name
 *       // will be transferred to localStorage and deleted
 *       persistence: 'cookie'
 *
 *       // name for super properties persistent store
 *       persistence_name: ''
 *
 *       // names of properties/superproperties which should never
 *       // be sent with capture() calls
 *       property_blacklist: []
 *
 *       // if this is true, posthog cookies will be marked as
 *       // secure, meaning they will only be transmitted over https
 *       secure_cookie: false
 *
 *       // the amount of time capture_links will
 *       // wait for PostHog's servers to respond
 *       capture_links_timeout: 300
 *
 *       // should we capture a page view on page load
 *       capture_pageview: true
 *
 *       // if you set upgrade to be true, the library will check for
 *       // a cookie from our old js library and import super
 *       // properties from it, then the old cookie is deleted
 *       // The upgrade config option only works in the initialization,
 *       // so make sure you set it when you create the library.
 *       upgrade: false
 *
 *       // extra HTTP request headers to set for each API request, in
 *       // the format {'Header-Name': value}
 *       xhr_headers: {}
 *
 *       // protocol for fetching in-app message resources, e.g.
 *       // 'https://' or 'http://'; defaults to '//' (which defers to the
 *       // current page's protocol)
 *       inapp_protocol: '//'
 *
 *       // whether to open in-app message link in new tab/window
 *       inapp_link_new_window: false
 *     }
 *
 *
 * @param {Object} config A dictionary of new configuration values to update
 */


PostHogLib.prototype.set_config = function (config) {
  if (_utils._.isObject(config)) {
    _utils._.extend(this['config'], config);

    if (!this.get_config('persistence_name')) {
      this['config']['persistence_name'] = this['config']['cookie_name'];
    }

    if (!this.get_config('disable_persistence')) {
      this['config']['disable_persistence'] = this['config']['disable_cookie'];
    }

    if (this['persistence']) {
      this['persistence'].update_config(this['config']);
    }

    _config.default.DEBUG = _config.default.DEBUG || this.get_config('debug');
  }
};
/**
 * returns the current config object for the library.
 */


PostHogLib.prototype.get_config = function (prop_name) {
  return this['config'][prop_name];
};
/**
 * Returns the value of the super property named property_name. If no such
 * property is set, get_property() will return the undefined value.
 *
 * ### Notes:
 *
 * get_property() can only be called after the PostHog library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // grab value for 'user_id' after the posthog library has loaded
 *     posthog.init('YOUR PROJECT TOKEN', {
 *         loaded: function(posthog) {
 *             user_id = posthog.get_property('user_id');
 *         }
 *     });
 *
 * @param {String} property_name The name of the super property you want to retrieve
 */


PostHogLib.prototype.get_property = function (property_name) {
  return this['persistence']['props'][property_name];
};

PostHogLib.prototype.toString = function () {
  var name = this.get_config('name');

  if (name !== PRIMARY_INSTANCE_NAME) {
    name = PRIMARY_INSTANCE_NAME + '.' + name;
  }

  return name;
};

PostHogLib.prototype._event_is_disabled = function (event_name) {
  return _utils._.isBlockedUA(_utils.userAgent) || this._flags.disable_all_events || _utils._.include(this.__disabled_events, event_name);
};

PostHogLib.prototype._handle_user_decide_check_complete = function () {
  this._user_decide_check_complete = true;
}; // perform some housekeeping around GDPR opt-in/out state


PostHogLib.prototype._gdpr_init = function () {
  var is_localStorage_requested = this.get_config('opt_out_captureing_persistence_type') === 'localStorage'; // try to convert opt-in/out cookies to localStorage if possible

  if (is_localStorage_requested && _utils._.localStorage.is_supported()) {
    if (!this.has_opted_in_captureing() && this.has_opted_in_captureing({
      'persistence_type': 'cookie'
    })) {
      this.opt_in_captureing({
        'enable_persistence': false
      });
    }

    if (!this.has_opted_out_captureing() && this.has_opted_out_captureing({
      'persistence_type': 'cookie'
    })) {
      this.opt_out_captureing({
        'clear_persistence': false
      });
    }

    this.clear_opt_in_out_captureing({
      'persistence_type': 'cookie',
      'enable_persistence': false
    });
  } // check whether the user has already opted out - if so, clear & disable persistence


  if (this.has_opted_out_captureing()) {
    this._gdpr_update_persistence({
      'clear_persistence': true
    }); // check whether we should opt out by default
    // note: we don't clear persistence here by default since opt-out default state is often
    //       used as an initial state while GDPR information is being collected

  } else if (!this.has_opted_in_captureing() && (this.get_config('opt_out_captureing_by_default') || _utils._.cookie.get('ph_optout'))) {
    _utils._.cookie.remove('ph_optout');

    this.opt_out_captureing({
      'clear_persistence': this.get_config('opt_out_persistence_by_default')
    });
  }
};
/**
 * Enable or disable persistence based on options
 * only enable/disable if persistence is not already in this state
 * @param {boolean} [options.clear_persistence] If true, will delete all data stored by the sdk in persistence and disable it
 * @param {boolean} [options.enable_persistence] If true, will re-enable sdk persistence
 */


PostHogLib.prototype._gdpr_update_persistence = function (options) {
  var disabled;

  if (options && options['clear_persistence']) {
    disabled = true;
  } else if (options && options['enable_persistence']) {
    disabled = false;
  } else {
    return;
  }

  if (!this.get_config('disable_persistence') && this['persistence'].disabled !== disabled) {
    this['persistence'].set_disabled(disabled);
  }
}; // call a base gdpr function after constructing the appropriate token and options args


PostHogLib.prototype._gdpr_call_func = function (func, options) {
  options = _utils._.extend({
    'capture': _utils._.bind(this.capture, this),
    'persistence_type': this.get_config('opt_out_captureing_persistence_type'),
    'cookie_prefix': this.get_config('opt_out_captureing_cookie_prefix'),
    'cookie_expiration': this.get_config('cookie_expiration'),
    'cross_subdomain_cookie': this.get_config('cross_subdomain_cookie'),
    'secure_cookie': this.get_config('secure_cookie')
  }, options); // check if localStorage can be used for recording opt out status, fall back to cookie if not

  if (!_utils._.localStorage.is_supported()) {
    options['persistence_type'] = 'cookie';
  }

  return func(this.get_config('token'), {
    capture: options['capture'],
    captureEventName: options['capture_event_name'],
    captureProperties: options['capture_properties'],
    persistenceType: options['persistence_type'],
    persistencePrefix: options['cookie_prefix'],
    cookieExpiration: options['cookie_expiration'],
    crossSubdomainCookie: options['cross_subdomain_cookie'],
    secureCookie: options['secure_cookie']
  });
};
/**
 * Opt the user in to data captureing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     // opt user in
 *     posthog.opt_in_captureing();
 *
 *     // opt user in with specific event name, properties, cookie configuration
 *     posthog.opt_in_captureing({
 *         capture_event_name: 'User opted in',
 *         capture_event_properties: {
 *             'Email': 'jdoe@example.com'
 *         },
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {function} [options.capture] Function used for captureing a PostHog event to record the opt-in action (default is this PostHog instance's capture method)
 * @param {string} [options.capture_event_name=$opt_in] Event name to be used for captureing the opt-in action
 * @param {Object} [options.capture_properties] Set of properties to be captureed along with the opt-in action
 * @param {boolean} [options.enable_persistence=true] If true, will re-enable sdk persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this PostHog instance's config)
 */


PostHogLib.prototype.opt_in_captureing = function (options) {
  options = _utils._.extend({
    'enable_persistence': true
  }, options);

  this._gdpr_call_func(_gdprUtils.optIn, options);

  this._gdpr_update_persistence(options);
};
/**
 * Opt the user out of data captureing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     // opt user out
 *     posthog.opt_out_captureing();
 *
 *     // opt user out with different cookie configuration from PostHog instance
 *     posthog.opt_out_captureing({
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {boolean} [options.delete_user=true] If true, will delete the currently identified user's profile and clear all charges after opting the user out
 * @param {boolean} [options.clear_persistence=true] If true, will delete all data stored by the sdk in persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this PostHog instance's config)
 */


PostHogLib.prototype.opt_out_captureing = function (options) {
  options = _utils._.extend({
    'clear_persistence': true,
    'delete_user': true
  }, options); // delete use and clear charges since these methods may be disabled by opt-out

  if (options['delete_user'] && this['people'] && this['people']._identify_called()) {
    this['people'].delete_user();
    this['people'].clear_charges();
  }

  this._gdpr_call_func(_gdprUtils.optOut, options);

  this._gdpr_update_persistence(options);
};
/**
 * Check whether the user has opted in to data captureing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     var has_opted_in = posthog.has_opted_in_captureing();
 *     // use has_opted_in value
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} current opt-in status
 */


PostHogLib.prototype.has_opted_in_captureing = function (options) {
  return this._gdpr_call_func(_gdprUtils.hasOptedIn, options);
};
/**
 * Check whether the user has opted out of data captureing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     var has_opted_out = posthog.has_opted_out_captureing();
 *     // use has_opted_out value
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} current opt-out status
 */


PostHogLib.prototype.has_opted_out_captureing = function (options) {
  return this._gdpr_call_func(_gdprUtils.hasOptedOut, options);
};
/**
 * Clear the user's opt in/out status of data captureing and cookies/localstorage for this PostHog instance
 *
 * ### Usage
 *
 *     // clear user's opt-in/out status
 *     posthog.clear_opt_in_out_captureing();
 *
 *     // clear user's opt-in/out status with specific cookie configuration - should match
 *     // configuration used when opt_in_captureing/opt_out_captureing methods were called.
 *     posthog.clear_opt_in_out_captureing({
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {boolean} [options.enable_persistence=true] If true, will re-enable sdk persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__ph_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this PostHog instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this PostHog instance's config)
 */


PostHogLib.prototype.clear_opt_in_out_captureing = function (options) {
  options = _utils._.extend({
    'enable_persistence': true
  }, options);

  this._gdpr_call_func(_gdprUtils.clearOptInOut, options);

  this._gdpr_update_persistence(options);
}; // EXPORTS (for closure compiler)
// PostHogLib Exports


PostHogLib.prototype['init'] = PostHogLib.prototype.init;
PostHogLib.prototype['reset'] = PostHogLib.prototype.reset;
PostHogLib.prototype['disable'] = PostHogLib.prototype.disable;
PostHogLib.prototype['time_event'] = PostHogLib.prototype.time_event;
PostHogLib.prototype['capture'] = PostHogLib.prototype.capture;
PostHogLib.prototype['capture_links'] = PostHogLib.prototype.capture_links;
PostHogLib.prototype['capture_forms'] = PostHogLib.prototype.capture_forms;
PostHogLib.prototype['capture_pageview'] = PostHogLib.prototype.capture_pageview;
PostHogLib.prototype['register'] = PostHogLib.prototype.register;
PostHogLib.prototype['register_once'] = PostHogLib.prototype.register_once;
PostHogLib.prototype['unregister'] = PostHogLib.prototype.unregister;
PostHogLib.prototype['identify'] = PostHogLib.prototype.identify;
PostHogLib.prototype['alias'] = PostHogLib.prototype.alias;
PostHogLib.prototype['name_tag'] = PostHogLib.prototype.name_tag;
PostHogLib.prototype['set_config'] = PostHogLib.prototype.set_config;
PostHogLib.prototype['get_config'] = PostHogLib.prototype.get_config;
PostHogLib.prototype['get_property'] = PostHogLib.prototype.get_property;
PostHogLib.prototype['get_distinct_id'] = PostHogLib.prototype.get_distinct_id;
PostHogLib.prototype['toString'] = PostHogLib.prototype.toString;
PostHogLib.prototype['_check_and_handle_notifications'] = PostHogLib.prototype._check_and_handle_notifications;
PostHogLib.prototype['_handle_user_decide_check_complete'] = PostHogLib.prototype._handle_user_decide_check_complete; // PostHogLib.prototype['_show_notification']                 = PostHogLib.prototype._show_notification;

PostHogLib.prototype['opt_out_captureing'] = PostHogLib.prototype.opt_out_captureing;
PostHogLib.prototype['opt_in_captureing'] = PostHogLib.prototype.opt_in_captureing;
PostHogLib.prototype['has_opted_out_captureing'] = PostHogLib.prototype.has_opted_out_captureing;
PostHogLib.prototype['has_opted_in_captureing'] = PostHogLib.prototype.has_opted_in_captureing;
PostHogLib.prototype['clear_opt_in_out_captureing'] = PostHogLib.prototype.clear_opt_in_out_captureing;
PostHogLib.prototype['get_group'] = PostHogLib.prototype.get_group;
PostHogLib.prototype['set_group'] = PostHogLib.prototype.set_group;
PostHogLib.prototype['add_group'] = PostHogLib.prototype.add_group;
PostHogLib.prototype['remove_group'] = PostHogLib.prototype.remove_group;
PostHogLib.prototype['capture_with_groups'] = PostHogLib.prototype.capture_with_groups; // PostHogPersistence Exports

_posthogPersistence.PostHogPersistence.prototype['properties'] = _posthogPersistence.PostHogPersistence.prototype.properties;
_posthogPersistence.PostHogPersistence.prototype['update_search_keyword'] = _posthogPersistence.PostHogPersistence.prototype.update_search_keyword;
_posthogPersistence.PostHogPersistence.prototype['update_referrer_info'] = _posthogPersistence.PostHogPersistence.prototype.update_referrer_info;
_posthogPersistence.PostHogPersistence.prototype['get_cross_subdomain'] = _posthogPersistence.PostHogPersistence.prototype.get_cross_subdomain;
_posthogPersistence.PostHogPersistence.prototype['clear'] = _posthogPersistence.PostHogPersistence.prototype.clear;

_utils._.safewrap_class(PostHogLib, ['identify', '_check_and_handle_notifications']);

var instances = {};

var extend_mp = function extend_mp() {
  // add all the sub posthog instances
  _utils._.each(instances, function (instance, name) {
    if (name !== PRIMARY_INSTANCE_NAME) {
      posthog_master[name] = instance;
    }
  }); // add private functions as _


  posthog_master['_'] = _utils._;
};

var override_ph_init_func = function override_ph_init_func() {
  // we override the snippets init function to handle the case where a
  // user initializes the posthog library after the script loads & runs
  posthog_master['init'] = function (token, config, name) {
    if (name) {
      // initialize a sub library
      if (!posthog_master[name]) {
        posthog_master[name] = instances[name] = create_mplib(token, config, name);

        posthog_master[name]._loaded();
      }

      return posthog_master[name];
    } else {
      var instance = posthog_master;

      if (instances[PRIMARY_INSTANCE_NAME]) {
        // main posthog lib already initialized
        instance = instances[PRIMARY_INSTANCE_NAME];
      } else if (token) {
        // intialize the main posthog lib
        instance = create_mplib(token, config, PRIMARY_INSTANCE_NAME);

        instance._loaded();

        instances[PRIMARY_INSTANCE_NAME] = instance;
      }

      posthog_master = instance;

      if (init_type === INIT_SNIPPET) {
        _utils.window[PRIMARY_INSTANCE_NAME] = posthog_master;
      }

      extend_mp();
    }
  };
};

var add_dom_loaded_handler = function add_dom_loaded_handler() {
  // Cross browser DOM Loaded support
  function dom_loaded_handler() {
    // function flag since we only want to execute this once
    if (dom_loaded_handler.done) {
      return;
    }

    dom_loaded_handler.done = true;
    DOM_LOADED = true;
    ENQUEUE_REQUESTS = false;

    _utils._.each(instances, function (inst) {
      inst._dom_loaded();
    });
  }

  function do_scroll_check() {
    try {
      _utils.document.documentElement.doScroll('left');
    } catch (e) {
      setTimeout(do_scroll_check, 1);
      return;
    }

    dom_loaded_handler();
  }

  if (_utils.document.addEventListener) {
    if (_utils.document.readyState === 'complete') {
      // safari 4 can fire the DOMContentLoaded event before loading all
      // external JS (including this file). you will see some copypasta
      // on the internet that checks for 'complete' and 'loaded', but
      // 'loaded' is an IE thing
      dom_loaded_handler();
    } else {
      _utils.document.addEventListener('DOMContentLoaded', dom_loaded_handler, false);
    }
  } else if (_utils.document.attachEvent) {
    // IE
    _utils.document.attachEvent('onreadystatechange', dom_loaded_handler); // check to make sure we arn't in a frame


    var toplevel = false;

    try {
      toplevel = _utils.window.frameElement === null;
    } catch (e) {// noop
    }

    if (_utils.document.documentElement.doScroll && toplevel) {
      do_scroll_check();
    }
  } // fallback handler, always will work


  _utils._.register_event(_utils.window, 'load', dom_loaded_handler, true);
};

function init_from_snippet() {
  init_type = INIT_SNIPPET;
  if (_utils._.isUndefined(_utils.window.posthog)) _utils.window.posthog = [];
  posthog_master = _utils.window.posthog;

  if (posthog_master['__loaded'] || posthog_master['config'] && posthog_master['persistence']) {
    // lib has already been loaded at least once; we don't want to override the global object this time so bomb early
    _utils.console.error('PostHog library has already been downloaded at least once.');

    return;
  } // Load instances of the PostHog Library


  _utils._.each(posthog_master['_i'], function (item) {
    if (item && _utils._.isArray(item)) {
      instances[item[item.length - 1]] = create_mplib.apply(this, item);
    }
  });

  override_ph_init_func();
  posthog_master['init'](); // Fire loaded events after updating the window's posthog object

  _utils._.each(instances, function (instance) {
    instance._loaded();
  });

  add_dom_loaded_handler();
}

function init_as_module() {
  init_type = INIT_MODULE;
  posthog_master = new PostHogLib();
  override_ph_init_func();
  posthog_master['init']();
  add_dom_loaded_handler();
  return posthog_master;
}
},{"./config":"config.js","./utils":"utils.js","./autocapture":"autocapture.js","./dom-capture":"dom-capture.js","./posthog-group":"posthog-group.js","./posthog-people":"posthog-people.js","./posthog-persistence":"posthog-persistence.js","./gdpr-utils":"gdpr-utils.js"}],"loader-globals.js":[function(require,module,exports) {
"use strict";

var _posthogCore = require("./posthog-core");

/* eslint camelcase: "off" */
(0, _posthogCore.init_from_snippet)();
},{"./posthog-core":"posthog-core.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59071" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","loader-globals.js"], null)
//# sourceMappingURL=/array.js.map