import { getRoot } from "./refs/root";
import { once } from "./utility/once";

import { BodyHandler } from "./services/body-handler";
import { Browser } from "./services/browser";
import { Supports } from "./services/supports";

import { enableConsoleLogging, disableConsoleLogging } from "./core/console";
import { installChunk, importToGlobal } from "./core/webpack";

var sm = 576;
var md = 768;
var lg = 992;
var xl = 1200;
var xxl = 1400;

var _mainCall = once();
var _isNode = (typeof process !== 'undefined' && ({ }).toString.call(process) === '[object process]');

export function Platform() { }

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
  getRoot().innerWidth;
}

Platform.height = function() {
  getRoot().innerHeight;
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
