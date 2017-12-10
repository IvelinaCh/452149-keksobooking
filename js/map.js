'use strict';

window.map = (function (formModule) {
  var mapPin = mapTemplate.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinsConatiner = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var capacity = formModule.capacity;
  var noticeForm = formModule.noticeForm;
  var fieldset = formModule.fieldset;

  var onPinMainMouseup = function () {
    for (var n = 0; n < capacity.length; n++) {
      capacity.options[n].disabled = true;
    }
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      for (var i = 1; i < fieldset.length; i++) {
        fieldset[i].removeAttribute('disabled', true);
      }
      mapPinsConatiner.appendChild(createPins(homes));
      var mapPins = mapPinsConatiner.querySelectorAll('.map__pin:not(.map__pin--main)');
      addPinsClickEvents(mapPins);
    } else {
      deactivatePins(mapPins);
      pinMain.classList.add('map__pin--active');
    }
  };

  pinMain.addEventListener('mouseup', onPinMainMouseup);
  return {
    mapPins: mapPins,
    map: map
  };
})(window.form);

