'use strict';

window.synchronizeFields = (function () {
  var synchronizeFields = function (elemFirst, elemSecond, arrFirst, arrSecond, callFunction) {
    var value = 0;
    Array.from(arrFirst).forEach(function (item, i) {
      if (item.value === elemFirst.value) {
        value = arrSecond[i];
      }
    });
    callFunction(elemSecond, value);
  };

  return {
    synchronizeFields: synchronizeFields
  };
})();
