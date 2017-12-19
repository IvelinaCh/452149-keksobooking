'use strict';

window.map = (function (cardModule, pinModule) {
  var map = cardModule.map;
  var response = pinModule.response;


  pinModule.addMainPinEvent(map);



})(window.card, window.pin);

var mapFilterForm = document.querySelector('.map__filters');
var mapFilter = document.querySelectorAll('.map__filter');
var housingType = mapFilterForm.querySelector('#housing-type');
var housingPrice = mapFilterForm.querySelector('#housing-price');
var housingRooms = mapFilterForm.querySelector('#housing-rooms');
var housingGuests = mapFilterForm.querySelector('#housing-guests');
var housingFeature = mapFilterForm.querySelectorAll('.feature-container input');

var mapFilters = Array.from(mapFilter);
var housingFeatures = Array.from(housingFeature);
var allFilters = mapFilters.concat(housingFeatures);//console.log(allFilters[1].value);console.log(housingType.selected.value);


/*
allFilters.addEventListener('change', function () {
  for(var i = 0; i < allFilters.length; i++) {
  var listPins = response.filter(function (it) {
    if ((housingType.value === 'any' || housingType.value === response[i].type.value) &&
      (housingPrice.value === 'any' || housingPrice.value === response[i].price.value) &&
      (housingRooms.value === 'any' || housingRooms.value === response[i].rooms.value) &&
      (housingGuests.value === 'any' || housingGuests.value === response[i].guests.value)) {
        return true;
      }
    }
  );

    response.every(function (it, i, housingFeature) {
      for(var i = 0; i < housingFeature.length; i++) {
        if (housingFeature[i].checked) {
          featureCheckeds[i]
        }
      }
      return;
    })
  }
});
*/

response.filter(function (ad) {
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
    var hasHomes = response.filter(function (it) {
      if ((housingType.value === 'any' || housingType.value === response[i].type.value) &&
        (housingPrice.value === 'any' || housingPrice.value === response[i].price.value) &&
        (housingRooms.value === 'any' || housingRooms.value === response[i].rooms.value) &&
        (housingGuests.value === 'any' || housingGuests.value === response[i].guests.value)) {
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
