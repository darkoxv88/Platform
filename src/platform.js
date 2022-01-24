import { getRoot } from "./refs/root";
import { once } from "./utility/once";

import { BodyHandler } from "./services/body-handler";
import { Browser } from "./services/browser";
import { Supports } from "./services/supports";

import { enableConsoleLogging, disableConsoleLogging } from "./core/console";
import { initializeModule, installChunk, importToGlobal } from "./core/webpack";
import { PlatformUtilityService } from "./core/platform-utility";

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
