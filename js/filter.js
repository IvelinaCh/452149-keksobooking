'use strict';

window.filter = (function () {
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

  var getFilterFeature = function (homes) {
    return homes.filter(function (ad) {
      /*var hasFeatures = */housingFeatures.every(function (feature) {
        if (!feature.checked) {
          return true;
        }

        if (ad.offer.features.indexOf(feature) !== -1) {
          return true;
        }
        return false;
      });
    });
  }

  var getFilterOffer = function (homes) {
    for (var i = 0; i < allFilters.length; i++) {
      var hasHomes = homes.filter(function (home) {
        if ((housingType.value === 'any' || housingType.value === home.offer.type) &&
          (housingPrice.value === 'any' || housingPrice.value === home.offer.price) &&
          (housingRooms.value === 'any' || housingRooms.value === home.offer.rooms) &&
          (housingGuests.value === 'any' || housingGuests.value === home.offer.guests)) {
          return true;
        }
        return false;
      });
    }
    return hasHomes;
  }

  var getFilter = function (homes) {
    var hasFeatures = getFilterFeature(homes);console.log(hasFeatures);
    var hasHomes = getFilterOffer(homes);
//console.log(hasFeatures);console.log(hasHomes);
    if (hasFeatures && hasHomes) {
      hasHomes = hasHomes.concat(hasFeatures);
      return hasHomes.slice(0, 5);
    } else {
      return [];
    }
  };
  return {
    allFilters: allFilters,
    getFilter: getFilter
  };
})();
