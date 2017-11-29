'use strict';

var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var mapTemplate = document.querySelector('template').content;
var mapPins = document.querySelector('.map__pins');
var mapCard = mapTemplate.querySelector('.map__card');
var mapPin = mapTemplate.querySelector('.map__pin');


var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomFromArray = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

function getNewUniqueElement(obj, property, array, homes) {
  while(true) {
    var elem = getRandomFromArray(array);
    if (!contains(obj, property, elem, homes)) {
      return elem;
    }
  }
}

function contains(obj, property, elem, homes) {
  for (var i = 0; i < homes.length; i++) {
    if (homes[i][obj][property] === elem) {
      return true;
    }
  }
  return false;
}

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
      features: getRandomFromArray(features),
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
  return pinElement
};

var createPins = function (homes) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < homes.length; i++) {
    var pin = createPin(homes[i]);
    fragment.appendChild(pin);
  }
  return fragment
};

var createCard = function (home) {
  var cardElement = mapCard.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = home.author.avatar;
  cardElement.querySelector('h3').textContent = home.offer.title;
  cardElement.querySelector('small').textContent = home.offer.address;
  cardElement.querySelector('.popup__price').innerHTML = home.offer.price + '&#x20bd;/ночь';
  var typeHouse = cardElement.querySelector('h4');
  if (typeHouse.indexOf('квартира')+1) {
    typeHouse.textContent = 'flat';
  } else if (typeHouse.indexOf('бунгало')+1) {
    typeHouse.textContent = 'bungalo';
  } else {
    typeHouse.textContent = 'house';
  }
  cardElement.querySelector('h4 + p').textContent = home.offer.rooms + ' для ' + home.offer.guests + 'гостей';
  cardElement.querySelector('p + p').textContent = 'Заезд после ' + home.offer.checkin + ', выезд до ' + home.offer.checkout;
  /*cardElement.querySelector('.popup__features').appendChild(querySelector('li')).classList.add; = home.offer.features;*/
  cardElement.querySelector('.popup__features + p').textContent = home.offer.description;
  return cardElement
};/*повторения*/

var map = document.querySelector('.map');
var filter = document.querySelector('.map__filters-container');
map.classList.remove('map--faded');
var homesCount = 8;
var homes = createHomes(homesCount);
mapPins.appendChild(createPins(homes));
map.insertBefore(createCard(homes[0]), filter);
