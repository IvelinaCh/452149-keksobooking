'use strict';

window.map = (function (cardModule, pinModule) {
  var map = cardModule.map;

  pinModule.addMainPinEvent(map);

  return {
  };
})(window.card, window.pin);
