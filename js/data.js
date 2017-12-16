'use strict';

window.data = (function () {
  var mapTemplate = document.querySelector('template').content;
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var minPrice = ['1000', '0', '5000', '10000'];

  return {
    features: features,
    mapTemplate: mapTemplate,
    minPrice: minPrice
  };
})();
