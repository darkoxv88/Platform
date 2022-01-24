export function once() {
  var hasBeenCalled = false;

  return function(fn) {
    if (hasBeenCalled == false) {
      hasBeenCalled = true;
      
      return fn();
    }
  }
}
