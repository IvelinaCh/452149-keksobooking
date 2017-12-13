'use strict';

window.card = (function () {
  var map = document.querySelector('.map');

  var ENTER_KEYCODE = 13;

  var removeCurrentCard = function () {
    var currentCard = document.querySelector('.map__card');
    if (currentCard) {
      map.removeChild(currentCard);
    }
  };

  var addPopupCloseListener = function (cardElement, mapPins, deactivatePins) {
    var popupClose = cardElement.querySelector('.popup__close');

    popupClose.addEventListener('click', function () {
      removeCurrentCard();
      deactivatePins(mapPins);
    });

    popupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        removeCurrentCard();
        deactivatePins(mapPins);
      }
    });
  };
  return {
    removeCurrentCard: removeCurrentCard,
    map: map,
    addPopupCloseListener: addPopupCloseListener,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
