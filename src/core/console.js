import { noop } from "./../utility/noop";

var _log = console.log;
var _info = console.info;
var _debug = console.debug;
var _warn = console.warn;
var _error = console.error;

export function disableConsoleLogging() {
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
  console.error = noop;
}

export function enableConsoleLogging() {
  console.log = _log;
console.info = _info;
console.debug = _debug;
console.warn = _warn;
console.error = _error;
}
