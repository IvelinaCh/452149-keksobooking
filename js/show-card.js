'use strict';

window.showСard = (function (dataModule) {
  var mapTemplate = dataModule.mapTemplate;
  var mapCard = mapTemplate.querySelector('.map__card');

  var features = dataModule.features;

  var removeChildFeatures = function (home, cardElement, list) {
    var popupFeatures = cardElement.querySelector('.popup__features');
    var featuresList = home.offer.features;
    list.forEach(function (ad) {
      if (featuresList.indexOf(ad) === -1) {
        var featureElement = cardElement.querySelector('.feature--' + ad);
        popupFeatures.removeChild(featureElement);
      }
    });
  };

  var getTypeHouse = function (home) {
    if (home.offer.type.indexOf('flat') !== -1) {
      return 'Квартира';
    } if (home.offer.type.indexOf('bungalo') !== -1) {
      return 'Бунгало';
    }
    return 'Дом';
  };

  var createCard = function (home) {
    var cardElement = mapCard.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = home.author.avatar;
    cardElement.querySelector('h3').textContent = home.offer.title;
    cardElement.querySelector('small').textContent = home.offer.address;
    cardElement.querySelector('.popup__price').textContent = home.offer.price + '₽/ночь';
    cardElement.querySelector('h4').textContent = getTypeHouse(home, cardElement);
    cardElement.querySelector('p:nth-of-type(3)').textContent = home.offer.rooms + ' для ' + home.offer.guests + 'гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + home.offer.checkin + ', выезд до ' + home.offer.checkout;
    removeChildFeatures(home, cardElement, features);
    cardElement.querySelector('p:nth-of-type(5)').textContent = home.offer.description;
    return cardElement;
  };
  return {
    createCard: createCard
  };
})(window.data);
