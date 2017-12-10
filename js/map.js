'use strict';

window.map = (function (dataModule, formModule, pinModule) {
  var map = pinModule.map;
  var pinMain = pinModule.pinMain;
  var mapPins = pinModule.mapPins;

  /*var homes = dataModule.homes;
  var createPins = pinModule.createPins;
  var deactivatePins = pinModule.deactivatePins;
  var addPinsClickEvents = pinModule.addPinsClickEvents;*/

  pinModule.addMainPinEvent(map);

  return {
  };
})(window.data, window.form, window.pin);
