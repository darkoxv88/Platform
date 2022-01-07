import { getRoot } from "../refs/root";

export function PlatformUtilityService() { 
  var _this = this;

  for (var key in _this) {
    if (!getRoot()[key]) {
      getRoot()[key] = _this[key];
    }
  }
}

PlatformUtilityService.prototype = { 
  isUndef: function(v) {
    return v === undefined || v === null;
  },

  isDef: function(v) {
    return v !== undefined && v !== null;
  },

  isTrue: function(v) {
    return v === true;
  },

  isFalse: function(v) {
    return v === false;
  },

  isPrimitive: function(v) {
    return (typeof(v) === 'string' || typeof(v) === 'number' || typeof(v) === 'symbol' || typeof(v) === 'boolean');
  },

  isObject: function(obj) {
    return (obj !== null && typeof(obj) === 'object');
  },

  isPlainObject: function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },

  isRegExp: function(v) {
    return Object.prototype.toString.call(v) === '[object RegExp]';
  },

  isValidArrayIndex: function(val) {
    var n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(val);
  },

  isPromise: function(v) {
    if (!v) {
      return false;
    }

    return (typeof(v.then) === 'function' && typeof(v.catch) === 'function');
  },

  noop: function() { },

  no: function() {
    return false;
  },

  hasProperty: function(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  },
}
