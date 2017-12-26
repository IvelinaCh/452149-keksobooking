'use strict';

window.pin = (function (dataModule, backendModule, formModule, cardModule, showCardModule, filterModule, debounceModule) {
  var mapTemplate = dataModule.mapTemplate;
  var filter = document.querySelector('.map__filters-container');
  var mapPin = mapTemplate.querySelector('.map__pin');
  var mapPinsConatiner = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;
  var MIN_COORDS_Y = 100;
  var MAX_COORDS_Y = 456;
  var MAIN_PIN_WIDTH = 40;
  var MAIN_PIN_HEIGHT = 44;
  var pinMain = document.querySelector('.map__pin--main');

  var ENTER_KEYCODE = cardModule.ENTER_KEYCODE;
  var map = cardModule.map;
  var createCard = showCardModule.createCard;
  var addPopupCloseListener = cardModule.addPopupCloseListener;
  var removeCurrentCard = cardModule.removeCurrentCard;
  var capacity = formModule.capacity;
  var fieldset = formModule.fieldset;
  var myAddress = formModule.myAddress;
  var noticeForm = formModule.noticeForm;

  var load = backendModule.load;
  var onError = backendModule.onError;

  var allFilters = filterModule.allFilters;
  var getFilter = filterModule.getFilter;

  var createPin = function (homes) {
    var pinElement = mapPin.cloneNode(true);
    var pin = pinElement.querySelector('img');
    pinElement.style.left = homes.location.x - MAIN_PIN_WIDTH / 2 + 'px';
    pinElement.style.top = homes.location.y + MAIN_PIN_HEIGHT + 'px';
    pin.src = homes.author.avatar;
    return pinElement;
  };

  var createPins = function (homes) {
    var fragment = document.createDocumentFragment();
    homes.forEach(function (ad, i) {
      var pin = createPin(ad);
      fragment.appendChild(pin);
      pin.dataset.index = i;
    });
    return fragment;
  };

  var addPinsClickEvents = function (mapPins, homes) {
    mapPinsConatiner.addEventListener('click', function (evt) {
      onPinClick(evt, mapPins, homes);
    });
    mapPinsConatiner.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        onPinClick(evt, mapPins, homes);
      }
    });
  };

  var onPinClick = function (evt, mapPins, homes) {

    removeCurrentCard();

    deactivatePins(mapPins);

    var openedPin = evt.target.closest('.map__pin');
    if (openedPin) {
      activateHome(openedPin, mapPins, homes);
    }
  };

  var activateHome = function (pin, mapPins, homes) {
    pin.classList.add('map__pin--active');

    var index = pin.dataset.index;
    var cardElement = createCard(homes[index]);
    map.insertBefore(cardElement, filter);

    addPopupCloseListener(cardElement, mapPins, deactivatePins);

    var onEscDown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        removeCurrentCard();
        deactivatePins(mapPins);
      }
      document.removeEventListener('keydown', onEscDown);
    };
    document.addEventListener('keydown', onEscDown);
  };

  var onPinMainMouseup = function (homes) {
    capacity.value = '1';
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    fieldset.forEach(function (ad) {
      ad.removeAttribute('disabled', true);
    });

    mapPinsConatiner.appendChild(createPins(homes));
    var mapPins = mapPinsConatiner.querySelectorAll('.map__pin:not(.map__pin--main)');

    debounceModule.debounce(function () {
      startFilter(mapPins, homes);
    });
    toHiddenOtherPins(mapPins, homes);

    addPinsClickEvents(mapPins, homes);
    pinMain.removeEventListener('mouseup', onPinMainMouseup);
    pinMain.addEventListener('mouseup', function () {
      deactivatePins(mapPins);
      pinMain.classList.add('map__pin--active');
    });
  };

  var deactivatePins = function (mapPins) {
    pinMain.classList.remove('map__pin--active');
    mapPins.forEach(function (ad) {
      ad.classList.remove('map__pin--active');
    });
  };

  var addMainPinEvent = function () {
    pinMain.addEventListener('mouseup', onEventLoad);
  };

  var onload = function (response) {
    var homes = response;
    onPinMainMouseup(homes);
    pinMain.removeEventListener('mouseup', onEventLoad);
  };

  var toHiddenOtherPins = function (mapPins, homes) {
    allFilters.forEach(function (ad) {
      ad.addEventListener('change', function () {
        debounceModule.debounce(function () {
          startFilter(mapPins, homes);
        });
      });
    });
  };

  var startFilter = function (mapPins, homes) {
    var filteredHomes = getFilter(homes);
    mapPins.forEach(function (ad) {
      ad.classList.add('hidden');
    });
    filteredHomes.forEach(function (it) {
      var homeIndexes = homes.indexOf(it);
      mapPins[homeIndexes].classList.remove('hidden');
    });
  };

  var onEventLoad = function () {
    load(onload, onError);
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPin = {
      x: evt.pageX,
      y: evt.pageY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startPin.x - moveEvt.pageX,
        y: startPin.y - moveEvt.pageY
      };
      startPin = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };

      if (startPin.y > MAX_COORDS_Y) {
        myAddress.value = (startPin.x + MAIN_PIN_WIDTH / 2) + ', ' + (MAX_COORDS_Y + MAIN_PIN_HEIGHT);
        pinMain.style.top = MAX_COORDS_Y + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      } else if (startPin.y < MIN_COORDS_Y) {
        myAddress.value = (startPin.x + MAIN_PIN_WIDTH / 2) + ', ' + (MIN_COORDS_Y);
        pinMain.style.top = MIN_COORDS_Y + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      } else {
        myAddress.value = (startPin.x + MAIN_PIN_WIDTH / 2) + ', ' + (startPin.y + MAIN_PIN_HEIGHT);
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {
    addMainPinEvent: addMainPinEvent
  };
})(window.data, window.backend, window.form, window.card, window.showСard, window.filter, window.debounce);
