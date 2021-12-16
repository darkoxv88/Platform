import { noop } from "./../utility/noop";

var _log = console.log;
var _info = console.info;
var _debug = console.debug;
var _warn = console.warn;
var _error = console.error;

export function forceLog() {
  _log.apply(console, arguments);
}

export function forceInfo() {
  _info.apply(console, arguments);
}

export function forceDebug() {
  _debug.apply(console, arguments);
}

export function forceWarn() {
  _warn.apply(console, arguments);
}

export function forceError() {
  _error.apply(console, arguments);
}

console.log = forceLog;
console.info = forceInfo;
console.debug = forceDebug;
console.warn = forceWarn;
console.error = forceError;

export function disableConsoleLogging() {
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
  console.error = noop;
}

export function enableConsoleLogging() {
  console.log = forceLog;
  console.info = forceInfo;
  console.debug = forceDebug;
  console.warn = forceWarn;
  console.error = forceError;;
}
