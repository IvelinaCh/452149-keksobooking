'use strict';

window.pin = (function (dataModule, formModule, cardModule) {
  var mapTemplate = cardModule.mapTemplate;
  var filter = document.querySelector('.map__filters-container');
  var mapPin = mapTemplate.querySelector('.map__pin');
  var mapPinsConatiner = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;
  var pinMain = document.querySelector('.map__pin--main');

  var ENTER_KEYCODE = cardModule.ENTER_KEYCODE;
  var map = cardModule.map;
  var createCard = cardModule.createCard;
  var addPopupCloseListener = cardModule.addPopupCloseListener;
  var removeCurrentCard = cardModule.removeCurrentCard;
  var capacity = formModule.capacity;
  var noticeForm = formModule.noticeForm;
  var fieldset = formModule.fieldset;
  var myAddress = formModule.myAddress;

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

  var activateHome = function (pin, mapPins) {
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
      var mapPins = mapPinsConatiner.querySelectorAll('.map__pin:not(.map__pin--main)');
      deactivatePins(mapPins);
      pinMain.classList.add('map__pin--active');
    }
  };

  var deactivatePins = function (mapPins) {
    pinMain.classList.remove('map__pin--active');
    for (var j = 0; j < mapPins.length; j++) {
      mapPins[j].classList.remove('map__pin--active');
    }
  };

  var addMainPinEvent = function () {
    pinMain.addEventListener('mouseup', onPinMainMouseup);
  };

  pinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startPin = {
       x: evt.clientX,
       y: evt.clientY
      }

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startPin.x - moveEvt.clientX,
          y: startPin.y - moveEvt.clientY
        }
        startPin = {
         x: moveEvt.clientX,
         y: moveEvt.clientY
        }
        myAddress.textContent = startPin.x + ', ' + startPin.y;

        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

      var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      addMainPinEvent();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

  var homes = dataModule.homes;

  return {
    addMainPinEvent: addMainPinEvent
  };
})(window.data, window.form, window.card);
