'use strict';

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
