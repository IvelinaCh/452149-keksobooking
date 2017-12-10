'use strict';

window.card = (function (dataModule, mapModule, pinModule) {
  var mapCard = mapTemplate.querySelector('.map__card');

  var mapTemplate = mapModule.mapTemplate;
  var homes = dataModule.homes;
  var map = mapModule.map;
  var mapPins = mapModule.mapPins;
  var deactivatePins = pinModule.deactivatePins;
  var ENTER_KEYCODE = 13;

  var getTypeHouse = function (home, cardElement) {
    var typeHouse = cardElement.querySelector('h3').textContent;
    if (home.offer.type.indexOf('flat') !== -1) {
      typeHouse = 'Квартира';
    } else if (home.offer.type.indexOf('bungalo') !== -1) {
      typeHouse = 'Бунгало';
    } else {
      typeHouse = 'Дом';
    }
    return typeHouse;
  };

  var removeChildFeatures = function (home, cardElement, list) {
    var popupFeatures = cardElement.querySelector('.popup__features');
    var featuresList = home.offer.features;
    for (var i = 0; i < list.length; i++) {
      if (featuresList.indexOf(list[i]) === -1) {
        var featureElement = cardElement.querySelector('.feature--' + list[i]);
        popupFeatures.removeChild(featureElement);
      }
    }
  };

  var createCard = function (home) {
    var cardElement = mapCard.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = home.author.avatar;
    cardElement.querySelector('h3').textContent = home.offer.title;
    cardElement.querySelector('small').textContent = home.offer.address;
    cardElement.querySelector('.popup__price').innerHTML = home.offer.price + '&#x20bd;/ночь';
    cardElement.querySelector('h4').textContent = getTypeHouse(home, cardElement);
    cardElement.querySelector('p:nth-of-type(3)').textContent = home.offer.rooms + ' для ' + home.offer.guests + 'гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + home.offer.checkin + ', выезд до ' + home.offer.checkout;
    removeChildFeatures(home, cardElement, features);
    cardElement.querySelector('p:nth-of-type(5)').textContent = home.offer.description;
    return cardElement;
  };

  var removeCurrentCard = function () {
    var currentCard = document.querySelector('.map__card');
    if (currentCard) {
      map.removeChild(currentCard);
    }
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
  return {
    createCard: createCard,
    addPopupCloseListener: addPopupCloseListener,
    removeCurrentCard: removeCurrentCard
  };
})(window.data, window.map, window.pin);
