'use strict';

window.map = (function (cardModule, pinModule, filterModule) {
  var map = cardModule.map;
  var allFilters = filterModule.allFilters;
  var getFilter = filterModule.getFilter;

  pinModule.addMainPinEvent(map);

  for (var i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener('change', changeFilter);
  }

  var changeFilter = function () {
    getFilter(homes);
  }

})(window.card, window.pin, window.filter);

// console.log(allFilters[1].value);console.log(housingType.selected.value);
