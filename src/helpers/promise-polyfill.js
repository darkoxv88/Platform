import { getRoot } from "../refs/root";

import { lambda } from "../utility/lambda";
import { tryCatch } from "../utility/try-catch";

function catchedError(err) {
  console.error(err);
}

var localPromise = function(executor) {
  this._executor = tryCatch(executor, catchedError);
  this._value = undefined;
  this._onFulfilled = tryCatch(null);
  this._onRejected = tryCatch(null);
  this._onFinally = tryCatch(null);
  this._state = 'PENDING';

  setTimeout(lambda(this, function() {
    this._executor(
      lambda(this, function(value) {
        this._state = 'FULFILLED';
        this._value = value;
        this._onFulfilled(this._value);
        this._onFinally(this._value);
      }),
      lambda(this, function(value) {
        this._state = 'REJECTED';
        this._value = value;
        this._onRejected(this._value);
        this._onFinally(this._value);
      })
    );
  }));
}

localPromise.prototype = {
  then: function(onFulfilled, onRejected) {
    this._onFulfilled = tryCatch(onFulfilled, catchedError);
    this._onRejected = tryCatch(onRejected, catchedError);

    if (this._state === 'FULFILLED') {
      this._onFulfilled(this._value);
    }

    if (this._state === 'REJECTED') {
      this._onRejected(this._value);
    }

    return this;
  },
  catch: function(onRejected) {
    this._onRejected = tryCatch(onRejected, catchedError);

    if (this._state === 'REJECTED') {
      this._onRejected(this._value);
    }

    return this;
  },
  finally: function(onFinally) {
    this._onFinally = tryCatch(onFinally, catchedError);

    if (this._state !== 'PENDING') {
      this._onFinally();
    }

    return this;
  },
}

if (typeof(getRoot()['Promise']) === 'function') {
  localPromise = getRoot()['Promise'];
}

getRoot()['Promise'] = localPromise;

export function getPromiseClass() {
  return localPromise;
}
