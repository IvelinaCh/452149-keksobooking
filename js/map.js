'use strict';

var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['flat', 'house', 'bungalo'];
var featuress = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var times = ['12:00', '13:00', '14:00'];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomFromArray = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

var createHome = function () {
  var home = {
    author: {
      vatar: '../img/avatars/user0' + getRandomFromArray(avatars) + '.png'
    },
    offer: {
      title: getRandomFromArray(titles),
      address: "{{location.x}}, {{location.y}}",
      price: getRandom(1000, 1 000 001),
      type: getRandomFromArray(types),
      rooms: getRandom(1, 6),
      guests: getRandom(),
      checkin: getRandomFromArray(times),
      checkout: getRandomFromArray(times),
      features: getRandomFromArray(featuress),
      description: '',
      photos: []
    },
    location: {
      x: getRandom(300, 901),
      y: getRandom(100, 501)
    }
}
