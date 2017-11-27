'use strict';

var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
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

var createHome = function () {
  var x = getRandom(300, 901);
  var y = getRandom(100, 501);
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomFromArray(avatars) + '.png'
    },
    offer: {
      title: getRandomFromArray(titles),
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
    homes.push(createHome());
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

var createPins = function (homesCount) {
  var homes = createHomes(homesCount);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < homesCount; i++) {
    var pin = createPin(homes[i]);
    fragment.appendChild(pin);
  }
  return fragment
};

var createCard = function (homes) {
  var cardElement = mapCard.cloneNode(true);
  var photo = cardElement.querySelector('.popup__avatar');
  photo.src = homes.author.avatar;
  return cardElement
};

var renderCard = function (homes) {
  var fragment = document.createDocumentFragment();
  var card = createCard(firstCard);
  fragment.appendChild(card);
  return fragment
};



var map = document.querySelector('.map');
var filter = document.querySelector('.map__filters-container');
map.classList.remove('map--faded');
var homesCount = 8;
var firstCard = createHomes(homesCount)[0];
mapPins.appendChild(createPins(homesCount));
map.insertBefore(renderCard(), filter);

