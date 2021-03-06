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

;// CONCATENATED MODULE: ./src/refs/root.js
var _root_ = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : ({ });

function getRoot() {
  return _root_;
}

;// CONCATENATED MODULE: ./src/utility/once.js
function once() {
  var hasBeenCalled = false;

  return function(fn) {
    if (hasBeenCalled == false) {
      hasBeenCalled = true;
      
      return fn();
    }
  }
}

;// CONCATENATED MODULE: ./src/utility/noop.js
function noop() { }

;// CONCATENATED MODULE: ./src/utility/try-catch.js
function tryCatch(func, onError) {
  if (typeof func !== 'function') {
    return noop;
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
    var init = tryCatch(onLoad, onError);

    if (document.readyState === 'complete') {
      init(null);

      return;
    }

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

;// CONCATENATED MODULE: ./src/core/console.js
var _log = console.log;
var _info = console.info;
var _debug = console.debug;
var _warn = console.warn;
var _error = console.error;

function disableConsoleLogging() {
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
  console.error = noop;
}

function enableConsoleLogging() {
  console.log = _log;
console.info = _info;
console.debug = _debug;
console.warn = _warn;
console.error = _error;
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

  _modules[moduleId](_moduleCache[moduleId].exports, Webpack);

  _moduleCache[moduleId].loaded = true;

  return _moduleCache[moduleId].exports;
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

  Object.defineProperty(_globalExports, key, { enumerable: true, get: (function() { return definition }) });
}

function installChunk(chunkId, modules, exe) {
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

  if(typeof(exe) === 'function') {
    try
    {
      exe(Webpack);
    }
    catch(err)
    {
      console.error(err);
    }
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

;// CONCATENATED MODULE: ./src/platform.js
var sm = 576;
var md = 768;
var lg = 992;
var xl = 1200;
var xxl = 1400;

var _mainCall = once();
var _isNode = (typeof process !== 'undefined' && ({ }).toString.call(process) === '[object process]');

function Platform() { }

Platform.prototype = { }

Platform.main = function(proc, onError) {
  _mainCall(function() {
    BodyHandler.onBodyLoad(proc, onError);
  });
}

Platform.isBodyLoaded = function() {
  return BodyHandler.isBodyLoaded();
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

Platform.width = function() {
  return getRoot().innerWidth;
}

Platform.height = function() {
  return getRoot().innerHeight;
}

Object.defineProperty(Platform, 'sm', { 
  enumerable: true, get: function() { return sm; } 
});

Object.defineProperty(Platform, 'md', { 
  enumerable: true, get: function() { return md; } 
});

Object.defineProperty(Platform, 'lg', { 
  enumerable: true, get: function() { return lg; } 
});

Object.defineProperty(Platform, 'xl', { 
  enumerable: true, get: function() { return xl; } 
})


Object.defineProperty(Platform, 'xxl', { 
  enumerable: true, get: function() { return xxl; } 
})

installChunk(
  'Platform',
  {
    'Platform': (function(__exports__, __webpack__) {
      __webpack__.define(__exports__, { 'definition': (function() { return Platform; }) });
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
