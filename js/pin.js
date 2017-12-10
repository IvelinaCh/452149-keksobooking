'use strict';

window.pin = (function (dataModule, mapModule, cardModule) {
  var filter = document.querySelector('.map__filters-container');
  var mapPin = mapTemplate.querySelector('.map__pin');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var homes = dataModule.homes;
  var map = mapModule.map;
  var mapPins = mapModule.mapPins;
  var mapTemplate = mapModule.mapTemplate;
  var pinMain = mapModule.pinMain;
  var createCard = cardModule.createCard;
  var addPopupCloseListener = cardModule.addPopupCloseListener;
  var removeCurrentCard = cardModule.removeCurrentCard;

  var createPin = function (homes) {
    var pinElement = mapPin.cloneNode(true);
    var pin = pinElement.querySelector('img');
    pinElement.style.left = homes.location.x - 20 + 'px';
    pinElement.style.top = homes.location.y + 40 + 'px';
    pin.src = homes.author.avatar;
    return pinElement;
  };

  var createPins = function (homes) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < homes.length; i++) {
      var pin = createPin(homes[i]);
      fragment.appendChild(pin);
      pin.dataset.index = i;
    }
    return fragment;
  };

  var addPinsClickEvents = function (mapPins) {
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', function (evt) {
        onPinClick(evt, mapPins);
      });
      mapPins[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          onPinClick(evt, mapPins);
        }
      });
    }
  };

  var onPinClick = function (evt, mapPins) {

    removeCurrentCard();

    deactivatePins(mapPins);

    var openedPin = evt.currentTarget;
    activateHome(openedPin, mapPins);
  };

  var deactivatePins = function (mapPins) {
    pinMain.classList.remove('map__pin--active');
    for (var j = 0; j < mapPins.length; j++) {
      mapPins[j].classList.remove('map__pin--active');
    }
  };

  var activateHome = function (pin, mapPins) {
    pin.classList.add('map__pin--active');

    var index = pin.dataset.index;
    var cardElement = createCard(homes[index]);
    map.insertBefore(cardElement, filter);

    addPopupCloseListener(cardElement, mapPins);

    var onEscDown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeCurrentCard();
        deactivatePins(mapPins);
      }
      document.removeEventListener('keydown', onEscDown);
    };
    document.addEventListener('keydown', onEscDown);
  };
  return {
    deactivatePins: deactivatePins,
    createPins: createPins,
    addPinsClickEvents: addPinsClickEvents
  };
})(window.data, window.map, window.card);
