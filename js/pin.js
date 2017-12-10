'use strict';

window.pin = (function (dataModule, formModule, cardModule) {
  var mapTemplate = cardModule.mapTemplate;
  var filter = document.querySelector('.map__filters-container');
  var mapPin = mapTemplate.querySelector('.map__pin');
  var mapPinsConatiner = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var pinMain = document.querySelector('.map__pin--main');
  var mapPins = [];

  var cardElement = cardModule.cardElement;
  var map = cardModule.map;
  var createCard = cardModule.createCard;
  var addPopupCloseListener = cardModule.addPopupCloseListener;
  var removeCurrentCard = cardModule.removeCurrentCard;
  var capacity = formModule.capacity;
  var noticeForm = formModule.noticeForm;
  var fieldset = formModule.fieldset;

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
      var pins = mapPinsConatiner.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 1; j < pins.length; j++) {
        mapPins.push(pins[j]);
      }
      addPinsClickEvents(mapPins);
    } else {
      deactivatePins(mapPins);
      pinMain.classList.add('map__pin--active');
    }
  };

  var addMainPinEvent = function (map) {
    pinMain.addEventListener('mouseup', onPinMainMouseup);
  };

  var addPopupCloseListener = function (cardElement, mapPins) {
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

  var homes = dataModule.homes;

  return {
    mapPins: mapPins,
    pinMain: pinMain,
    deactivatePins: deactivatePins,
    createPins: createPins,
    addPinsClickEvents: addPinsClickEvents,
    addMainPinEvent: addMainPinEvent
  };
})(window.data, window.form, window.card);
