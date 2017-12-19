'use strict';

window.map = (function (cardModule, pinModule) {
  var map = cardModule.map;

  pinModule.addMainPinEvent(map);

})(window.card, window.pin);

// console.log(allFilters[1].value);console.log(housingType.selected.value);
