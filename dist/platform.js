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

backup:

  window.___webpack_export_dp_Platform___.definition

**/

(function() {
"use strict";

var __webpack_exports__ = {};

var _root_ = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : ({ });

function getRoot() {
  return _root_;
}

function once() {
  var hasBeenCalled = false;

  return function(fn) {
    if (hasBeenCalled) {
      return;
    }

    hasBeenCalled = true;

    return fn();
  }
}

function tryCatch(func, onError) {
  if (typeof func !== 'function') {
    return function() { }
  }

  return function() {
    try {
      return func.apply(this, arguments);
    } catch (e) {
      if (typeof onError === 'function') {
        return onError(e)
      };

      return null;
    }
  }
}

function BodyHandlerService() { }

BodyHandlerService.prototype = {
  onBodyLoad: function(onLoad, onError) {
    var init = tryCatch(onLoad, onError);

    if (document.readyState === 'complete') {
      init();

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

  getBody: function() {
    if (typeof document != 'undefined') {
      return document.body;
    }
  },

  clearBody: function() {
    if (typeof document != 'undefined') {
      return document.body.innerHTML = '';
    }
  }
}

var BodyHandler = new BodyHandlerService();

Object.freeze(BodyHandler);

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

Object.freeze(Browser);

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
  scrollBehaviorSupported = !/\{\s*\[native code\]\s*\}/.test(Element.prototype.scrollTo.toString());
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

Object.freeze(Supports);

function has_own_property_hasOwnProperty(obj, prop) {
  return (Object.prototype.hasOwnProperty.call(obj, prop))
}

var _modules = ({ });
var _moduleCache = ({ });
var _installedChunks = ({ });

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
    console.error('There was an error while loading module "' + moduleId +'".', err);

    delete(_moduleCache[moduleId]);

    return ({ });
  }
}

Webpack.define = function(exports, definition) {
  for(var key in definition) {
    if(has_own_property_hasOwnProperty(definition, key) && !has_own_property_hasOwnProperty(exports, key)) {
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    }
  }
}

Webpack.checkIfChunkIsInstaled = function(chunkId) {
  return _installedChunks[chunkId] === 1;
}

function installChunk(chunkId, modules, runtime) {
  if (typeof(chunkId) !== 'string') {
    chunkId = 'noname';
  }

  if (typeof(modules) !== 'object') {
    modules = ({ });
  }

  for(var moduleKey in modules) {
    if (has_own_property_hasOwnProperty(_modules, moduleKey)) {
      console.warn('Module name "' + moduleKey + '" is taken!');

      continue;
    }

    _modules[moduleKey] = modules[moduleKey];
  }

  if(typeof(runtime) === 'function') {
    runtime(Webpack);
  }

  _installedChunks[chunkId] = 1;
}

var mainCall = once();

Object.freeze(mainCall);

function Platform() { }

Platform.prototype = { }

Platform.main = function(proc, onError) {
  mainCall(tryCatch(proc, onError));
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

Platform.clearBody = function() {
  BodyHandler.clearBody();
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

Platform.isBrowser = function() {
  return Platform.isBrowser();
}

Platform.isNode = function() {
  return (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');
}

Platform.installChunk = function(chunkId, modules, runtime) {
  installChunk(chunkId, modules, runtime);
}

var production = true;

function isProduction() {
  return production;
}

var libName = 'Platform'

try
{
  if (getRoot()[libName] && isProduction()) {
    throw new Error('window["' + libName + '"] is already in use! Switching to: ' + 'window["___webpack_export_' + libName + '___"].definition');
  }

  getRoot()[libName] = Platform;
}
catch(err)
{
  console.error(err);

	if (typeof(getRoot()['___webpack_export_dp_' + libName + '___']) !== 'object' || !(getRoot()['___webpack_export_dp_' + libName + '___'])) {
		getRoot()['___webpack_export_dp_' + libName + '___'] = ({ });
	}

	getRoot()['___webpack_export_dp_' + libName + '___'].definition = Platform;
}

})();
