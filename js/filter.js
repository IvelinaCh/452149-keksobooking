'use strict';

window.filter = (function () {
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilter = document.querySelectorAll('.map__filter');
  var housingType = mapFilterForm.querySelector('#housing-type');
  var housingPrice = mapFilterForm.querySelector('#housing-price');
  var housingRooms = mapFilterForm.querySelector('#housing-rooms');
  var housingGuests = mapFilterForm.querySelector('#housing-guests');
  var housingFeature = mapFilterForm.querySelectorAll('.feature-container input');

  var mapFilters = Array.from(mapFilter);
  var housingFeatures = Array.from(housingFeature);
  var allFilters = mapFilters.concat(housingFeatures);

  var getFilter = function (homes) {
    homes.filter(function (ad) {
      var hasFeatures = housingFeature.every(function (feature) {
        for(var i = 0; i < housingFeature.length; i++) {
          if (housingFeature[i].checked) {
            return true;
          }

          if (ad.indexOf(housingFeature[i])) {
            return true;
          } else {
            return false;
          }
        }
      });

      for(var i = 0; i < allFilters.length; i++) {
        var hasHomes = homes.filter(function (it) {
          if ((housingType.value === 'any' || housingType.value === homes[i].type.value) &&
            (housingPrice.value === 'any' || housingPrice.value === homes[i].price.value) &&
            (housingRooms.value === 'any' || housingRooms.value === homes[i].rooms.value) &&
            (housingGuests.value === 'any' || housingGuests.value === homes[i].guests.value)) {
              return true;
            }
          })
        }

      if (hasFeatures && hasHomes) {
        hasFeatures.concat(hasHomes);
        return true;
      } else {
        return false;
      }
    });
  }
  return {
    allFilters: allFilters,
    getFilter: getFilter
  };
})()
