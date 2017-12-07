'use strict';

var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var mapTemplate = document.querySelector('template').content;
var mapPinsConatiner = document.querySelector('.map__pins');
var mapCard = mapTemplate.querySelector('.map__card');
var mapPin = mapTemplate.querySelector('.map__pin');


var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomFromArray = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var getNewUniqueElement = function (obj, property, array, homes) {
  do {
    var elem = getRandomFromArray(array);
  } while (contains(obj, property, elem, homes));
  return elem;
};

var contains = function (obj, property, elem, array) {
  for (var i = 0; i < array.length; i++) {
    if (obj && property) {
      if (array[i][obj][property] === elem) {
        return true;
      }
    } else if (array[i] === elem) {
      return true;
    }
  }
  return false;
};

var getFeatures = function () {
  var count = getRandom(1, 7);
  var featuresRand = [];
  for (var i = 0; i < count; i++) {
    featuresRand.push(getNewUniqueElement(null, null, features, featuresRand));
  }
  return featuresRand;
};

var createHome = function (homes) {
  var x = getRandom(300, 901);
  var y = getRandom(100, 501);
  return {
    author: {
      avatar: getNewUniqueElement('author', 'avatar', avatars, homes)
    },
    offer: {
      title: getNewUniqueElement('offer', 'title', titles, homes),
      address: x + ', ' + y,
      price: getRandom(1000, 1000001),
      type: getRandomFromArray(types),
      rooms: getRandom(1, 6),
      guests: getRandom(1, 8),
      checkin: getRandomFromArray(times),
      checkout: getRandomFromArray(times),
      features: getFeatures(),
      description: '',
      photos: []
    },
    location: {
      x: x,
      y: y
    }
  };
};

var createHomes = function (homesCount) {
  var homes = [];
  for (var i = 0; i < homesCount; i++) {
    homes.push(createHome(homes));
  }
  return homes;
};

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

var filter = document.querySelector('.map__filters-container');
var homesCount = 8;
var homes = createHomes(homesCount);
var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var fieldset = document.querySelectorAll('.notice__form fieldset');
var pinMain = document.querySelector('.map__pin--main');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

for (var k = 1; k < fieldset.length; k++) {
  fieldset[k].setAttribute('disabled', true);
}
/*
var changeActivPin = function (mapPins) {
  //var mapPins = mapPinsConatiner.querySelectorAll('.map__pin:not(.map__pin--main)');
  addPinsClickEvents(mapPins);
};
*/
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

var removeCurrentCard = function () {
  var currentCard = document.querySelector('.map__card');
  if (currentCard) {
    map.removeChild(currentCard);
  }
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
    /* for (var j = 0; j < mapPins.length; j++) {
      mapPins[j].classList.remove('map__pin--active');
}*/
    pinMain.classList.add('map__pin--active');
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

pinMain.addEventListener('mouseup', onPinMainMouseup);
