'use strict';

window.data = (function () {
  var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'house', 'bungalo'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var times = ['12:00', '13:00', '14:00'];
  var homesCount = 8;
  var homes = createHomes(homesCount);

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
  return {
    homes: homes
  };
})();
