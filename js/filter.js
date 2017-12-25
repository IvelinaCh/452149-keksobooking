'use strict';

window.filter = (function () {
  var HOMES_COUNT = 5;
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilter = document.querySelectorAll('.map__filter');
  var housingType = mapFilterForm.querySelector('#housing-type');
  var housingPrice = mapFilterForm.querySelector('#housing-price');
  var housingRooms = mapFilterForm.querySelector('#housing-rooms');
  var housingGuests = mapFilterForm.querySelector('#housing-guests');
  var housingFeature = mapFilterForm.querySelectorAll('#housing-features input');

  var mapFilters = Array.from(mapFilter);
  var housingFeatures = Array.from(housingFeature);
  var allFilters = mapFilters.concat(housingFeatures);

  var isFilterFeature = function (home) {
    return housingFeatures.every(function (feature) {
      if (!feature.checked) {
        return true;
      }

      if (home.offer.features.indexOf(feature.value) !== -1) {
        return true;
      }
      return false;
    });
  };

  var getPrice = function (price) {
    if (price <= PRICE_LOW) {
      return 'low';
    } if (price >= PRICE_HIGH) {
      return 'high';
    }
    return 'middle';
  };

  var isFilterOffer = function (home) {
    if ((housingType.value === 'any' || housingType.value === home.offer.type) &&
      (housingPrice.value === 'any' || housingPrice.value === getPrice(home.offer.price)) &&
      (housingRooms.value === 'any' || +housingRooms.value === home.offer.rooms) &&
      (housingGuests.value === 'any' || +housingGuests.value === home.offer.guests)) {
      return true;
    }
    return false;
  };

  var getFilter = function (homes) {
    var filteredHomes = homes.filter(function (home) {
      return isFilterFeature(home) && isFilterOffer(home);
    });
    return filteredHomes.slice(0, HOMES_COUNT);
  };
  return {
    allFilters: allFilters,
    getFilter: getFilter
  };
})();
