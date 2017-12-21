'use strict';

window.debounce = (function () {
  var TIMEOUT = 500;

  var lastTimeout;

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, TIMEOUT);
  };
  return {
    debounce: debounce
  };
})();
