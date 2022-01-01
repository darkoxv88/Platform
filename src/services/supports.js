import { getRoot } from "./../refs/root";

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

export function SupportsService() { }

SupportsService.prototype = { 
  supportsPassiveEventListeners: function() {
    return supportsPassiveEvents;
  },
  
  supportsScrollBehavior: function() {
    return scrollBehaviorSupported;
  }
}

export var Supports = new SupportsService();
