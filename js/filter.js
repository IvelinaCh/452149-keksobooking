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

  var getFilterFeature = function (homes) {console.log(homes[3].offer.features);
    return homes.filter(function (ad) {
      return housingFeatures.every(function (feature) {
        if (!feature.checked) {
          return true;
        }

        if (ad.offer.features.indexOf(feature) !== -1) {console.log(1);
          return true;
        }
        return false;
      });
    });
  }

  var getPrice = function (price) {
    if (price <= 10000) {
      return 'low';
    } else if (price >= 50000) {
      return 'high';
    } else {
      return 'middle';
    }
  }

  var getFilterOffer = function (homes) {
    for (var i = 0; i < allFilters.length; i++) {
      var hasHomes = homes.filter(function (home) {
        if ((housingType.value === 'any' || housingType.value === home.offer.type) &&
          (housingPrice.value === 'any' || housingPrice.value === getPrice(home.offer.price)) &&
          (housingRooms.value === 'any' || +housingRooms.value === home.offer.rooms) &&
          (housingGuests.value === 'any' || +housingGuests.value === home.offer.guests)) {
          return true;
        }
        return false;
      });
    }
    return hasHomes;
  }

  var getFilter = function (homes) {
    var hasFeatures = getFilterFeature(homes);//console.log(hasFeatures);
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
