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

  try
  {
    _modules[moduleId](_moduleCache[moduleId].exports, Webpack);

    _moduleCache[moduleId].loaded = true;

    return _moduleCache[moduleId].exports;
  }
  catch (err)
  {
    console.error('There was an error while loading module "' + moduleId +'".', err);

    return ({ });
  }
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

  Object.defineProperty(_globalExports, key, { enumerable: true, get: definition });
}

export function installChunk(chunkId, modules, runtime) {
  if (typeof(chunkId) !== 'string') {
    chunkId = 'noname';
  }

  if (typeof(modules) !== 'object') {
    modules = ({ });
  }

  for(var moduleKey in modules) {
    if (hasOwnProperty(_modules, moduleKey)) {
      console.warn('Module named "' + moduleKey + '" already exists!');

      continue;
    }

    _modules[moduleKey] = modules[moduleKey];
  }

  if(typeof(runtime) === 'function') {
    runtime(Webpack);
  }
}

export function importToGlobal() {
  for (let key in _globalExports) {
    try
    {
      getRoot()[key] = _globalExports[key];
    }
    catch(err)
    {
      console.error(err);
    }
  }
}
