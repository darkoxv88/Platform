/**
  * 
	* @author Darko Petrovic
  * @Link Facebook: https://www.facebook.com/WitchkingOfAngmarr
  * @Link GitHub: https://github.com/darkoxv88
  * 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.


exports:

  window.Platform;

**/

(function() {
"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/refs/root.js
var _root_ = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : ({ });

function getRoot() {
  return _root_;
}

;// CONCATENATED MODULE: ./src/utility/once.js
function once() {
  var hasBeenCalled = false;

  return function(fn) {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      
      return fn();
    }
  }
}

;// CONCATENATED MODULE: ./src/utility/try-catch.js
function tryCatch(func, onError) {
  if (typeof func !== 'function') {
    return function() { }
  }

  return function() {
    try 
    {
      return func.apply(this, arguments);
    } 
    catch (e) 
    {
      if (typeof onError === 'function') {
        return onError(e)
      };
    }
  }
}

;// CONCATENATED MODULE: ./src/services/body-handler.js
function BodyHandlerService() { }

BodyHandlerService.prototype = {
  onBodyLoad: function(onLoad, onError) {
    if (document.readyState === 'complete') {
      return;
    }

    var init = tryCatch(onLoad, onError);

    if (window.addEventListener) {
      window.addEventListener("load", init, false);

      return;
    }
  
    if (window.attachEvent) {
      window.attachEvent('onload', init);

      return;
    }
  
    if (typeof window.onload == 'function') {
      var currentWindowOnLoad = window.onload;
  
      var newWindowOnLoad = function(evt) {
        currentWindowOnLoad(evt);
        init(evt);
      };
  
      window.onload = newWindowOnLoad;
      
      return;
    }
  
    window.onload = init;
  },

  isBodyLoaded: function() {
    if (document.readyState === 'complete') {
      return true;
    }

    return false;
  },

  getBody: function() {
    if (typeof document != 'undefined') {
      return document.body;
    }
  },
}

var BodyHandler = new BodyHandlerService();

;// CONCATENATED MODULE: ./src/services/browser.js
var isBrowser = (navigator.userAgent && typeof document === 'object' && !!document);

function BrowserService() {
  var hasV8BreakIterator = false;

  try
  {
    hasV8BreakIterator = (typeof(Intl) === 'object') ? (Intl.v8BreakIterator ? true : false) : false;
  }
  catch(err)
  {
    hasV8BreakIterator = false;
  }

  this.EDGE = isBrowser && /(edge)/i.test(navigator.userAgent);

  this.TRIDENT = isBrowser && /(msie|trident)/i.test(navigator.userAgent);

  this.BLINK = isBrowser && (!!(window.chrome || hasV8BreakIterator) && typeof CSS !== 'undefined' && !this.EDGE && !this.TRIDENT);

  this.WEBKIT = isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.EDGE && !this.TRIDENT && !this.BLINK;

  this.IOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);

  this.FIREFOX = isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);

  this.ANDROID = isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;

  this.SAFARI = isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
}

BrowserService.prototype = { 
  isBrowser: function() {
    return isBrowser;
  }
}

var Browser = new BrowserService();

;// CONCATENATED MODULE: ./src/services/supports.js
var supportsPassiveEvents = false;
var scrollBehaviorSupported = false;

if (typeof(getRoot().addEventListener) == 'function') {
  try 
  {
    window.addEventListener(
      'test', 
      null, 
      Object.defineProperty({ }, 'passive', { 
        get: function () { supportsPassiveEvents = true; } 
      })
    );
  }
  catch(err) { }
}

if (typeof(document) !== 'object' || !document || typeof(Element) !== 'function' || !Element) {
  scrollBehaviorSupported = false;
}
else if ('scrollBehavior' in document.documentElement.style) {
  scrollBehaviorSupported = true;
}
else if (Element.prototype.scrollTo) {
  scrollBehaviorSupported = !(/\{\s*\[native code\]\s*\}/.test(Element.prototype.scrollTo.toString()));
}

function SupportsService() { }

SupportsService.prototype = { 
  supportsPassiveEventListeners: function() {
    return supportsPassiveEvents;
  },
  
  supportsScrollBehavior: function() {
    return scrollBehaviorSupported;
  }
}

var Supports = new SupportsService();

;// CONCATENATED MODULE: ./src/utility/noop.js
function noop() { }

;// CONCATENATED MODULE: ./src/core/console.js
var _log = console.log;
var _info = console.info;
var _debug = console.debug;
var _warn = console.warn;
var _error = console.error;

function forceLog() {
  _log.apply(console, arguments);
}

function forceInfo() {
  _info.apply(console, arguments);
}

function forceDebug() {
  _debug.apply(console, arguments);
}

function forceWarn() {
  _warn.apply(console, arguments);
}

function forceError() {
  _error.apply(console, arguments);
}

console.log = forceLog;
console.info = forceInfo;
console.debug = forceDebug;
console.warn = forceWarn;
console.error = forceError;

function disableConsoleLogging() {
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
  console.error = noop;
}

function enableConsoleLogging() {
  console.log = forceLog;
  console.info = forceInfo;
  console.debug = forceDebug;
  console.warn = forceWarn;
  console.error = forceError;;
}

;// CONCATENATED MODULE: ./src/utility/has-own-property.js
function has_own_property_hasOwnProperty(obj, prop) {
  return (Object.prototype.hasOwnProperty.call(obj, prop))
}

;// CONCATENATED MODULE: ./src/core/webpack.js
var _modules = ({ });
var _moduleCache = ({ });
var _globalExports = ({ });

function Webpack() { }

Webpack.prototype = { }

Webpack.require = function(moduleId) {
  if (!(_modules[moduleId])) {
    return { };
  }

  if (_moduleCache[moduleId] !== undefined) {
    return _moduleCache[moduleId].exports;
  }

  _moduleCache[moduleId] = {
    id: moduleId,
    loaded: false,
    exports: ({ })
  };

  try
  {
    _modules[moduleId](_moduleCache[moduleId].exports, Webpack);

    _moduleCache[moduleId].loaded = true;

    return _moduleCache[moduleId].exports;
  }
  catch (err)
  {
    console.error('There was an error while loading module "' + moduleId +'".');

    throw err;
  }
}

Webpack.define = function(exports, definition) {
  for(var key in definition) {
    if(has_own_property_hasOwnProperty(definition, key) && !has_own_property_hasOwnProperty(exports, key)) {
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    }
  }
}

Webpack.export = function(key, definition) {
  if (typeof(key) !== 'string') {
    return;
  }

  Object.defineProperty(_globalExports, key, { enumerable: true, get: definition });
}

function initializeModule(id) {
  return Webpack.require(id);
}

function installChunk(chunkId, modules, runtime) {
  if (typeof(chunkId) !== 'string') {
    chunkId = 'noname';
  }

  if (typeof(modules) !== 'object' || !modules) {
    modules = ({ });
  }

  for(var moduleKey in modules) {
    if (has_own_property_hasOwnProperty(_modules, moduleKey)) {
      console.warn('Module named "' + moduleKey + '" already exists!');

      continue;
    }

    _modules[moduleKey] = modules[moduleKey];
  }

  if(typeof(runtime) === 'function') {
    runtime(Webpack);
  }
}

function importToGlobal(exe) {
  var _exe = function(key, value) {
    getRoot()[key] = value;
  }

  if (typeof(exe) === 'function') {
    _exe = exe;
  }

  for (var key in _globalExports) {
    try
    {
      _exe(key, _globalExports[key]);
    }
    catch(err)
    {
      console.error(err);
    }
  }
}

;// CONCATENATED MODULE: ./src/core/platform-utility.js
function PlatformUtilityService() { 
  var _this = this;

  for (var key in _this) {
    getRoot()[key] = _this[key];
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

  noop: function() { 

  },

  no: function() {
    return false;
  },

  hasProperty: function(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  },
}

;// CONCATENATED MODULE: ./src/platform.js
var _mainCall = once();
var _isNode = (typeof process !== 'undefined' && ({ }).toString.call(process) === '[object process]');

function Platform() { }

Platform.prototype = { }

Platform.main = function(proc, onError) {
  _mainCall(tryCatch(proc, onError));
}

Platform.onLoad = function(proc, onError) {
  BodyHandler.onBodyLoad(proc, onError);
}

Platform.isBodyLoaded = function() {
  return BodyHandler.isBodyLoaded();
}

Platform.getBody = function() {
  return BodyHandler.getBody();
}

Platform.isBrowser = function() {
  return Browser.isBrowser();
}

Platform.isEdge = function() {
  return Browser.EDGE;
}

Platform.isTrident = function() {
  return Browser.TRIDENT
}

Platform.isBlink = function() {
  return Browser.BLINK;
}

Platform.isWebkit = function() {
  return Browser.WEBKIT;
}

Platform.isIos = function() {
  return Browser.IOS;
}

Platform.isFirefox = function() {
  return Browser.FIREFOX;
}

Platform.isAndroid = function() {
  return Browser.ANDROID;
}

Platform.isSafari = function() {
  return Browser.SAFARI;
}

Platform.supportsPassiveEventListeners = function() {
  return Supports.supportsPassiveEventListeners();
}

Platform.supportsScrollBehavior = function() {
  return Supports.supportsScrollBehavior();
}

Platform.getRoot = function() {
  return getRoot();
}

Platform.isNode = function() {
  return _isNode;
}

Platform.usePlatformUtility = function() {
  return initializeModule('PlatformUtility').definition;
}

Platform.installChunk = function(chunkId, modules, runtime) {
  installChunk(chunkId, modules, runtime);
}

Platform.import = function(exe) {
  importToGlobal(exe);
}

Platform.enableConsoleLogging = function() {
  enableConsoleLogging();
}

Platform.disableConsoleLogging = function() {
  disableConsoleLogging();
}

installChunk(
  'Platform',
  {
    'Platform': (function(__exports__, __webpack__) {
      __webpack__.define(__exports__, { 'definition': (function() { return Platform; }) });
    }),
    'PlatformUtility': (function(__exports__, __webpack__) {
      var _platformUtility = new PlatformUtilityService();

      __webpack__.define(__exports__, { 'definition': (function() { return _platformUtility; }) });
    })
  }
);

;// CONCATENATED MODULE: ./src/index.js
var libName = 'Platform'

try
{
  getRoot()[libName] = Platform;
}
catch(err)
{
  console.error(err);
}

})();
  