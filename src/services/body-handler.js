import { tryCatch } from "../utility/try-catch";

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

export var BodyHandler = new BodyHandlerService();
