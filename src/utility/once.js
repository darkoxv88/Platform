export function once() {
  var hasBeenCalled = false;

  return function(fn) {
    if (hasBeenCalled) {
      return;
    }

    hasBeenCalled = true;

    return fn();
  }
}
