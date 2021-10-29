import { once } from "./utility/once";
import { tryCatch } from "./utility/try-catch";

import { BodyHandler } from "./services/body-handler";
import { Browser } from "./services/browser";
import { Supports } from "./services/supports";

import { installChunk } from "./core/webpack";

var mainCall = once();

Object.freeze(mainCall);

export function Platform() { }

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
