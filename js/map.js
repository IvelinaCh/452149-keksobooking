'use strict';

window.map = (function (cardModule, pinModule) {
  var map = cardModule.map;

var mapFilterForm = document.querySelector('.map__filters');
var mapFilter = document.querySelectorAll('.map__filter');
var housingType = mapFilterForm.querySelector('#housing-type');
var housingPrice = mapFilterForm.querySelector('#housing-price');
var housingRooms = mapFilterForm.querySelector('#housing-rooms');
var mapFilterhousingGuests = mapFilterForm.querySelector('#housing-guests');
var housingFeature = mapFilterForm.querySelectorAll('.feature');

var mapFilters = Array.from(mapFilter);
var housingFeatures = Array.from(housingFeature);
var allFilters = mapFilters.concat(housingFeatures);console.log(allFilters[0].housingRooms);

  pinModule.addMainPinEvent(map);



})(window.card, window.pin);


/*if () {}
*/
