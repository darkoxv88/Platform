import { getRoot } from "../refs/root";
import { hasOwnProperty } from "../utility/has-own-property";

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
    if(hasOwnProperty(definition, key) && !hasOwnProperty(exports, key)) {
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

export function installChunk(chunkId, modules, exe) {
  if (typeof(chunkId) !== 'string') {
    chunkId = 'noname';
  }

  if (typeof(modules) !== 'object' || !modules) {
    modules = ({ });
  }

  for(var moduleKey in modules) {
    if (hasOwnProperty(_modules, moduleKey)) {
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

export function importToGlobal(exe) {
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
