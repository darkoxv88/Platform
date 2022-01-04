export function once() {
  var hasBeenCalled = false;

  return function(fn) {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      
      return fn();
    }
  }
}
