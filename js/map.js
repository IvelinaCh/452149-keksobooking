'use strict';

window.map = (function (dataModule, formModule, cardModule, pinModule) {
  var map = cardModule.map;

  pinModule.addMainPinEvent(map);

  return {
  };
})(window.data, window.form, window.card, window.pin);
