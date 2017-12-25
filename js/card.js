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

    var closeCard = function () {
      removeCurrentCard();
      deactivatePins(mapPins);
    };

    var onPopupCloseClick = function () {
      closeCard(mapPins, deactivatePins);
    };

    var onPopupCloseKeydown = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closeCard(mapPins, deactivatePins);
      }
    };

    popupClose.addEventListener('click', onPopupCloseClick);
    popupClose.addEventListener('keydown', onPopupCloseKeydown);
  };
  return {
    removeCurrentCard: removeCurrentCard,
    map: map,
    addPopupCloseListener: addPopupCloseListener,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
