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

export var Browser = new BrowserService();
