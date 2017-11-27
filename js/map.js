'use strict';

var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];
var mapTemplate = document.querySelector('template').content;
var mapPins = document.querySelector('.map__pins');


var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomFromArray = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var createHome = function () {
  return {
    author: {
      avatar: '../img/avatars/user0' + getRandomFromArray(avatars) + '.png'
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
  }
}

var createHomes = function (homesCount) {
  var homes = [];
  for (var i = 0; i < homesCount; i++) {
    homes.push(createHome());
  }
  return homes;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var x = getRandom(300, 901);
var y = getRandom(100, 501);
var homesCount = 8;
var homes = createHomes(homesCount);

var createPin = function (homesCount) {
  var pinElement = mapTemplate.cloneNode(true);
  var button = pinElement.querySelector('.map__pin');
  var pin = button.querySelector('img');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < homesCount; i++) {
    button.style.left = x;
    button.style.top = y;
    pin = homes[i].author.avatar;

    fragment.appendChild(button);
  }

  return fragment;
}

mapPins.appendChild(createPin(homesCount));

